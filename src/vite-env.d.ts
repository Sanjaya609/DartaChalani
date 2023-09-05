/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_ENDPOINT: string
  readonly VITE_PORT: string
  readonly VITE_HTTPS: string
  readonly VITE_BUILD_PATH: string
  readonly VITE_CI: string
  readonly VITE_MODE: string
  readonly VITE_GENERATE_SOURCEMAP: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
