import { ArrowRight, Check, ChevronRight, Flame, Play, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Eyebrow, LinkButton, Photo, SEXY, Screen, SexyBadge, StickyBar, Stones, TopBar } from '../components/ui'
import { lessons } from '../data/lessons'
import { peso, useDemo, useT } from '../state'


export default function Hakbang() {
  const { state } = useDemo()
  const { t, tx } = useT()
  const steps = [t('Matuto', 'Learn'), t('Mag-set ng goal', 'Set a goal'), t('Sumali', 'Join'), t('Unang invest', 'First invest'), t('Kwento', 'Stories')]
  const done = [
    state.lessonsDone.length === lessons.length,
    state.goal.amount > 0,
    !!state.receipt && state.agreed,
    !!state.jvs,
    false,
  ]
  const current = Math.max(0, done.findIndex(d => !d))
  const today = lessons.find(l => !state.lessonsDone.includes(l.id)) ?? lessons[0]
  const paydays = 6

  return (
    <Screen>
      <TopBar
        right={
          <Link to="/app" className="mr-1 flex h-11 items-center gap-2 rounded-full pl-1 pr-3 text-[14px] font-semibold" aria-label={t('Account ni Bea', "Bea's account")}>
            <span className="grid size-8 place-items-center rounded-full bg-mangga font-display text-[14px] font-bold">B</span>
          </Link>
        }
      />

      <section className="px-5 pt-5">
        <Eyebrow>Unang Hakbang</Eyebrow>
        <h1 className="mt-1 text-[28px] font-extrabold leading-tight">{t('Hi Bea. Isang hakbang lang ngayon.', 'Hi Bea. Just one step today.')}</h1>
      </section>

      <section className="mx-4 mt-5 rounded-3xl border border-line bg-card px-2 pb-4 pt-5">
        <Stones steps={steps} current={current} done={i => done[i]} />
      </section>

      {/* Today's lesson */}
      <section className="px-4 pt-6">
        <Eyebrow className="px-1">{t('Lesson ngayong araw', "Today's lesson")}</Eyebrow>
        <Link to={`/hakbang/lesson/${today.id}`} className="mt-2 block overflow-hidden rounded-3xl bg-teal text-white">
          <Photo slot="usapang-pera" className="h-36">
            <span className="absolute inset-0 bg-gradient-to-t from-teal via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 rounded-full bg-mangga px-2.5 py-1 text-[11.5px] font-bold text-ink">{today.minutes} min · {t('may video', 'with video')}</span>
          </Photo>
          <div className="flex items-start gap-3 p-5 pt-3">
            <SexyBadge letter={today.letter} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-white/75">{SEXY[today.letter].word} · {t(SEXY[today.letter].fil, SEXY[today.letter].plain)}</p>
              <h2 className="mt-0.5 text-[21px] font-bold leading-snug">{tx(today.title)}</h2>
              <p className="mt-1.5 text-[14px] leading-snug text-white/80">{tx(today.summary)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-teal-deep px-5 py-3">
            <span className="text-[13.5px] text-white/85">{t('Gawin na', 'Do it')}: {tx(today.action.label)}</span>
            <span className="grid size-10 place-items-center rounded-full bg-mangga text-ink"><Play size={18} fill="currentColor" /></span>
          </div>
        </Link>
      </section>

      {/* All lessons, in SEXY order */}
      <section className="px-4 pt-7">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-[20px] font-bold">{t('Mga lesson, ayon sa SEXY', 'Lessons, in SEXY order')}</h2>
          <span className="text-[13px] text-muted">{state.lessonsDone.length}/{lessons.length}</span>
        </div>
        <p className="mt-1 px-1 text-[13.5px] leading-snug text-muted">{t('Ligtas muna, saka makukuha, saka epekto. Ang kita, huli.', 'Safety first, then access, then impact. Returns come last.')}</p>
        <ul className="mt-3 grid gap-2">
          {lessons.map(l => {
            const isDone = state.lessonsDone.includes(l.id)
            return (
              <li key={l.id}>
                <Link to={`/hakbang/lesson/${l.id}`} className="flex min-h-[72px] items-center gap-3 rounded-2xl border border-line bg-card p-3">
                  <SexyBadge letter={l.letter} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-[11.5px] font-bold uppercase tracking-wide ${SEXY[l.letter].text}`}>{SEXY[l.letter].word} · {t(SEXY[l.letter].fil, SEXY[l.letter].plain)}</p>
                    <p className="text-[15px] font-semibold leading-snug">{tx(l.title)}</p>
                    <p className="text-[12.5px] text-muted">{t('Gawin na', 'Do it')}: {tx(l.action.label)}</p>
                  </div>
                  {isDone ? (
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-teal text-white" aria-label={t('Tapos na', 'Done')}><Check size={15} strokeWidth={3} /></span>
                  ) : (
                    <ChevronRight size={20} className="shrink-0 text-muted" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Goal + habit streak */}
      <section className="px-4 pt-7">
        <Card className="bg-mangga-soft border-mangga/40">
          <div className="flex items-center gap-3">
            <span className="stone grid size-11 place-items-center bg-mangga text-ink"><Target size={20} /></span>
            <div>
              <p className="text-[12.5px] font-semibold text-muted">{t('Ang goal mo', 'Your goal')}</p>
              <p className="font-display text-[19px] font-bold">{state.goal.label} · {peso(state.goal.amount)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Flame size={18} className="text-sexy-x" aria-hidden />
            <p className="text-[14px] font-semibold">{t(`${state.streakWeeks} sweldo nang sunod-sunod kang nag-ipon`, `You saved ${state.streakWeeks} paydays in a row`)}</p>
          </div>
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {Array.from({ length: paydays }, (_, i) => (
              <span key={i} className={`h-2.5 flex-1 rounded-full ${i < state.streakWeeks ? 'bg-teal' : 'bg-white'}`} />
            ))}
          </div>
          <p className="mt-3 text-[12.5px] leading-snug text-muted">{t('Ang habit lang ang binibilang namin, hindi kung magkano. Walang ranking dito.', "We only count the habit, not the amount. There's no ranking here.")}</p>
        </Card>
      </section>

      <section className="px-4 pb-8 pt-4">
        <Link to="/sumali" className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4">
          <Photo slot="members-group" compact className="size-14 shrink-0 rounded-2xl" />
          <div className="flex-1">
            <p className="text-[15px] font-semibold">{t('Handa ka nang sumali?', 'Ready to join?')}</p>
            <p className="text-[13px] text-muted">{t('Pwede kahit hindi pa tapos ang lahat ng lesson.', "You can, even if you haven't finished every lesson.")}</p>
          </div>
          <ChevronRight size={20} className="text-muted" />
        </Link>
      </section>

      <StickyBar>
        <LinkButton to={`/hakbang/lesson/${today.id}`} full>{t('Simulan ang lesson ngayong araw', "Start today's lesson")} <ArrowRight size={18} /></LinkButton>
      </StickyBar>
    </Screen>
  )
}
