// Utilities
import { Scene } from 'phaser';

export class Loading extends Scene {
    constructor() {
        super('Loading');
    }

    init() {
        this.add.image(512, 384, 'background');

        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        this.load.setPath('assets');
    }

    create() {
        this.scene.start('Game');
    }
}
