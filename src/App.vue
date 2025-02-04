<script setup lang="ts">
    /*
       import
    */
    // Components
    import { CSSRuntimeProvider } from '@master/css.vue';
    // Styles
    import masterCSSConfig from '../master.css';
</script>

<template>
    <CSSRuntimeProvider :config="masterCSSConfig">
        <RouterView />
    </CSSRuntimeProvider>
</template>

<style scoped>
    header {
        line-height: 1.5;
        max-height: 100vh;
    }

    .logo {
        display: block;
        margin: 0 auto 2rem;
    }

    nav {
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
        width: 100%;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
        background-color: transparent;
    }

    nav a {
        border-left: 1px solid var(--color-border);
        display: inline-block;
        padding: 0 1rem;
    }

    nav a:first-of-type {
        border: 0;
    }

    @media (width >= 1024px) {
        header {
            display: flex;
            place-items: center;
            padding-right: calc(var(--section-gap) / 2);
        }

        .logo {
            margin: 0 2rem 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }

        nav {
            font-size: 1rem;
            text-align: left;
            margin-top: 1rem;
            margin-left: -1rem;
            padding: 1rem 0;
        }
    }
</style>
