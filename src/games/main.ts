// Utilities
import { AUTO } from 'phaser';
// Stores
import { useMainStore } from '../stores/mainStore';
// Game Scenes
import { Game as MainGame } from '@/games/game';

const mainStore = useMainStore();

const calculateGameSize = (): { width: number; height: number } => {
    const width = mainStore.windowInnerWidth;
    const height = Math.floor(width * (3 / 4)); // 保持 3:4 比例

    return { width, height };
};

const { width, height } = calculateGameSize();

const config: Phaser.Types.Core.GameConfig = {
    type  : AUTO,
    width,
    height,
    parent: 'game-container',
    scene : [
        MainGame,
    ],
};

const startGame = (parent: string) => {
    console.log(config);
    return new Phaser.Game({
        ...config,
        parent,
    });
 };

 export default startGame;
