import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  BadgeCheck, CalendarDays, Clock, HandCoins, Layers, PiggyBank, Scale, Search, Sprout, Store, Target, TriangleAlert, Users, Wallet,
} from 'lucide-react'
import type { SexyLetter } from '../components/ui'
import type { Txt } from '../state'
// Lesson wording lives in content/site.json → lessons; this file keeps icons, answers and lengths.
import copy from '../content/site.json'

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

type LessonId = Lesson['id']
const text = copy.lessons as Record<LessonId, Omit<Lesson, 'id' | 'letter' | 'minutes' | 'cards' | 'quiz'> & { cards: Omit<PictureCard, 'icon'>[]; quiz: Omit<Lesson['quiz'], 'correct'> }>

const setup: { id: LessonId; letter: SexyLetter; minutes: number; icons: PictureCard['icon'][]; correct: number }[] = [
  { id: 'scam', letter: 'S', minutes: 3, icons: [TriangleAlert, BadgeCheck, Search, Clock], correct: 1 },
  { id: 'emergency', letter: 'E', minutes: 3, icons: [PiggyBank, CalendarDays, Wallet, Sprout], correct: 0 },
  { id: 'impact', letter: 'X', minutes: 3, icons: [Users, Store, HandCoins, Sprout], correct: 1 },
  { id: 'lago', letter: 'Y', minutes: 3, icons: [Layers, Scale, Target, Search], correct: 1 },
]

export const lessons: Lesson[] = setup.map(({ id, letter, minutes, icons, correct }) => {
  const t = text[id]
  if (t.cards.length !== icons.length) throw new Error(`lessons.${id}: ${t.cards.length} cards in site.json but ${icons.length} icons`)
  return { ...t, id, letter, minutes, cards: t.cards.map((c, i) => ({ ...c, icon: icons[i] })), quiz: { ...t.quiz, correct } }
})

export const lessonById = (id?: string) => lessons.find(l => l.id === id)
