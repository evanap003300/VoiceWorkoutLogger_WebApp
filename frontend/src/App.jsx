import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.jsx'

import Navbar from './components/Navbar.jsx'

  export default function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
  
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
  
      return () => subscription.unsubscribe()
    }, [])

    return (
      <div>
        <Navbar session={session} />
      </div>
    )
  }