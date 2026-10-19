import { useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Captions, Check, Play, RotateCcw, X } from 'lucide-react'
import { Button, Checkbox, IconScene, SEXY, Screen, Sheet, SexyBadge, StickyBar, TBC, TopBar, type SexyLetter } from '../components/ui'
import { lessonById, lessons, type Lesson as LessonT } from '../data/lessons'
import { peso, useDemo, useT, type Txt } from '../state'

const tints: Record<SexyLetter, string> = { S: 'bg-[#d6ecec]', E: 'bg-[#e6def2]', X: 'bg-[#f7e2d2]', Y: 'bg-[#f6dcda]' }

export default function Lesson() {
  const { id } = useParams()
  const lesson = lessonById(id)
  const [params] = useSearchParams()
  const [card, setCard] = useState(() => Math.min(2, Math.max(0, Number(params.get('card')) || 0)))
  const [actionOpen, setActionOpen] = useState(false)
  const { t, tx } = useT()
  if (!lesson) return <Navigate to="/hakbang" replace />
  const labels = [t('Panoorin', 'Watch'), t('Tingnan', 'Look'), t('Subukan', 'Try')]

  return (
    <Screen>
      <TopBar back="/hakbang" title={<span className="flex items-center gap-2"><SexyBadge letter={lesson.letter} size="sm" />{tx(lesson.title)}</span>} />

      {/* Story-style progress */}
      <div className="flex gap-1.5 px-4 pt-3" role="tablist" aria-label={t('Bahagi ng lesson', 'Lesson parts')}>
        {labels.map((l, i) => (
          <button key={l} role="tab" aria-selected={card === i} onClick={() => setCard(i)} className="flex min-h-11 flex-1 flex-col justify-center gap-1.5">
            <span className={`h-1.5 w-full rounded-full ${i <= card ? 'bg-teal' : 'bg-line'}`} />
            <span className={`text-[11.5px] ${i === card ? 'font-semibold text-ink' : 'text-muted'}`}>{i + 1}. {l}</span>
          </button>
        ))}
      </div>

      <div key={card} className="rise flex-1 px-4 pb-6 pt-3">
        {card === 0 && <VideoCard lesson={lesson} onSkip={() => setCard(1)} />}
        {card === 1 && <PictureCards lesson={lesson} />}
        {card === 2 && <Quiz lesson={lesson} />}
      </div>

      <StickyBar>
        <div className="flex gap-2">
          {card < 2 && (
            <Button variant="secondary" onClick={() => setCard(card + 1)} className="shrink-0">
              {t('Susunod', 'Next')} <ArrowRight size={17} />
            </Button>
          )}
          <Button full onClick={() => setActionOpen(true)}>{t('Gawin na', 'Do it now')}</Button>
        </div>
      </StickyBar>

      <ActionSheet lesson={lesson} open={actionOpen} onClose={() => setActionOpen(false)} />
    </Screen>
  )
}

function VideoCard({ lesson, onSkip }: { lesson: LessonT; onSkip: () => void }) {
  const { t, tx } = useT()
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#1d2f2a]">
        <div className="absolute inset-x-0 bottom-8 text-center text-[12px] text-white/60">[{t('Video placeholder · hanggang 3 min', 'Video placeholder · up to 3 min')}]</div>
        <button aria-label={t('I-play ang video', 'Play video')} className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-mangga text-ink shadow-lg">
          <Play size={26} fill="currentColor" />
        </button>
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/95 py-1 pl-1 pr-3">
          <span className="grid size-7 place-items-center rounded-full bg-placeholder text-[10px] text-muted">[ ]</span>
          <span className="text-[12px] font-semibold leading-tight">[Peer host], KaSosyo member</span>
        </div>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-bold text-white">
          <Captions size={14} /> CC
        </span>
        <div className="absolute inset-x-3 bottom-3 h-1 rounded-full bg-white/25"><span className="block h-full w-0 rounded-full bg-mangga" /></div>
      </div>
      <h1 className="mt-4 text-[22px] font-bold leading-snug">{tx(lesson.title)}</h1>
      <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{tx(lesson.summary)}</p>
      <button onClick={onSkip} className="mt-2 min-h-11 text-[14px] font-semibold text-teal underline underline-offset-4">
        {t('Hindi makapanood ngayon? Tingnan ang picture cards', "Can't watch right now? See the picture cards")}
      </button>
    </div>
  )
}

function PictureCards({ lesson }: { lesson: LessonT }) {
  const [i, setI] = useState(0)
  const { t, tx } = useT()
  return (
    <div>
      <p className="text-[13.5px] text-muted">{t('I-swipe para makita ang buong idea, kahit walang video.', 'Swipe to see the whole idea, no video needed.')}</p>
      <div
        className="snap-row -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2"
        onScroll={e => {
          const el = e.currentTarget
          setI(Math.round(el.scrollLeft / (el.firstElementChild as HTMLElement).offsetWidth))
        }}
      >
        {lesson.cards.map((c, n) => (
          <article key={c.title.en} className="w-[86%] shrink-0 rounded-3xl border border-line bg-card p-3">
            <IconScene icon={c.icon} tint={tints[lesson.letter]} fg={SEXY[lesson.letter].text} className="h-52" />
            <div className="px-1 pb-1 pt-3">
              <p className="text-[12px] font-semibold text-muted">{n + 1} / {lesson.cards.length}</p>
              <h2 className="mt-0.5 text-[20px] font-bold leading-snug">{tx(c.title)}</h2>
              <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{tx(c.body)}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1.5" aria-hidden>
        {lesson.cards.map((c, n) => <span key={c.title.en} className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-teal' : 'w-2 bg-line'}`} />)}
      </div>
    </div>
  )
}

function Quiz({ lesson }: { lesson: LessonT }) {
  const { t, tx } = useT()
  const [picked, setPicked] = useState<number | null>(null)
  const q = lesson.quiz
  const right = picked === q.correct
  return (
    <div>
      <p className="text-[12.5px] font-semibold uppercase tracking-wide text-muted">{t('Isang tanong lang', 'Just one question')}</p>
      <h2 className="mt-1 text-[21px] font-bold leading-snug">{tx(q.q)}</h2>
      <div className="mt-4 grid gap-2" role="radiogroup">
        {q.options.map((o, n) => {
          const state = picked === null ? 'idle' : n === q.correct ? 'right' : n === picked ? 'wrong' : 'dim'
          return (
            <button
              key={o.en}
              role="radio"
              aria-checked={picked === n}
              disabled={picked !== null}
              onClick={() => setPicked(n)}
              className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 p-3 text-left text-[15px] font-medium transition ${
                state === 'right' ? 'border-teal bg-teal-tint' : state === 'wrong' ? 'border-sexy-y bg-[#fbe7e5]' : state === 'dim' ? 'border-line bg-card opacity-60' : 'border-line bg-card hover:border-teal/40'
              }`}
            >
              <span className={`grid size-7 shrink-0 place-items-center rounded-full border-2 text-[12px] font-bold ${state === 'right' ? 'border-teal bg-teal text-white' : state === 'wrong' ? 'border-sexy-y bg-sexy-y text-white' : 'border-line'}`}>
                {state === 'right' ? <Check size={15} strokeWidth={3} /> : state === 'wrong' ? <X size={15} strokeWidth={3} /> : String.fromCharCode(65 + n)}
              </span>
              {tx(o)}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div role="status" className={`rise mt-4 rounded-2xl p-4 ${right ? 'bg-teal text-white' : 'bg-mangga-soft'}`}>
          <p className="text-[15px] font-semibold leading-snug">{tx(right ? q.right : q.wrong)}</p>
          {!right && (
            <button onClick={() => setPicked(null)} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-teal underline underline-offset-4">
              <RotateCcw size={15} /> {t('Subukan ulit', 'Try again')}
            </button>
          )}
          {right && <p className="mt-1 text-[13.5px] text-white/85">{t('Ngayon, isang maliit na totoong hakbang: pindutin ang Gawin na.', 'Now one small real step: tap Do it now.')}</p>}
        </div>
      )}
    </div>
  )
}

/* ---------- "Gawin na" actions ---------- */

function ActionSheet({ lesson, open, onClose }: { lesson: LessonT; open: boolean; onClose: () => void }) {
  const { set, state } = useDemo()
  const nav = useNavigate()
  const [finished, setFinished] = useState(false)
  const { t, tx } = useT()
  const next = lessons.find(l => l.id !== lesson.id && !state.lessonsDone.includes(l.id))

  const finish = () => {
    set(s => ({ lessonsDone: s.lessonsDone.includes(lesson.id) ? s.lessonsDone : [...s.lessonsDone, lesson.id] }))
    setFinished(true)
  }
  const close = () => { setFinished(false); onClose() }

  return (
    <Sheet open={open} onClose={close} title={finished ? t('Nagawa mo!', 'You did it!') : tx(lesson.action.label)}>
      {finished ? (
        <div className="text-center">
          <span className="stone mx-auto grid size-20 place-items-center bg-teal text-white"><BadgeCheck size={36} /></span>
          <p className="mt-3 text-[16px] font-semibold">{t(`Tapos na ang lesson na "${lesson.title.tl}".`, `You finished "${lesson.title.en}".`)}</p>
          <p className="mt-1 text-[14px] text-muted">{t('Nadagdag ang badge na', 'You earned the')} <b>{lesson.letter}</b> {t('sa Unang Hakbang mo.', 'badge in your first steps.')}</p>
          <div className="mt-5 grid gap-2">
            {next ? (
              <Button full onClick={() => { close(); nav(`/hakbang/lesson/${next.id}`) }}>{t('Susunod', 'Next')}: {tx(next.title)}</Button>
            ) : (
              <Button full onClick={() => { close(); nav('/sumali') }}>{t('Sumali sa KaSosyo', 'Join KaSosyo')}</Button>
            )}
            <Button full variant="ghost" onClick={() => { close(); nav('/hakbang') }}>{t('Balik sa Unang Hakbang', 'Back to my first steps')}</Button>
          </div>
        </div>
      ) : lesson.id === 'scam' ? <ScamCheck onDone={finish} />
        : lesson.id === 'emergency' ? <GoalSetter onDone={finish} />
        : lesson.id === 'impact' ? <ImpactPicker onDone={finish} />
        : <CompareOptions onDone={finish} />}
    </Sheet>
  )
}

const flags = [
  { tl: '"Guaranteed" daw ang kita', en: 'Returns are "guaranteed"' },
  { tl: 'Sobrang laki o sobrang bilis ng kita', en: 'Returns are huge or super fast' },
  { tl: 'Minamadali ka ("limited slots", "ngayon lang")', en: 'You\'re being rushed ("limited slots", "today only")' },
  { tl: 'Hindi nila maipakita ang rehistro sa CDA o SEC', en: "They can't show a CDA or SEC registration" },
  { tl: 'Hindi malinaw kung saan napupunta ang pera', en: "It's unclear where the money goes" },
  { tl: 'Mas malaki ang kita mo kapag nag-recruit ka', en: 'You earn more if you recruit others' },
]

function ScamCheck({ onDone }: { onDone: () => void }) {
  const [checked, setChecked] = useState<boolean[]>(flags.map(() => false))
  const n = checked.filter(Boolean).length
  const { t, tx } = useT()
  const verdict =
    n === 0 ? { msg: t('Walang red flag sa ngayon. Itanong pa rin ang rehistro bago magbayad.', 'No red flags so far. Still ask for the registration before paying.'), c: 'bg-teal-tint' }
    : n <= 2 ? { msg: t(`${n} red flag. Huminto muna at magtanong bago maglabas ng pera.`, `${n} red flag${n > 1 ? 's' : ''}. Stop and ask questions before paying anything.`), c: 'bg-mangga-soft' }
    : { msg: t(`${n} red flags. Malaki ang tsansang scam ito. Huwag ituloy.`, `${n} red flags. This is very likely a scam. Don't go ahead.`), c: 'bg-[#fbe7e5]' }
  return (
    <div>
      <p className="text-[14.5px] text-muted">{t('Isipin ang isang offer na nakita mo kamakailan. Alin dito ang totoo tungkol dito?', 'Think of an offer you saw recently. Which of these are true about it?')}</p>
      <div className="mt-3 grid gap-2">
        {flags.map((f, i) => (
          <Checkbox key={f.en} checked={checked[i]} onChange={v => setChecked(c => c.map((x, j) => (j === i ? v : x)))}>{tx(f)}</Checkbox>
        ))}
      </div>
      <div role="status" className={`mt-3 rounded-2xl p-3 text-[14.5px] font-semibold ${verdict.c}`}>{verdict.msg}</div>
      <Button full className="mt-4" onClick={onDone}>{t('Tapos na ang check ko', "I'm done checking")}</Button>
    </div>
  )
}

function GoalSetter({ onDone }: { onDone: () => void }) {
  const { set } = useDemo()
  const [monthly, setMonthly] = useState(10000)
  const [months, setMonths] = useState(3)
  const goal = monthly * months
  const { t } = useT()
  return (
    <div>
      <label className="block text-[14px] font-semibold" htmlFor="monthly">{t('Magkano ang gastos mo kada buwan?', 'How much do you spend a month?')}</label>
      <div className="mt-2 flex items-center rounded-2xl border-2 border-line bg-card px-3 focus-within:border-teal">
        <span className="text-[18px] font-semibold text-muted">₱</span>
        <input id="monthly" inputMode="numeric" value={monthly.toLocaleString('en-PH')} onChange={e => setMonthly(Number(e.target.value.replace(/\D/g, '')) || 0)} className="h-12 w-full bg-transparent px-2 text-[18px] font-semibold outline-none" />
      </div>
      <p className="mt-4 text-[14px] font-semibold">{t('Ilang buwan ang gusto mong sandalan?', 'How many months of cushion do you want?')}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[3, 4, 6].map(m => (
          <button key={m} onClick={() => setMonths(m)} aria-pressed={months === m} className={`min-h-12 rounded-2xl border-2 text-[15px] font-semibold ${months === m ? 'border-teal bg-teal-soft text-teal' : 'border-line bg-card'}`}>
            {m} {t('buwan', 'months')}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-mangga-soft p-4">
        <p className="text-[13px] text-muted">{t('Ang emergency-fund goal mo', 'Your emergency-fund goal')}</p>
        <p className="font-display text-[28px] font-extrabold">{peso(goal)}</p>
        <p className="text-[13px] text-muted">{t('Unti-unti lang, tuwing sweldo. Ang habit ang mahalaga.', 'Little by little, every payday. The habit is what counts.')}</p>
      </div>
      <Button full className="mt-4" disabled={goal <= 0} onClick={() => { set({ goal: { label: 'Emergency fund', amount: goal } }); onDone() }}>{t('I-save ang goal', 'Save goal')}</Button>
    </div>
  )
}

export const impactAreas = [
  { tl: 'Kababaihang negosyante', en: 'Women entrepreneurs' },
  { tl: 'Sari-sari stores', en: 'Sari-sari stores' },
  { tl: 'Mga negosyo sa probinsya', en: 'Businesses in the provinces' },
  { tl: 'Pagkain at agrikultura', en: 'Food and farming' },
  { tl: 'Mga pamilyang OFW', en: 'OFW families' },
]

function ImpactPicker({ onDone }: { onDone: () => void }) {
  const { state, set } = useDemo()
  const [picks, setPicks] = useState<string[]>(state.impactPicks)
  const { t, tx } = useT()
  const toggle = (a: string) => setPicks(p => (p.includes(a) ? p.filter(x => x !== a) : [...p, a]))
  return (
    <div>
      <p className="text-[14.5px] text-muted">{t('Pumili ng kahit ilan. Gagamitin namin ito para ipakita sa Kwento ang mga partner na malapit sa puso mo.', 'Pick as many as you like. We use this to show you partner stories you care about in Kwento.')}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {impactAreas.map(x => {
          const a = x.tl
          return (
          <button key={a} onClick={() => toggle(a)} aria-pressed={picks.includes(a)} className={`flex min-h-11 items-center gap-1.5 rounded-full border-2 px-4 text-[14px] font-semibold ${picks.includes(a) ? 'border-teal bg-teal text-white' : 'border-line bg-card'}`}>
            {picks.includes(a) && <Check size={15} strokeWidth={3} />} {tx(x)}
          </button>
          )
        })}
      </div>
      <p className="mt-3 text-[12px] text-muted"><TBC>[{t('Mga totoong impact area ng KaNegosyo', "KaNegosyo's real impact areas")} — confirm with SEDPI]</TBC></p>
      <p className="mt-2 text-[13px] leading-snug text-muted">{t('Paalala: pooled ang pera, kaya hindi mo pinipili ang iisang partner. Ipinapakita lang namin ang mga kwentong gusto mong makita.', "Note: the money is pooled, so you don't pick a single partner. We only show you the stories you want to see.")}</p>
      <Button full className="mt-4" disabled={!picks.length} onClick={() => { set({ impactPicks: picks }); onDone() }}>{t('I-save ang pinili ko', 'Save my picks')}</Button>
    </div>
  )
}

const compareRows: { letter: SexyLetter; label: Txt; cells: Txt[] }[] = [
  {
    letter: 'S', label: { tl: 'Gaano kaligtas', en: 'How safe' },
    cells: [{ tl: 'CDA-registered co-op, may audited reports', en: 'CDA-registered co-op with audited reports' }, { tl: '[confirm]', en: '[confirm]' }, { tl: '[confirm: PDIC coverage]', en: '[confirm: PDIC coverage]' }],
  },
  {
    letter: 'E', label: { tl: 'Kailan makukuha', en: 'When you can withdraw' },
    cells: [{ tl: 'Pagkatapos ng term (6 buwan–5 taon)', en: 'After the term (6 months–5 years)' }, { tl: '[confirm: term at withdrawal]', en: '[confirm: term and withdrawal]' }, { tl: 'Kahit kailan', en: 'Any time' }],
  },
  {
    letter: 'X', label: { tl: 'Saan napupunta', en: 'Where it goes' },
    cells: [{ tl: 'Pool para sa nano-negosyo', en: 'A pool for nano-businesses' }, { tl: '[confirm]', en: '[confirm]' }, { tl: '[confirm]', en: '[confirm]' }],
  },
  {
    letter: 'Y', label: { tl: 'Kita (not guaranteed)', en: 'Returns (not guaranteed)' },
    cells: [{ tl: '[historical average — confirm with SEDPI]', en: '[historical average — confirm with SEDPI]' }, { tl: '[confirm]', en: '[confirm]' }, { tl: '[confirm]', en: '[confirm]' }],
  },
]

function CompareOptions({ onDone }: { onDone: () => void }) {
  const { t, tx } = useT()
  const cols = ['KaSosyo JVS', 'Pag-IBIG MP2', 'Savings account']
  return (
    <div>
      <p className="text-[14.5px] text-muted">{t('Ikumpara sa SEXY order. Ang kita ang huling row, sadyang ganoon.', 'Compared in SEXY order. Returns are the last row, on purpose.')}</p>
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[12px] font-bold">
        {cols.map(c => <div key={c} className="rounded-xl bg-teal-tint px-1 py-2 leading-tight">{c}</div>)}
      </div>
      <div className="mt-2 grid gap-3">
        {compareRows.map(r => (
          <div key={r.letter}>
            <p className="flex items-center gap-2 text-[13.5px] font-semibold"><SexyBadge letter={r.letter} size="sm" /> {tx(r.label)}</p>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {r.cells.map((c, i) => (
                <div key={i} className={`rounded-xl border border-line bg-card p-2 text-[12px] leading-snug ${c.en.startsWith('[') ? 'font-mono text-[11px] text-muted' : ''}`}>{tx(c)}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12.5px] leading-snug text-muted">{t('Walang tamang sagot para sa lahat. Piliin ang tugma sa goal mo, at pwede mong pagsabayin.', "There's no one right answer for everyone. Pick what fits your goal, and you can use more than one.")}</p>
      <Button full className="mt-4" onClick={onDone}>{t('Naikumpara ko na', "I've compared them")}</Button>
    </div>
  )
}
