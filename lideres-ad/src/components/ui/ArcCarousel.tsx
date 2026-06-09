/**
 * ArcCarousel — Carousel com items em arco curvo + drag physics
 * Inspirado no padrão da MOBILE_UX.md seção 3
 * Usar em: Quick actions na Home, seleção de produto na Cantina
 */
import { motion, useMotionValue, useTransform } from 'framer-motion'

export interface ArcItem {
  id: string
  label: string
  icon: React.ReactNode
  onPress: () => void
}

interface ArcCarouselProps {
  items: ArcItem[]
}

// Sub-componente para evitar useTransform dentro de loop (violação de regra de hooks)
function ArcItemButton({
  item,
  index,
  totalItems,
  x,
}: {
  item: ArcItem
  index: number
  totalItems: number
  x: ReturnType<typeof useMotionValue<number>>
}) {
  const distanceFromCenter = Math.abs(index - totalItems / 2)

  const arcY = useTransform(x, [-800, 0, 800], [
    distanceFromCenter * 6,
    0,
    distanceFromCenter * 6,
  ])

  const arcScale = useTransform(x, [-800, 0, 800], [
    1 - distanceFromCenter * 0.04,
    1,
    1 - distanceFromCenter * 0.04,
  ])

  return (
    <motion.button
      style={{ y: arcY, scale: arcScale }}
      whileTap={{ scale: 0.88 }}
      onClick={item.onPress}
      className="flex flex-col items-center gap-2 flex-shrink-0 w-20"
    >
      <div
        className="w-14 h-14 rounded-2xl glass-1 flex items-center justify-center"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {item.icon}
      </div>
      <span
        className="text-[11px] font-medium text-center leading-tight"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {item.label}
      </span>
    </motion.button>
  )
}

export function ArcCarousel({ items }: ArcCarouselProps) {
  const x = useMotionValue(0)
  const totalItems = items.length
  const maxDrag = -(totalItems - 3) * 88

  return (
    <div
      className="relative h-28 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 5%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 5%, black 92%, transparent 100%)',
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: maxDrag < 0 ? maxDrag : 0, right: 0 }}
        dragElastic={0.15}
        style={{ x }}
        className="flex items-end gap-3 absolute bottom-0 left-4 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, i) => (
          <ArcItemButton
            key={item.id}
            item={item}
            index={i}
            totalItems={totalItems}
            x={x}
          />
        ))}
      </motion.div>
    </div>
  )
}
