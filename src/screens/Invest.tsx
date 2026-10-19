import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Hammer, GraduationCap, House } from 'lucide-react'
import { Button, ChoiceCard, Screen, SexyBadge, StickyBar, TBC, TopBar } from '../components/ui'
import { peso, useDemo, useT, type DemoState, type Lang, type Txt } from '../state'

type Goal = NonNullable<DemoState['jvs']>['goal']

const goals: { id: Goal; title: Txt; when: Txt; example: Txt; icon: typeof House; terms: number[] }[] = [
  { id: 'near', title: { tl: 'Malapit na', en: 'Soon' }, when: { tl: '6 na buwan', en: '6 months' }, example: { tl: 'Hal. house repair sa susunod na summer', en: 'E.g. a house repair next summer' }, icon: Hammer, terms: [6] },
  { id: 'medium', title: { tl: 'Katamtaman', en: 'Medium' }, when: { tl: '1–2 taon', en: '1–2 years' }, example: { tl: 'Hal. tuition o puhunan sa maliit na negosyo', en: 'E.g. tuition or capital for a small business' }, icon: GraduationCap, terms: [12, 24] },
  { id: 'far', title: { tl: 'Malayo pa', en: 'Far off' }, when: { tl: '3–5 taon', en: '3–5 years' }, example: { tl: 'Hal. sariling bahay o pang-retiro', en: 'E.g. your own home or retirement' }, icon: House, terms: [36, 48, 60] },
]
const allTerms = [6, 12, 24, 36, 48, 60]
export const termLabel = (m: number, lang: Lang = 'tl') =>
  lang === 'en' ? (m < 12 ? `${m} months` : `${m / 12} year${m > 12 ? 's' : ''}`) : m < 12 ? `${m} buwan` : `${m / 12} taon`
export const addMonths = (m: number, from = new Date()) => {
  const d = new Date(from)
  d.setMonth(d.getMonth() + m)
  return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Invest() {
  const { set, toast } = useDemo()
  const { t, tx, lang } = useT()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const preset = goals.find(g => g.id === params.get('goal'))
  const [goal, setGoal] = useState<Goal | null>(preset?.id ?? null)
  const [term, setTerm] = useState<number | null>(preset?.terms[0] ?? null)
  const [amountText, setAmountText] = useState('10,000')
  const amount = Number(amountText.replace(/\D/g, '')) || 0
  const tooLow = amount < 10000
  const suggested = goals.find(g => g.id === goal)?.terms ?? []
  const ready = goal && term && !tooLow

  return (
    <Screen>
      <TopBar back="/sumali/done" title={t('Ang unang JVS mo', 'Your first JVS')} />
      <section className="px-5 pt-5">
        <h1 className="text-[26px] font-extrabold leading-tight">{t('Para saan ang pera?', 'What is the money for?')}</h1>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
          {t('Ang', 'A')} <b className="text-ink">JVS (Joint Venture Savings)</b> {t('ang paraan ng pag-invest sa KaSosyo. Ang goal mo ang pipili ng tamang haba.', 'is how you invest in KaSosyo. Your goal decides how long it should be.')}
        </p>
      </section>

      <div className="grid gap-2 px-4 pt-4" role="radiogroup" aria-label={t('Goal', 'Goal')}>
        {goals.map(g => (
          <ChoiceCard key={g.id} selected={goal === g.id} onClick={() => { setGoal(g.id); setTerm(g.terms[0]) }} className="flex items-center gap-3 pr-10">
            <span className="stone grid size-11 shrink-0 place-items-center bg-teal-tint text-teal"><g.icon size={20} /></span>
            <span>
              <span className="block text-[15.5px] font-semibold">{tx(g.title)} <span className="font-normal text-muted">· {tx(g.when)}</span></span>
              <span className="block text-[13px] text-muted">{tx(g.example)}</span>
            </span>
          </ChoiceCard>
        ))}
      </div>

      {goal && (
        <section className="rise px-4 pt-6">
          <h2 className="px-1 text-[17px] font-bold">{t('Haba ng term', 'Term length')}</h2>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {allTerms.map(term_ => {
              const fit = suggested.includes(term_)
              return (
                <button key={term_} onClick={() => setTerm(term_)} aria-pressed={term === term_}
                  className={`relative min-h-12 rounded-2xl border-2 text-[14.5px] font-semibold ${term === term_ ? 'border-teal bg-teal text-white' : fit ? 'border-teal/50 bg-teal-soft text-teal' : 'border-line bg-card text-muted'}`}>
                  {termLabel(term_, lang)}
                  {fit && <span className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-1.5 text-[10px] font-bold ${term === term_ ? 'bg-mangga text-ink' : 'bg-teal text-white'}`}>{t('tugma', 'fits')}</span>}
                </button>
              )
            })}
          </div>

          <h2 className="mt-6 px-1 text-[17px] font-bold"><label htmlFor="amt">{t('Magkano?', 'How much?')}</label></h2>
          <div className={`mt-2 flex items-center rounded-2xl border-2 bg-card px-3.5 focus-within:border-teal ${tooLow ? 'border-sexy-y' : 'border-line'}`}>
            <span className="text-[20px] font-semibold text-muted">₱</span>
            <input id="amt" inputMode="numeric" value={amountText} onChange={e => { const n = Number(e.target.value.replace(/\D/g, '')); setAmountText(n ? n.toLocaleString('en-PH') : '') }} className="h-14 w-full bg-transparent px-2 font-display text-[24px] font-bold outline-none" aria-describedby="amt-hint" />
          </div>
          <p id="amt-hint" className={`mt-1 px-1 text-[12.5px] ${tooLow ? 'font-semibold text-sexy-y' : 'text-muted'}`}>
            {tooLow ? t('Ang minimum ay ₱10,000. Pwede mo muna itong ipunin.', 'The minimum is ₱10,000. You can save up for it first.') : t('Minimum ₱10,000.', 'Minimum ₱10,000.')}
          </p>

          {/* SEXY, in order. Yield last and small. */}
          <h2 className="mt-6 px-1 text-[17px] font-bold">{t('Bago ka mag-desisyon', 'Before you decide')}</h2>
          <ul className="mt-2 grid gap-2 pb-6">
            <li className="flex gap-3 rounded-2xl border border-line bg-card p-3.5"><SexyBadge letter="S" /><p className="text-[14px] leading-snug"><b>{t('Ligtas', 'Safe')}:</b> {t('CDA-registered co-op na naglalabas ng audited financial statements.', 'A CDA-registered co-op that publishes audited financial statements.')}</p></li>
            <li className="flex gap-3 rounded-2xl border border-line bg-card p-3.5"><SexyBadge letter="E" /><p className="text-[14px] leading-snug"><b>{t('Makukuha', 'Withdrawable')}:</b> {t('pagkatapos ng term', 'after the term')}{term ? <>, {t('sa', 'on')} <b>{addMonths(term)}</b></> : ''}. {t('Ikaw ang pipili kung itutuloy o iwi-withdraw.', 'You choose whether to continue or withdraw.')} <TBC>[early withdrawal — confirm with SEDPI]</TBC></p></li>
            <li className="flex gap-3 rounded-2xl border border-line bg-card p-3.5"><SexyBadge letter="X" /><p className="text-[14px] leading-snug"><b>{t('May epekto', 'Impact')}:</b> {t('sumasama ang pera mo sa pool na sumusuporta sa KaNegosyo partners.', 'your money joins the pool that supports KaNegosyo partners.')}</p></li>
            <li className="flex items-center gap-3 px-1 pt-1"><SexyBadge letter="Y" size="sm" /><p className="text-[12.5px] leading-snug text-muted">{t('Kita', 'Returns')}: <TBC>[historical average — confirm with SEDPI]</TBC> · not guaranteed</p></li>
          </ul>
        </section>
      )}

      <StickyBar>
        {ready && <p className="mb-2 text-center text-[13px] text-muted">{peso(amount)} · {termLabel(term!, lang)} · {t('matatapos sa', 'ends')} {addMonths(term!)}</p>}
        <Button full disabled={!ready} onClick={() => { set({ jvs: { goal: goal!, termMonths: term!, amount } }); toast(t('Naka-save ang JVS plan mo.', 'Your JVS plan is saved.') + ' [KaSosyo Online handoff — confirm with SEDPI]'); nav('/app') }}>
          {ready ? <>{t('I-save ang JVS plan', 'Save my JVS plan')} <ArrowRight size={18} /></> : goal ? t('Ayusin ang halaga', 'Fix the amount') : t('Pumili muna ng goal', 'Pick a goal first')}
        </Button>
      </StickyBar>
    </Screen>
  )
}
