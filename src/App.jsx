import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'
import { supabase } from './lib/supabase'
import { useSavedProducts } from './lib/useSavedProducts'

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = loading, null = signed out
  const [page, setPage] = useState('library')
  const [authPage, setAuthPage] = useState('signin')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) setPage('library')
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Still checking session — render nothing to avoid flash
  if (session === undefined) return null

  // Not signed in — show auth pages
  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {authPage === 'signin' && (
          <SignInPage
            onNavigate={setAuthPage}
            onSignIn={() => {}} // handled by onAuthStateChange
          />
        )}
        {authPage === 'signup' && (
          <SignUpPage onNavigate={setAuthPage} />
        )}
      </div>
    )
  }

  const { savedIds, toggleSave } = useSavedProducts(session?.user?.id)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setAuthPage('signin')
  }

  // Signed in — show main app
  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activePage={page} onNavigate={setPage} onSignOut={handleSignOut} />
      {page === 'library' && <BrowsePage savedIds={savedIds} onToggleSave={toggleSave} />}
      {page === 'search' && <SearchPage savedIds={savedIds} onToggleSave={toggleSave} />}
    </div>
  )
}
