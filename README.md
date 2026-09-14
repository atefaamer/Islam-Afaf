# إسلام × عفاف — تجربة رقمية سينمائية

موقع دعوة زفاف تجريبي، مبني كتجربة تفاعلية متصلة (لا يشبه قوالب الدعوات التقليدية) بـ React + TypeScript + Vite + Tailwind + Framer Motion + Lenis، مع رسائل ضيوف مباشرة عبر Firebase.

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

كل بيانات الدعوة في `src/types.ts`:

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
    MessageWall.tsx                حائط الرسائل العائمة (Firebase)
    CountdownHuge.tsx               عداد تنازلي برقم واحد ضخم فقط
    FinalScene.tsx                   المشهد الختامي
    CustomCursor.tsx                  مؤشر مخصص (ديسكتوب فقط)
    SoundToggle.tsx                    زرار الصوت
    SecretTrigger.tsx                   الرسالة السرية المخفية
  hooks/
    useLenis.ts                السكرول الناعم
    useSoundEngine.ts            محرك الصوت
    useCountdown.ts                منطق العد التنازلي
  firebase.ts                 إعداد Firebase
  types.ts                    كل بيانات الدعوة
firestore.rules               قواعد أمان Firestore
```

---

بالتوفيق و ألف مبارك لـ إسلام و عفاف! 🤍
