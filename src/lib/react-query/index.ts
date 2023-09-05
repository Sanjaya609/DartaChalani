import { MutationCache, QueryCache, QueryClient } from '@tanstack/query-core'
import {
  onMutationError,
  onMutationSuccess,
  onQueryError,
} from '@/lib/react-query/query-response'

const queryClient = new QueryClient({
  /**
   * These are the default options provided for every query and mutation.
   * These can be overridden while using the hook
   */
  defaultOptions: {
    mutations: {
      retry: false,
      // since we do not need the cache of mutation, we are disable cache of mutation
      cacheTime: 0,
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // Time to stale request and re-fetch in background
      staleTime: 5 * 1000,
    },
  },
  mutationCache: new MutationCache({
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  }),
  queryCache: new QueryCache({
    onError: onQueryError,
  }),
})

export default queryClient
