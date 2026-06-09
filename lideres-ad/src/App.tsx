/**
 * App — router setup with protected routes
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { AppShell } from '@/components/layout/AppShell'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import CalendarPage from '@/pages/CalendarPage'
import CantinaPage from '@/pages/CantinaPage'
import AusenciasPage from '@/pages/AusenciasPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 min
      retry: 1,
    },
  },
})

function ThemeInitializer() {
  const { theme } = useThemeStore()
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])
  return null
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeInitializer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(27,42,74,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#EEE8DC',
              backdropFilter: 'blur(20px)',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/calendario" element={<CalendarPage />} />
            <Route path="/cantina" element={<CantinaPage />} />
            <Route path="/ausencias" element={<AusenciasPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
