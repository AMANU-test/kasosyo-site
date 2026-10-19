import type { Txt } from '../state'

/**
 * Photo slots. Drop a file with the matching name into public/photos/ and it appears
 * everywhere that slot is used. Until then, a labelled placeholder shows what belongs there.
 * Source: sedpi.com (with SEDPI's permission; partner photos need the partner's consent).
 */
export const photos = {
  'hero-video': { file: 'hero-video.jpg', hint: 'Video thumbnail: Sir Vince explaining KaSosyo', alt: { tl: 'Si Sir Vince Rapisura habang nagtuturo', en: 'Sir Vince Rapisura teaching' } },
  'members-group': { file: 'members-group.jpg', hint: 'KaSosyo members at a SEDPI event', alt: { tl: 'Mga KaSosyo member sa isang SEDPI event', en: 'KaSosyo members at a SEDPI event' } },
  'kanegosyo-store': { file: 'kanegosyo-store.jpg', hint: 'KaNegosyo partner at her sari-sari store', alt: { tl: 'Isang KaNegosyo partner sa kanyang sari-sari store', en: 'A KaNegosyo partner at her sari-sari store' } },
  'kanegosyo-branch': { file: 'kanegosyo-branch.jpg', hint: 'KaNegosyo partners meeting at a branch', alt: { tl: 'Pulong ng KaNegosyo partners sa isang branch', en: 'KaNegosyo partners meeting at a branch' } },
  'cda-certificate': { file: 'cda-certificate.jpg', hint: 'SEDPI Coop CDA certificate of registration', alt: { tl: 'CDA certificate of registration ng SEDPI Coop', en: "SEDPI Coop's CDA certificate of registration" } },
  'usapang-pera': { file: 'usapang-pera.jpg', hint: 'Usapang Pera seminar or livestream', alt: { tl: 'Isang Usapang Pera session', en: 'An Usapang Pera session' } },
  'sedpi-team': { file: 'sedpi-team.jpg', hint: 'SEDPI team / member-relations (Zion)', alt: { tl: 'Ang SEDPI team', en: 'The SEDPI team' } },
  'member-story': { file: 'member-story.jpg', hint: 'Young KaSosyo member (with consent)', alt: { tl: 'Isang batang KaSosyo member', en: 'A young KaSosyo member' } },
  'partner-1': { file: 'partner-1.jpg', hint: 'KaNegosyo partner 1 (with consent)', alt: { tl: 'KaNegosyo partner', en: 'KaNegosyo partner' } },
  'partner-2': { file: 'partner-2.jpg', hint: 'KaNegosyo partner 2 (with consent)', alt: { tl: 'KaNegosyo partner', en: 'KaNegosyo partner' } },
  'partner-3': { file: 'partner-3.jpg', hint: 'KaNegosyo partner 3 (with consent)', alt: { tl: 'KaNegosyo partner', en: 'KaNegosyo partner' } },
} satisfies Record<string, { file: string; hint: string; alt: Txt }>

export type PhotoSlot = keyof typeof photos
