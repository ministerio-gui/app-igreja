/**
 * themeStore — dark/light theme with localStorage persistence
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface ThemeStore {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggle: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.className = next
      },
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.className = theme
      },
    }),
    { name: 'lideres-ad-theme' }
  )
)
