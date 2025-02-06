<script setup lang="ts">
    /*
       import
    */
    // Components
    import CSSRuntimeProvider from '@master/css.vue';
    import ErrorBoundary from '@/components/ErrorBoundary.vue';
    // Styles
    import masterCSSConfig from '../master.css';

    // function
    const getTransitionName = (transition: unknown): string => {
        return typeof transition === 'string' ? transition : 'default';
    };
</script>

<template>
    <ErrorBoundary>
        <CSSRuntimeProvider :config="masterCSSConfig">
            <RouterView v-slot="{ Component, route }">
                <Transition :name="getTransitionName(route.meta.transition)">
                    <component :is="Component" />
                </Transition>
                <!-- <Transition name="default">
                <component :is="Component" />
            </Transition> -->
            </RouterView>
        </CSSRuntimeProvider>
    </ErrorBoundary>
</template>
