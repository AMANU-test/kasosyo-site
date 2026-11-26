import { useState, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowRight, BadgeCheck, Bell, Check, ChevronDown, Clock, Mail, MessageCircle, Play, Receipt, Save, ScrollText, ShieldCheck, Store, Upload, Users,
} from 'lucide-react'
import { Button, ChatFab, Checkbox, ChoiceCard, IconScene, Photo, Screen, Sheet, StickyBar, Stones, TBC, TopBar, useMessenger } from '../components/ui'
import type { PhotoSlot } from '../data/photos'
import { useDemo, useT, type Txt } from '../state'


export const chapters: { title: Txt; summary: Txt; min: string; icon: typeof Store; tint: string; fg: string; photo?: PhotoSlot }[] = [
  {
    title: { tl: 'Ano ang makukuha mo bilang member', en: 'What you get as a member' },
    summary: { tl: 'Co-owner ka ng co-op, at pwede ka nang mag-invest sa JVS.', en: "You become a co-owner of the co-op, and you can invest in a JVS." },
    min: '1:30', icon: BadgeCheck, tint: 'bg-mangga-soft', fg: 'text-sexy-x', photo: 'sedpi-community',
  },
  {
    title: { tl: 'Paano ginagamit ang pera mo', en: 'How your money is used' },
    summary: { tl: 'Pinagsasama ang ipon; ang pool ang sumusuporta sa KaNegosyo partners.', en: 'Savings are pooled; the pool supports KaNegosyo partners.' },
    min: '2:00', icon: Store, tint: 'bg-[#f7e2d2]', fg: 'text-sexy-x', photo: 'kanegosyo-branch',
  },
  {
    title: { tl: 'Ligtas ba?', en: 'Is it safe?' },
    summary: { tl: 'CDA-registered mula July 21, 2021, at may audited financial statements.', en: 'CDA-registered since July 21, 2021, with audited financial statements.' },
    min: '1:30', icon: ShieldCheck, tint: 'bg-[#d6ecec]', fg: 'text-sexy-s', photo: 'cda-certificate',
  },
  {
    title: { tl: 'Mga karapatan at tungkulin mo', en: 'Your rights and duties' },
    summary: { tl: 'Ano ang pwede mong gawin bilang associate member, at ano ang inaasahan sa iyo.', en: 'What you can do as an associate member, and what is expected of you.' },
    min: '2:00', icon: Users, tint: 'bg-[#e6def2]', fg: 'text-sexy-e',
  },
  {
    title: { tl: 'Mga prinsipyo at patakaran', en: 'Principles and rules' },
    summary: { tl: 'Ang co-op principles at mga patakaran ng SEDPI Coop, sa simpleng salita.', en: "Co-op principles and SEDPI Coop's rules, in plain words." },
    min: '1:30', icon: ScrollText, tint: 'bg-teal-tint', fg: 'text-teal',
  },
]

export default function Sumali() {
  const [params, setParams] = useSearchParams()
  const step = Math.min(4, Math.max(1, Number(params.get('step')) || 1))
  const go = (s: number) => { setParams({ step: String(s) }); window.scrollTo(0, 0) }
  const { toast } = useDemo()
  const { t } = useT()
  const steps = [t('sumali.learn'), t('sumali.you'), t('sumali.terms'), t('sumali.pay')]

  return (
    <Screen>
      <TopBar
        back={step === 1 ? '/hakbang' : `/sumali?step=${step - 1}`}
        title={t('sumali.join_kasosyo')}
        right={
          <button onClick={() => toast(t('sumali.your_progress_is_saved_continue_any'))} aria-label={t('sumali.save_and_continue_later')} className="flex h-11 items-center gap-1 rounded-full px-2 text-[13px] font-semibold text-teal">
            <Save size={16} /> {t('sumali.save')}
          </button>
        }
      />
      <div className="border-b border-line/70 px-3 pb-3 pt-4">
        <Stones compact steps={steps} current={step - 1} done={i => i < step - 1} />
      </div>

      <div key={step} className="rise flex flex-1 flex-col">
        {step === 1 && <StepKilalanin onNext={() => go(2)} />}
        {step === 2 && <StepIkaw onNext={() => go(3)} />}
        {step === 3 && <StepKasunduan onNext={() => go(4)} />}
        {step === 4 && <StepBayad />}
      </div>
      <ChatFab bottom={step === 4 ? 140 : 92} />
    </Screen>
  )
}

function StepHead({ n, title, children }: { n: number; title: string; children?: ReactNode }) {
  const { t } = useT()
  return (
    <div className="px-5 pt-5">
      <p className="text-[12.5px] font-semibold text-muted">{t(`Hakbang ${n} sa 4`, `Step ${n} of 4`)}</p>
      <h1 className="mt-0.5 text-[26px] font-extrabold leading-tight">{title}</h1>
      {children && <div className="mt-2 text-[14.5px] leading-relaxed text-muted">{children}</div>}
    </div>
  )
}

/* ---------- Step 1: orientation (PMES), redesigned ---------- */

function StepKilalanin({ onNext }: { onNext: () => void }) {
  const { state, set } = useDemo()
  const { t, tx } = useT()
  const [open, setOpen] = useState<number | null>(null)
  const done = state.chaptersDone
  const all = done.length === chapters.length
  const markDone = (i: number) => set(s => ({ chaptersDone: s.chaptersDone.includes(i) ? s.chaptersDone : [...s.chaptersDone, i] }))
  const ch = open !== null ? chapters[open] : null

  return (
    <>
      <StepHead n={1} title={t('sumali.get_to_know_sedpi_coop')}>
        {t('sumali.this_is_the')} <b className="text-ink">orientation</b> {t('sumali.pre_membership_education_seminar_the_short')}
      </StepHead>

      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 px-1 text-[13px] font-semibold text-muted">
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-teal transition-all" style={{ width: `${(done.length / chapters.length) * 100}%` }} /></span>
          {t(`${done.length} sa ${chapters.length} tapos`, `${done.length} of ${chapters.length} done`)}
        </div>
        <ol className="mt-3 grid gap-2 pb-28">
          {chapters.map((c, i) => {
            const isDone = done.includes(i)
            return (
              <li key={c.title.en}>
                <button onClick={() => setOpen(i)} className="flex w-full items-center gap-3 rounded-2xl border border-line bg-card p-2.5 text-left">
                  {c.photo
                    ? <Photo slot={c.photo} compact className="size-16 shrink-0 rounded-2xl" />
                    : <IconScene icon={c.icon} tint={c.tint} fg={c.fg} className="size-16 shrink-0 rounded-2xl [&>svg]:size-7" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-[11.5px] font-semibold text-muted">{t('sumali.chapter')} {i + 1} · {c.min}</p>
                    <p className="text-[15px] font-semibold leading-snug">{tx(c.title)}</p>
                    <p className="text-[12.5px] leading-snug text-muted">{tx(c.summary)}</p>
                  </div>
                  {isDone ? (
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-teal text-white" aria-label={t('sumali.done')}><Check size={16} strokeWidth={3} /></span>
                  ) : (
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-teal/30 text-teal" aria-label={t('sumali.watch')}><Play size={13} fill="currentColor" /></span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <StickyBar>
        <Button full disabled={!all} onClick={onNext}>
          {all ? <>{t('sumali.continue_to_step_2')} <ArrowRight size={18} /></> : t(`Tapusin ang ${chapters.length - done.length} pang kabanata`, `Finish ${chapters.length - done.length} more chapter${chapters.length - done.length > 1 ? 's' : ''}`)}
        </Button>
      </StickyBar>

      <Sheet open={!!ch} onClose={() => setOpen(null)} title={ch ? `${t('sumali.chapter')} ${open! + 1}` : ''}>
        {ch && (
          <div>
            <div className="relative">
              {ch.photo ? <Photo slot={ch.photo} className="h-48 rounded-3xl" /> : <IconScene icon={ch.icon} tint={ch.tint} fg={ch.fg} className="h-48" />}
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold"><Play size={13} fill="currentColor" /> [Video {ch.min}] · CC</span>
            </div>
            <h3 className="mt-4 text-[20px] font-bold leading-snug">{tx(ch.title)}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{tx(ch.summary)}</p>
            <p className="mt-2"><TBC>[{t('sumali.chapter_script_from_the_official_pmes')} — confirm with SEDPI]</TBC></p>
            <Button full className="mt-5" onClick={() => { markDone(open!); setOpen(open! + 1 < chapters.length ? open! + 1 : null) }}>
              <Check size={18} /> {t('sumali.ive_finished_this')}
            </Button>
          </div>
        )}
      </Sheet>
    </>
  )
}

/* ---------- Step 2: details, only now ---------- */

function Field({ id, label, hint, error, ...p }: { id: string; label: string; hint?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-semibold">{label}</label>
      <input id={id} {...p} aria-invalid={!!error} aria-describedby={`${id}-hint`}
        className={`mt-1.5 h-12 w-full rounded-2xl border-2 bg-card px-3.5 text-[16px] outline-none focus:border-teal ${error ? 'border-sexy-y' : 'border-line'}`} />
      <p id={`${id}-hint`} className={`mt-1 text-[12.5px] ${error ? 'font-semibold text-sexy-y' : 'text-muted'}`}>{error ?? hint}</p>
    </div>
  )
}

function StepIkaw({ onNext }: { onNext: () => void }) {
  const { state, set } = useDemo()
  const p = state.profile
  const update = (patch: Partial<typeof p>) => set(s => ({ profile: { ...s.profile, ...patch } }))
  const [touched, setTouched] = useState(false)
  const { t } = useT()
  const mobileOk = /^\+639\d{9}$/.test(p.mobile.replace(/\s/g, ''))
  const errors = {
    name: p.name.trim().length < 3 ? t('sumali.enter_your_full_name') : undefined,
    email: /.+@.+\..+/.test(p.email) ? undefined : t('sumali.that_email_looks_incomplete_example_bea'),
    mobile: mobileOk ? undefined : t('sumali.use_the_format_639xxxxxxxxx'),
  }
  const valid = !errors.name && !errors.email && !errors.mobile && p.sfi

  return (
    <>
      <StepHead n={2} title={t('sumali.about_you')}>{t('sumali.we_only_ask_for_your_details')}</StepHead>
      <div className="grid gap-4 px-4 pb-28 pt-5">
        <Field id="name" label={t('sumali.full_name')} hint={t('sumali.same_as_on_your_valid_id')} value={p.name} onChange={e => update({ name: e.target.value })} autoComplete="name" error={touched ? errors.name : undefined} />
        <Field id="email" label="Email" type="email" hint={t('sumali.we_will_send_your_pmes_certificate')} value={p.email} onChange={e => update({ email: e.target.value })} autoComplete="email" error={touched ? errors.email : undefined} />
        <Field id="mobile" label={t('sumali.mobile_number')} type="tel" hint="Format: +639XXXXXXXXX" value={p.mobile} onChange={e => update({ mobile: e.target.value })} autoComplete="tel" error={touched ? errors.mobile : undefined} />
        <div>
          <Checkbox checked={p.sfi} onChange={v => update({ sfi: v })}>
            {t('sumali.also_sign_me_up_for')} <b>SEDPI Foundation, Inc. (SFI)</b> {t('sumali.its_free_this_is_required_to')}
          </Checkbox>
          <p className="mt-1.5 px-1 text-[12.5px] leading-snug text-muted">{t('sumali.an')} <b>associate member</b> {t('sumali.is_a_member_who_can_invest')}</p>
        </div>
      </div>
      <StickyBar>
        <Button full onClick={() => (valid ? onNext() : setTouched(true))}>{t('sumali.continue_to_step_3')} <ArrowRight size={18} /></Button>
        {touched && !valid && <p className="mt-2 text-center text-[12.5px] font-semibold text-sexy-y">{p.sfi ? t('sumali.something_above_still_needs_fixing') : t('sumali.tick_the_sfi_box_to_continue')}</p>}
      </StickyBar>
    </>
  )
}

/* ---------- Step 3: plain-language T&Cs ---------- */

const terms: Txt[] = [
  { tl: 'Magiging associate member ka ng SEDPI Coop at member ng SEDPI Foundation (libre).', en: 'You become an associate member of SEDPI Coop and a member of SEDPI Foundation (free).' },
  { tl: 'Magbabayad ka ng ₱100 na membership fee, isang beses lang (₱500 kung lampas ₱100,000 ang savings mo).', en: 'You pay a ₱100 membership fee, one time only (₱500 if your savings are over ₱100,000).' },
  { tl: 'Ang ₱1,000 na share capital ay sa iyo bilang co-owner. Nananatili ito sa co-op habang member ka.', en: 'The ₱1,000 share capital is yours as a co-owner. It stays in the co-op while you are a member.' },
  { tl: 'Pwede kang magdagdag ng shares nang unti-unti sa loob ng 2 taon.', en: 'You can add more shares little by little over 2 years.' },
  { tl: 'Hindi guaranteed ang kita ng co-op. Makikita mo ang audited financial statements bawat taon.', en: "The co-op's returns are not guaranteed. You can see the audited financial statements every year." },
]

function StepKasunduan({ onNext }: { onNext: () => void }) {
  const { state, set } = useDemo()
  const [checked, setChecked] = useState(state.agreed)
  const [unsure, setUnsure] = useState(false)
  const { t, tx } = useT()
  const openMessenger = useMessenger()
  const nav = useNavigate()
  return (
    <>
      <StepHead n={3} title={t('sumali.the_agreement')}>{t('sumali.the_summary_in_five_points_the')}</StepHead>
      <div className="px-4 pb-28 pt-4">
        <ol className="grid gap-2">
          {terms.map((term, i) => (
            <li key={term.en} className="flex gap-3 rounded-2xl border border-line bg-card p-3.5">
              <span className="stone grid size-7 shrink-0 place-items-center bg-teal-tint font-display text-[13px] font-bold text-teal">{i + 1}</span>
              <p className="text-[14.5px] leading-snug">{tx(term)}</p>
            </li>
          ))}
        </ol>

        <details className="group mt-3 rounded-2xl border border-line bg-card">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-[14.5px] font-semibold text-teal">
            {t('sumali.read_the_full_t_cs')} <ChevronDown size={18} className="transition group-open:rotate-180" />
          </summary>
          <div className="max-h-56 overflow-y-auto border-t border-line px-4 py-3 text-[13px] leading-relaxed text-muted">
            <p><TBC>[{t('sumali.sedpi_coops_full_terms_conditions_official')}]</TBC></p>
            {Array.from({ length: 6 }, (_, i) => <span key={i} className="mt-2 block h-2.5 rounded bg-placeholder" style={{ width: `${70 + ((i * 13) % 30)}%` }} />)}
          </div>
        </details>

        <div className="mt-4">
          <Checkbox checked={checked} onChange={setChecked}>{t('sumali.i_read_the_summary_and_i')}</Checkbox>
        </div>
        <button onClick={() => setUnsure(true)} className="mx-auto mt-3 block min-h-11 text-[14px] font-semibold text-teal underline underline-offset-4">
          {t('sumali.im_not_sure_yet')}
        </button>
      </div>
      <StickyBar>
        <Button full disabled={!checked} onClick={() => { set({ agreed: true }); onNext() }}>{t('sumali.i_agree')}</Button>
      </StickyBar>

      <Sheet open={unsure} onClose={() => setUnsure(false)} title={t('sumali.thats_okay')}>
        <p className="text-[15px] leading-relaxed text-muted">{t('sumali.we_saved_your_progress_up_to')}</p>
        <div className="mt-4 grid gap-2">
          <Button full onClick={() => { setUnsure(false); openMessenger() }}><Bell size={18} /> {t('sumali.remind_me_on_messenger')}</Button>
          <Button full variant="secondary" onClick={() => { setUnsure(false); openMessenger() }}><MessageCircle size={18} /> {t('sumali.i_have_a_question_for_zion')}</Button>
          <Button full variant="ghost" onClick={() => nav('/hakbang')}>{t('sumali.ill_come_back_later')}</Button>
        </div>
      </Sheet>
    </>
  )
}

/* ---------- Step 4: pay + upload receipt ---------- */

const channels = [1, 2, 3].map(n => `[Payment channel ${n} — confirm with SEDPI]`)

function StepBayad() {
  const { set, toast } = useDemo()
  const nav = useNavigate()
  const [channel, setChannel] = useState<number | null>(null)
  const [file, setFile] = useState<{ name: string; url?: string } | null>(null)
  const { t } = useT()

  return (
    <>
      <StepHead n={4} title={t('sumali.pay_the_1_100')}>{t('sumali.one_payment_two_parts')}</StepHead>
      <div className="px-4 pb-32 pt-4">
        {/* Breakdown */}
        <div className="rounded-3xl border border-line bg-card p-4">
          <div className="flex h-14 overflow-hidden rounded-2xl" aria-hidden>
            <div className="grid w-[22%] place-items-center bg-mangga font-display text-[15px] font-bold text-ink">₱100</div>
            <div className="grid flex-1 place-items-center bg-teal font-display text-[15px] font-bold text-white">₱1,000</div>
          </div>
          <dl className="mt-4 grid gap-3">
            <div className="flex gap-3">
              <span className="mt-1 size-3 shrink-0 rounded-full bg-mangga" />
              <div><dt className="text-[15px] font-semibold">₱100 membership fee</dt><dd className="text-[13.5px] text-muted">{t('sumali.one_time_only_500_if_your')}</dd></div>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 size-3 shrink-0 rounded-full bg-teal" />
              <div><dt className="text-[15px] font-semibold">₱1,000 share capital</dt><dd className="text-[13.5px] text-muted">{t('sumali.this_is_yours_as_a_co')}</dd></div>
            </div>
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-line pt-3">
            <span className="text-[14px] font-semibold">{t('sumali.total')}</span>
            <span className="font-display text-[24px] font-extrabold">₱1,100</span>
          </div>
        </div>

        {/* Channels */}
        <h2 className="mt-6 px-1 text-[17px] font-bold">{t('sumali.where_will_you_pay')}</h2>
        <div className="mt-2 grid gap-2" role="radiogroup">
          {channels.map((c, i) => (
            <ChoiceCard key={c} selected={channel === i} onClick={() => setChannel(i)} className="min-h-14 pr-10">
              <span className="font-mono text-[12.5px] text-muted">{c}</span>
            </ChoiceCard>
          ))}
        </div>
        {channel !== null && (
          <div className="rise mt-2 rounded-2xl bg-teal-soft p-3 text-[13px] text-muted">
            {t('sumali.account_details')} <TBC>[account name & number — confirm with SEDPI]</TBC>
          </div>
        )}

        {/* Upload */}
        <h2 className="mt-6 px-1 text-[17px] font-bold">{t('sumali.upload_your_receipt_here')}</h2>
        <p className="px-1 text-[13.5px] text-muted">{t('sumali.a_screenshot_or_photo_this_is')}</p>
        <label className={`mt-2 flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-4 text-center ${file ? 'border-teal bg-teal-soft' : 'border-[#b9c0b8] bg-card'}`}>
          <input type="file" accept="image/*,.pdf" className="sr-only" onChange={e => {
            const f = e.target.files?.[0]
            if (f) setFile({ name: f.name, url: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined })
          }} />
          {file ? (
            <>
              {file.url ? <img src={file.url} alt="" className="h-20 rounded-xl object-cover" /> : <Receipt size={28} className="text-teal" />}
              <span className="text-[14px] font-semibold text-teal">{file.name}</span>
              <span className="text-[12.5px] text-muted">{t('sumali.tap_to_replace')}</span>
            </>
          ) : (
            <>
              <span className="grid size-12 place-items-center rounded-full bg-teal-tint text-teal"><Upload size={22} /></span>
              <span className="text-[14.5px] font-semibold">{t('sumali.choose_a_screenshot_or_photo')}</span>
            </>
          )}
        </label>
        <button onClick={() => setFile({ name: 'resibo-sample.jpg' })} className="mt-1 min-h-11 px-1 text-[12.5px] text-muted underline underline-offset-4">{t('sumali.demo_use_a_sample_receipt')}</button>
      </div>
      <StickyBar>
        <Button full disabled={!file} onClick={() => { set({ receipt: file!.name }); nav('/sumali/done') }}>{t('sumali.submit_receipt')}</Button>
        <button onClick={() => toast(t('sumali.saved_you_can_upload_your_receipt'))} className="mt-1 min-h-11 w-full text-[13.5px] font-semibold text-teal">{t('sumali.ill_upload_it_later')}</button>
      </StickyBar>
    </>
  )
}

/* ---------- Done ---------- */

export function SumaliDone() {
  const { state, set } = useDemo()
  const nav = useNavigate()
  const { t } = useT()
  const timeline = [
    { icon: Mail, title: t('sumali.within_3_days_an_email_from'), body: t('sumali.your_pmes_certificate_and_your_kasosyo') },
    { icon: BadgeCheck, title: t('sumali.your_1_100_gets_confirmed'), body: <>{t('sumali.well_tell_you_once_its_received')} <TBC>[{t('sumali.how_it_is_confirmed')} — confirm with SEDPI]</TBC></> },
    { icon: Clock, title: t('sumali.choose_your_first_jvs'), body: t('sumali.jvs_joint_venture_savings_the_way') },
  ]
  return (
    <Screen>
      <TopBar />
      <div className="rise flex-1 px-5 pb-8 pt-8">
        <span className="stone grid size-20 -rotate-6 place-items-center bg-teal text-white"><Check size={40} strokeWidth={2.5} /></span>
        <h1 className="mt-5 text-[32px] font-extrabold leading-tight">{t('sumali.youre_a_member')} <span className="text-teal">({t('sumali.almost')})</span>!</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{t('sumali.we_got_your_receipt_here_is')}</p>

        <ol className="relative mt-6 grid gap-5">
          <span aria-hidden className="absolute bottom-6 left-[21px] top-6 border-l-2 border-dashed border-teal/30" />
          {timeline.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="relative flex gap-4">
              <span className={`stone z-10 grid size-11 shrink-0 place-items-center ${i === 0 ? 'bg-mangga text-ink' : 'border-2 border-teal/25 bg-paper text-teal'}`}><Icon size={19} /></span>
              <div className="pt-1">
                <p className="text-[15.5px] font-semibold leading-snug">{title}</p>
                <p className="mt-0.5 text-[13.5px] leading-snug text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <label className="mt-7 flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border border-line bg-card p-4">
          <Bell size={20} className="shrink-0 text-teal" />
          <span className="flex-1 text-[14.5px] font-semibold leading-snug">{t('sumali.remind_me_on_messenger')}<span className="block text-[12.5px] font-normal text-muted">{t('sumali.so_you_dont_miss_the_email')}</span></span>
          <input type="checkbox" role="switch" checked={state.messengerOptIn} onChange={e => set({ messengerOptIn: e.target.checked })} className="peer sr-only" />
          <span aria-hidden className={`relative h-7 w-12 shrink-0 rounded-full transition peer-focus-visible:ring-4 peer-focus-visible:ring-mangga ${state.messengerOptIn ? 'bg-teal' : 'bg-line'}`}>
            <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${state.messengerOptIn ? 'left-6' : 'left-1'}`} />
          </span>
        </label>
      </div>
      <StickyBar>
        <Button full onClick={() => nav('/invest')}>{t('sumali.look_at_a_first_jvs')} <ArrowRight size={18} /></Button>
        <button onClick={() => nav('/hakbang')} className="mt-1 min-h-11 w-full text-[13.5px] font-semibold text-teal">{t('sumali.back_to_my_first_steps')}</button>
      </StickyBar>
    </Screen>
  )
}
