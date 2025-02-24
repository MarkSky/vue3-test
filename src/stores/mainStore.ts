// Utilities
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        appTemplateType: 'default',
        apiUrl         : __API_URL__,
        windowWidth    : 0,
    }),

    getters: {},

    actions: {

    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
