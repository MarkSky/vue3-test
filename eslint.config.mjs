// import "@rushstack/eslint-patch/modern-module-resolution.js";
import eslint from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import htmlEslint from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import html from 'eslint-plugin-html';
import tsEslint from 'typescript-eslint';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import masterCss from '@master/eslint-config-css';
import pluginVue from 'eslint-plugin-vue';
// import vueTsEslintConfig from '@vue/eslint-config-typescript';
import vueParser from 'vue-eslint-parser';
import vueI18n from '@intlify/eslint-plugin-vue-i18n';
import jsonEslint from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import pluginVitest from '@vitest/eslint-plugin';
import pluginPlaywright from 'eslint-plugin-playwright';
// import oxlint from 'eslint-plugin-oxlint';
// import { FlatCompat } from "@eslint/eslintrc";

// const compat = new FlatCompat();

export default [
    {
        name   : 'app/files-to-ignore',
        ignores: [
            '**/dist/**',
            '**/dist-ssr/**',
            '**/coverage/**',
            '**/node_modules/**',
            '**/.vscode/**',
            '**/ios/**',
        ],
    },
    masterCss,
    stylistic.configs.recommended,
    {
        name   : 'app/all-files-to-lint',
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@master/css/class-order'     : 'warn',
            '@master/css/class-validation': 'error',
            '@master/css/class-collision' : 'warn',
            '@stylistic/brace-style'      : ['error', '1tbs', { allowSingleLine: true }],
            '@stylistic/indent'           : [
                'error',
                4,
                {
                    SwitchCase         : 1,
                    FunctionDeclaration: { parameters: 'first' },
                    CallExpression     : { arguments: 'first' },
                    ArrayExpression    : 'first',
                    ObjectExpression   : 'first',
                    ImportDeclaration  : 'first',
                },
            ],
            '@stylistic/indent-binary-ops'     : ['error', 4],
            '@stylistic/key-spacing'           : ['error', { beforeColon: false, afterColon: true, align: 'colon' }],
            '@stylistic/member-delimiter-style': ['error', {
                multiline         : { delimiter: 'semi', requireLast: true },
                singleline        : { delimiter: 'semi', requireLast: false },
                multilineDetection: 'brackets',
                overrides         : {
                    interface: {
                        multiline : { delimiter: 'semi', requireLast: true },
                        singleline: { delimiter: 'comma', requireLast: false },
                    },
                },
            }],
            '@stylistic/no-multi-spaces'       : ['error', { ignoreEOLComments: true, exceptions: { ImportDeclaration: true, Property: true, VariableDeclarator: true } }],
            '@stylistic/semi'                  : ['error', 'always'],
            '@stylistic/template-curly-spacing': ['error', 'always'],
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2015,
                __statics   : 'readonly',
                Capacitor   : 'readonly',
                chrome      : 'readonly',
                cordova     : 'readonly',
                defineEmits : 'readonly',
                defineExpose: 'readonly',
                definePage  : 'readonly',
                defineProps : 'readonly',
                ga          : 'readonly', // Google Analytics
                process     : 'readonly',
                withDefaults: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: {
                    // jsx: true,
                },
            },
        },
    },
    {
        ...htmlEslint.configs['flat/recommended'],
        name   : 'app/html-files-to-lint',
        files  : ['*.html', '**/*.html'],
        plugins: {
            '@html-eslint': htmlEslint,
            '@stylistic'  : stylistic,
            html,
        },
        rules: {
            ...htmlEslint.configs['flat/recommended'].rules,
            '@html-eslint/attrs-newline'         : 'off',
            '@html-eslint/indent'                : 'off',
            '@html-eslint/no-extra-spacing-attrs': ['error', { enforceBeforeSelfClose: true }],
            '@html-eslint/require-closing-tags'  : ['error', { selfClosing: 'always' }],
            '@stylistic/spaced-comment'          : 'off',
        },
        languageOptions: {
            parser       : htmlParser,
            parserOptions: {
                templateEngineSyntax: { // here
                    '{{': '}}',
                },
            },
        },
    },
    {
        ...css.configs.recommended,
        name    : 'app/css-files-to-lint',
        files   : ['**/*.css'],
        plugins : { css },
        language: 'css/css',
    },
    {
        ...jsonEslint.configs.recommended,
        name   : 'app/json-files-to-lint',
        files  : ['*.json', '**/*.json'],
        ignores: ['*.md', '**/*.md', 'package-lock.json'],
        plugins: {
            '@stylistic': stylistic,
            'json'      : jsonEslint,
        },
        language: 'json/json',
        rules   : {
            'no-irregular-whitespace': 'off',
            '@stylistic/indent'      : 'off',
        },
    },
    {
        ...jsonEslint.configs.recommended,
        name   : 'app/jsonc-files-to-lint',
        files  : ['*.jsonc', '**/*.jsonc'],
        plugins: {
            '@stylistic': stylistic,
            'json'      : jsonEslint,
        },
        language: 'json/jsonc',
        rules   : {
            '@stylistic/indent': 'off',
        },
    },
    {
        ...jsonEslint.configs.recommended,
        name   : 'app/json5-files-to-lint',
        files  : ['*.json5', '**/*.json5'],
        plugins: {
            '@stylistic': stylistic,
            'json'      : jsonEslint,
        },
        language: 'json/json5',
        rules   : {
            '@stylistic/indent': 'off',
        },
    },
    {
        name   : 'app/markdown-files-to-lint',
        files  : ['*.md', '**/*.md'],
        ignores: ['*.vue', '**/*.vue'],
        plugins: {
            '@stylistic': stylistic,
            markdown,
        },
        language: 'markdown/commonmark',
        rules   : {
            '@stylistic/indent'      : 'off',
            'markdown/no-html'       : 'error',
            'no-irregular-whitespace': 'off',
        },
    },
    {
        ...eslint.configs.recommended,
        name   : 'app/javascript-files-to-lint',
        files  : ['*.{js,jsx,mjs,mjsx,cjs,cjsx}', '**/*.{js,jsx,mjs,mjsx,cjs,cjsx}'],
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            ...eslint.configs.recommended.rules,
            // eslint:recommended
            // "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
            // Suggestions
            // 'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['info', 'warn', 'error'] }] : 'off',
            '@stylistic/arrow-spacing'       : 'error',
            '@stylistic/comma-spacing'       : ['error', { before: false, after: true }],
            '@stylistic/keyword-spacing'     : ['error', { before: true, after: true }],
            '@stylistic/multiline-ternary'   : ['error', 'always-multiline'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/quotes'              : ['error', 'single'],
            '@stylistic/semi-spacing'        : ['error', { before: false, after: true }],
            '@stylistic/semi-style'          : ['error', 'last'],
            '@stylistic/space-before-blocks' : 'error',
            '@stylistic/space-in-parens'     : ['error', 'never'],
            '@stylistic/space-infix-ops'     : ['error', { int32Hint: false }],
            '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
            '@stylistic/template-tag-spacing': ['error', 'always'],
            'prefer-arrow-callback'          : 'error',
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType : 'module',
            },
        },
    },
    {
        name   : 'app/typescript-files-without-declare-to-lint',
        files  : ['*.{ts,tsx,mts,mtsx,cts,ctsx}', '**/*.{ts,tsx,mts,mtsx,cts,ctsx}'],
        ignores: ['*.d.ts', '**/*.d.ts'],
        plugins: {
            '@stylistic'        : stylistic,
            '@typescript-eslint': tsEslintPlugin,
        },
        rules: {
            ...tsEslint.configs.strictTypeChecked.rules,
            ...tsEslint.configs.stylisticTypeChecked.rules,
            '@stylistic/arrow-spacing'                : 'error',
            '@stylistic/comma-spacing'                : ['error', { before: false, after: true }],
            '@stylistic/keyword-spacing'              : ['error', { before: true, after: true }],
            '@stylistic/multiline-ternary'            : ['error', 'always-multiline'],
            '@stylistic/no-multi-spaces'              : 'off',
            '@stylistic/object-curly-spacing'         : ['error', 'always'],
            '@stylistic/quotes'                       : ['error', 'single'],
            '@stylistic/space-before-blocks'          : 'error',
            '@stylistic/space-in-parens'              : ['error', 'never'],
            '@stylistic/space-infix-ops'              : ['error', { int32Hint: false }],
            '@stylistic/space-unary-ops'              : 'error',
            '@stylistic/switch-colon-spacing'         : ['error', { after: true, before: false }],
            '@stylistic/type-annotation-spacing'      : 'off',
            '@stylistic/type-generic-spacing'         : 'error',
            // turns a rule on with no configuration (i.e. uses the default configuration)
            '@typescript-eslint/array-type'           : ['error', { default: 'array' }],
            // turns on a rule with configuration
            '@typescript-eslint/no-explicit-any'      : ['warn', { ignoreRestArgs: true }],
            '@typescript-eslint/no-empty-function'    : ['error', { allow: [] }],
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
        },
        languageOptions: {
            ...tsEslint.configs.strictTypeChecked.languageOptions,
            parser       : tsParser,
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['./*.ts'],
                    defaultProject     : './tsconfig.eslint.json',
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        name   : 'app/declare-files-to-lint',
        files  : ['*.d.ts', '**/*.d.ts', 'router.d.ts'],
        plugins: {
            '@stylistic'        : stylistic,
            '@typescript-eslint': tsEslintPlugin,
        },
        rules: {
            ...tsEslint.configs.strictTypeChecked.rules,
            ...tsEslint.configs.stylisticTypeChecked.rules,
            '@stylistic/arrow-spacing'         : 'error',
            '@stylistic/comma-spacing'         : ['error', { before: false, after: true }],
            '@stylistic/keyword-spacing'       : ['error', { before: true, after: true }],
            '@stylistic/member-delimiter-style': ['error', {
                multiline         : { delimiter: 'semi', requireLast: true },
                singleline        : { delimiter: 'semi', requireLast: false },
                multilineDetection: 'brackets',
                overrides         : {
                    interface: {
                        multiline : { delimiter: 'semi', requireLast: true },
                        singleline: { delimiter: 'comma', requireLast: false },
                    },
                },
            }],
            '@stylistic/multiline-ternary'      : ['error', 'always-multiline'],
            '@stylistic/no-multi-spaces'        : 'off',
            '@stylistic/object-curly-spacing'   : ['error', 'always'],
            '@stylistic/quotes'                 : ['error', 'single'],
            '@stylistic/semi'                   : ['error', 'always'],
            '@stylistic/space-before-blocks'    : 'error',
            '@stylistic/space-infix-ops'        : ['error', { int32Hint: false }],
            '@stylistic/space-unary-ops'        : 'error',
            '@stylistic/switch-colon-spacing'   : ['error', { after: true, before: false }],
            '@stylistic/type-annotation-spacing': 'off',
            '@stylistic/type-generic-spacing'   : 'error',
            '@typescript-eslint/unbound-method' : 'off',
        },
        languageOptions: {
            ...tsEslint.configs.strictTypeChecked.languageOptions,
            parser       : tsParser,
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['./*.ts'],
                    defaultProject     : './tsconfig.eslint.json',
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        name   : 'app/directives-files-to-lint',
        files  : ['src/directives/*.ts', 'src/directives/**/*.ts'],
        plugins: {
            '@intlify/vue-i18n' : vueI18n,
            '@stylistic'        : stylistic,
            '@typescript-eslint': tsEslintPlugin,
        },
        settings: {
            'vue-i18n': {
                localeDir           : 'src/locales/*.{json,json5,yaml,yml}',
                messageSyntaxVersion: '^11.1.5',
            },
        },
        rules: {
            ...tsEslint.configs.strictTypeChecked.rules,
            ...tsEslint.configs.stylisticTypeChecked.rules,
            '@stylistic/arrow-spacing'          : 'error',
            '@stylistic/comma-spacing'          : ['error', { before: false, after: true }],
            '@stylistic/keyword-spacing'        : ['error', { before: true, after: true }],
            '@stylistic/multiline-ternary'      : ['error', 'always-multiline'],
            '@stylistic/no-multi-spaces'        : 'off',
            '@stylistic/object-curly-spacing'   : ['error', 'always'],
            '@stylistic/quotes'                 : ['error', 'single'],
            '@stylistic/space-before-blocks'    : 'error',
            '@stylistic/space-infix-ops'        : ['error', { int32Hint: false }],
            '@stylistic/space-unary-ops'        : 'error',
            '@stylistic/switch-colon-spacing'   : ['error', { after: true, before: false }],
            '@stylistic/type-annotation-spacing': 'off',
            '@stylistic/type-generic-spacing'   : 'error',
            '@typescript-eslint/array-type'     : ['error', { default: 'array' }],
        },
        languageOptions: {
            parser       : vueParser,
            parserOptions: {
                parser     : tsParser,
                project    : './tsconfig.eslint.json',
                ecmaVersion: 2020,
                sourceType : 'module',
            },
        },
    },
    {
        name   : 'app/component-files-to-lint',
        files  : ['*.vue', '**/*.vue'],
        plugins: {
            '@intlify/vue-i18n': vueI18n,
            '@stylistic'       : stylistic,
            'vue'              : pluginVue,
        },
        settings: {
            'vue-i18n': {
                localeDir           : 'src/locales/*.{json,json5,yaml,yml}',
                messageSyntaxVersion: '^11.1.5',
            },
        },
        rules: {
            ...pluginVue.configs['flat/recommended'].rules,
            '@intlify/vue-i18n/no-raw-text'              : ['error', { ignorePattern: '^[-~#:()&/]+$' }],
            '@stylistic/arrow-spacing'                   : 'error',
            '@stylistic/comma-spacing'                   : ['error', { before: false, after: true }],
            '@stylistic/indent'                          : 'off',
            '@stylistic/keyword-spacing'                 : ['error', { before: true, after: true }],
            '@stylistic/multiline-ternary'               : ['error', 'always-multiline'],
            '@stylistic/no-multi-spaces'                 : 'off',
            '@stylistic/object-curly-spacing'            : ['error', 'always'],
            '@stylistic/quotes'                          : ['error', 'single'],
            '@stylistic/space-before-blocks'             : 'error',
            '@stylistic/space-in-parens'                 : ['error', 'never'],
            '@stylistic/space-infix-ops'                 : ['error', { int32Hint: false }],
            '@stylistic/space-unary-ops'                 : 'error',
            '@stylistic/switch-colon-spacing'            : ['error', { after: true, before: false }],
            '@stylistic/type-annotation-spacing'         : 'off',
            '@typescript-eslint/unbound-method'          : 'off',
            'vue/block-tag-newline'                      : 'error',
            'vue/comma-spacing'                          : ['error', { before: false, after: true }],
            'vue/multiline-html-element-content-newline' : 'error',
            'vue/first-attribute-linebreak'              : ['error', { singleline: 'beside', multiline: 'beside' }],
            'vue/html-button-has-type'                   : 'error',
            'vue/html-closing-bracket-newline'           : ['error', { multiline: 'never' }],
            'vue/html-closing-bracket-spacing'           : 'error',
            'vue/html-comment-content-spacing'           : 'error',
            'vue/html-indent'                            : ['error', 4],
            'vue/html-self-closing'                      : ['error', { html: { void: 'always', normal: 'never' } }],
            'vue/multi-word-component-names'             : 'off',
            'vue/max-attributes-per-line'                : ['error', { multiline: { max: 1 } }],
            'vue/mustache-interpolation-spacing'         : ['error', 'always'],
            'vue/no-multi-spaces'                        : ['error', { ignoreProperties: false }],
            'vue/padding-line-between-blocks'            : ['error', 'always'],
            'vue/script-indent'                          : ['error', 4, { baseIndent: 1, switchCase: 1 }],
            'vue/singleline-html-element-content-newline': [
                'error',
                {
                    ignoreWhenNoAttributes: false,
                    ignores               : ['router-link'],
                },
            ],
            'vue/space-infix-ops'       : ['error', { int32Hint: false }],
            'vue/space-unary-ops'       : 'error',
            'vue/template-curly-spacing': ['error', 'always'],
        },
        processor      : pluginVue.processors['.vue'], // <<<<< ✅ 啟用 vue processor
        languageOptions: {
            parser       : vueParser,
            parserOptions: {
                parser: {
                    'js'        : tsParser,
                    'ts'        : tsParser,
                    '<template>': 'espree',
                },
                project            : './tsconfig.eslint.json',
                ecmaVersion        : 2020,
                sourceType         : 'module',
                extraFileExtensions: ['.vue'],
            },
        },
    },
    // ...vueTsEslintConfig(),
    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*'],
    },
    {
        ...pluginPlaywright.configs['flat/recommended'],
        files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    },
    // oxlint.configs['flat/recommended'],
];
