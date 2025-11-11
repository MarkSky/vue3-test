// Utilities
import type { Component } from 'vue';
// Components
import DefaultLayout from '@/layouts/default.vue';

// 讀取 layouts 資料夾內所有 .vue 組件
const modules = import.meta.glob('@/layouts/*.vue', { eager: true }) as Record<
    string,
    { default?: Component } | undefined
>;

// 建立 mapping，key 為檔名小寫（可依需求去掉 Layout 字串）
const layoutMapping: Record<string, Component> = {};

// 將 DefaultLayout 先放進 mapping，保證 fallback
layoutMapping['default'] = DefaultLayout;

// 將所有 layout 加入 mapping
// 將所有 layout 加入 mapping
for (const path in modules) {
    const mod = modules[path];
    if (!mod?.default) continue;

    const fileName = path.split('/').pop() || '';
    // 自動去掉 Layout 字串，並轉小寫
    const key = fileName.replace(/Layout\.vue$/i, '').toLowerCase(); // "DefaultLayout.vue" -> "default"
    layoutMapping[key] = mod.default;
}

/**
 * 取得 layout 組件
 * @param layout layout 名稱，或任何值（會 fallback default）
 * @returns Component 組件
 */
export const getLayoutComponent = (layout: unknown): Component => {
    if (typeof layout === 'string') {
        const key = layout.toLowerCase();
        return layoutMapping[key] ?? DefaultLayout;
    }

    return DefaultLayout;
};

export default layoutMapping;
