/**
 * HomePage — Dashboard principal
 * Mobile-first: scroll vertical único com todas as seções
 * Desktop: AppShell cuida da Sidebar; esta página é single-column
 */
import { useNavigate } from 'react-router-dom'
import { CalendarPlus, FileText, UserX } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useUIStore } from '@/store/uiStore'
import { HomeHeader } from '@/components/home/HomeHeader'
import { HomeHero } from '@/components/home/HomeHero'
import { CantinaBalanceCard } from '@/components/home/CantinaBalanceCard'
import { UpcomingEvents } from '@/components/home/UpcomingEvents'
import { PinnedNotes } from '@/components/home/PinnedNotes'
import { WeekAbsences } from '@/components/home/WeekAbsences'
import { ArcCarousel } from '@/components/ui/ArcCarousel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { ArcItem } from '@/components/ui/ArcCarousel'

export default function HomePage() {
  const navigate = useNavigate()
  const { openEventModal, openNoteModal } = useUIStore()

  const quickActions: ArcItem[] = [
    {
      id: 'event',
      label: 'Novo Evento',
      icon: <CalendarPlus size={22} />,
      onPress: openEventModal,
    },
    {
      id: 'note',
      label: 'Nova Nota',
      icon: <FileText size={22} />,
      onPress: openNoteModal,
    },
    {
      id: 'absence',
      label: 'Ausência',
      icon: <UserX size={22} />,
      onPress: () => navigate('/ausencias'),
    },
  ]

  return (
    <PageWrapper>
      <div className="min-h-screen mobile-bg pb-[100px]">
        <HomeHeader />

        <div className="space-y-6 pt-2">
          {/* Hero — data + próximo evento */}
          <HomeHero />

          {/* Saldo cantina */}
          <CantinaBalanceCard />

          {/* Ações rápidas */}
          <section className="px-5">
            <SectionHeader title="AÇÕES RÁPIDAS" />
            <ArcCarousel items={quickActions} />
          </section>

          {/* Próximos eventos */}
          <section className="px-5">
            <SectionHeader
              title="PRÓXIMOS EVENTOS"
              linkLabel="Ver todos"
              linkTo="/calendario"
            />
            <UpcomingEvents />
          </section>

          {/* Notas fixadas */}
          <section>
            <div className="px-5">
              <SectionHeader title="NOTAS" />
            </div>
            <PinnedNotes />
          </section>

          {/* Ausências da semana */}
          <section className="px-5">
            <SectionHeader
              title="AUSÊNCIAS ESTA SEMANA"
              linkLabel="Ver relatório"
              linkTo="/ausencias"
            />
            <WeekAbsences />
          </section>
        </div>
      </div>
    </PageWrapper>
  )
}
