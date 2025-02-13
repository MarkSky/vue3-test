// Utilities
import type { DefineComponent } from 'vue';

const modules = import.meta.glob('@/layouts/*.vue', { eager: true }) as Record<string, { default: DefineComponent<object, object, unknown> }>;
const layoutMapping: Record<string, DefineComponent<object, object, unknown>> = {};

for (const path in modules) {
    // 取得模組預設匯出（組件）
    const component: DefineComponent<object, object, unknown> = modules[path].default;
    // 以檔名作為 mapping key，例如 DefaultLayout.vue => defaultlayout 或做些轉換
    const fileName = path.split('/').pop() || '';
    // 可依需求轉換成小寫，或去除 "Layout" 字串，例如：
    const key = fileName.replace(/\.vue$/, '').toLowerCase(); // "default", "admin", "third"
    layoutMapping[key] = component;
    console.log(layoutMapping);
}

export default layoutMapping;
