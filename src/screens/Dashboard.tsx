import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  ArrowDownToLine, ArrowRight, Bell, BookOpen, ChevronRight, ExternalLink, FileText, House, MapPin, Plus, Quote, RefreshCw, Sprout, Sun, User,
} from 'lucide-react'
import { Button, Card, ChoiceCard, Eyebrow, LangToggle, Photo, Screen, StickyBar, TBC, TopBar, Wordmark } from '../components/ui'
import { lessons } from '../data/lessons'
import type { PhotoSlot } from '../data/photos'
import { peso, useDemo, useT, type Txt } from '../state'
import { addMonths, termLabel } from './Invest'
import { impactAreas } from './Lesson'

/* ---------- Shared tab bar ---------- */

function TabBar() {
  const { t } = useT()
  const tabs = [
    { to: '/app', label: 'Home', icon: House, end: true },
    { to: '/app/kwento', label: t('Kwento', 'Stories'), icon: Sprout },
    { to: '/hakbang', label: t('Matuto', 'Learn'), icon: BookOpen },
    { to: '/app/ako', label: t('Ako', 'Me'), icon: User },
  ]
  return (
    <nav className="sticky bottom-0 z-20 mt-auto grid grid-cols-4 border-t border-line bg-paper/95 pb-[max(6px,env(safe-area-inset-bottom))] backdrop-blur" aria-label="Main">
      {tabs.map(tab => (
        <NavLink key={tab.to} to={tab.to} end={tab.end}
          className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11.5px] font-semibold ${isActive ? 'text-teal' : 'text-muted'}`}>
          {({ isActive }) => (<>
            <span className={`grid h-7 w-12 place-items-center rounded-full ${isActive ? 'bg-teal-tint' : ''}`}><tab.icon size={19} /></span>
            {tab.label}
          </>)}
        </NavLink>
      ))}
    </nav>
  )
}

function AppHeader() {
  const { t } = useT()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-1 border-b border-line/70 bg-paper/95 px-2 backdrop-blur">
      <Wordmark />
      <span className="flex-1" />
      <LangToggle />
      <button aria-label={t('Mga abiso', 'Notifications')} className="relative grid size-11 place-items-center rounded-full">
        <Bell size={20} />
        <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full border-2 border-paper bg-sexy-y" />
      </button>
    </header>
  )
}

/* ---------- F. Home ---------- */

export function AppHome() {
  const { state } = useDemo()
  const { t, tx, lang } = useT()
  const jvs = state.jvs ?? { goal: 'near', termMonths: 6, amount: 10000 }
  const nextLesson = lessons.find(l => !state.lessonsDone.includes(l.id))
  const holdings = [
    {
      name: 'JVS · Emergency fund', amount: jvs.amount,
      meta: `${termLabel(jvs.termMonths, lang)} · ${t('matatapos sa', 'ends')} ${addMonths(jvs.termMonths)}`,
      status: t('Aktibo', 'Active'), tone: 'bg-teal-tint text-teal',
    },
    {
      name: 'JVS · House repair', amount: 15000,
      meta: t('1 taon · natapos Oct 15, 2026', '1 year · ended Oct 15, 2026'),
      status: t('Natapos na', 'Matured'), tone: 'bg-mangga text-ink', to: '/app/maturity',
    },
    {
      name: 'Share capital', amount: 1000,
      meta: t('1 co-op share · habang member ka', '1 co-op share · while you are a member'),
      status: 'Co-owner', tone: 'bg-placeholder text-muted',
    },
  ]
  return (
    <Screen>
      <AppHeader />
      <section className="px-5 pt-5">
        <p className="text-[14px] text-muted">{t('Magandang araw,', 'Good day,')}</p>
        <h1 className="text-[30px] font-extrabold leading-tight">Hi Bea</h1>
      </section>

      <Link to="/app/maturity" className="mx-4 mt-4 flex items-center gap-3 rounded-3xl bg-mangga p-4 text-ink">
        <span className="stone grid size-12 shrink-0 place-items-center bg-white/70"><Sun size={22} /></span>
        <span className="flex-1">
          <span className="block font-display text-[17px] font-bold">{t('Gising na ang pera mo!', 'Your money is awake!')}</span>
          <span className="block text-[13.5px]">{t('Natapos na ang isang JVS. Ikaw ang pipili kung ano ang susunod.', 'One of your JVS terms has ended. You choose what happens next.')}</span>
        </span>
        <ChevronRight size={20} />
      </Link>

      <section className="px-4 pt-6">
        <h2 className="px-1 text-[19px] font-bold">{t('Ang investments mo', 'Your investments')}</h2>
        <ul className="mt-2 grid gap-2">
          {holdings.map(h => {
            const body = (
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-muted">{h.name}</p>
                  <p className="font-display text-[22px] font-bold">{peso(h.amount)}</p>
                  <p className="text-[12.5px] text-muted">{h.meta}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${h.tone}`}>{h.status}</span>
              </div>
            )
            return <li key={h.name}>{h.to ? <Link to={h.to}>{body}</Link> : body}</li>
          })}
        </ul>
      </section>

      {nextLesson && (
        <section className="px-4 pt-6">
          <Eyebrow className="px-1">{t('Susunod na hakbang', 'Next step')}</Eyebrow>
          <Link to={`/hakbang/lesson/${nextLesson.id}`} className="mt-2 flex items-center gap-3 rounded-2xl border border-line bg-card p-4">
            <BookOpen size={20} className="shrink-0 text-teal" />
            <span className="flex-1 text-[14.5px] font-semibold">{tx(nextLesson.title)} <span className="font-normal text-muted">· {nextLesson.minutes} min</span></span>
            <ArrowRight size={18} className="text-teal" />
          </Link>
        </section>
      )}

      <section className="px-4 pb-8 pt-6">
        <Link to="/app/kwento" className="block overflow-hidden rounded-3xl bg-teal text-white">
          <Photo slot="kanegosyo-branch" className="h-36" />
          <div className="p-4">
            <Eyebrow className="text-white/70">{t('Kwento', 'Stories')}</Eyebrow>
            <p className="mt-1 text-[14.5px] font-semibold leading-snug">
              {t('Ang pool mo ay sumusuporta sa partners tulad ni [Partner], may [negosyo] sa [lugar].', 'Your pool supports partners like [Partner], who runs a [business] in [place].')}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-mangga">{t('Basahin', 'Read')} <ArrowRight size={14} /></span>
          </div>
        </Link>
      </section>
      <TabBar />
    </Screen>
  )
}

/* ---------- G. Kwento ---------- */

const stories: { type: Txt; slot: PhotoSlot }[] = [
  { type: { tl: 'Sari-sari store', en: 'Sari-sari store' }, slot: 'partner-1' },
  { type: { tl: 'Karinderya', en: 'Eatery' }, slot: 'partner-2' },
  { type: { tl: 'Tindahan ng gulay', en: 'Vegetable stall' }, slot: 'partner-3' },
]

export function Kwento() {
  const { state, toast } = useDemo()
  const { t, tx } = useT()
  const picks = state.impactPicks.map(p => tx(impactAreas.find(a => a.tl === p) ?? { tl: p, en: p }))
  return (
    <Screen>
      <AppHeader />
      <section className="px-5 pt-5">
        <h1 className="text-[28px] font-extrabold leading-tight">{t('Kwento', 'Stories')}</h1>
        <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{t('Saan napupunta ang pinagsama-samang ipon ng KaSosyo members.', "Where KaSosyo members' pooled savings go.")}</p>
      </section>

      <section className="mx-4 mt-4 overflow-hidden rounded-3xl bg-teal text-white">
        <Photo slot="branch-opening" className="h-36" />
        <div className="p-5">
          <Eyebrow className="text-white/70">{t('Ngayong quarter · buong pool', 'This quarter · whole pool')}</Eyebrow>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div><p className="font-display text-[30px] font-extrabold text-mangga">[X]</p><p className="text-[13px] text-white/85">{t('partners na sinuportahan', 'partners supported')}</p></div>
            <div><p className="font-display text-[30px] font-extrabold text-mangga">[₱X]</p><p className="text-[13px] text-white/85">{t('naipahiram sa partners', 'lent to partners')}</p></div>
          </div>
          <p className="mt-4 text-[12.5px] leading-snug text-white/75">
            {t('Pooled ang pera ng lahat ng members, kaya pang-buong pool ang mga numerong ito, hindi pang-isang tao.', "All members' money is pooled, so these numbers are for the whole pool, not for one person.")}
          </p>
        </div>
      </section>

      {picks.length > 0 && (
        <p className="px-5 pt-4 text-[13px] text-muted">{t('Inuuna ang mga kwento tungkol sa:', 'Showing stories about these first:')} <b className="text-ink">{picks.join(', ')}</b></p>
      )}

      <section className="grid gap-3 px-4 pt-4">
        {stories.map((s, i) => (
          <article key={s.slot} className="overflow-hidden rounded-3xl border border-line bg-card">
            <Photo slot={s.slot} className="h-44" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-[12.5px] font-semibold text-muted">
                <span className="rounded-full bg-teal-tint px-2.5 py-0.5 text-teal">{tx(s.type)}</span>
                <span className="flex items-center gap-1"><MapPin size={13} /> [{t('Lugar', 'Place')}]</span>
              </div>
              <p className="mt-2.5 flex gap-2 font-display text-[17px] font-semibold leading-snug">
                <Quote size={18} className="mt-0.5 shrink-0 text-sexy-x" aria-hidden />
                [{t(`Quote ng partner ${i + 1}: ano ang nagbago sa negosyo niya`, `Quote from partner ${i + 1}: what changed in their business`)}]
              </p>
              <p className="mt-2 text-[12.5px] text-muted">[{t('Pangalan ng partner', 'Partner name')}], KaNegosyo partner</p>
            </div>
          </article>
        ))}
      </section>

      <section className="px-4 pb-8 pt-4">
        <button onClick={() => toast(t('Bubuksan ang audited financial statements.', 'Opens the audited financial statements.') + ' [link — confirm with SEDPI]')} className="flex w-full items-center gap-3 rounded-2xl border border-line bg-card p-4 text-left">
          <FileText size={20} className="shrink-0 text-teal" />
          <span className="flex-1">
            <span className="block text-[14.5px] font-semibold">Audited financial statements</span>
            <span className="block text-[12.5px] text-muted">{t('Ang transparency reports ng SEDPI Coop', "SEDPI Coop's transparency reports")}</span>
          </span>
          <ExternalLink size={17} className="text-teal" />
        </button>
      </section>
      <TabBar />
    </Screen>
  )
}

/* ---------- H. Maturity ---------- */

type Choice = 'ituloy' | 'dagdagan' | 'withdraw'
const choices: { id: Choice; title: Txt; body: Txt; icon: typeof RefreshCw; cta: Txt; done: Txt }[] = [
  {
    id: 'ituloy', icon: RefreshCw,
    title: { tl: 'Ituloy', en: 'Continue' }, body: { tl: 'Parehong halaga, bagong term.', en: 'Same amount, new term.' },
    cta: { tl: 'Ituloy ang JVS', en: 'Continue my JVS' }, done: { tl: 'Naituloy na ang JVS mo.', en: 'Your JVS is continued.' },
  },
  {
    id: 'dagdagan', icon: Plus,
    title: { tl: 'Dagdagan', en: 'Top up' }, body: { tl: 'Magdagdag, saka ituloy.', en: 'Add more, then continue.' },
    cta: { tl: 'Dagdagan at ituloy', en: 'Top up and continue' }, done: { tl: 'Nadagdagan at naituloy ang JVS mo.', en: 'Your JVS is topped up and continued.' },
  },
  {
    id: 'withdraw', icon: ArrowDownToLine,
    title: { tl: 'I-withdraw', en: 'Withdraw' }, body: { tl: 'Kunin ang pera mo.', en: 'Take your money out.' },
    cta: { tl: 'I-withdraw', en: 'Withdraw' }, done: { tl: 'Naproseso na ang withdrawal request mo.', en: 'Your withdrawal request is in.' },
  },
]

export function Maturity() {
  const nav = useNavigate()
  const { t, tx, lang } = useT()
  const [choice, setChoice] = useState<Choice | null>(null)
  const [term, setTerm] = useState(12)
  const [add, setAdd] = useState('5,000')
  const [confirmed, setConfirmed] = useState(false)
  const picked = choices.find(c => c.id === choice)

  if (confirmed && picked) {
    return (
      <Screen>
        <TopBar back="/app" title="JVS · House repair" />
        <div className="rise flex-1 px-5 pt-10 text-center">
          <span className="stone mx-auto grid size-20 place-items-center bg-teal text-white"><picked.icon size={34} /></span>
          <h1 className="mt-5 text-[26px] font-extrabold leading-tight">{tx(picked.done)}</h1>
          <p className="mt-2 text-[14.5px] text-muted">
            {choice === 'withdraw'
              ? <>{t('Ipapadala namin ang pera mo.', 'We will send your money.')} <TBC>[processing time — confirm with SEDPI]</TBC></>
              : <>{t('Bagong term:', 'New term:')} {termLabel(term, lang)}, {t('matatapos sa', 'ending')} {addMonths(term)}.</>}
          </p>
          <p className="mt-3 text-[13px] text-muted">{t('Pwede mong baguhin ang isip mo bago ito ma-proseso.', 'You can change your mind before it is processed.')} <TBC>[cut-off — confirm]</TBC></p>
        </div>
        <StickyBar><Button full onClick={() => nav('/app')}>{t('Balik sa Home', 'Back to Home')}</Button></StickyBar>
      </Screen>
    )
  }

  return (
    <Screen>
      <TopBar back="/app" title="JVS · House repair" />
      <section className="px-5 pt-6">
        <span className="stone grid size-14 -rotate-6 place-items-center bg-mangga text-ink"><Sun size={26} /></span>
        <h1 className="mt-4 text-[30px] font-extrabold leading-tight">{t('Gising na ang pera mo!', 'Your money is awake!')}</h1>
        <p className="mt-1 text-[15px] text-muted">{t('Natapos na ang term ng JVS mo.', 'Your JVS term has ended.')}</p>
      </section>

      <Card className="mx-4 mt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[13.5px] text-muted">{t('Halaga ng JVS', 'JVS amount')}</span>
          <span className="font-display text-[22px] font-bold">{peso(15000)}</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between text-[13.5px]">
          <span className="text-muted">Term</span><span>{t('1 taon · natapos Oct 15, 2026', '1 year · ended Oct 15, 2026')}</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-2 text-[12.5px]">
          <span className="text-muted">{t('Kita', 'Returns')}</span><TBC>[actual dividends — confirm with SEDPI]</TBC>
        </div>
      </Card>

      <section className="px-4 pb-6 pt-6">
        <h2 className="px-1 text-[18px] font-bold">{t('Ano ang gusto mo?', 'What would you like to do?')}</h2>
        <p className="px-1 text-[13.5px] text-muted">{t('Lahat ng ito ay okay. Ikaw ang bahala.', 'All of these are fine. It is up to you.')}</p>
        <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label={t('Pagpipilian', 'Options')}>
          {choices.map(c => (
            <ChoiceCard key={c.id} selected={choice === c.id} onClick={() => setChoice(c.id)} className="flex min-h-[132px] flex-col items-start gap-2 p-3">
              <span className="grid size-10 place-items-center rounded-full bg-teal-tint text-teal"><c.icon size={19} /></span>
              <span className="text-[15.5px] font-bold">{tx(c.title)}</span>
              <span className="text-[12.5px] leading-snug text-muted">{tx(c.body)}</span>
            </ChoiceCard>
          ))}
        </div>

        {choice && (
          <div key={choice} className="rise mt-4 rounded-3xl border border-line bg-card p-4">
            {choice !== 'withdraw' ? (
              <>
                {choice === 'dagdagan' && (
                  <div className="mb-4">
                    <label htmlFor="add" className="text-[14px] font-semibold">{t('Magkano ang idadagdag?', 'How much will you add?')}</label>
                    <div className="mt-1.5 flex items-center rounded-2xl border-2 border-line px-3 focus-within:border-teal">
                      <span className="font-semibold text-muted">₱</span>
                      <input id="add" inputMode="numeric" value={add} onChange={e => { const n = Number(e.target.value.replace(/\D/g, '')); setAdd(n ? n.toLocaleString('en-PH') : '') }} className="h-12 w-full bg-transparent px-2 text-[17px] font-semibold outline-none" />
                    </div>
                    <p className="mt-1 text-[12.5px] text-muted">{t('Bagong kabuuan:', 'New total:')} {peso(15000 + (Number(add.replace(/\D/g, '')) || 0))}</p>
                  </div>
                )}
                <p className="text-[14px] font-semibold">{t('Bagong term', 'New term')}</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[6, 12, 24].map(m => (
                    <button key={m} onClick={() => setTerm(m)} aria-pressed={term === m} className={`min-h-11 rounded-xl border-2 text-[14px] font-semibold ${term === m ? 'border-teal bg-teal text-white' : 'border-line'}`}>{termLabel(m, lang)}</button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-[14px] font-semibold">{t(`Saan ipapadala ang ${peso(15000)}?`, `Where should we send ${peso(15000)}?`)}</p>
                <div className="mt-2 rounded-2xl bg-placeholder p-3 font-mono text-[12px] text-muted">[Withdrawal channel & account — confirm with SEDPI]</div>
                <p className="mt-2 text-[12.5px] text-muted">{t('Walang tanong, walang hassle. Pera mo ito.', "No questions, no hassle. It's your money.")}</p>
              </>
            )}
          </div>
        )}
      </section>

      <StickyBar>
        <Button full disabled={!picked} onClick={() => setConfirmed(true)}>{picked ? tx(picked.cta) : t('Pumili ng isa', 'Choose one')}</Button>
      </StickyBar>
    </Screen>
  )
}

export function Ako() {
  const { state } = useDemo()
  const { t } = useT()
  return (
    <Screen>
      <AppHeader />
      <section className="px-5 pt-5">
        <h1 className="text-[28px] font-extrabold">{t('Ako', 'Me')}</h1>
        <Card className="mt-4">
          <p className="text-[15px] font-semibold">{state.profile.name}</p>
          <p className="text-[13.5px] text-muted">{state.profile.email}</p>
          <p className="text-[13.5px] text-muted">{state.profile.mobile}</p>
        </Card>
        <p className="mt-4 text-[13px] text-muted"><TBC>[Account settings — Phase 2]</TBC></p>
      </section>
      <TabBar />
    </Screen>
  )
}
