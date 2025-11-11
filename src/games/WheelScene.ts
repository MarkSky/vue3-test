import Phaser from 'phaser';

export default class WheelScene extends Phaser.Scene {
    private prizeItems: { label: string; color: number }[];
    private wheel!    : Phaser.GameObjects.Container;
    private isSpinning = false;

    constructor(prizeItems: { label: string; color: number }[]) {
        super('WheelScene');
        this.prizeItems = prizeItems;
    }

    create() {
        const radius = 250;
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const segmentAngle = 360 / this.prizeItems.length;

        // 建立輪盤群組容器
        this.wheel = this.add.container(centerX, centerY);

        // 畫每個區塊 + 文字
        this.prizeItems.forEach((item, i) => {
            const startAngle = Phaser.Math.DegToRad(i * segmentAngle);
            const endAngle = Phaser.Math.DegToRad((i + 1) * segmentAngle);

            const graphics = this.add.graphics();
            graphics.fillStyle(item.color, 1);
            graphics.slice(0, 0, radius, startAngle, endAngle, false);
            graphics.fillPath();
            this.wheel.add(graphics);

            // 加上文字
            const textAngle = i * segmentAngle + segmentAngle / 2;
            const text = this.add.text(0, 0, item.label, {
                font : '20px Arial',
                color: '#000',
            });
            text.setOrigin(0.5);
            text.setRotation(Phaser.Math.DegToRad(textAngle));
            text.setPosition(
                Math.cos(Phaser.Math.DegToRad(textAngle)) * (radius * 0.65),
                Math.sin(Phaser.Math.DegToRad(textAngle)) * (radius * 0.65),
            );
            this.wheel.add(text);
        });

        // --- 畫固定指針 ---
        const pointerSize = 30;
        const pointer = this.add.triangle(
            centerX + 30,
            centerY - radius - 10,
            0,
            pointerSize * 2,
            -pointerSize,
            0,
            pointerSize,
            0,
            0xff0000,
        );
        pointer.setOrigin(0.5, 0.5);

        // --- 點擊事件：啟動旋轉 ---
        this.input.once('pointerdown', () => this.spinWheel());
    }

    private spinWheel() {
        if (this.isSpinning) return;
        this.isSpinning = true;

        const rounds = Phaser.Math.Between(3, 6); // 轉幾圈
        const randomAngle = Phaser.Math.Between(0, 360); // 最後停下角度
        const targetAngle = 360 * rounds + randomAngle;

        this.tweens.add({
            targets   : this.wheel,
            angle     : targetAngle,
            ease      : 'Cubic.easeOut',
            duration  : 4000,
            onComplete: () => {
                this.isSpinning = false;
                const finalAngle = this.wheel.angle % 360;
                console.log('停下角度:', finalAngle.toFixed(2));
            },
        });
    }

    // 傳入中獎文字，讓輪盤轉到該項目
    public spinToPrize(targetLabel: string) {
        if (this.isSpinning) return;
        this.isSpinning = true;

        const segmentAngle = 360 / this.prizeItems.length;
        const index = this.prizeItems.findIndex(p => p.label === targetLabel);

        if (index === -1) {
            console.warn('找不到中獎項目:', targetLabel);
            return;
        }

        // 每格中心角度（0° 在 12 點方向，順時針增加）
        const stopAngle = 360 - (index * segmentAngle + segmentAngle / 2);

        // 多轉幾圈再停下（自然感）
        const rounds = Phaser.Math.Between(3, 5);
        const randomOffset = Phaser.Math.Between(-5, 5); // 偏差角度
        const finalAngle = 360 * rounds + stopAngle + randomOffset;

        this.tweens.add({
            targets   : this.wheel,
            angle     : finalAngle,
            ease      : 'Cubic.easeOut',
            duration  : 4000,
            onComplete: () => {
                this.isSpinning = false;
                const final = (this.wheel.angle % 360 + 360) % 360;
                console.log(`中獎: ${ targetLabel }，停下角度: ${ final.toFixed(2) }°`);
            },
        });
    }
}
