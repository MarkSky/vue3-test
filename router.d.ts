import 'vue-router';

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export { };

declare module 'vue-router' {
    interface RouteMeta {
        title     : string; // 頁面標題
        i18n      : string; // i18n key
        transition: string; // 頁面轉場
        authorize : boolean; // 是否需要驗證
    }
}
