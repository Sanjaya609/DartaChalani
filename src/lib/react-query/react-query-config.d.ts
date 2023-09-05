import '@tanstack/react-query'

declare module '@tanstack/react-query' {
  export interface QueryMeta {
    disableFailureToast?: boolean
    disableSuccessToast?: boolean
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface MutationMeta extends QueryMeta {}
}
