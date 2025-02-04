<script setup lang="ts">
    /*
        import
    */
    // Composables
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';

    /*
        i18n
    */
    //
    const { t } = useI18n();

    //
    const displayData = ref<string[] | null>(null);

    const getApiValue = (): Promise<string[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(['item1', 'item2', 'item3']);
            }, 5000);
        });
    };

    displayData.value = await getApiValue();
</script>

<template>
    <section class="flex ai:center flex:col">
        <template v-if="displayData && displayData.length > 0">
            <div v-for="(item, index) in displayData"
                 :key="index">
                {{ item }}
            </div>
        </template>
        <template v-else>
            {{ t('common.column.noData') }}
        </template>
    </section>
</template>
