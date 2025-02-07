<route>
    {
        "name": "404",
        "meta": {
            "title": "404",
            "i18n": "page.notFound.title",
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
        {{ t('page.notFound.column.info') }}
    </section>
</template>
