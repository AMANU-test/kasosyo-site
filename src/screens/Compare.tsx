import { ArrowRight, FileWarning, ListX, UserRoundSearch } from 'lucide-react'
import { Screen } from '../components/ui'
import { useT } from '../state'
import { appUrl } from '../config'

const SCALE = 0.428
const W = 390
const BOX_H = 212

/** The top of one of the new screens: live, cropped, non-interactive. */
function Mini({ path }: { path: string }) {
  return (
    <div className="overflow-hidden rounded-t-[22px] border-[3px] border-b-0 border-ink bg-paper" style={{ height: BOX_H }}>
      <iframe
        src={appUrl(path)}
        title={path}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none origin-top-left border-0"
        style={{ width: W, height: BOX_H / SCALE, transform: `scale(${SCALE})` }}
      />
    </div>
  )
}

const rows = [
  {
    problem: 'Info first, value last', icon: UserRoundSearch, path: '/',
    note: { tl: 'Pangalan, email at phone muna bago ang kahit anong sagot.', en: 'Name, email and phone first, before any answers.' },
    fix: { tl: 'Video at 3 hakbang muna, walang form', en: 'Video and 3 steps first, no form' },
  },
  {
    problem: '9 cards of legal text', icon: ListX, path: '/sumali?step=1',
    note: { tl: 'CDA, SFI, fees, principles, vision at mission, sunod-sunod.', en: 'CDA, SFI, fees, principles, vision and mission, one after another.' },
    fix: { tl: '5 maikling kabanata, may check', en: '5 short chapters with checkmarks' },
  },
  {
    problem: 'Ends before payment', icon: FileWarning, path: '/sumali/done',
    note: { tl: 'Tapos ang chat bago gumawa ng KSO account at magbayad.', en: 'The chat ends before the KSO account and payment.' },
    fix: { tl: 'Bayad at resibo, iisang flow', en: 'Payment and receipt in one flow' },
  },
]

/** J. Before / after, two columns at phone width. */
export default function Compare() {
  const { t, tx } = useT()
  return (
    <Screen>
      <div className="px-4 pt-5">
        <h1 className="text-[23px] font-extrabold leading-tight">{t('Ngayon vs. Unang Hakbang', 'Today vs. Unang Hakbang')}</h1>
        <div className="mt-2 grid grid-cols-2 gap-3 text-[11.5px] font-bold uppercase tracking-wider">
          <p className="text-muted">{t('Ngayon (chatbot)', 'Today (chatbot)')}</p>
          <p className="text-teal">Unang Hakbang</p>
        </div>
      </div>
      <div className="grid gap-3 px-4 pb-5 pt-1.5">
        {rows.map(r => (
          <div key={r.problem} className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex flex-col items-center justify-center gap-1.5 rounded-t-[22px] border-[3px] border-b-0 border-[#c9cec8] bg-[#e4e6e2] px-3 text-center" style={{ height: BOX_H }}>
                <r.icon size={26} className="text-[#7b847f]" aria-hidden />
                <p className="font-display text-[16px] font-bold leading-tight text-[#4d5652]">"{r.problem}"</p>
                <p className="text-[11.5px] leading-snug text-[#5f6863]">{tx(r.note)}</p>
              </div>
            </div>
            <div>
              <Mini path={r.path} />
              <p className="mt-1 flex items-start gap-1 text-[11.5px] font-semibold leading-snug text-teal"><ArrowRight size={13} className="mt-0.5 shrink-0" />{tx(r.fix)}</p>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  )
}
