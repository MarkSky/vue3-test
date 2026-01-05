<route>
    {
        "name": "WheelGame4",
        "meta": {
            "title": "Phaser 輪盤遊戲4",
            "i18n": "page.wheelGame4.title",
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
    import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { AUTO } from 'phaser';
    import { storeToRefs } from 'pinia';
    // Stores
    import { useMainStore } from '@/stores/mainStore';
    // Games
    import WheelScene from '@/games/WheelScene4';
    // Models
    import type { WheelConfig, WheelPrize } from '@/models/IWheelGameModel';

    /*
       i18n
    */
    const { t } = useI18n();

    /*
        store
    */
    const { baseUrl } = storeToRefs(useMainStore());

    // 遊戲圖片
    // const gameImg: Record<string, string> = {
    //     backgroundImg01: `${ baseUrl.value }images/game/wheel/Backgrund1.png`,
    //     backgroundImg02: `${ baseUrl.value }images/game/wheel/Backgrund2.png`,
    //     pointer        : `${ baseUrl.value }images/game/wheel/pointer.png`,
    //     inner          : `${ baseUrl.value }images/game/wheel/inner.png`,
    // };

    const gameInstance = ref<Phaser.Game | null>();

    const gameContainerRef = useTemplateRef<HTMLElement>('gameContainerRef');

    // 模擬從 Server 取得的資料
    const prizeItems = ref<WheelPrize[]>([
        { label: '紅色', color: 0xff4d4d },
        { label: '橙色', color: 0xffa64d },
        { label: '黃色', color: 0xffff66 },
        { label: '綠色', color: 0x80ff80 },
        { label: '藍色', color: 0x4da6ff },
        { label: '紫色', color: 0xb366ff },
        { label: '粉紅', color: 0xff80bf },
        { label: '灰色', color: 0xcccccc },
    ]);

    const wheelConfig = computed<WheelConfig>(() => ({
        prizes: prizeItems.value,
        images: {
            inner          : `${ baseUrl.value }images/game/wheel/inner.png`,
            backgroundImg01: `${ baseUrl.value }images/game/wheel/Backgrund1.png`,
            backgroundImg02: `${ baseUrl.value }images/game/wheel/Backgrund2.png`,
            pointer        : `${ baseUrl.value }images/game/wheel/pointer.png`,
            treasure       : `${ baseUrl.value }images/game/wheel/treasure_chest.png`,
        },
        sounds: {
            tick: `${ baseUrl.value }audios/run.mp3`,
            end : `${ baseUrl.value }audios/stop.mp3`,
        },
        alignMode: 'natural',
    }));

    // function
    const handleStopSpin = (): void => {
        if (gameInstance.value) {
            const scene = gameInstance.value.scene.getScene('WheelScene') as WheelScene;
            const randomIndex = Math.floor(Math.random() * prizeItems.value.length);
            // scene.startSpin(randomIndex);  // ✅ 傳入隨機目標索引
            scene.startSpinBounce(randomIndex);
        }
    };

    // function
    const handlePrizeResult = (prize: any, index: number) => {
        console.log('中獎:', prize.label);
        // 更新 Vue 狀態
    };

    /*
        lifecycle
    */
    onMounted(() => {
        if (gameContainerRef.value) {
            const gameConfig: Phaser.Types.Core.GameConfig = {
                type       : AUTO,
                width      : 500,
                height     : 500,
                parent     : gameContainerRef.value,
                transparent: true,
                scene      : [new WheelScene(wheelConfig.value)],
            };

            gameInstance.value = new Phaser.Game(gameConfig);

            // 等待 Scene 準備就緒
            gameInstance.value.events.once('ready', () => {
                const scene = gameInstance.value?.scene.getScene('WheelScene') as WheelScene;

                scene.setOnSpinComplete(handlePrizeResult);
            });
        }
    });

    onBeforeUnmount(() => {
        if (gameInstance.value) {
            gameInstance.value.destroy(true);

            gameInstance.value = null;
        }
    });
</script>

<template>
    <div class="flex justify-around w:full">
        <button type="button"
                class="p:10px bg:#fff cursor:pointer fg:#000 h:60 user-select:none"
                @click="handleStopSpin">
            {{ t('common.btn.start') }}
        </button>

        <div ref="gameContainerRef"
             class="p:10 game-container">
             <!-- Game content will be rendered here -->
        </div>
    </div>
</template>
