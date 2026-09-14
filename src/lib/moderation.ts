/**
 * Lightweight profanity filter for the guest message wall.
 *
 * IMPORTANT — read before relying on this:
 * No word-list filter catches everything, especially in Egyptian Arabic
 * where spelling, letter-stretching, and slang vary endlessly. This will
 * stop the obvious/common cases and casual attempts, but it is NOT a
 * complete solution. The real safety net is that the couple can delete
 * any message after the fact (see the delete button in MessageWall.tsx,
 * only visible when signed in as the groom or bride).
 *
 * To add more blocked words later, just add them (in Arabic or English,
 * lowercase, no diacritics) to BLOCKED_WORDS below.
 */

const BLOCKED_WORDS = [
  // Common Arabic/Egyptian insults & profanity (kept moderate on purpose)
  'كسمك', 'كس اختك', 'يا كلب', 'يا حمار', 'ابن الكلب', 'يا خول',
  'منيك', 'شرموطة', 'قحبة', 'عرص', 'واطي', 'حقير', 'زبالة',
  'متناك', 'خرا', 'كسم', 'طيز', 'زب', 'نيك', 'اير',

  // Common English profanity
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'slut', 'whore',
  'cunt', 'dick', 'piss off', 'motherfucker',
]

/** Strips Arabic diacritics, collapses repeated letters, normalizes spacing. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove tashkeel/diacritics
    .replace(/[.\-_*]/g, '') // remove common word-breaking characters
    .replace(/(.)\1{2,}/g, '$1$1') // collapse 3+ repeated letters to 2
    .replace(/\s+/g, ' ')
    .trim()
}

export function containsBlockedWords(text: string): boolean {
  const normalized = normalize(text)
  return BLOCKED_WORDS.some((word) => normalized.includes(normalize(word)))
}
