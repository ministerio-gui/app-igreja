/**
 * SectionHeader — Label de seção em caps + link "Ver todos"
 * Usado em todas as seções da HomePage e outras páginas
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  linkLabel?: string
  linkTo?: string
  onPress?: () => void
}

export function SectionHeader({ title, linkLabel, linkTo, onPress }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <p className="text-label" style={{ color: 'var(--color-text-muted)' }}>
        {title}
      </p>

      {linkLabel && linkTo && (
        <Link
          to={linkTo}
          style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-accent-primary)' }}
        >
          {linkLabel}
        </Link>
      )}

      {linkLabel && onPress && !linkTo && (
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onPress}
          style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-accent-primary)' }}
        >
          {linkLabel}
        </motion.button>
      )}
    </div>
  )
}
