<script setup lang="ts">
    /*
        import
    */
    // Composables
    import { onErrorCaptured, shallowRef, type ComponentPublicInstance } from 'vue';
    // Components
    import ErrorContent from '@/components/ErrorContent.vue';

    //
    const hasError = shallowRef<boolean>(false);

    /*
       lifecycle
    */
    onErrorCaptured((error: Error, instance: ComponentPublicInstance | null, info: string) => {
        console.error('Get error from error boundary:', error, instance, info);

        hasError.value = true;
    });
</script>

<template>
    <slot v-if="!hasError"></slot>
    <ErrorContent v-else />
</template>
