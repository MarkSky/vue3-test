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
    <div class="f:bold fg:#ffffff">
        {{ t('common.column.loading') }}
    </div>
</template>
