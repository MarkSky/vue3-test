<script setup lang="ts">
    /*
       import
    */
    // Components
    import CSSRuntimeProvider from '@master/css.vue';
    // Styles
    import masterCSSConfig from '../master.css';
</script>

<template>
    <CSSRuntimeProvider :config="masterCSSConfig">
        <RouterView />
    </CSSRuntimeProvider>
</template>
