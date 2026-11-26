import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Send, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { LangToggle, Screen } from '../components/ui'
import { useT } from '../state'

function Day({ children }: { children: ReactNode }) {
  return <p className="my-3 text-center text-[11.5px] font-semibold text-muted">{children}</p>
}

function Bot({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <span className="stone grid size-7 shrink-0 place-items-center bg-teal font-display text-[12px] font-bold text-white">K</span>
      <div className="max-w-[78%] rounded-[20px] rounded-bl-md bg-white px-3.5 py-2.5 text-[14.5px] leading-snug shadow-[0_1px_0_rgba(0,0,0,.05)]">{children}</div>
    </div>
  )
}

function Me({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-[20px] rounded-br-md bg-teal px-3.5 py-2.5 text-[14.5px] leading-snug text-white">{children}</div>
    </div>
  )
}

function Replies({ items }: { items: string[] }) {
  return (
    <div className="ml-9 mt-2 flex flex-wrap gap-1.5">
      {items.map(r => <span key={r} className="flex min-h-9 items-center rounded-full border-2 border-teal/60 bg-paper px-3 text-[13px] font-semibold text-teal">{r}</span>)}
    </div>
  )
}

/** I. Generic chat UI (not Messenger's branding) showing three follow-up nudges. */
export default function Nudges() {
  const { t } = useT()
  return (
    <Screen className="bg-[#eef1ec]">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b border-line bg-paper px-2">
        <Link to="/" aria-label={t('nudges.back')} className="grid size-11 place-items-center"><ChevronLeft size={22} /></Link>
        <span className="stone grid size-10 place-items-center bg-teal font-display font-bold text-white">K</span>
        <div className="flex-1">
          <p className="text-[15px] font-semibold leading-tight">SEDPI KaSosyo</p>
          <p className="text-[12px] text-muted">{t('nudges.reminders_only_you_can_turn_these')}</p>
        </div>
        <LangToggle className="mr-1" />
      </header>

      <div className="flex-1 space-y-2 px-3 pb-6">
        <Day>{t('nudges.monday')}, 7:30 PM</Day>
        <Bot>{t('nudges.hi_bea_youre_on_step_2')}</Bot>
        <Replies items={[t('nudges.yes_continue'), t('nudges.not_yet'), t('nudges.i_have_a_question')]} />
        <Me>{t('nudges.yes_continue')}</Me>
        <Bot>{t('nudges.great_pick_up_where_you_left')} <Link to="/sumali?step=2" className="font-semibold text-teal underline">sedpi.com/kasosyo/sumali</Link></Bot>

        <Day>{t('nudges.thursday')}, 10:12 AM</Day>
        <Bot>{t('nudges.we_received_your_1_100_thank')}</Bot>
        <Replies items={[t('nudges.thanks'), t('nudges.i_have_a_question')]} />

        <Day>[{t('nudges.maturity_date')}]</Day>
        <Bot>
          {t('nudges.your_money_is_awake_your_jvs')}
          <Link to="/app/maturity" className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-mangga-soft p-2.5 text-ink">
            <span className="stone grid size-9 shrink-0 place-items-center bg-mangga"><Sun size={17} /></span>
            <span className="flex-1 text-[13px] font-semibold leading-tight">{t('nudges.see_your_options')}<span className="block font-normal text-muted">sedpi.com/kasosyo</span></span>
            <ChevronRight size={17} />
          </Link>
        </Bot>
        <Replies items={[t('nudges.ill_take_a_look'), t('nudges.remind_me_tomorrow'), t('nudges.i_have_a_question')]} />
      </div>

      <div className="sticky bottom-0 flex items-center gap-2 border-t border-line bg-paper px-3 py-2.5">
        <div className="flex h-11 flex-1 items-center rounded-full bg-white px-4 text-[14px] text-muted">{t('nudges.type_a_message')}</div>
        <span className="grid size-11 place-items-center rounded-full bg-teal text-white"><Send size={18} /></span>
      </div>
    </Screen>
  )
}
