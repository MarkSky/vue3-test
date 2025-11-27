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
    <main id="main">
        <header class="place-items:center jc:center line-height:1.5 max-h:100vh pr:calc(var(--section-gap)/2) flex@md w:full@md">
            <img alt="Vue logo"
                 class="block m:0|auto|2rem m:0|2rem|0|0@md logo"
                 src="@/assets/logo.svg"
                 width="125"
                 height="125" />

            <div class="pt:2 flex@md place-items:flex-start@md flex:wrap@md wrapper">
                <HelloWorld msg="You did it!" />

                <nav class="p:1rem|0@md f:1rem@md ml:-1rem@md mt:1rem@md text:left@md">
                    <RouterLink :to="{ name: 'Home' }"
                                class="fg:#ffffff:hover">
                        {{ t('page.home.title') }}
                    </RouterLink>

                    <RouterLink to="/about"
                                class="fg:#ffffff:hover">
                        {{ t('page.about.title') }}
                    </RouterLink>

                    <RouterLink :to="{ name: 'Suspense' }"
                                class="fg:#ffffff:hover">
                        {{ t('page.suspense.title') }}
                    </RouterLink>

                    <RouterLink :to="{ name: 'DynamicComponent' }"
                                class="fg:#ffffff:hover">
                        {{ t('page.dynamicComponent.title') }}
                    </RouterLink>

                    <RouterLink :to="{ name: 'Game' }"
                                class="fg:#ffffff:hover">
                        {{ t('page.game.title') }}
                    </RouterLink>

                    <RouterLink :to="{ name: 'WheelGame' }"
                                class="fg:#ffffff:hover">
                        {{ t('page.wheelGame.title') }}
                    </RouterLink>

                    <RouterLink :to="{ name: 'WheelGame2' }"
                                class="fg:#ffffff:hover">
                        {{ t('page.wheelGame2.title') }}
                    </RouterLink>
                </nav>
            </div>
        </header>

        <slot></slot>
    </main>
</template>

<style scoped>
    nav {
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
        width: 100%;
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
</style>
