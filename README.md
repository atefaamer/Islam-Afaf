# إسلام × عفاف — تجربة رقمية سينمائية

موقع *ذكرى* زفاف إسلام وعفاف، مبني كتجربة تفاعلية متصلة (لا يشبه قوالب الدعوات التقليدية) بـ React + TypeScript + Vite + Tailwind + Framer Motion + Lenis، مع رسائل ضيوف مباشرة عبر Firebase.

> الفرح خلص خلاص (21.09.2026) — الموقع بقى **ذكرى** مش دعوة. كل التعديلات دي مشروحة في [القسم 10](#10-الموقع-بقى-ذكرى--إيه-اللي-اتغير).

---

## 1) التشغيل محلياً

```bash
npm install
npm run dev
```

سيعمل الموقع على `http://localhost:5173`. افتحه، ودوس Scroll — التجربة كلها مبنية على السكرول.

---

## 2) ربط Firebase (Firestore + Anonymous Auth)

قسم "LEAVE SOMETHING BEHIND" (حائط الرسائل العائمة) بيستخدم Firebase لتخزين وعرض رسائل الضيوف في الوقت الحقيقي.

### الخطوات:

1. اذهب إلى [console.firebase.google.com](https://console.firebase.google.com) وأنشئ مشروعاً جديداً.
2. من **Build → Authentication → Sign-in method**، فعّل **Anonymous**.
3. من **Build → Firestore Database**، أنشئ قاعدة بيانات.
4. من إعدادات المشروع (⚙️ → Project settings)، أضف تطبيق ويب واحصل على بيانات `firebaseConfig`.
5. افتح `src/firebase.ts` واستبدل القيم بالكامل ببيانات مشروعك.
6. انشر قواعد الأمان الموجودة في `firestore.rules` (من Firebase Console → Firestore → Rules، أو عبر `firebase deploy --only firestore:rules`).

> بدون Firebase حقيقي، حائط الرسائل مش هيشتغل — باقي التجربة تعمل عادي.

---

## 3) تعديل الأسماء، التاريخ، والمكان

كل بيانات الدعوة والذكرى في `src/types.ts`:`WEDDING_CONFIG` للبيانات الأساسية، و`MEMORY_CONFIG` لكلام مشاهد الذكرى:

```ts
export const WEDDING_CONFIG = {
  groomName: 'إسلام',
  brideName: 'عفاف',
  dateShort: '21.09',
  dateFull: '21 SEPTEMBER',
  dateNumeric: '21.09.2026',
  yearShort: '26',
  timeLabel: '9:00 PM',
  venueName: 'MARRIOTT ZAGAZIG',
  venueNameArabic: 'ماريوت الزقازيق',
  cityName: 'الزقازيق',
  isoDateTime: '2026-09-21T21:00:00', // يُستخدم في العد التنازلي
  mapsUrl: 'https://maps.google.com/?q=Marriott+Zagazig',
  mapsEmbedSrc: 'https://maps.google.com/maps?q=...&output=embed',
  secretMessage: 'إنت من الناس اللي كنا مستنيينهم.',
}
```

عدّل أي قيمة هنا وستنعكس تلقائياً في كل الموقع.

---

## 4) تغيير الصور

الصور الثلاث في قسم "الكشف السينمائي" (01/02/03) بديلة حالياً. استبدلها في `src/components/ImageSequence.tsx`:

```ts
const PANELS = [
  { number: '01', label: 'THE BEGINNING', src: '...' },
  { number: '02', label: 'THE MOMENT', src: '...' },
  { number: '03', label: 'FOREVER', src: '...' },
]
```

ضع صورك في `public/` واستخدم مسار نسبي زي `./photos/1.jpg`.

---

## 5) الموسيقى والأصوات

الموسيقى (`public/music.mp3`) بتشتغل تلقائياً من أول لمسة أو ضغطة للزائر في أي مكان بالموقع — حتى لو مجرد سكرول بالإصبع على الموبايل. مفيش طريقة تخلي الصوت يشتغل قبل أي تفاعل خالص، ده قيد من المتصفح نفسه (Chrome, Safari...) مش من الموقع، ومفيش حل تقني حواليه.

زرار "SOUND ON/OFF" أسفل يسار الشاشة بيعكس الحالة ويسمح للزائر يوقف الصوت أو يرجعه يدوياً. الزرار برضو بيشغّل نغمات قصيرة صناعية (Web Audio) عند بعض التفاعلات — مفيش أي ملف مطلوب لده.

لتغيير الموسيقى، استبدل `public/music.mp3` بأي MP3 تاني بنفس الاسم.

---

## 6) الآية القرآنية

فيه مشهد هادئ بعد ظهور الاسمين مباشرة بيعرض آية من سورة الروم (٢١) — نص تعريفي كلاسيكي مناسب لسياق الزواج. تقدر تغيّر النص أو المرجع من `verseText` و `verseRef` داخل `src/types.ts`.

---

## 7) الرسالة السرية

فيه "+" صغيرة جداً وشبه مخفية أسفل يمين الشاشة (Easter egg) — لو الزائر لقاها وضغط عليها، هتظهر رسالة سرية. النص في `secretMessage` داخل `src/types.ts`.

---

## 8) النشر على GitHub Pages

المشروع مُهيّأ بالفعل للنشر على أي مسار فرعي (`base: './'` في `vite.config.ts`).

### تلقائي (GitHub Actions)
1. ارفع المشروع لمستودع GitHub.
2. من **Settings → Pages → Source**، اختر **GitHub Actions**.
3. الملف الجاهز في `.github/workflows/deploy.yml` هيبني وينشر تلقائياً مع كل push على `main`.

### يدوي
```bash
npm run deploy
```

---

## 9) بنية المشروع

```
src/
  components/
    Opening.tsx              الشاشة السوداء الافتتاحية (تسلسل سينمائي)
    HeroSplit.tsx             الأسماء العملاقة + انتقال الانقسام عند السكرول
    VerseScene.tsx             مشهد الآية القرآنية
    ImageSequence.tsx          الصور الثلاث المتتالية (01/02/03)
    ImagePanel.tsx              منطق الكشف التدريجي لصورة واحدة
    DateMorph.tsx               التاريخ يتحول لرقم ضخم واحد أثناء السكرول
    InfoEditorial.tsx            تفاصيل WHEN/WHERE بدون كروت
    LocationInteractive.tsx       اسم المدينة يذوب ليكشف عن خريطة
    MemoryGallery.tsx              ألبوم صور الذكرى (بتتكبر لما تدوس عليها)
    MessageWall.tsx                حائط الرسائل العائمة (Firebase)
    MemoriesHuge.tsx               عدّاد «بقالنا كام يوم مع بعض» برقم ضخم
    FinalScene.tsx                   المشهد الختامي
    CustomCursor.tsx                  مؤشر مخصص (ديسكتوب فقط)
    SoundToggle.tsx                    زرار الصوت
    SecretTrigger.tsx                   الرسالة السرية المخفية
  data/
    gallery.ts                   قايمة صور الذكرى
  hooks/
    useLenis.ts                السكرول الناعم
    useSoundEngine.ts            محرك الصوت
    useTimeSince.ts                عدّ من يوم الفرح
  firebase.ts                 إعداد Firebase
  types.ts                    كل بيانات الدعوة + MEMORY_CONFIG
firestore.rules               قواعد أمان Firestore
public/
  images/                     الصور الأصلية (الكبيرة)
  photos/                     نسخ مضغوطة للذكرى — هنا بتحط صور جديدة
  music.mp3                    الموسيقى
  og-image.jpg                  الصورة اللي بتظهر لما حد يشارك اللينك
```

---

## 10) الموقع بقى «ذكرى» — إيه اللي اتغير

يوم الفرح (21.09.2026) عدّى، فالموقع اتحدّث من **دعوة** لـ **ذكرى**:

- **العدّ التنازلي** (`CountdownHuge` سابقاً) بقى `MemoriesHuge`: عدّاد بيعدّ *من* يوم الفرح — «بقالنا كام يوم مع بعض» — والرقم بيكبر لوحده كل يوم، والخط بيصغر أوتوماتيك كل ما الرقم يكبر.
- **ألبوم صور جديد** (`MemoryGallery` + `src/data/gallery.ts`) اسمه «ذكرياتنا»: الصور بتظهر بالتدريج مع السكرول، وبتتكبر بضغطة عليها مع أسهم للتنقل.
- **كل الكلام** اتغيّر من صيغة الدعوة («مستنيينكم» / «SEE YOU THERE») لصيغة ذكرى وشكر («كانت أحلى ليلة» / «شكراً لكل واحد كان جزء من يومنا»).
- **حائط الرسائل** فضل زي ما هو (Firebase + رد العروسين) بس بمنطق ذكرى: «سيبوا ذكرى أو كلمة… هتفضل هنا معانا».
- عنوان الموقع ووصفه (اللي بيظهروا في واتساب/فيسبوك/جوجل) اتحدّثوا، واتضافت صورة مشاركة `public/og-image.jpg`.

كل الكلام الجديد في ملف واحد: **`MEMORY_CONFIG`** جوه `src/types.ts` — عدّل أي جملة من هناك (ولو الجملة فيها `{n}` بيتحوّل الرقم فيها لوحده).

### إضافة صور للذكرى

1. حطّ الصور في فولدر `public/photos/`.
2. افتح `src/data/gallery.ts` وضيف سطر لكل صورة:

```ts
{ src: './photos/05.jpg', caption: 'أول خروجة', sub: 'OUR FIRST' }
```

> الأسماء الموجودة حالياً في الملف (الخاتم / يوم ما وعدنا بعض / وأحنا راجعين / قعدتنا المفضلة) مجرد اقتراحات — غيّرها لأي حاجة تفتكروها.
>
> الصور الأصلية سايبينها زي ما هي في `public/images/` (ومستخدمة في مشهد الكشف السينمائي)، والنسخ اللي في `public/photos/` مضغوطة عشان الموقع يفتح بسرعة.

### لو حوّلت الموقع لدعوة تاني (لفرح تاني)

غيّر `isoDateTime` في `src/types.ts` — العدّاد بيفهم لوحده: لو التاريخ في المستقبل بيتصرّف كعدّ تنازلي عادي، ولو في الماضي بيعدّ من الفرح.

---

بالتوفيق و ألف مبارك لـ إسلام و عفاف! 🤍
