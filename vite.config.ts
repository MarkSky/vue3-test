import { fileURLToPath, URL } from 'node:url';

import { defineConfig, PluginOption, ServerOptions } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import VueRouter from 'unplugin-vue-router/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import path from 'node:path';

// https://vite.dev/config/
// export default defineConfig({
//     plugins: [
//         VueRouter(),
//         vue(),
//         VueI18nPlugin({
//             include: path.resolve(__dirname, 'src/locales/**'),
//         }),
//         vueDevTools(),
//         basicSsl(),
//     ],
//     resolve: {
//         alias: {
//             '@': fileURLToPath(new URL('./src', import.meta.url)),
//         },
//     },
//     define: {
//         __API_URL__: JSON.stringify('https://localhost:58845'),
//     },
//     server: {
//         host: true,
//     },
// });

export default defineConfig(({ mode }) => {
    console.log(mode);

    const plugins: PluginOption[] = [
        VueRouter(),
        vue(),
        VueI18nPlugin({
            include: path.resolve(__dirname, 'src/locales/**'),
        }),
        vueDevTools(),
        basicSsl(),
    ];

    const resolve = {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    };

    const define = {
        __API_URL__: JSON.stringify('https://localhost:58845'),
    };

    const server: ServerOptions = {
        host: true,
    };

    return {
        plugins,
        resolve,
        define,
        server,
    };
});
