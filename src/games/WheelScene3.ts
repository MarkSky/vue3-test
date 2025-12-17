import Phaser from 'phaser';
// Models
import type { WheelConfig } from '@/models/IWheelGameModel';

// ✅ 匯出介面和型別，讓 Vue 可以使用
export interface PrizeItem {
    label: string;
    color: number;
}

export type OnSpinCompleteCallback = (prize: PrizeItem, index: number) => void;

export default class WheelScene extends Phaser.Scene {
    private config!: WheelConfig;

    private wheel!           : Phaser.GameObjects.Container;
    private pointer!         : Phaser.GameObjects.Image;
    private spinning = false;
    private bg01!            : Phaser.GameObjects.Image;
    private bg02!            : Phaser.GameObjects.Image;
    private bgBlinkTween?    : Phaser.Tweens.Tween;
    private highlightGraphic?: Phaser.GameObjects.Graphics;

    // 👉 指針 tick 用
    private lastTickIndex = -1;
    private pointerTween?: Phaser.Tweens.Tween;

    // 音效
    private tickSound?: Phaser.Sound.BaseSound;
    private endSound? : Phaser.Sound.BaseSound;

    private readonly wheelRadius = 220;
    private readonly centerX = 300;
    private readonly centerY = 300;

    private onSpinComplete?: OnSpinCompleteCallback;

    constructor(config: WheelConfig, callback?: OnSpinCompleteCallback) {
        super({ key: 'WheelScene' });
        this.config = config;
        this.onSpinComplete = callback;
    }

    preload() {
        // 🔍 監聽單一檔案載入成功
        this.load.on('filecomplete', (key: string, type: string) => {
            console.log(`✅ filecomplete: ${ key }, type: ${ type }`);
        });

        // ❌ 監聽單一檔案載入失敗
        this.load.on('loaderror', (file: Phaser.Loader.File) => {
            console.error('❌ loaderror:', file.key, file.src);
        });

        // ✅ 全部載入完成
        this.load.on('complete', () => {
            console.log('🎉 所有 preload 資源載入完成');
        });

        // 🎧 載入音效
        const sounds = this.config.sounds;

        if (sounds?.tick) {
            // console.log('Preload tick:', sounds.tick);
            this.load.audio('tickSound', sounds.tick);
        }

        if (sounds?.end) {
            // console.log('Preload end:', sounds.end);
            this.load.audio('endSound', sounds.end);
        }

        const { backgroundImg01, backgroundImg02, pointer, inner } = this.config.images;

        this.load.image('bg01', backgroundImg01);
        this.load.image('bg02', backgroundImg02);
        this.load.image('pointer', pointer);
        this.load.image('inner', inner);
    }

    create() {
        // console.log('cache tickSound:', this.cache.audio.exists('tickSound'));
        // 建立音效（⚠️ preload 後才能 add）
        if (this.cache.audio.exists('tickSound')) {
            this.tickSound = this.sound.add('tickSound', { volume: 0.4 });
        }

        if (this.cache.audio.exists('endSound')) {
            this.endSound = this.sound.add('endSound', { volume: 0.6 });
        }

        // 🎡 頁面載入時就顯示完整輪盤
        this.createBackground();
        this.createWheel();
        this.createPointer();
    }

    private startBackgroundBlink(duration = 400) {
        this.bgBlinkTween?.stop();

        this.bgBlinkTween = this.tweens.add({
            targets: this.bg02,
            alpha  : 1,
            duration,
            yoyo   : true,
            repeat : -1,
            ease   : 'Sine.easeInOut',
        });
    }

    // ✅ 公開方法：設定回呼函數
    public setOnSpinComplete(callback: OnSpinCompleteCallback) {
        this.onSpinComplete = callback;
    }

    private clearHighlight() {
        if (this.highlightGraphic) {
            this.highlightGraphic.destroy();
            this.highlightGraphic = undefined;
        }
    }

    private highlightSector(index: number) {
        // ✅ 先清掉舊的
        this.clearHighlight();

        const prizes = this.config.prizes;
        const count = prizes.length;
        const segmentAngle = 360 / count;

        // ⭐ 關鍵：定義高亮區範圍
        const outerRadius = this.wheelRadius * 0.68; // 不要到最外
        const innerRadius = this.wheelRadius * 0.2; // 中間挖空

        const startDeg = -90 + index * segmentAngle;
        const endDeg = startDeg + segmentAngle;

        const g = this.add.graphics();
        g.fillStyle(0xffff99, 0.55);

        g.beginPath();

        // 外弧（順時針）
        g.arc(
            0,
            0,
            outerRadius,
            Phaser.Math.DegToRad(startDeg),
            Phaser.Math.DegToRad(endDeg),
            false,
        );

        // 內弧（逆時針，挖空）
        g.arc(
            0,
            0,
            innerRadius,
            Phaser.Math.DegToRad(endDeg),
            Phaser.Math.DegToRad(startDeg),
            true,
        );

        g.closePath();
        g.fillPath();

        this.wheel.add(g);
        this.highlightGraphic = g;

        // ✨ 呼吸閃爍
        this.tweens.add({
            targets : g,
            alpha   : { from: 0.25, to: 0.6 },
            duration: 650,
            yoyo    : true,
            repeat  : -1,
        });
    }

    private pointerTick(progress: number) {
        if (this.pointerTween?.isPlaying()) return;

        const baseOffset = 4;
        const extra = (1 - progress) * 6; // 越慢彈越大
        const offset = baseOffset + extra;

        this.pointerTween = this.tweens.add({
            targets : this.pointer,
            y       : this.pointer.y + offset,
            duration: 50,
            yoyo    : true,
            ease    : 'Quad.easeOut',
        });
    }

    private handlePointerTick(tween: Phaser.Tweens.Tween) {
        const segmentAngle = 360 / this.config.prizes.length;
        const currentAngle = Phaser.Math.Wrap(this.wheel.angle, 0, 360);

        const tickIndex = Math.floor(currentAngle / segmentAngle);

        if (tickIndex !== this.lastTickIndex) {
            this.lastTickIndex = tickIndex;
            this.pointerTick(tween.progress);
        }
    }

    /** ★ 由Vue呼叫 - 按鈕按下時才傳入中獎索引 */
    public startSpin(targetIndex: number) {
        // 🔓 解鎖音效（只會執行一次）
        if (this.sound.locked) {
            this.sound.unlock();
        }

        if (this.spinning) return;

        this.clearHighlight();

        const prizes = this.config.prizes;
        const count = prizes.length;

        // ✅ 驗證索引有效性
        if (targetIndex < 0 || targetIndex >= count) {
            console.error(`❌ 無效的獎項索引: ${ targetIndex }`);
            return;
        }

        this.spinning = true;
        console.log('tickSound:', this.tickSound);

        // ▶️ 播放 tick loop
        if (this.tickSound) {
            this.tickSound.play({ volume: 0.4, loop: true });
        }

        const segmentAngle = 360 / count;

        // ✅ 計算停止角度（與原版 spinToPrize 相同邏輯）
        const stopAngle = 360 - (targetIndex * segmentAngle + segmentAngle / 2);

        // 多轉幾圈
        const rounds = Phaser.Math.Between(3, 5);
        const randomOffset = Phaser.Math.Between(-5, 5);
        const finalAngle = 360 * rounds + stopAngle + randomOffset;

        const spinDuration = 4200;
        const endSoundDelay = spinDuration - 3600;

        // 🔊 切換到結尾音效
        this.time.delayedCall(endSoundDelay, () => {
            if (this.tickSound?.isPlaying) {
                this.tweens.add({
                    targets   : this.tickSound,
                    volume    : 0,
                    duration  : 300,
                    onComplete: () => this.tickSound?.stop(),
                });
            }

            this.endSound?.play();
        });

        /** 製作動態漸停 */
        this.tweens.add({
            targets : this.wheel,
            angle   : finalAngle,
            ease    : 'Cubic.easeOut',
            duration: 4000,

            onUpdate: (tween) => {
                this.handlePointerTick(tween);
            },
            onComplete: () => {
                this.spinning = false;
                const prize = prizes[targetIndex];

                // ✅ 加入安全檢查
                if (!prize) {
                    console.error(`❌ 無效的獎項索引: ${ targetIndex }`);
                    return;
                }

                console.log(`🎉 停在：${ prize.label }`);

                // ⭐ 中獎扇形呼吸發光
                this.highlightSector(targetIndex);

                // ✅ 通知 Vue 中獎結果
                this.onSpinComplete?.(prize, targetIndex);
            },
        });
    }

    private createBackground() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;

        this.bg01 = this.add.image(cx, cy, 'bg01');
        this.bg02 = this.add.image(cx, cy, 'bg02');

        const targetSize = 500; // game width / height
        const texture = this.textures.get('bg01').getSourceImage() as HTMLImageElement;

        const scale = Math.min(
            targetSize / texture.width,
            targetSize / texture.height,
        );

        this.bg01.setScale(scale);
        this.bg02.setScale(scale);

        this.bg01.setDepth(0);
        this.bg02.setDepth(0);

        this.bg01.setAlpha(1);
        this.bg02.setAlpha(0);

        this.startBackgroundBlink();
    }

    private createWheel() {
        const prizes = this.config.prizes;
        const count = prizes.length;

        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;

        // this.wheel = this.add.container(this.centerX, this.centerY);
        this.wheel = this.add.container(cx, cy);

        const radius = 250;
        const segmentAngle = 360 / count;

        /* ---------- ✅ 1️⃣ 加入轉盤 PNG（最底層） ---------- */

        const disk = this.add.image(0, 0, 'inner');
        disk.setOrigin(0.5);

        // 等比例縮放到你現在的 radius
        const scale = (radius * 2) / disk.width;
        disk.setScale(scale);

        this.wheel.add(disk);

        /* ---------- ✅ 2️⃣ 文字（跟著 wheel 一起轉） ---------- */
        for (let i = 0; i < count; i++) {
            const prize = prizes[i]!;

            // ✅ 使用 slice 方法（與原版相同）
            const startAngle = Phaser.Math.DegToRad(i * segmentAngle);
            const endAngle = Phaser.Math.DegToRad((i + 1) * segmentAngle);

            const graphics = this.add.graphics();
            graphics.lineStyle(0, 0x000000, 0);
            graphics.beginPath();
            // graphics.fillStyle(prize.color, 1);
            graphics.slice(0, 0, radius, startAngle, endAngle, false);
            graphics.fillPath();

            this.wheel.add(graphics);

            this.highlightGraphic = graphics; // ⭐ 存起來

            // ✅ 文字位置計算（與原版相同）
            const textAngle = i * segmentAngle + segmentAngle / 2;
            const text = this.add.text(0, 0, prize.label, {
                font : '20px Arial',
                color: '#000',
            }).setOrigin(0.5);

            const textRadius = radius * 0.4; // ⭐ 可微調：0.45 ~ 0.55
            text.setRotation(Phaser.Math.DegToRad(textAngle));
            text.setPosition(
                Math.cos(Phaser.Math.DegToRad(textAngle)) * textRadius,
                Math.sin(Phaser.Math.DegToRad(textAngle)) * textRadius,
            );

            this.wheel.add(text);
        }
    }

    private createPointer() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;
        const radius = 250;
        const POINTER_OFFSET_Y = -18;

        this.pointer = this.add.image(
            cx,
            cy - radius + POINTER_OFFSET_Y, // 稍微往下，讓尖端接近輪盤
            'pointer',
        );

        // ⭐ 關鍵設定
        this.pointer
            .setOrigin(0.5, 0)   // 尖端在圖片「上方中央」
            .setScale(0.6)       // 視圖片大小調整
            .setDepth(20);       // 一定要比輪盤高
    }
}
