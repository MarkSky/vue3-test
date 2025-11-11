<script setup lang="ts">
    /*
       import
    */
    // Composables
    import { computed, onMounted, type Component } from 'vue';
    import { useRoute } from 'vue-router';
    import CSSRuntimeProvider from '@master/css.vue';
    import { storeToRefs } from 'pinia';
    // Stores
    import { useMainStore } from '@/stores/mainStore';
    // Components
    import ErrorBoundary from '@/components/ErrorBoundary.vue';
    // Utils
    import { getLayoutComponent } from '@/utils/layoutMapping';
    // Styles
    import masterCSSConfig from '../master.css';

    /*
        route
    */
    const route = useRoute();

    /*
        Stores
    */
    const { windowWidth } = storeToRefs(useMainStore());

    // 當 route 改變時，自動取得 layout 組件
    const layout = computed<Component>(() => getLayoutComponent(route.meta.layout));

    // function
    const getTransitionName = (transition: unknown): string => {
        return typeof transition === 'string' ? transition : 'default';
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
            <component :is="layout">
                <RouterView v-slot="{ Component, route }">
                    <Transition :name="getTransitionName(route.meta.transition)">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </component>
        </CSSRuntimeProvider>
    </ErrorBoundary>
</template>
