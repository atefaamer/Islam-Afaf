import ImagePanel from './ImagePanel'

const PANELS = [
  {
    number: '01',
    label: 'THE BEGINNING',
    src: '/images/image.png',
  },
  {
    number: '02',
    label: 'THE MOMENT',
    src: '/images/image3.png',
  },
  {
    number: '03',
    label: 'FOREVER',
    src: '/images/image2.png',
  },
]

export default function ImageSequence() {
  return (
    <div className="relative">
      {PANELS.map((panel) => (
        <ImagePanel key={panel.number} {...panel} />
      ))}
    </div>
  )
}
