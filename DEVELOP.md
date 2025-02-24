# TypeScript Config

## tsconfig.app.json

-   compilerOptions

| Key              | 說明                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| tsBuildInfoFile  |                                                                                                                     |
| paths            |                                                                                                                     |
| types            |                                                                                                                     |
| module           | 設定 TypeScript 在編譯時，對 JavaScript 模組 (import/export) 的處理方式                                             |
| moduleResolution | TypeScript 5.0 引入的一個新的 模組解析策略，它主要針對 前端打包工具（如 Vite、webpack、Rollup、ESBuild） 進行最佳化 |
| target           | 確保生成的 JavaScript 是 現代 ESM 格式                                                                              |
