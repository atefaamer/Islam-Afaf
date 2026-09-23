export interface GalleryPhoto {
  /** مسار الصورة — حطّها في public/photos/ واستخدم مسار نسبي زي './photos/04.jpg' */
  src: string
  /** العنوان الكبير اللي بيظهر تحت الصورة (بالعربي) */
  caption: string
  /** سطر صغير بالإنجليزي/التاريخ تحت العنوان — سيبه فاضي لو مش عايزه */
  sub?: string
  /** نص بديل للـ screen readers وللـ SEO */
  alt?: string
}

/**
 * ألبوم الذكريات — دلوقتي 3 صور بس.
 *
 * عايز تحط صور الفرح؟ أسهل طريقة:
 *   1) سمّي صورك 01.jpg و 02.jpg و 03.jpg وحطها في public/photos/
 *      (يعني تستبدل اللي موجود — بنفس الأسماء مش محتاج تعدّل أي كود).
 *   2) لو عايز تزوّد عن 3: حط الرابعة باسم 04.jpg وضيف سطر زي ده تحت:
 *
 *        { src: './photos/04.jpg', caption: 'أول رقصة', sub: 'OUR FIRST DANCE' },
 *
 * الترتيب هنا هو نفسه ترتيب ظهور الصور.
 */
export const GALLERY: GalleryPhoto[] = [
  {
    src: './photos/01.jpg',
    caption: 'يوم ما وعدنا بعض',
    sub: 'THE PROMISE',
    alt: 'إسلام وعفاف في يوم الخطوبة',
  },
  {
    src: './photos/02.jpg',
    caption: 'وأحنا راجعين',
    sub: 'ON OUR WAY',
    alt: 'سيلفي لإسلام وعفاف في العربية',
  },
  {
    src: './photos/03.jpg',
    caption: 'قعدتنا المفضلة',
    sub: 'JUST US',
    alt: 'إسلام وعفاف في قعدة عادية',
  },
]
