<route>
    {
        "name": "Suspense",
        "meta": {
            "title": "Suspense 測試",
            "i18n": "page.suspense.title",
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
    import { useI18n } from 'vue-i18n';

    /*
        i18n
    */
    //
    const { t } = useI18n();
</script>

<template>
    <nav class="flex ai:center">
        <RouterLink :to="{ name: 'SuspenseAsyncData'}">
            {{ t('page.suspenseAsyncData.title') }}
        </RouterLink>

        <RouterLink :to="{ name: 'SuspenseAsyncComponent'}">
            {{ t('page.suspenseAsyncComponent.title') }}
        </RouterLink>
    </nav>
</template>

<style scoped>
    nav {
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
        width: 100%;
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

    @media (width >=1024px) {
        nav {
            font-size: 1rem;
            text-align: left;
            margin-top: 1rem;
            margin-left: -1rem;
            padding: 1rem 0;
        }
    }
</style>
