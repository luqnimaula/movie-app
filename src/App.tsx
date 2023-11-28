import { Suspense, lazy, memo } from "react"
import { Route, Routes } from "react-router-dom"

const HomePage = lazy(() => import('./pages/home'))
const SearchPage = lazy(() => import('./pages/search'))

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<span>Loading page...</span>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path='/search'
        element={
          <Suspense fallback={<span>Loading page...</span>}>
            <SearchPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default memo(App)