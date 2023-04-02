import { useState } from 'react'
import { useMutation } from 'react-query'
import { supabase } from '../utils/supabase'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /* 登録した際にメールアドレスとパスワードをリセット */
  const reset = () => {
    setEmail('')
    setPassword('')
  }

  /* ログインのボタンが押されたときに実行 */
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  /* ユーザーを作成するときの処理。エラーパターンはすでに同じアドレスが存在するとき */
  const registerMutation = useMutation(
    async () => {
      //エラーならerrorメソッドを代入、エラーでなければ通常通り await supabase.auth.signUp({ email, password })を実行
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  }
}
