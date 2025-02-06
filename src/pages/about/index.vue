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
    <section class="flex ai:center f:20 f:bold fg:#ffffff jc:center mx:auto">
        <h1>
            {{ t('page.about.title') }}
        </h1>
    </section>
</template>
