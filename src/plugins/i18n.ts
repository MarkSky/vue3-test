/**
 * plugins/i18n.ts
 *
 * Vue I18n documentation: https://vue-i18n.intlify.dev/
 */
// 載入語系功能
import { createI18n } from 'vue-i18n';

// 載入語系
import messages from '@intlify/unplugin-vue-i18n/messages';

// 建立 i18n 實體
export default createI18n({
    legacy         : false,
    locale         : localStorage.getItem('language') ?? 'zh-TW',
    globalInjection: true,
    messages,
});
