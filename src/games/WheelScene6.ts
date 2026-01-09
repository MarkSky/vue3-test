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

    private gameRoot!    : Phaser.GameObjects.Container;
    private wheel!       : Phaser.GameObjects.Container;
    private spinning = false;
    private bg01!        : Phaser.GameObjects.Image;
    private bg02!        : Phaser.GameObjects.Image;
    private bgBlinkTween?: Phaser.Tweens.Tween;

    // 👉 指針 tick 用
    private lastTickIndex = -1;
    private pointerTween?     : Phaser.Tweens.Tween;
    private pointer!          : Phaser.GameObjects.Image;
    private pointerFrame1!    : Phaser.GameObjects.Image;
    private pointerFrame2!    : Phaser.GameObjects.Image;
    private pointerBlinkTween?: Phaser.Tweens.Tween;

    // 音效
    private tickSound?        : Phaser.Sound.BaseSound;
    private endSound?         : Phaser.Sound.BaseSound;
    private treasureOpenSound?: Phaser.Sound.BaseSound;

    private prizeOverlay?: Phaser.GameObjects.Container;

    private readonly wheelRadius = 220;
    private readonly centerX = 300;
    private readonly centerY = 300;

    public onSpinComplete?: OnSpinCompleteCallback;

    constructor(config: WheelConfig) {
        super({ key: 'WheelScene' });
        this.config = config;
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

        if (sounds?.treasureOpen) {
            this.load.audio('treasureOpenSound', sounds.treasureOpen);
        }

        const { backgroundImg01, backgroundImg02, pointer, pointerFrame1, pointerFrame2, inner, treasure } = this.config.images;
        console.log('🔍 pointerFrame1 路徑:', pointerFrame1);
        console.log('🔍 pointerFrame2 路徑:', pointerFrame2);
        this.load.image('bg01', backgroundImg01);
        this.load.image('bg02', backgroundImg02);
        this.load.image('pointer', pointer);
        this.load.image('pointerFrame1', pointerFrame1);
        this.load.image('pointerFrame2', pointerFrame2);
        this.load.image('inner', inner);
        this.load.image('treasure', treasure);
    }

    create() {
        // 列出所有載入的圖片
        console.log('📦 已載入的圖片 keys:', this.textures.getTextureKeys());

        // 檢查特定圖片是否存在
        console.log('pointerFrame1 存在?', this.textures.exists('pointerFrame1'));
        console.log('pointerFrame2 存在?', this.textures.exists('pointerFrame2'));

        // console.log('cache tickSound:', this.cache.audio.exists('tickSound'));
        // 建立音效（⚠️ preload 後才能 add）
        if (this.cache.audio.exists('tickSound')) {
            this.tickSound = this.sound.add('tickSound', { volume: 0.4 });
        }

        if (this.cache.audio.exists('endSound')) {
            this.endSound = this.sound.add('endSound', { volume: 0.6 });
        }

        if (this.cache.audio.exists('treasureOpenSound')) {
            this.treasureOpenSound = this.sound.add('treasureOpenSound', { volume: 0.8 });
        }

        this.gameRoot = this.add.container(0, 0);

        // 🎡 頁面載入時就顯示完整輪盤
        this.createBackground();
        this.createWheel();
        this.createPointer();
        this.createStaticPointer();
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

    private showPrizeOverlay(label: string) {
        // 🔻 輪盤淡出
        this.tweens.add({
            targets   : this.gameRoot,
            alpha     : 0,
            duration  : 300,
            ease      : 'Power2',
            onComplete: () => {
                this.gameRoot.setVisible(false);
            },
        });

        const { centerX, centerY } = this.cameras.main;

        const overlay = this.add.container(0, 0);

        const mask = this.add.rectangle(
            centerX,
            centerY,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.8,
        );

        // const chest = this.add.image(
        //     this.cameras.main.centerX,
        //     this.cameras.main.centerY,
        //     'treasure',
        // )
        //     .setScale(0.6)
        //     .setDepth(100);

        // const text = this.add.text(
        //     this.cameras.main.centerX,
        //     this.cameras.main.centerY - chest.displayHeight / 2 - 40,
        //     `恭喜中獎\n${ label }`,
        //     {
        //         fontSize       : '36px',
        //         color          : '#FFD54F',
        //         fontStyle      : 'bold',
        //         align          : 'center',
        //         stroke         : '#000',
        //         strokeThickness: 6,
        //     },
        // )
        //     .setOrigin(0.5)
        //     .setDepth(100);

        // overlay.add([mask, chest, text]);
        // this.prizeOverlay = overlay;

        // this.tweens.add({
        //     targets : chest,
        //     alpha   : 1,
        //     scale   : { from: 0.2, to: 0.4 },
        //     duration: 600,
        //     ease    : 'Back.easeOut',
        // });

        // this.tweens.add({
        //     targets : text,
        //     alpha   : 1,
        //     y       : '-=10',
        //     duration: 500,
        //     delay   : 200,
        //     ease    : 'Power2',
        // });
        const prizeGroup = this.add.container(centerX, centerY)
            .setDepth(100)
            .setAlpha(0);  // 只控制透明度

        const chest = this.add.image(0, 0, 'treasure')
            .setScale(0.1);  // 設定初始縮放

        const text = this.add.text(
            0,
            -chest.displayHeight / 2 - 100,
            `恭喜中獎\n${ label }`,
            {
                fontSize       : '36px',
                color          : '#FFD54F',
                fontStyle      : 'bold',
                align          : 'center',
                stroke         : '#000',
                strokeThickness: 6,
                padding        : { x: 10, y: 15 },
            },
        )
            .setOrigin(0.5)
            .setScale(0.5);  // 設定初始縮放

        prizeGroup.add([chest, text]);
        overlay.add([mask, prizeGroup]);
        this.prizeOverlay = overlay;

        this.treasureOpenSound?.play();

        // prizeGroup 只做淡入
        this.tweens.add({
            targets : prizeGroup,
            alpha   : 1,
            duration: 600,
        });

        // 🎯 chest 獨立的縮放動畫
        this.tweens.add({
            targets : chest,
            scale   : 0.6,  // 從 0.1 放大到 0.6
            duration: 600,
            ease    : 'Back.easeOut',
        });

        // 🎯 text 獨立的縮放動畫
        this.tweens.add({
            targets : text,
            scale   : 1.4,  // 從 0.5 放大到 1.5
            duration: 600,
            delay   : 100,  // 可以加延遲，讓文字稍晚出現
            ease    : 'Back.easeOut',
        });
    }

    // 指針框開始閃爍
    private startPointerBlink() {
        if (this.pointerBlinkTween) return;

        this.pointerBlinkTween = this.tweens.add({
            targets: {
                value: 0,
            },
            value   : 1,              // 從 0 變化到 1
            duration: 200,
            loop    : -1,
            onLoop  : () => {
                const visible = this.pointerFrame1.visible;
                this.pointerFrame1.setVisible(!visible);
                this.pointerFrame2.setVisible(visible);
            },
        });
    }

    // 指針框停止閃爍
    private stopPointerBlink() {
        this.pointerBlinkTween?.stop();
        this.pointerBlinkTween = undefined;

        this.pointerFrame1.setVisible(true);
        this.pointerFrame2.setVisible(false);
    }

    // 在你的 WheelScene 類別裡加上這個屬性
    private realAngle: number = 0; // 真實的累積角度

    /** ★ 由Vue呼叫 - 按鈕按下時才傳入中獎索引 */
    public startSpinBounce(targetIndex: number) {
        if (this.sound.locked) {
            this.sound.unlock();
        }

        if (this.spinning) return;

        this.stopPointerBlink();

        const prizes = this.config.prizes;
        const count = prizes.length;

        if (targetIndex < 0 || targetIndex >= count) {
            console.error(`❌ 無效的獎項索引: ${ targetIndex }`);
            return;
        }

        this.spinning = true;
        this.tickSound?.play({ loop: true });

        const segmentAngle = 360 / count;
        const targetSectorCenter = targetIndex * segmentAngle + segmentAngle / 2;

        // 🔧 使用 realAngle 而不是 wheel.angle
        const currentAngle = this.realAngle;
        const currentNormalized = ((currentAngle % 360) + 360) % 360;

        const targetWheelAngle = -targetSectorCenter - 90;
        const targetNormalized = ((targetWheelAngle % 360) + 360) % 360;

        let deltaAngle = targetNormalized - currentNormalized;
        if (deltaAngle < 0) {
            deltaAngle += 360;
        }

        const rounds = Phaser.Math.Between(3, 5);
        const fullSpinAngle = 360 * rounds + deltaAngle;

        const overshootAngle = Phaser.Math.FloatBetween(
            segmentAngle * 0.15,
            segmentAngle * 0.35,
        );

        const overshootFinalAngle = currentAngle + fullSpinAngle + overshootAngle;
        const snapFinalAngle = currentAngle + fullSpinAngle;

        console.log('🎯 目標索引:', targetIndex);
        console.log('🎪 超過角度:', overshootAngle.toFixed(2), '°');
        console.log('🌀 主轉動到:', overshootFinalAngle.toFixed(2), '°');
        console.log('🏁 回彈到:', snapFinalAngle.toFixed(2), '°');

        // 🔧 建立一個臨時物件來儲存角度
        const angleProxy = { value: currentAngle };

        /* ---------- 第一段：主旋轉（到超過一點） ---------- */
        this.tweens.add({
            targets : angleProxy,
            value   : overshootFinalAngle, // 🔧 Tween 這個 proxy 物件
            duration: 4200,
            ease    : 'Cubic.easeOut',
            onUpdate: (tween) => {
                // 🔧 手動更新輪盤角度
                this.realAngle = angleProxy.value;
                this.wheel.angle = angleProxy.value;
            },
            onComplete: () => {
                console.log('🎬 第一段結束，實際角度:', angleProxy.value.toFixed(2), '°');

                this.tickSound?.stop();

                /* ---------- 第二段：回彈對齊 ---------- */
                const endSound = this.endSound;
                const endSoundDuration
                    = ((endSound?.duration) != null)
                        ? endSound.duration * 800
                        : 1000;

                endSound?.play();

                this.tweens.add({
                    targets   : angleProxy,
                    value     : snapFinalAngle,
                    duration  : 600,
                    ease      : 'Back.easeOut',
                    easeParams: [1.5],
                    delay     : 200,
                    onUpdate  : () => {
                        // 🔧 持續更新輪盤角度
                        this.realAngle = angleProxy.value;
                        this.wheel.angle = angleProxy.value;
                    },
                    onComplete: () => {
                        this.realAngle = angleProxy.value;
                        this.wheel.angle = angleProxy.value;

                        console.log('🏁 最終角度:', this.realAngle.toFixed(2), '°', '(正規化:', ((this.realAngle % 360 + 360) % 360).toFixed(2), '°)');

                        this.spinning = false;

                        this.startPointerBlink();

                        const prize = prizes[targetIndex];
                        if (!prize) return;

                        this.time.delayedCall(endSoundDuration, () => {
                            this.showPrizeOverlay(prize.label);

                            // 回傳中獎資訊給Vue
                            this.onSpinComplete?.(prize, targetIndex);
                        });
                    },
                });
            },
        });
    }

    public resetWheelView() {
        // 1️⃣ 隱藏寶箱 overlay
        if (this.prizeOverlay) {
            this.prizeOverlay.destroy(true);
            this.prizeOverlay = undefined;
        }

        // 2️⃣ 顯示輪盤
        this.gameRoot.setVisible(true);
        this.gameRoot.setAlpha(1);

        // 3️⃣ 恢復 pointer 狀態
        this.stopPointerBlink();

        // 5️⃣ 回到可再轉狀態
        this.spinning = false;
    }

    private createBackground() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;

        this.bg01 = this.add.image(cx, cy, 'bg01');
        this.bg02 = this.add.image(cx, cy, 'bg02');

        this.gameRoot.add([this.bg01, this.bg02]);

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

        this.gameRoot.add(this.wheel);

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

    private createStaticPointer() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;
        const radius = 250;
        const POINTER_OFFSET_Y = -18;

        // 👉 Pointer（靜態）
        this.pointer = this.add.image(
            cx,
            cy - radius + POINTER_OFFSET_Y, // 稍微往下，讓尖端接近輪盤
            'pointer',
        )
            .setOrigin(0.5, 0)   // 尖端在圖片「上方中央」
            .setScale(0.6)       // 視圖片大小調整
            .setDepth(50);       // 一定要比輪盤高

        this.gameRoot.add(this.pointer);
    }

    private createPointer() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;
        const radius = 250;
        const POINTER_OFFSET_Y = -18;

        const x = cx;
        const y = cy - radius + POINTER_OFFSET_Y;

        this.pointerFrame1 = this.add.image(x, y, 'pointerFrame1')
            .setOrigin(0.5, 0)
            .setScale(0.6)
            .setDepth(30)
            .setVisible(true);

        this.pointerFrame2 = this.add.image(x, y, 'pointerFrame2')
            .setOrigin(0.5, 0)
            .setScale(0.6)
            .setDepth(30)
            .setVisible(false);

        this.gameRoot.add([this.pointerFrame1, this.pointerFrame2]);
    }
}
