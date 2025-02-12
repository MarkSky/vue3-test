<route>
    {
        "name": "InSuspense",
        "meta": {
            "title": "在Suspense內動態載入元件 測試",
            "i18n": "page.inSuspense.title",
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
    // Components
    import LoadingBox from '@/components/LoadingBox.vue';
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
    <section>
        <Suspense>
            <mainComponent />

            <template #fallback>
                <LoadingBox />
            </template>
        </Suspense>
    </section>
</template>
