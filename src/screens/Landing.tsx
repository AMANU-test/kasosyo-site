import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ExternalLink, Leaf, MessageCircle, Quote, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow, LinkButton, Photo, Screen, StickyBar, TopBar, useMessenger } from '../components/ui'
import { MoneyFlow } from '../components/MoneyFlow'
import { VideoHero } from '../components/VideoHero'
import { Growth } from '../components/Growth'
import type { PhotoSlot } from '../data/photos'
import { useDemo, useT } from '../state'

export default function Landing() {
  const openMessenger = useMessenger()
  const { toast } = useDemo()
  const { t } = useT()

  // The sticky CTA only appears once the hero button has scrolled away.
  const heroCta = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(true)
  useEffect(() => {
    const el = heroCta.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const steps = [
    {
      stage: t('Binhi', 'Seed'),
      title: t('Matuto', 'Learn'),
      tag: t('Libre · mga 10 min', 'Free · about 10 min'),
      body: t('Maiikling lessons at ang PMES — ang maikling orientation ng co-op. Sa phone mo, kahit kailan.', "Short lessons and the PMES — the co-op's short orientation. On your phone, any time."),
    },
    {
      stage: t('Usbong', 'Sprout'),
      title: t('Sumali', 'Join'),
      tag: '₱1,100',
      body: t('₱100 na membership fee at ₱1,000 na share capital. I-upload ang resibo, at member ka na.', '₱100 membership fee plus ₱1,000 share capital. Upload your receipt and you are a member.'),
    },
    {
      stage: t('Halaman', 'Plant'),
      title: t('Mag-invest', 'Invest'),
      tag: t('Mula ₱10,000', 'From ₱10,000'),
      body: t('Piliin ang unang JVS mo ayon sa goal mo. Pwede mo itong ipunin muna.', 'Choose your first JVS based on your goal. You can save up for it first.'),
    },
  ]

  const gallery: { slot: PhotoSlot; caption: string }[] = [
    { slot: 'sedpi-community', caption: t('Ika-20 anibersaryo ng SEDPI', "SEDPI's 20th anniversary") },
    { slot: 'kanegosyo-team', caption: t('Ang KaNegosyo team', 'The KaNegosyo team') },
    { slot: 'sedpi-leaders', caption: t('Si Sir Vince at ang SEDPI leaders', 'Sir Vince and SEDPI leaders') },
    { slot: 'sedpi-team', caption: t('Ang SEDPI team', 'The SEDPI team') },
  ]

  return (
    <Screen>
      <TopBar right={<Link to="/app" className="flex h-11 items-center px-2 text-[13.5px] font-semibold text-teal">Log in</Link>} />

      {/* Hero: thesis + the "watch this first" video */}
      <section className="px-5 pb-6 pt-6">
        <Eyebrow>Usapang Pera · Unang Hakbang</Eyebrow>
        <h1 className="mt-2.5 text-[31px] font-extrabold leading-[1.05]">
          {t('Hindi kailangan ng malaking pera para magsimula.', "You don't need a lot of money to start.")}{' '}
          <span className="bg-[linear-gradient(transparent_62%,var(--color-mangga)_62%)] text-teal">{t('Kailangan lang magsimula.', 'You just need to start.')}</span>
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          {t('Matuto, sumali, at mag-invest sa mga negosyong Pilipino — paisa-isang hakbang, sa phone mo.', 'Learn, join, and invest in Filipino businesses — one step at a time, on your phone.')}
        </p>

        <div className="mt-5">
          <VideoHero />
        </div>

        <div ref={heroCta} className="mt-5 grid gap-2.5">
          <LinkButton to="/hakbang" full>{t('Simulan ang Unang Hakbang', 'Take the first step')} <ArrowRight size={18} /></LinkButton>
          <button onClick={openMessenger} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-teal/80 text-[15px] font-semibold text-teal">
            <MessageCircle size={18} /> {t('Magtanong muna', 'Ask a question first')}
          </button>
        </div>
      </section>

      {/* How to start: a real sequence, drawn as a seed growing into a plant */}
      <section className="bg-teal-soft px-4 pb-7 pt-6">
        <h2 className="px-1 text-[22px] font-bold leading-tight">{t('Paano magsimula: 3 hakbang lang', 'How to start: just 3 steps')}</h2>
        <p className="mt-1 px-1 text-[14px] text-muted">{t('Parang pagtatanim: maliit na binhi muna, saka lalago.', 'Like planting: start with a small seed, and let it grow.')}</p>
        <ol className="relative mt-4 grid gap-3">
          <span aria-hidden className="absolute bottom-12 left-[52px] top-12 border-l-[3px] border-dotted border-[#4f9d52]/50" />
          {steps.map(({ stage, title, tag, body }, i) => (
            <li key={title} className="relative flex items-center gap-3 rounded-3xl bg-card p-3">
              <div className="relative z-10 size-[80px] shrink-0 rounded-2xl bg-card">
                <Growth stage={(i + 1) as 1 | 2 | 3} />
                <span className={`absolute -left-1 -top-1 grid size-7 place-items-center rounded-full font-display text-[13px] font-bold shadow-sm ${i === 0 ? 'bg-mangga text-ink' : i === 1 ? 'bg-teal text-white' : 'bg-coral-strong text-white'}`}>{i + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-[#3d7f42]">{stage}</p>
                <div className="flex flex-wrap items-center gap-x-2">
                  <h3 className="text-[18px] font-bold">{title}</h3>
                  <span className="rounded-full bg-mangga-soft px-2 py-0.5 text-[12px] font-bold text-ink">{tag}</span>
                </div>
                <p className="mt-1 text-[13.5px] leading-snug text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Three answers, each with a picture */}
      <section className="px-4 pb-8 pt-7">
        <h2 className="px-1 text-[22px] font-bold">{t('Ang tatlong tanong ng lahat', 'The three questions everyone asks')}</h2>
        <div className="mt-3 grid gap-3">
          <article className="overflow-hidden rounded-3xl border border-line bg-card">
            <Photo slot="cda-certificate" className="h-40" />
            <div className="p-4">
              <h3 className="flex items-center gap-2 text-[18px] font-bold"><ShieldCheck size={20} className="text-sexy-s" /> {t('Ligtas ba?', 'Is it safe?')}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-muted">
                {t('Rehistrado ang SEDPI Coop sa Cooperative Development Authority (CDA) mula 2021, at naglalabas kami ng audited financial statements taon-taon.', 'SEDPI Coop has been registered with the Cooperative Development Authority (CDA) since 2021, and publishes audited financial statements every year.')}
              </p>
              <button onClick={() => toast(t('Bubuksan ang transparency reports ng SEDPI.', "Opens SEDPI's transparency reports.") + ' [link — confirm with SEDPI]')} className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-teal underline underline-offset-4">
                {t('Tingnan ang audited reports', 'See the audited reports')} <ExternalLink size={14} />
              </button>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-line bg-card">
            <div className="grid h-40 place-items-center bg-[#e6def2] px-6">
              <div className="w-full">
                <div className="flex h-14 overflow-hidden rounded-2xl shadow-sm" aria-hidden>
                  <div className="grid w-[24%] place-items-center bg-mangga font-display text-[14px] font-bold">₱100</div>
                  <div className="grid flex-1 place-items-center bg-sexy-e font-display text-[14px] font-bold text-white">₱1,000</div>
                </div>
                <p className="mt-2 flex justify-between text-[12px] font-semibold text-sexy-e"><span>fee</span><span>share capital</span></p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-[18px] font-bold">{t('Kaya ko ba?', 'Can I afford it?')}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-muted">
                {t('₱1,100 para maging member. Ang unang JVS ay ₱10,000, at pwede mo itong ipunin muna.', '₱1,100 to become a member. A first JVS is ₱10,000, and you can save up for it first.')}
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-line bg-card">
            <Photo slot="kanegosyo-branch" className="h-40">
              <span className="absolute bottom-2 left-2 rounded-full bg-ink/70 px-2.5 py-1 text-[11.5px] font-semibold text-white">{t('KaNegosyo branch sa Maco, Davao', 'KaNegosyo branch in Maco, Davao')}</span>
            </Photo>
            <div className="p-4">
              <h3 className="text-[18px] font-bold">{t('Saan napupunta ang pera ko?', 'Where does my money go?')}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-muted">
                {t('Pinagsasama ang ipon ng members. Ang pool ang sumusuporta sa mga KaNegosyo partner, tulad ng may-ari ng sari-sari store.', "Members' savings are pooled. The pool supports KaNegosyo partners, like sari-sari store owners.")}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-8">
        <h2 className="px-1 text-[22px] font-bold">{t('Paano gumagana', 'How it works')}</h2>
        <p className="mt-1 px-1 text-[14.5px] text-muted">{t('Isang ikot ng pera, sa isang tingin.', 'One cycle of money, at a glance.')}</p>
        <div className="mt-3 rounded-3xl border border-line bg-card px-2 pb-2 pt-4">
          <MoneyFlow />
        </div>
      </section>

      {/* Photo strip */}
      <section className="pb-8">
        <h2 className="px-5 text-[22px] font-bold">{t('Kilalanin ang SEDPI', 'Meet SEDPI')}</h2>
        <div className="snap-row mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
          {gallery.map(g => (
            <figure key={g.slot} className="w-[72%] shrink-0">
              <Photo slot={g.slot} className="h-44 rounded-3xl" />
              <figcaption className="mt-1.5 px-1 text-[13.5px] font-semibold">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Peer story */}
      <section className="px-4 pb-8">
        <Eyebrow className="px-1">{t('Mula sa isang KaSosyo', 'From a KaSosyo member')}</Eyebrow>
        <div className="mt-2 overflow-hidden rounded-3xl bg-teal text-white">
          <Photo slot="member-story" className="h-52" />
          <div className="p-5">
            <Quote size={22} className="text-mangga" aria-hidden />
            <p className="mt-2 font-display text-[19px] font-semibold leading-snug">
              [{t('Quote ng batang KaSosyo member: paano siya nagsimula, sa sarili niyang salita.', 'Quote from a young KaSosyo member: how they started, in their own words.')}]
            </p>
            <p className="mt-3 text-[13.5px] text-white/80">[{t('Pangalan, edad, trabaho', 'Name, age, job')}]</p>
          </div>
        </div>
      </section>

      {/* Bakit SEDPI */}
      <section className="mx-4 mb-8 rounded-3xl bg-teal-tint p-4">
        <h2 className="text-[17px] font-bold">{t('Bakit SEDPI', 'Why SEDPI')}</h2>
        <div className="mt-3 flex items-end justify-between gap-1.5" aria-label="Napag-aaralan. Napagtutulungan. Nagagawa.">
          {[
            [t('Napag-aaralan', 'Learnable'), 'bg-white text-teal', '-rotate-6', 'h-[58px]'],
            [t('Napagtutulungan', 'Done together'), 'bg-mangga text-ink', 'rotate-3', 'h-[66px]'],
            [t('Nagagawa', 'Doable'), 'bg-teal text-white', '-rotate-2', 'h-[74px]'],
          ].map(([w, c, r, h]) => (
            <div key={w} className={`stone grid flex-1 place-items-center px-1 ${c} ${r} ${h}`}>
              <span className="font-display text-[12.5px] font-bold">{w}.</span>
            </div>
          ))}
        </div>
        <ul className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            [Leaf, t('Mula 2004', 'Since 2004'), t('kasama ng Pilipino', 'with Filipinos')],
            [Users, t('Tao at kalikasan', 'People and planet'), t('bago ang tubo', 'before profit')],
            [ShieldCheck, 'Co-op', t('ikaw ang co-owner', "you're a co-owner")],
          ].map(([Icon, title, sub]) => {
            const I = Icon as typeof Leaf
            return (
              <li key={title as string} className="rounded-2xl bg-white/70 px-1 py-3">
                <I size={20} className="mx-auto text-teal" aria-hidden />
                <p className="mt-1.5 text-[13px] font-bold leading-tight">{title as string}</p>
                <p className="text-[12px] leading-tight text-muted">{sub as string}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <footer className="px-5 pb-6 text-[12px] leading-relaxed text-muted">
        <p className="mb-2 flex items-center gap-2 text-[12px] font-semibold">
          {t('Isang programa ng', 'A program of')}
          <img src={`${import.meta.env.BASE_URL}photos/sedpi-logo.png`} alt="SEDPI" className="h-7 w-auto" loading="lazy" />
        </p>
        {t(
          'SEDPI Coop · CDA Reg. No. 9520-101300032122 · Rehistrado July 21, 2021, Quezon City · Saklaw ng Philippine Cooperative Code of 2008.',
          'SEDPI Coop · CDA Reg. No. 9520-101300032122 · Registered July 21, 2021, Quezon City · Governed by the Philippine Cooperative Code of 2008.',
        )}
      </footer>

      <div className={`sticky bottom-0 z-20 mt-auto transition-opacity ${heroVisible ? 'pointer-events-none opacity-0' : 'opacity-100'}`} aria-hidden={heroVisible}>
        <StickyBar>
          <LinkButton to="/hakbang" full>{t('Simulan ang Unang Hakbang', 'Take the first step')} <ArrowRight size={18} /></LinkButton>
        </StickyBar>
      </div>
    </Screen>
  )
}
