<script setup lang="ts">
    /*
       import
    */
    // Components
    import type { Component } from 'vue';
    import CSSRuntimeProvider from '@master/css.vue';
    import ErrorBoundary from '@/components/ErrorBoundary.vue';
    // Utils
    import layoutMapping from './utils/layoutMapping';
    // Styles
    import masterCSSConfig from '../master.css';

    // function
    const getTransitionName = (transition: unknown): string => {
        return typeof transition === 'string' ? transition : 'default';
    };

    // function
    const getLayoutName = (layout: unknown): Component => {
        const layoutKey = typeof layout === 'string' ? layout : 'default';

        return layoutMapping[layoutKey] || layoutMapping['default'];
    };
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
