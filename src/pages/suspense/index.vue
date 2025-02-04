<route>
    {
        "name": "Suspense",
        "meta": {
            "title": "Suspense 測試",
            "i18n": "page.suspense.title",
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
    <nav class="flex ai:center">
        <RouterLink :to="{ name: 'SuspenseAsyncData'}">
            {{ t('page.suspenseAsyncData.title') }}
        </RouterLink>

        <RouterLink :to="{ name: 'SuspenseAsyncComponent'}">
            {{ t('page.suspenseAsyncComponent.title') }}
        </RouterLink>
    </nav>
</template>
