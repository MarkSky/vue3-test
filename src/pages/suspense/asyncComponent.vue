<route>
    {
        "name": "SuspenseAsyncComponent",
        "meta": {
            "title": "Suspense 異步載入元件 測試",
            "i18n": "page.suspenseAsyncComponent.title",
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
    import { defineAsyncComponent } from 'vue';
    // Components
    // import AsyncData from '@/components/AsyncData.vue';
    import LoadingBox from '@/components/LoadingBox.vue';

    const AsyncData = defineAsyncComponent(() => import('@/components/AsyncData.vue'));
</script>

<template>
    <div>
        <Suspense>
            <template #default>
                <AsyncData />
            </template>

            <template #fallback>
                <LoadingBox />
            </template>
        </Suspense>
    </div>
</template>
