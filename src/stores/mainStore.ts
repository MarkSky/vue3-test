// Utilities
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

// export const useMainStore = defineStore('mainStore', {
//     state: () => ({
//         baseUrl        : import.meta.env.BASE_URL, // 網站起始路徑
//         appTemplateType: 'default',
//         apiUrl         : __API_URL__,
//         windowWidth    : 0,
//     }),

//     getters: {},

//     actions: {

//     },
// });
export const useMainStore = defineStore('mainStore', () => {
    const baseUrl = ref<string>(import.meta.env.BASE_URL); // 網站起始路徑
    const appTemplateType = ref<string>('default');
    const apiUrl = ref<string>(__API_URL__);
    const windowWidth = ref<number>(0);

    return {
        baseUrl,
        appTemplateType,
        apiUrl,
        windowWidth,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
