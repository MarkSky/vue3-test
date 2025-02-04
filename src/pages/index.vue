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
