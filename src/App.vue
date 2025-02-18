<script setup lang="ts">
    /*
       import
    */
    // Composables
    import { onMounted, type Component } from 'vue';
    import CSSRuntimeProvider from '@master/css.vue';
    import { storeToRefs } from 'pinia';
    // Stores
    import { useMainStore } from '@/stores/mainStore';
    // Components
    import ErrorBoundary from '@/components/ErrorBoundary.vue';
    // Utils
    import layoutMapping from './utils/layoutMapping';
    // Styles
    import masterCSSConfig from '../master.css';

    /*
        Stores
    */
    const { windowWidth } = storeToRefs(useMainStore());

    // function
    const getTransitionName = (transition: unknown): string => {
        return typeof transition === 'string' ? transition : 'default';
    };

    // function
    const getLayoutName = (layout: unknown): Component => {
        const layoutKey = typeof layout === 'string' ? layout : 'default';

        return layoutMapping[layoutKey] || layoutMapping['default'];
    };

    /*
        lifecycle
    */
    onMounted(() => {
        // 取得瀏覽器的Width
        if (window.visualViewport) {
            // 如果支持 visualViewport，優先使用
            windowWidth.value = window.visualViewport.width;
        } else {
            // 回退到 innerWidth 和 innerHeight
            windowWidth.value = window.innerWidth;
        }
    });
</script>

<template>
    <ErrorBoundary>
        <CSSRuntimeProvider :config="masterCSSConfig">
            <RouterView v-slot="{ Component, route }">
                <component :is="getLayoutName(route.meta.layout)">
                    <Transition :name="getTransitionName(route.meta.transition)">
                        <component :is="Component" />
                    </Transition>
                </component>
            </RouterView>
        </CSSRuntimeProvider>
    </ErrorBoundary>
</template>
