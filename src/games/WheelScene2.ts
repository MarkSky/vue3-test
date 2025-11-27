import Phaser from 'phaser';

// ✅ 匯出介面和型別，讓 Vue 可以使用
export interface PrizeItem {
    label: string;
    color: number;
}

export type OnSpinCompleteCallback = (prize: PrizeItem, index: number) => void;

export default class WheelScene extends Phaser.Scene {
    private wheel!         : Phaser.GameObjects.Container;
    private pointer!       : Phaser.GameObjects.Triangle;
    private prizeItems     : PrizeItem[] = [];
    private spinning = false;
    private onSpinComplete?: OnSpinCompleteCallback;

    constructor(prizeItems: PrizeItem[]) {
        super('WheelScene');
        this.prizeItems = prizeItems;
    }

    create() {
        // 🎡 頁面載入時就顯示完整輪盤
        this.createWheel();
        this.createPointer();
    }

    // ✅ 公開方法：設定回呼函數
    public setOnSpinComplete(callback: OnSpinCompleteCallback) {
        this.onSpinComplete = callback;
    }

    /** ★ 由Vue呼叫 - 按鈕按下時才傳入中獎索引 */
    public startSpin(targetIndex: number) {
        if (this.spinning) return;

        // ✅ 驗證索引有效性
        if (targetIndex < 0 || targetIndex >= this.prizeItems.length) {
            console.error(`❌ 無效的獎項索引: ${ targetIndex }`);
            return;
        }

        this.spinning = true;

        const segmentAngle = 360 / this.prizeItems.length;

        // ✅ 計算停止角度（與原版 spinToPrize 相同邏輯）
        const stopAngle = 360 - (targetIndex * segmentAngle + segmentAngle / 2);

        // 多轉幾圈
        const rounds = Phaser.Math.Between(3, 5);
        const randomOffset = Phaser.Math.Between(-5, 5);
        const finalAngle = 360 * rounds + stopAngle + randomOffset;

        /** 製作動態漸停 */
        this.tweens.add({
            targets   : this.wheel,
            angle     : finalAngle,
            ease      : 'Cubic.easeOut',
            duration  : 4000,
            onComplete: () => {
                this.spinning = false;
                const prize = this.prizeItems[targetIndex];

                // ✅ 加入安全檢查
                if (!prize) {
                    console.error(`❌ 無效的獎項索引: ${ targetIndex }`);
                    return;
                }

                console.log(`🎉 停在：${ prize.label }`);

                // ✅ 通知 Vue 中獎結果
                if (this.onSpinComplete) {
                    this.onSpinComplete(prize, targetIndex);
                }
            },
        });
    }

    private createWheel() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;
        this.wheel = this.add.container(cx, cy);

        const radius = 250;
        const count = this.prizeItems.length;
        const segmentAngle = 360 / count;

        for (let i = 0; i < count; i++) {
            const prizeItem = this.prizeItems[i];
            if (!prizeItem) continue;

            // ✅ 使用 slice 方法（與原版相同）
            const startAngle = Phaser.Math.DegToRad(i * segmentAngle);
            const endAngle = Phaser.Math.DegToRad((i + 1) * segmentAngle);

            const graphics = this.add.graphics();
            graphics.fillStyle(prizeItem.color, 1);
            graphics.slice(0, 0, radius, startAngle, endAngle, false);
            graphics.fillPath();

            this.wheel.add(graphics);

            // ✅ 文字位置計算（與原版相同）
            const textAngle = i * segmentAngle + segmentAngle / 2;
            const text = this.add.text(0, 0, prizeItem.label, {
                font : '20px Arial',
                color: '#000',
            }).setOrigin(0.5);

            text.setRotation(Phaser.Math.DegToRad(textAngle));
            text.setPosition(
                Math.cos(Phaser.Math.DegToRad(textAngle)) * (radius * 0.65),
                Math.sin(Phaser.Math.DegToRad(textAngle)) * (radius * 0.65),
            );

            this.wheel.add(text);
        }
    }

    private createPointer() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;
        const radius = 250;
        const pointerSize = 30;

        // ✅ 指針在輪盤右側（與原版相同）
        this.pointer = this.add.triangle(
            cx + 30,
            cy - radius - 10,
            0,
            pointerSize * 2,
            -pointerSize,
            0,
            pointerSize,
            0,
            0xff0000,
        ).setOrigin(0.5);
    }
}
