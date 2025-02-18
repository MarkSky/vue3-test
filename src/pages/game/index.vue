<route>
    {
        "name": "Game",
        "meta": {
            "title": "遊戲",
            "i18n": "page.game.title",
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
    import { useI18n } from 'vue-i18n';

    /*
        i18n
    */
    //
    const { t } = useI18n();
</script>

<template>
    <div class="flex ai:center flex:col pt:20 w:full">
        <h1 class="f:20 f:bold fg:#ffffff flex:0|0|auto jc:center mb:4 mx:auto">
            {{ t('page.game.title') }}
        </h1>

        <nav class="flex ai:center">
            <RouterLink :to="{ name: 'PhaserGame' }"
                        class="fg:#ffffff:hover">
                {{ t('page.game.phaserGame.title') }}
            </RouterLink>
        </nav>
    </div>
</template>
