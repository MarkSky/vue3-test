// import "@rushstack/eslint-patch/modern-module-resolution.js";
import eslint from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import htmlEsLint from '@html-eslint/eslint-plugin';
import html from 'eslint-plugin-html';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import css from '@master/eslint-config-css';
import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import vueParser from 'vue-eslint-parser';
import vueI18n from '@intlify/eslint-plugin-vue-i18n';
import markdown from '@eslint/markdown';
import pluginVitest from '@vitest/eslint-plugin';
import pluginPlaywright from 'eslint-plugin-playwright';
import oxlint from 'eslint-plugin-oxlint';
// import { FlatCompat } from "@eslint/eslintrc";

// const compat = new FlatCompat();

export default [
    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**', 'package.json'],
    },
    css,
    eslint.configs.recommended,
    stylistic.configs['recommended-flat'],
    {
        name: 'app/all-files-to-lint',
        rules: {
            // eslint:recommended
            // "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
            // Suggestions
            // 'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['info', 'warn', 'error'] }] : 'off',
            'prefer-arrow-callback': 'error',
            '@master/css/class-order': 'warn',
            '@master/css/class-validation': 'error',
            '@master/css/class-collision': 'warn',
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
            '@stylistic/indent': [
                'error',
                4,
                {
                    SwitchCase: 1,
                    FunctionDeclaration: { parameters: 'first' },
                    CallExpression: { arguments: 'first' },
                    ArrayExpression: 'first',
                    ObjectExpression: 'first',
                    ImportDeclaration: 'first',
                },
            ],
            '@stylistic/member-delimiter-style': ['error', {
                multiline: { delimiter: 'semi', requireLast: true },
                singleline: { delimiter: 'semi', requireLast: true },
                multilineDetection: 'brackets',
            }],
            '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true, exceptions: { ImportDeclaration: true, Property: true, VariableDeclarator: true } }],
            '@stylistic/semi': ['error', 'always'],
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2015,
                __statics: 'readonly',
                Capacitor: 'readonly',
                chrome: 'readonly',
                cordova: 'readonly',
                defineEmits: 'readonly',
                defineExpose: 'readonly',
                definePage: 'readonly',
                defineProps: 'readonly',
                ga: 'readonly', // Google Analytics
                process: 'readonly',
                withDefaults: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    {
        ...htmlEsLint.configs['flat/recommended'],
        name: 'app/html-files-to-lint',
        files: ['**/*.html'],
        plugins: {
            html,
        },
        rules: {
            ...htmlEsLint.configs['flat/recommended'].rules,
        },
    },
    {
        name: 'app/markdown-files-to-lint',
        files: ['**/*.md'],
        plugins: {
            markdown,
        },
        language: 'markdown/commonmark',
        rules: {
            'markdown/no-html': 'error',
            'vue/multi-word-component-names': 'off',
        },
    },
    {
        name: 'app/js-files-to-lint',
        files: ['*.js'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],
            '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, align: 'colon' }],
            '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
            '@stylistic/multiline-ternary': ['error', 'always-multiline'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi-spacing': ['error', { before: false, after: true }],
            '@stylistic/semi-style': ['error', 'last'],
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/space-in-parens': ['error', 'never'],
            '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
            '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
            '@stylistic/template-curly-spacing': ['error', 'always'],
            '@stylistic/template-tag-spacing': ['error', 'always'],
        },
    },
    ...tsEslint.configs.recommendedTypeChecked.map(config => ({
        ...config,
        name: 'app/ts-files-to-lint',
        files: ['**/*.ts'],
        ignores: ['src/directives/**/*.ts', 'src/models/**/*.ts', 'src/stores/**/*.ts'],
        rules: {
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],
            '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, align: 'colon' }],
            '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
            '@stylistic/multiline-ternary': ['error', 'always-multiline'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/space-in-parens': ['error', 'never'],
            '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
            '@stylistic/space-unary-ops': 'error',
            '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
            // "@stylistic/type-annotation-spacing": ["error", { "before": false, "after": true }],
            '@stylistic/template-curly-spacing': ['error', 'always'],
            '@stylistic/type-generic-spacing': 'error',
            // turns a rule on with no configuration (i.e. uses the default configuration)
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            // turns on a rule with configuration
            '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
            '@typescript-eslint/no-empty-function': ['error', { allow: [] }],
            '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
        },
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['./*.ts'],
                    defaultProject: './tsconfig.eslint.json',
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    })),
    ...tsEslint.configs.strict,
    ...tsEslint.configs.stylistic,
    {
        name: 'app/model-files-to-lint',
        files: ['src/models/**/*.ts'],
        rules: {
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],
            '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, align: 'colon' }],
            '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
            '@stylistic/multiline-ternary': ['error', 'always-multiline'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
            '@stylistic/space-unary-ops': 'error',
            '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
            '@stylistic/template-curly-spacing': ['error', 'always'],
            '@stylistic/type-generic-spacing': 'error',
        },
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                project: './tsconfig.eslint.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
    },
    ...pluginVue.configs['flat/essential', 'flat/recommended'].map(config => (
        {
            ...config,
            name: 'app/vue-script-files-to-lint',
            files: ['src/directives/**/*.ts', 'src/stores/**/*.ts'],
            plugins: {
                '@intlify/vue-i18n': vueI18n,
            },
            settings: {
                'vue-i18n': {
                    localeDir: 'src/locales/*.{json,json5,yaml,yml}',
                    messageSyntaxVersion: '^10.0.5',
                },
                'import/core-modules': ['vue-router/auto-routes'],
            },
            rules: {
                '@intlify/vue-i18n/no-raw-text': ['error', { ignorePattern: '^[-~#:()&/]+$' }],
                '@stylistic/arrow-spacing': 'error',
                '@stylistic/comma-spacing': ['error', { before: false, after: true }],
                '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, align: 'colon' }],
                '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
                '@stylistic/multiline-ternary': ['error', 'always-multiline'],
                '@stylistic/object-curly-spacing': ['error', 'always'],
                '@stylistic/quotes': ['error', 'single'],
                '@stylistic/space-before-blocks': 'error',
                '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
                '@stylistic/space-unary-ops': 'error',
                '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
                '@stylistic/template-curly-spacing': ['error', 'always'],
                '@stylistic/type-annotation-spacing': 'off',
                '@stylistic/type-generic-spacing': 'error',
                '@typescript-eslint/unbound-method': 'off',
            },
            languageOptions: {
                parser: vueParser,
                parserOptions: {
                    parser: tsParser,
                    project: './tsconfig.eslint.json',
                    ecmaVersion: 2020,
                    sourceType: 'module',
                },
            },
        },
        {
            ...config,
            name: 'app/component-files-to-lint',
            files: ['**/*.vue'],
            plugins: {
                '@intlify/vue-i18n': vueI18n,
            },
            settings: {
                'vue-i18n': {
                    localeDir: 'src/locales/*.{json,json5,yaml,yml}',
                    messageSyntaxVersion: '^10.0.5',
                },
                'import/core-modules': ['vue-router/auto-routes'],
            },
            rules: {
                '@intlify/vue-i18n/no-raw-text': ['error', { ignorePattern: '^[-~#:()&/]+$' }],
                '@stylistic/arrow-spacing': 'error',
                '@stylistic/comma-spacing': ['error', { before: false, after: true }],
                '@stylistic/indent': 'off',
                '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, align: 'colon' }],
                '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
                '@stylistic/multiline-ternary': ['error', 'always-multiline'],
                '@stylistic/object-curly-spacing': ['error', 'always'],
                '@stylistic/quotes': ['error', 'single'],
                '@stylistic/space-before-blocks': 'error',
                '@stylistic/space-in-parens': ['error', 'never'],
                '@stylistic/space-infix-ops': ['error', { int32Hint: false }],
                '@stylistic/space-unary-ops': 'error',
                '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
                '@stylistic/template-curly-spacing': ['error', 'always'],
                '@stylistic/type-annotation-spacing': 'off',
                '@typescript-eslint/unbound-method': 'off',
                'vue/block-tag-newline': 'error',
                'vue/comma-spacing': ['error', { before: false, after: true }],
                'vue/first-attribute-linebreak': ['error', { singleline: 'beside', multiline: 'beside' }],
                'vue/html-button-has-type': 'error',
                'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }],
                'vue/html-closing-bracket-spacing': 'error',
                'vue/html-comment-content-spacing': 'error',
                'vue/html-indent': ['error', 4],
                'vue/html-self-closing': ['error', { html: { void: 'always', normal: 'never' } }],
                'vue/multi-word-component-names': 'off',
                'vue/max-attributes-per-line': ['error', { multiline: { max: 1 } }],
                'vue/mustache-interpolation-spacing': ['error', 'always'],
                'vue/no-multi-spaces': ['error', { ignoreProperties: false }],
                'vue/padding-line-between-blocks': ['error', 'always'],
                'vue/script-indent': ['error', 4, { baseIndent: 1, switchCase: 1 }],
                'vue/singleline-html-element-content-newline': [
                    'error',
                    {
                        ignoreWhenNoAttributes: false,
                        ignores: ['router-link'],
                    },
                ],
                'vue/space-infix-ops': ['error', { int32Hint: false }],
                'vue/space-unary-ops': 'error',
                'vue/template-curly-spacing': ['error', 'always'],
            },
            languageOptions: {
                parser: vueParser,
                parserOptions: {
                    parser: {
                        'js': tsParser,
                        'ts': tsParser,
                        '<template>': 'espree',
                    },
                    project: './tsconfig.eslint.json',
                    ecmaVersion: 2020,
                    sourceType: 'module',
                },
            },
        }
    )),
    ...vueTsEslintConfig(),
    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*'],
    },
    {
        ...pluginPlaywright.configs['flat/recommended'],
        files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    },
    oxlint.configs['flat/recommended'],

];
