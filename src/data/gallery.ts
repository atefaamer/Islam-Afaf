export interface GalleryPhoto {
  /** مسار الصورة — حطّها في public/photos/ واستخدم مسار نسبي زي './photos/05.jpg' */
  src: string
  /** العنوان الكبير اللي بيظهر تحت الصورة (بالعربي) */
  caption: string
  /** سطر صغير بالإنجليزي/التاريخ تحت العنوان — سيبه فاضي لو مش عايزه */
  sub?: string
  /** نص بديل للـ screen readers وللـ SEO */
  alt?: string
}

/**
 * ألبوم الذكريات — الترتيب هنا هو نفس ترتيب ظهور الصور.
 *
 * طريقة إضافة صورة جديدة:
 *   1) حطّ الصورة في فولدر public/photos/  (اسمها مثلاً 05.jpg)
 *   2) ضيف سطر هنا:  { src: './photos/05.jpg', caption: 'أول خروجة' }
 *
 * ملاحظة: الأسماء اللي تحت دي مقترحة — عدّلها لأي حاجة تفتكروها إنتو.
 */
export const GALLERY: GalleryPhoto[] = [
  {
    src: './photos/01.jpg',
    caption: 'الخاتم',
    sub: 'THE RING',
    alt: 'إيد إسلام وعفاف والخاتم',
  },
  {
    src: './photos/02.jpg',
    caption: 'يوم ما وعدنا بعض',
    sub: 'THE PROMISE',
    alt: 'إسلام وعفاف في يوم الخطوبة',
  },
  {
    src: './photos/03.jpg',
    caption: 'وأحنا راجعين',
    sub: 'ON OUR WAY',
    alt: 'سيلفي لإسلام وعفاف في العربية',
  },
  {
    src: './photos/04.jpg',
    caption: 'قعدتنا المفضلة',
    sub: 'JUST US',
    alt: 'إسلام وعفاف في قعدة عادية',
  },
]
