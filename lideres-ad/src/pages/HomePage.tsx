/**
 * HomePage — Dashboard principal
 * Mobile-first: scroll vertical único com todas as seções
 * Desktop: AppShell cuida da Sidebar; esta página é single-column
 */
import { PageWrapper } from '@/components/layout/PageWrapper'
import { HomeHeader } from '@/components/home/HomeHeader'
import { HomeHero } from '@/components/home/HomeHero'
import { CantinaBalanceCard } from '@/components/home/CantinaBalanceCard'
import { UpcomingEvents } from '@/components/home/UpcomingEvents'
import { PinnedNotes } from '@/components/home/PinnedNotes'
import { WeekAbsences } from '@/components/home/WeekAbsences'
import { SectionHeader } from '@/components/ui/SectionHeader'

export default function HomePage() {
  return (
    <PageWrapper>
      <div className="min-h-screen mobile-bg pb-[100px]">
        <HomeHeader />

        <div className="space-y-6 pt-2">
          {/* Hero — data + próximo evento */}
          <HomeHero />

          {/* Saldo cantina */}
          <CantinaBalanceCard />

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
