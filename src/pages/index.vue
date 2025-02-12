<route>
    {
        "name": "Home",
        "meta": {
            "title": "首頁",
            "i18n": "page.home.title",
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
    <section>
        {{ t('page.home.title') }}
    </section>
</template>
