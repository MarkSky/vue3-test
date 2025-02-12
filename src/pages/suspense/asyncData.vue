<route>
    {
        "name": "SuspenseAsyncData",
        "meta": {
            "title": "Suspense 異步載入資料 測試",
            "i18n": "page.suspenseAsyncData.title",
            "transition": "default",
            "authorize": false
        }
    }
</route>

<script setup lang="ts">
    /*
        import
    */
    // Components
    import AsyncData from '@/components/AsyncData.vue';
    import LoadingBox from '@/components/LoadingBox.vue';
</script>

<template>
    <div class="contents">
        <Suspense>
            <AsyncData />

            <template #fallback>
                <LoadingBox />
            </template>
        </Suspense>
    </div>
</template>
