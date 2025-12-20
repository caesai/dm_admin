import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { CSpinner } from '@coreui/react-pro'

import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import { useAtom } from 'jotai'
import { appAtom } from './atoms/appAtom.ts'
import { LoginWatchdog } from 'src/components/LoginWatchdog.tsx'
import { Toaster } from 'react-hot-toast'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(() => import('./views/pages/login/Login'))

const App = () => {
  const [, setAppState] = useAtom(appAtom)

  useEffect(() => {
    const getCurrentTheme = () => {
      return (
        (localStorage.getItem('coreui-pro-react-admin-template-theme-default') as
          | 'light'
          | 'dark') || 'light'
      )
    }

    setAppState((prev) => ({
      ...prev,
      theme: getCurrentTheme(),
    }))

    const handleColorSchemeChange = () => {
      const currentTheme = getCurrentTheme()
      setAppState((prev) => ({
        ...prev,
        theme: currentTheme,
      }))
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.MODE !== 'development' ? undefined : '/dm_admin/'}>
      <LoginWatchdog />
      <Toaster position={'top-right'} />
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
