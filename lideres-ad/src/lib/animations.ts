/**
 * animations.ts — Variantes Framer Motion centralizadas
 * Importar deste arquivo em TODOS os componentes com animação
 * Nunca definir animações inline nos componentes
 */
import type { Variants, Transition } from 'framer-motion'

// ─── Easings ──────────────────────────────────────────────────────────────────
export const ease = {
  spring:  [0.25, 0.46, 0.45, 0.94] as const,
  out:     [0.0,  0.0,  0.2,  1.0]  as const,
  inOut:   [0.4,  0.0,  0.2,  1.0]  as const,
  bounce:  [0.34, 1.56, 0.64, 1.0]  as const,
  sharp:   [0.4,  0.0,  0.6,  1.0]  as const,
}

// ─── Transitions base ─────────────────────────────────────────────────────────
export const transition = {
  instant:      { duration: 0.08 }                                   as Transition,
  fast:         { duration: 0.15, ease: ease.out }                   as Transition,
  normal:       { duration: 0.22, ease: ease.spring }                as Transition,
  slow:         { duration: 0.35, ease: ease.spring }                as Transition,
  spring:       { type: 'spring', damping: 30, stiffness: 350 }      as Transition,
  springBounce: { type: 'spring', damping: 18, stiffness: 280 }      as Transition,
  springStiff:  { type: 'spring', damping: 40, stiffness: 500 }      as Transition,
}

// ─── Page Transitions ─────────────────────────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.99 },
  animate: {
    opacity: 1, y: 0, scale: 1.0,
    transition: { duration: 0.28, ease: ease.spring },
  },
  exit: {
    opacity: 0, y: -8, scale: 0.99,
    transition: { duration: 0.18, ease: ease.sharp },
  },
}

// ─── Stagger containers ───────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
}

export const staggerContainerFast: Variants = {
  animate: { transition: { staggerChildren: 0.035, delayChildren: 0.02 } },
}

// ─── Card / list item ─────────────────────────────────────────────────────────
export const cardVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: {
    opacity: 1, y: 0, scale: 1.0,
    transition: { duration: 0.30, ease: ease.spring },
  },
  exit: {
    opacity: 0, y: -8, scale: 0.97,
    transition: { duration: 0.16, ease: ease.sharp },
  },
}

// ─── Fade simples ─────────────────────────────────────────────────────────────
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.20, ease: ease.out } },
  exit:    { opacity: 0, transition: { duration: 0.15, ease: ease.sharp } },
}

// ─── Slide up (bottom sheets, modais mobile) ──────────────────────────────────
export const slideUpVariants: Variants = {
  initial: { y: '100%', opacity: 0.5 },
  animate: { y: 0, opacity: 1, transition: { type: 'spring', damping: 30, stiffness: 350 } },
  exit:    { y: '100%', opacity: 0, transition: { duration: 0.25, ease: ease.sharp } },
}

// ─── Scale in (modais desktop) ────────────────────────────────────────────────
export const scaleInVariants: Variants = {
  initial: { opacity: 0, scale: 0.94, y: 8 },
  animate: {
    opacity: 1, scale: 1.0, y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 350 },
  },
  exit: {
    opacity: 0, scale: 0.96, y: 4,
    transition: { duration: 0.18, ease: ease.sharp },
  },
}

// ─── Backdrop ─────────────────────────────────────────────────────────────────
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.20 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}

// ─── FAB expansion items ──────────────────────────────────────────────────────
export const fabItemVariants: Variants = {
  initial: { opacity: 0, scale: 0.7, y: 12 },
  animate: {
    opacity: 1, scale: 1.0, y: 0,
    transition: { type: 'spring', damping: 18, stiffness: 280 },
  },
  exit: {
    opacity: 0, scale: 0.8, y: 6,
    transition: { duration: 0.12, ease: ease.sharp },
  },
}

// ─── Toast / notificação ──────────────────────────────────────────────────────
export const toastVariants: Variants = {
  initial: { opacity: 0, y: -12, scale: 0.96 },
  animate: {
    opacity: 1, y: 0, scale: 1.0,
    transition: { type: 'spring', damping: 40, stiffness: 500 },
  },
  exit: {
    opacity: 0, y: -8, scale: 0.96,
    transition: { duration: 0.18 },
  },
}

// ─── Número counter (saldo) — usar com useSpring ──────────────────────────────
export const numberSpringConfig = {
  damping: 30,
  stiffness: 100,
}
