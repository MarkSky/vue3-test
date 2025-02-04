<route>
    {
        "name": "About",
        "meta": {
            "title": "關於我們",
            "i18n": "page.about.title",
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
        {{ t('page.about.title') }}
    </section>
</template>
