import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter()

  /* アクセスしたユーザーのログイン状況によって、ページ遷移を自動で行ってくれる関数 */
  const validateSession = async () => {
    const user = supabase.auth.user()

    if (user && pathname === '/') {
      push('/notes')
    } else if (!user && pathname !== '/') {
      await push('/')
    }
  }

  /* ログインしているユーザーのセッションの変化を検知する */
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/notes')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })

  useEffect(() => {
    validateSession()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
