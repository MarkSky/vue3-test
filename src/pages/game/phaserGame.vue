<route>
    {
        "name": "PhaserGame",
        "meta": {
            "title": "Phaser 遊戲",
            "i18n": "page.game.phaserGame.title",
            "transition": "default",
            "authorize": false
        }
    }
</route>

<script setup lang="ts">
    /*
        import
    */
    // Composables
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Phaser from 'phaser';
    // Utils
    import { gameEventBus } from '@/utils/gameEventBus';
    // Games
    import startGame from '@/games/main';

    /*
        i18n
    */
    //
    const { t } = useI18n();

    //
    const game = ref<Phaser.Game | null>();

    /*
        lifecycle
    */
    onMounted(() => {
        game.value = startGame('game-container');

        gameEventBus.on('current-scene-ready', (scene_instance:Phaser.Scene) => {
            console.log('current-scene-ready', scene_instance);
        });
    });

    onUnmounted(() => {
        if (game.value) {
            game.value.destroy(true);

            game.value = null;
        }
    });
</script>

<template>
    <div class="flex ai:center flex:col pt:20 w:full">
        <h1 class="f:20 f:bold fg:#ffffff flex:0|0|auto jc:center mb:4 mx:auto">
            {{ t('page.game.phaserGame.title') }}
        </h1>

        <div class="game-container">
            <!-- Game content will be rendered here -->
        </div>
    </div>
</template>
