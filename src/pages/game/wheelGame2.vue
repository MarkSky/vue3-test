<route>
    {
        "name": "WheelGame2",
        "meta": {
            "title": "Phaser 輪盤遊戲2",
            "i18n": "page.wheelGame2.title",
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
    import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { AUTO } from 'phaser';
    // Games
    import WheelScene from '@/games/WheelScene2';

    /*
       i18n
    */
    const { t } = useI18n();

    const gameInstance = ref<Phaser.Game | null>();

    const gameContainerRef = useTemplateRef<HTMLElement>('gameContainerRef');

    // 模擬從 Server 取得的資料
    const prizeItems = ref([
        { label: '紅色', color: 0xff4d4d },
        { label: '橙色', color: 0xffa64d },
        { label: '黃色', color: 0xffff66 },
        { label: '綠色', color: 0x80ff80 },
        { label: '藍色', color: 0x4da6ff },
        { label: '紫色', color: 0xb366ff },
        { label: '粉紅', color: 0xff80bf },
        { label: '灰色', color: 0xcccccc },
    ]);

    // function
    const handleStopSpin = (): void => {
        if (gameInstance.value) {
            const scene = gameInstance.value.scene.getScene('WheelScene') as WheelScene;
            const randomIndex = Math.floor(Math.random() * prizeItems.value.length);
            scene.startSpin(randomIndex);  // ✅ 傳入隨機目標索引
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
                type           : AUTO,
                width          : 500,
                height         : 500,
                parent         : gameContainerRef.value,
                backgroundColor: '#ffffff',
                scene          : [new WheelScene(prizeItems.value)],
            };

            gameInstance.value = new Phaser.Game(gameConfig);

            const scene = gameInstance.value.scene.getScene('WheelScene') as WheelScene;

            scene.setOnSpinComplete(handlePrizeResult);
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
