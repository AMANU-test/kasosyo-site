import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  BadgeCheck, CalendarDays, Clock, HandCoins, Layers, PiggyBank, Scale, Search, Sprout, Store, Target, TriangleAlert, Users, Wallet,
} from 'lucide-react'
import type { SexyLetter } from '../components/ui'
import type { Txt } from '../state'

export type PictureCard = { title: Txt; body: Txt; icon: ComponentType<LucideProps> }

export type Lesson = {
  id: 'scam' | 'emergency' | 'impact' | 'lago'
  letter: SexyLetter
  title: Txt
  minutes: number
  summary: Txt
  cards: PictureCard[]
  quiz: { q: Txt; options: Txt[]; correct: number; right: Txt; wrong: Txt }
  action: { label: Txt }
}

export const lessons: Lesson[] = [
  {
    id: 'scam',
    letter: 'S',
    title: { tl: 'Paano malalaman kung scam', en: 'How to spot a scam' },
    minutes: 3,
    summary: {
      tl: 'Apat na tanong bago ka maglabas ng kahit pisong investment.',
      en: 'Four questions to ask before you put a single peso into any investment.',
    },
    cards: [
      {
        icon: TriangleAlert,
        title: { tl: '"Guaranteed" at mabilis?', en: '"Guaranteed" and fast?' },
        body: {
          tl: 'Walang totoong negosyo na walang risk. Kapag sobrang laki at sigurado ang pangako, huminto ka muna.',
          en: 'No real business is risk-free. If the promise is huge and certain, stop and think first.',
        },
      },
      {
        icon: BadgeCheck,
        title: { tl: 'Hanapin ang rehistro', en: 'Look for the registration' },
        body: {
          tl: 'Ang co-op ay dapat CDA-registered. Ang kumpanyang humihingi ng investment ay dapat may lisensya mula sa SEC.',
          en: 'A co-op should be CDA-registered. A company asking for investments should have an SEC licence.',
        },
      },
      {
        icon: Search,
        title: { tl: 'Saan napupunta ang pera?', en: 'Where does the money go?' },
        body: {
          tl: 'Kung hindi nila maipaliwanag kung paano kumikita ang pera mo, hindi pa ito para sa iyo.',
          en: "If they can't explain how your money earns, it isn't for you yet.",
        },
      },
      {
        icon: Clock,
        title: { tl: 'Minamadali ka? Hinto.', en: 'Being rushed? Stop.' },
        body: {
          tl: '"Ngayon lang" at "limited slots" ay pressure, hindi oportunidad. Ang legit, makakapaghintay.',
          en: '"Today only" and "limited slots" are pressure, not opportunity. Anything legit can wait.',
        },
      },
    ],
    quiz: {
      q: {
        tl: 'May nag-message: "Doble ang pera mo in 30 days, guaranteed! Limited slots lang." Ano ang una mong gagawin?',
        en: 'Someone messages you: "Double your money in 30 days, guaranteed! Limited slots." What do you do first?',
      },
      options: [
        { tl: 'Mag-invest agad bago maubos ang slots', en: 'Invest right away before the slots run out' },
        { tl: 'Alamin kung rehistrado sila at saan napupunta ang pera', en: 'Check if they are registered and where the money goes' },
        { tl: 'I-share sa GC para sabay-sabay kayo', en: 'Share it in the group chat so you can all join' },
      ],
      correct: 1,
      right: { tl: 'Tama. Rehistro at malinaw na paliwanag muna, bago ang kahit anong pera.', en: 'Right. Registration and a clear explanation first, before any money.' },
      wrong: {
        tl: 'Hindi pa. Ang "guaranteed" at "limited slots" ay dalawang red flag. Alamin muna kung rehistrado sila.',
        en: 'Not yet. "Guaranteed" and "limited slots" are two red flags. Check if they are registered first.',
      },
    },
    action: { label: { tl: 'Suriin ang isang offer', en: 'Check an offer' } },
  },
  {
    id: 'emergency',
    letter: 'E',
    title: { tl: 'Emergency fund muna', en: 'Emergency fund first' },
    minutes: 3,
    summary: {
      tl: 'Bago mag-invest, may sandalan ka dapat kapag may biglaang gastos.',
      en: 'Before investing, have a cushion for surprise expenses.',
    },
    cards: [
      {
        icon: PiggyBank,
        title: { tl: 'Sandalan muna', en: 'A cushion first' },
        body: {
          tl: 'Ang emergency fund ang sasalo sa biglaang gastos para hindi mo galawin ang investment mo.',
          en: "Your emergency fund covers surprise costs so you don't have to touch your investment.",
        },
      },
      {
        icon: CalendarDays,
        title: { tl: 'Gaano kalaki?', en: 'How big?' },
        body: {
          tl: 'Karaniwang payo: 3 hanggang 6 na buwan ng gastos mo. Pwedeng unti-unti, tuwing sweldo.',
          en: 'The usual advice: 3 to 6 months of your expenses. Build it a little every payday.',
        },
      },
      {
        icon: Wallet,
        title: { tl: 'Madaling makuha', en: 'Easy to reach' },
        body: {
          tl: 'Ilagay ito kung saan mo makukuha agad, hindi sa investment na may term.',
          en: 'Keep it somewhere you can get it right away, not in an investment with a fixed term.',
        },
      },
      {
        icon: Sprout,
        title: { tl: 'Saka mag-invest', en: 'Then invest' },
        body: {
          tl: 'Kapag may sandalan ka na, ang sobra ang ipapalago mo. Hindi kailangang hintayin ang promotion.',
          en: "Once you have a cushion, grow what's extra. No need to wait for a promotion.",
        },
      },
    ],
    quiz: {
      q: {
        tl: 'Nasira ang phone mo at kailangan mo ng ₱8,000 ngayong linggo. Saan dapat manggaling?',
        en: 'Your phone breaks and you need ₱8,000 this week. Where should it come from?',
      },
      options: [
        { tl: 'Sa emergency fund', en: 'Your emergency fund' },
        { tl: 'Sa JVS na 3 taon pa bago matapos', en: 'A JVS with 3 years left in its term' },
        { tl: 'Sa 5-6 na utang', en: 'A 5-6 loan' },
      ],
      correct: 0,
      right: { tl: 'Tama. Para diyan mismo ang emergency fund.', en: "Right. That's exactly what an emergency fund is for." },
      wrong: {
        tl: 'Hindi ito. Ang investment na may term ay para sa goal, at ang 5-6 ay mabigat na utang. Emergency fund ang sasalo.',
        en: 'Not this one. A term investment is for a goal, and 5-6 is a heavy loan. Your emergency fund covers it.',
      },
    },
    action: { label: { tl: 'I-set ang emergency-fund goal', en: 'Set your emergency-fund goal' } },
  },
  {
    id: 'impact',
    letter: 'X',
    title: { tl: 'Saan napupunta ang pera mo', en: 'Where your money goes' },
    minutes: 3,
    summary: {
      tl: 'Paano nagiging puhunan ng maliliit na negosyo ang pinagsama-samang ipon.',
      en: 'How pooled savings become capital for small businesses.',
    },
    cards: [
      {
        icon: Users,
        title: { tl: 'Pinagsasama ang ipon', en: 'Savings are pooled' },
        body: {
          tl: 'Ang ipon ng maraming member ay nagiging isang pool. Walang iisang tao ang may hawak.',
          en: "Many members' savings become one pool. No single person holds it.",
        },
      },
      {
        icon: Store,
        title: { tl: 'Puhunan ng partners', en: 'Capital for partners' },
        body: {
          tl: 'Ang pool ang sumusuporta sa KaNegosyo partners, tulad ng mga may sari-sari store.',
          en: 'The pool supports KaNegosyo partners, like sari-sari store owners.',
        },
      },
      {
        icon: HandCoins,
        title: { tl: 'Bumabalik ang bayad', en: 'Payments come back' },
        body: {
          tl: 'Habang nagbabayad ang partners, umiikot ulit ang pera sa pool at sa members.',
          en: 'As partners pay back, the money cycles back to the pool and the members.',
        },
      },
      {
        icon: Sprout,
        title: { tl: 'Kita at epekto', en: 'Returns and impact' },
        body: {
          tl: 'Ang X-factor: lumalago ang pera mo habang may negosyong lumalago rin.',
          en: 'The X-factor: your money grows while a small business grows too.',
        },
      },
    ],
    quiz: {
      q: { tl: 'Nag-invest ka ng ₱10,000 sa JVS. Alin ang totoo?', en: 'You invest ₱10,000 in a JVS. Which is true?' },
      options: [
        { tl: 'Napunta ang buong ₱10,000 sa iisang tindahang pinili mo', en: 'All ₱10,000 goes to one store you picked' },
        { tl: 'Sumama ito sa pool na sumusuporta sa maraming partner', en: 'It joins a pool that supports many partners' },
        { tl: 'Nakatago lang ito sa bangko', en: 'It just sits in a bank' },
      ],
      correct: 1,
      right: { tl: 'Tama. Pooled ang pera, kaya maraming partner ang nasusuportahan, hindi iisa.', en: 'Right. The money is pooled, so it supports many partners, not just one.' },
      wrong: {
        tl: 'Hindi eksakto. Pinagsasama ang pera ng members, at ang pool ang sumusuporta sa maraming partner.',
        en: "Not quite. Members' money is pooled, and the pool supports many partners.",
      },
    },
    action: { label: { tl: 'Piliin ang epektong mahalaga sa iyo', en: 'Pick the impact you care about' } },
  },
  {
    id: 'lago',
    letter: 'Y',
    title: { tl: 'Paano lumalago ang pera (at bakit huli ito)', en: 'How money grows (and why it comes last)' },
    minutes: 3,
    summary: { tl: 'Bakit ang kita ang huling tanong, hindi ang una.', en: 'Why returns are the last question, not the first.' },
    cards: [
      {
        icon: Layers,
        title: { tl: 'Huli ang Y sa SEXY', en: 'Y comes last in SEXY' },
        body: {
          tl: 'Secure, Encashable, X-factor, saka Yield. Kapag kita ang unang binebenta sa iyo, mag-ingat.',
          en: "Secure, Encashable, X-factor, then Yield. If returns are the first thing you're sold, be careful.",
        },
      },
      {
        icon: Scale,
        title: { tl: 'Walang guaranteed', en: 'Nothing is guaranteed' },
        body: {
          tl: 'Ang kita ng co-op ay nakadepende sa negosyo. Ang historical average ay hindi pangako.',
          en: "The co-op's earnings depend on the businesses. A historical average is not a promise.",
        },
      },
      {
        icon: Target,
        title: { tl: 'Itugma sa goal', en: 'Match it to your goal' },
        body: {
          tl: 'Pang-house repair next summer? 6 na buwan. Pang-retiro? Mas mahaba. Ang goal ang pipili ng term.',
          en: 'House repair next summer? 6 months. Retirement? Longer. Your goal picks the term.',
        },
      },
      {
        icon: Search,
        title: { tl: 'Ikumpara muna', en: 'Compare first' },
        body: {
          tl: 'Tingnan ang ibang options gaya ng Pag-IBIG MP2 o savings account. Walang masama sa pagkumpara.',
          en: "Look at other options like Pag-IBIG MP2 or a savings account. There's nothing wrong with comparing.",
        },
      },
    ],
    quiz: {
      q: { tl: 'Bakit huli ang Yield (kita) sa SEXY?', en: 'Why does Yield (returns) come last in SEXY?' },
      options: [
        { tl: 'Kasi hindi mahalaga ang kita', en: "Because returns don't matter" },
        { tl: 'Kasi dapat ligtas at makukuha mo muna ang pera bago isipin ang tubo', en: 'Because your money should be safe and withdrawable before you think about profit' },
        { tl: 'Kasi maliit lang ang kita', en: 'Because the returns are small' },
      ],
      correct: 1,
      right: { tl: 'Tama. Mahalaga ang kita, pero ligtas at makukuha mo muna ang pera.', en: 'Right. Returns matter, but safety and access come first.' },
      wrong: {
        tl: 'Hindi ganoon. Mahalaga ang kita, pero inuuna ang kaligtasan at kung makukuha mo ang pera.',
        en: "That's not it. Returns matter, but safety and being able to get your money come first.",
      },
    },
    action: { label: { tl: 'Ikumpara ang options', en: 'Compare your options' } },
  },
]

export const lessonById = (id?: string) => lessons.find(l => l.id === id)
