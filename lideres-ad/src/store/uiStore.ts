/**
 * uiStore — transient UI state (sidebar open, active modals, etc.)
 */
import { create } from 'zustand'

interface UIStore {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  // ── Modais globais ──────────────────────────────────────────────
  eventModalOpen: boolean
  openEventModal: () => void
  closeEventModal: () => void
  noteModalOpen: boolean
  openNoteModal: () => void
  closeNoteModal: () => void
}

export const useUIStore = create<UIStore>((set, get) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

  eventModalOpen: false,
  openEventModal:  () => set({ eventModalOpen: true }),
  closeEventModal: () => set({ eventModalOpen: false }),

  noteModalOpen: false,
  openNoteModal:  () => set({ noteModalOpen: true }),
  closeNoteModal: () => set({ noteModalOpen: false }),
}))
