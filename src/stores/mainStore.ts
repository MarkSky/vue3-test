// Utilities
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        appTemplateType: 'default',
    }),

    getters: {},

    actions: {

    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
