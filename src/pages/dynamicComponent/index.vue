<route>
    {
        "name": "DynamicComponent",
        "meta": {
            "title": "動態載入元件 測試",
            "i18n": "page.dynamicComponent.title",
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
    import { computed, defineAsyncComponent, type Component } from 'vue';
    import { storeToRefs } from 'pinia';
    // Stores
    import { useMainStore } from '@/stores/mainStore';

    /*
        Store
    */
    // Main Store
    const { appTemplateType } = storeToRefs(useMainStore());

    //
    const mainComponent = computed<Component>(() => {
        return appTemplateType.value === 'typeA'
            ? defineAsyncComponent(() => import('@/components/DynamicA.vue'))
            : defineAsyncComponent(() => import('@/components/DynamicB.vue'));
    });
</script>

<template>
    <mainComponent />
</template>
