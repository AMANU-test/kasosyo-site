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
        <Link to="/" aria-label={t('Bumalik', 'Back')} className="grid size-11 place-items-center"><ChevronLeft size={22} /></Link>
        <span className="stone grid size-10 place-items-center bg-teal font-display font-bold text-white">K</span>
        <div className="flex-1">
          <p className="text-[15px] font-semibold leading-tight">SEDPI KaSosyo</p>
          <p className="text-[12px] text-muted">{t('Mga paalala lang · pwedeng i-off', 'Reminders only · you can turn these off')}</p>
        </div>
        <LangToggle className="mr-1" />
      </header>

      <div className="flex-1 space-y-2 px-3 pb-6">
        <Day>{t('Lunes', 'Monday')}, 7:30 PM</Day>
        <Bot>{t('Hi Bea! Nasa Step 2 ka na ng pagsali sa KaSosyo. Ituloy natin? Mga 5 minuto na lang.', "Hi Bea! You're on Step 2 of joining KaSosyo. Want to continue? About 5 minutes to go.")}</Bot>
        <Replies items={[t('Oo, ituloy', 'Yes, continue'), t('Hindi pa', 'Not yet'), t('May tanong ako', 'I have a question')]} />
        <Me>{t('Oo, ituloy', 'Yes, continue')}</Me>
        <Bot>{t('Sige! Dito ka ulit magsisimula:', 'Great! Pick up where you left off:')} <Link to="/sumali?step=2" className="font-semibold text-teal underline">sedpi.com/kasosyo/sumali</Link></Bot>

        <Day>{t('Huwebes', 'Thursday')}, 10:12 AM</Day>
        <Bot>{t('Natanggap na namin ang ₱1,100 mo. Salamat, Bea! Sa loob ng 3 araw, darating sa email mo ang PMES certificate at ang login mo sa KaSosyo Online.', 'We received your ₱1,100. Thank you, Bea! Within 3 days, your PMES certificate and KaSosyo Online login will arrive by email.')}</Bot>
        <Replies items={[t('Salamat', 'Thanks'), t('May tanong ako', 'I have a question')]} />

        <Day>[{t('Petsa ng maturity', 'Maturity date')}]</Day>
        <Bot>
          {t('Gising na ang pera mo! Natapos na ang term ng JVS mo. Ikaw ang pipili: ituloy, dagdagan, o i-withdraw.', 'Your money is awake! Your JVS term has ended. You choose: continue, top up, or withdraw.')}
          <Link to="/app/maturity" className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-mangga-soft p-2.5 text-ink">
            <span className="stone grid size-9 shrink-0 place-items-center bg-mangga"><Sun size={17} /></span>
            <span className="flex-1 text-[13px] font-semibold leading-tight">{t('Tingnan ang mga pagpipilian', 'See your options')}<span className="block font-normal text-muted">sedpi.com/kasosyo</span></span>
            <ChevronRight size={17} />
          </Link>
        </Bot>
        <Replies items={[t('Titingnan ko', "I'll take a look"), t('Paalalahanan ako bukas', 'Remind me tomorrow'), t('May tanong ako', 'I have a question')]} />
      </div>

      <div className="sticky bottom-0 flex items-center gap-2 border-t border-line bg-paper px-3 py-2.5">
        <div className="flex h-11 flex-1 items-center rounded-full bg-white px-4 text-[14px] text-muted">{t('Mag-type ng mensahe…', 'Type a message…')}</div>
        <span className="grid size-11 place-items-center rounded-full bg-teal text-white"><Send size={18} /></span>
      </div>
    </Screen>
  )
}
