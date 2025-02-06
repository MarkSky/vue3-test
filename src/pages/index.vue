<route>
    {
        "name": "Home",
        "meta": {
            "title": "首頁",
            "i18n": "page.home.title",
            "transition": "default",
            "authorize": false
        }
    }
</route>

<script setup lang="ts">
    /*
         import
     */
    // Composables
    import { useI18n } from 'vue-i18n';
    // Components
    import HelloWorld from '@/components/HelloWorld.vue';

    /*
        i18n
    */
    //
    const { t } = useI18n();
</script>

<template>
    <section>
        <header>
            <img alt="Vue logo"
                 class="logo"
                 src="@/assets/logo.svg"
                 width="125"
                 height="125" />

            <div class="wrapper">
                <HelloWorld msg="You did it!" />

                <nav>
                    <RouterLink :to="{ name: 'Home' }">
                        {{ t('page.home.title') }}
                    </RouterLink>
                    <RouterLink to="/about">
                        {{ t('page.about.title') }}
                    </RouterLink>
                    <RouterLink :to="{ name: 'Suspense' }">
                        {{ t('page.suspense.title') }}
                    </RouterLink>

                    <RouterLink :to="{ name: 'DynamicComponent' }">
                        {{ t('page.dynamicComponent.title') }}
                    </RouterLink>
                </nav>
            </div>
        </header>
    </section>
</template>

<style scoped>
    header {
        line-height: 1.5;
        max-height: 100vh;
    }

    .logo {
        display: block;
        margin: 0 auto 2rem;
    }

    nav {
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
        width: 100%;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
        background-color: transparent;
    }

    nav a {
        border-left: 1px solid var(--color-border);
        display: inline-block;
        padding: 0 1rem;
    }

    nav a:first-of-type {
        border: 0;
    }

    @media (width >=1024px) {
        header {
            display: flex;
            place-items: center;
            padding-right: calc(var(--section-gap) / 2);
        }

        .logo {
            margin: 0 2rem 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }

        nav {
            font-size: 1rem;
            text-align: left;
            margin-top: 1rem;
            margin-left: -1rem;
            padding: 1rem 0;
        }
    }
</style>
