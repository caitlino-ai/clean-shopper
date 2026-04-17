import { useState } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'

export default function App() {
  const [page, setPage] = useState('library')

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activePage={page} onNavigate={setPage} />
      {page === 'library' && <BrowsePage />}
      {page === 'search' && <SearchPage />}
    </div>
  )
}
