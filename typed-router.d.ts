/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'Home': RouteRecordInfo<'Home', '/', Record<never, never>, Record<never, never>>,
    '404': RouteRecordInfo<'404', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    'About': RouteRecordInfo<'About', '/about', Record<never, never>, Record<never, never>>,
    'DynamicComponent': RouteRecordInfo<'DynamicComponent', '/dynamicComponent', Record<never, never>, Record<never, never>>,
    'DefaultDynamicComponent': RouteRecordInfo<'DefaultDynamicComponent', '/dynamicComponent/defaultDynamicComponent', Record<never, never>, Record<never, never>>,
    'InSuspense': RouteRecordInfo<'InSuspense', '/dynamicComponent/inSuspense', Record<never, never>, Record<never, never>>,
    'Game': RouteRecordInfo<'Game', '/game', Record<never, never>, Record<never, never>>,
    'PhaserGame': RouteRecordInfo<'PhaserGame', '/game/phaserGame', Record<never, never>, Record<never, never>>,
    'Suspense': RouteRecordInfo<'Suspense', '/suspense', Record<never, never>, Record<never, never>>,
    'SuspenseAsyncComponent': RouteRecordInfo<'SuspenseAsyncComponent', '/suspense/asyncComponent', Record<never, never>, Record<never, never>>,
    'SuspenseAsyncData': RouteRecordInfo<'SuspenseAsyncData', '/suspense/asyncData', Record<never, never>, Record<never, never>>,
  }
}
