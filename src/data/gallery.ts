export interface GalleryPhoto {
  /** مسار الصورة — حطّها في public/photos/ واستخدم مسار نسبي زي './photos/04.jpg'.
   * لو الخانة فاضية (مش موجودة): بيظهر براواز فاضي محجوز للصورة لحد ما توصل. */
  src?: string
  /** العنوان اللي بيظهر تحت الصورة */
  caption: string
  /** سطر صغير إضافي تحت العنوان — سيبه فاضي لو مش عايزه */
  sub?: string
  /** نص بديل للـ screen readers وللـ SEO */
  alt?: string
}

/**
 * ألبوم الذكريات — 5 خانات محجوزة بعناوينها (With Our People مكررة مرتين)،
 * براواز فاضي لكل صورة لحد ما صور الفرح توصل.
 *
 * أول ما الصور تيجي: سمّيها 01.jpg لحد 05.jpg وحطها في public/photos/،
 * وبعدين ضيف سطر الـ src لكل خانة بالترتيب، زي:
 *
 *   { src: './photos/01.jpg', caption: 'The First Dance' },
 *
 * الترتيب هنا هو نفسه ترتيب ظهور الصور.
 */
export const GALLERY: GalleryPhoto[] = [
  {
    caption: 'The First Dance',
    alt: 'أول رقصة لإسلام وعفاف في الفرح — الصورة قريباً',
  },
  {
    caption: 'With Our People',
    alt: 'إسلام وعفاف وسط أهلهما وناسهما — الصورة قريباً',
  },
  {
    caption: 'With Our People',
    alt: 'لقطة تانية لإسلام وعفاف وسط أهلهما وناسهما — الصورة قريباً',
  },
  {
    caption: 'The Night',
    alt: 'ليل فرح إسلام وعفاف — الصورة قريباً',
  },
  {
    caption: 'Forever',
    alt: 'لقطة إسلام وعفاف الأخيرة — الصورة قريباً',
  },
]
