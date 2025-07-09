import { supabase } from '../supabaseClient.jsx'

export default function AuthButton({ session }) {
  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return session ? (
    <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer">
      Logout
    </button>
  ) : (
      <button onClick={login} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 hover:cursor-pointer">
        Log In with Google
      </button>
  )
}