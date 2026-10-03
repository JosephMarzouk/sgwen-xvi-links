import { ChevronRight, MapPin } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Card } from '@/components/ui/card'

// lucide-react v1 dropped brand icons, so these two are inlined.
const Facebook = (p: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const Instagram = (p: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </svg>
)

// To add a link, add one line here.
const links = [
  { label: 'Facebook', sub: 'Follow our page', href: 'https://www.facebook.com/profile.php?id=100063636416865', icon: Facebook, color: 'bg-[#1877F2]' },
  { label: 'Instagram', sub: '@sgwen__xvi_group', href: 'https://www.instagram.com/sgwen__xvi_group?stkn=MXhkdm1zenUwejBkaQ==', icon: Instagram, color: 'bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]' },
  { label: 'Festival Location', sub: 'Open in Google Maps', href: 'https://maps.app.goo.gl/GQUgrY6ehC5FoxeP8', icon: MapPin, color: 'bg-accent' },
]

export default function App() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[radial-gradient(circle_at_top,oklch(0.9_0.05_120),transparent_60%)] px-4 py-10">
      <Card className="relative w-full max-w-md gap-0 rounded-3xl border-0 px-5 py-8 has-[>img:first-child]:pt-8 shadow-xl shadow-primary/10 ring-1 ring-primary/10 sm:px-8">
        <img src="/scarf.jpg" alt="" className="absolute top-3 right-3 size-16 rotate-12 object-contain mix-blend-multiply sm:size-20" />
        <img src="/logo.jpg" alt="Scouts & Guides of Wadi El-Nil logo" className="mx-auto mb-5 size-28 rounded-full ring-4 ring-accent ring-offset-4 ring-offset-card sm:size-32" />

        <h1 className="text-center text-3xl font-extrabold tracking-tight text-primary">SGWEN XVI</h1>
        <p className="mt-1 text-center text-sm font-semibold text-muted-foreground">Scouts &amp; Guides of Wadi El-Nil</p>
        <p dir="rtl" lang="ar" className="mt-1 text-center text-base font-bold text-accent">لنا تاريخ .. يقودنا للمستقبل</p>

        <nav className="mt-7 flex flex-col gap-3">
          {links.map(({ label, sub, href, icon: Icon, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-16 items-center gap-4 rounded-2xl bg-muted/70 p-3 transition hover:-translate-y-0.5 hover:bg-muted hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-full text-white ${color}`}>
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{label}</span>
                <span className="block truncate text-xs text-muted-foreground">{sub}</span>
              </span>
              <ChevronRight className="size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
          ))}
        </nav>

        <p className="mt-8 text-center text-xs text-muted-foreground">Est. 1933 · Group XVI est. 2018</p>
      </Card>
    </main>
  )
}
