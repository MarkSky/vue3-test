<route>
    {
        "name": "DefaultDynamicComponent",
        "meta": {
            "title": "純動態載入元件 測試",
            "i18n": "page.defaultDynamicComponent.title",
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
    import { computed, defineAsyncComponent, onMounted, type Component } from 'vue';
    import { storeToRefs } from 'pinia';
    // Stores
    import { useMainStore } from '@/stores/mainStore';
    // Connect
    import { request } from '@/apis/connect';
    // Models
    import type { IWebSettingsModel } from '@/models/IWebSettingsModel';

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

    /*
       lifecycle
    */
    onMounted(async () => {
        try {
            const apiUrl = 'getWebSettings';

            const response = await request<IWebSettingsModel>('get', apiUrl, undefined);

            if (response) {
                setTimeout(() => {
                    appTemplateType.value = response.appTemplateType;
                }, 1000);
            }
        } catch (error) {
            console.error(error);
        }
    });
</script>

<template>
    <mainComponent />
</template>
