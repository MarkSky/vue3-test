// Utilities
import { Scene } from 'phaser';
// Utils
import { gameEventBus } from '@/utils/gameEventBus';

// 按鈕參數（全域變數）
const BUTTON_X = 900;
const BUTTON_Y = 300;
const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 60;
const CORNER_RADIUS = 15; // 圓角半徑

export class Game extends Scene {
    private camera!    : Phaser.Cameras.Scene2D.Camera;
    private background!: Phaser.GameObjects.Image;
    private gameText!  : Phaser.GameObjects.Text;
    private button!    : Phaser.GameObjects.Graphics;
    private hitArea!   : Phaser.GameObjects.Rectangle;
    private buttonText : Phaser.GameObjects.Text | null = null;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('rgba(0,80,137,54)');

        this.background = this.add.image(812, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily     : 'Arial Black', fontSize       : 38, color          : '#ffffff',
            stroke         : '#000000', strokeThickness: 8,
            align          : 'center',
        }).setOrigin(0.5).setDepth(100);

        this.button = this.add.graphics();

        this.drawButton(0x007bff);

        // 創建點擊區域
        this.hitArea = this.add.rectangle(BUTTON_X, BUTTON_Y, BUTTON_WIDTH, BUTTON_HEIGHT, 0x000000, 0)
            .setInteractive()
            .on('pointerover', () => this.input.setDefaultCursor('pointer')) // 滑鼠進入時改變游標
            .on('pointerout', () => this.input.setDefaultCursor('default'))  // 滑鼠離開時恢復
            .on('pointerdown', () => console.log('按鈕被點擊了！'));

        this.hitArea.on('pointerdown', this.onButtonClick, this);
        this.hitArea.on('pointerup', this.onButtonRelease, this);
        this.hitArea.on('pointerover', () => this.drawButton(0x0056b3));
        this.hitArea.on('pointerout', () => this.drawButton(0x007bff));

        gameEventBus.emit('current-scene-ready', this);
    }

    drawButton(color: number) {
        this.button.clear();
        this.button.fillStyle(color, 1);
        this.button.fillRoundedRect(
            BUTTON_X - BUTTON_WIDTH / 2,
            BUTTON_Y - BUTTON_HEIGHT / 2,
            BUTTON_WIDTH,
            BUTTON_HEIGHT,
            CORNER_RADIUS,
        );
        this.button.lineStyle(4, 0xffffff, 1);
        this.button.strokeRoundedRect(
            BUTTON_X - BUTTON_WIDTH / 2,
            BUTTON_Y - BUTTON_HEIGHT / 2,
            BUTTON_WIDTH,
            BUTTON_HEIGHT,
            CORNER_RADIUS,
        );

        // 清除舊文字並重繪
        if (this.buttonText) this.buttonText.destroy();
        this.buttonText = this.add.text(BUTTON_X, BUTTON_Y, 'CLICK ME', {
            fontSize  : '24px',
            fontFamily: 'Arial',
            color     : '#ffffff',
            align     : 'center',
        }).setOrigin(0.5);
    }

    onButtonClick() {
        console.log('按鈕被點擊了!');
        this.drawButton(0x004085);
    }

    onButtonRelease() {
        console.log('釋放按鈕!');
        this.drawButton(0x007bff);
    }
}
