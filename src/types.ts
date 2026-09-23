export interface WishMessage {
  id: string
  name: string
  message: string
  createdAt: number // epoch ms
  likes: number
  reply?: string
  repliedAt?: number
  repliedBy?: 'groom' | 'bride'
  // Distinction fields — never set by the submission form or by the couple's
  // login. Set these by hand in Firebase Console (Firestore Database ->
  // wishes -> [pick a message] -> add fields) when you want a message to
  // stand out. `tier` picks the visual style, `role` is the label shown.
  //   tier 1 -> solid gold card with a star (e.g. parents)
  //   tier 2 -> simple bordered card (e.g. siblings, close family)
  //   tier 3 -> solid card with a heart and a double-ring border — same
  //             level of prominence as tier 1, distinct look
  //   tier 4 -> deep burgundy card with a sparkle — the one that breaks
  //             from the gold family entirely, for when you want a message
  //             to visually stand apart from every other tier too
  tier?: 1 | 2 | 3 | 4
  role?: string
  // Purely private — for your own reference only when browsing Firebase
  // Console. The site never reads or displays this field anywhere, for
  // anyone, so the person it's about (or anyone else) has no way to know
  // it's there. Set it by hand the same way as tier/role, e.g.
  // note: "صديقة الطفولة - راجع لاحقاً"
  note?: string
}

// ---------------------------------------------------------------------------
// Edit this section to customize the experience without touching components.
// ---------------------------------------------------------------------------
export const WEDDING_CONFIG = {
  groomName: 'إسلام',
  brideName: 'عفاف',
  dateShort: '21.09',
  dateFull: '21 SEPTEMBER',
  dateNumeric: '21.09.2026',
  dateArabic: '21 سبتمبر 2026',
  yearShort: '26',
  timeLabel: '9:00 PM',
  timeArabic: '9:00 مساءً',
  venueName: 'MARRIOTT ZAGAZIG',
  venueNameArabic: 'ماريوت الزقازيق',
  cityName: 'الزقازيق',
  isoDateTime: '2026-09-21T21:00:00',
  mapsUrl: 'https://maps.google.com/?q=Marriott+Zagazig',
  mapsEmbedSrc: 'https://maps.google.com/maps?q=Zagazig%2C+Egypt&t=&z=13&ie=UTF8&iwloc=&output=embed',
  secretMessage: 'إنت من الناس اللي كنا مستنيينهم',
  verseText: 'ومن آياته أن خلق لكم من أنفسكم أزواجاً لتسكنوا إليها وجعل بينكم مودة ورحمة',
  verseRef: 'الروم ٢١',
  // Must exactly match the Firebase accounts you create for the groom and
  // bride (Firebase Console -> Authentication -> Users -> Add user), AND
  // the emails hardcoded in firestore.rules. See README -> "رد العروسين".
  groomEmail: 'atefaamer5@gmail.com',
  brideEmail: 'atefaamer7@gmail.com',
}

// ---------------------------------------------------------------------------
// «الذكرى» — كل كلام المشاهد الجديدة (العدّاد اللي بيعد من يوم الفرح، ألبوم
// الصور، تفاصيل الليلة، الختام، وحائط الرسائل). عدّل من هنا من غير ما تلمس
// أي component. أي جملة فيها {n} بيتحوّل الرقم فيها لوحده.
// ---------------------------------------------------------------------------
export const MEMORY_CONFIG = {
  // --- العدّاد (بقالنا كام يوم مع بعض) ---
  sinceKickerEn: 'SINCE',
  daysLabelEn: 'DAYS TOGETHER',
  sinceDaysAr: 'بقالنا {n} يوم مع بعض',
  // أول يومين — الكلام بيتظبط أوتوماتيك
  sinceDaysZeroAr: 'بقالنا ساعات… ودي أول لحظة',
  sinceDaysOneAr: 'بقالنا يوم واحد… ولسه البداية',
  // (لو حصل وأي حد فتح الموقع قبل الفرح، بيتعامل معاه كعدّاد عادي)
  untilKickerEn: 'UNTIL',
  untilLabelEn: 'DAYS TO GO',
  untilDaysAr: 'فاضل {n} يوم على الفرح',

  // --- المشهد الأول: اللي بيتقال بين الاسمين وقت السكرول ---
  heroRevealEn: 'SINCE THAT NIGHT',

  // --- ألبوم الصور (الصور نفسها في src/data/gallery.ts) ---
  galleryKickerEn: 'OUR MEMORIES',
  galleryTitleAr: 'ذكرياتنا',
  galleryIntroAr: 'صور من يومنا ومن أيامنا… كل صورة ليها حكاية عندنا',

  // --- حائط الرسائل ---
  wallKickerEn: 'LEAVE A MEMORY',
  wallIntroAr: 'سيبوا ذكرى أو كلمة… هتفضل هنا معانا على طول',
  wallPlaceholder: 'اكتب ذكرى أو كلمة لإسلام وعفاف…',
  wallEmptyAr: 'لسه مفيش ذكريات… اكتب أول واحدة',

  // --- المشهد الختامي ---
  finalKickerEn: 'THE NIGHT WE SAID FOREVER',
  finalLineAr: 'كانت أحلى ليلة… ولسه البداية',
  finalThanksAr: 'شكراً لكل واحد كان جزء من يومنا 🤍',
}
