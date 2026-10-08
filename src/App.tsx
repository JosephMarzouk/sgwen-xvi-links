import { ChevronRight, MapPin, Moon, Sun, Ticket } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useEffect, useState, type ComponentProps } from 'react'
import { flushSync } from 'react-dom'
import { Button } from '@/components/ui/button'
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

// Fills the whole icon circle, so it ignores the size-5 the list passes in.
const CarnivalLogo = () => <img src="/carnival-logo.png" alt="" className="size-11 max-w-none object-contain" />

// To add a link, add one line here.
const links = [
  { label: 'Ceremony Tickets', sub: 'Yearly ceremony details & online booking', href: 'https://xvi-ceremony-tickets.vercel.app/', icon: Ticket, color: 'bg-accent' },
  { label: '9th Carnival', sub: 'Join the event on Facebook', href: 'https://web.facebook.com/share/14uhhGW2QLM/', icon: CarnivalLogo, color: 'bg-transparent' },
  { label: 'Facebook', sub: 'Follow our page', href: 'https://www.facebook.com/profile.php?id=100063636416865', icon: Facebook, color: 'bg-[#1877F2]' },
  { label: 'Instagram', sub: '@sgwen__xvi_group', href: 'https://www.instagram.com/sgwen__xvi_group?stkn=MXhkdm1zenUwejBkaQ==', icon: Instagram, color: 'bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]' },
  { label: 'Festival Location', sub: 'Open in Google Maps', href: 'https://maps.app.goo.gl/GQUgrY6ehC5FoxeP8', icon: MapPin, color: 'bg-accent' },
]

// One confetti burst from each side, fired when the 🎉 poppers finish sliding in.
function firePoppers() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const burst = { particleCount: 90, spread: 55, startVelocity: 60, ticks: 260, zIndex: 50,
    colors: ['#6b7a3a', '#ef8a2b', '#f4c430', '#d62976', '#2ec4b6', '#ffffff'] }
  confetti({ ...burst, angle: 60, origin: { x: 0.03, y: 0.75 } })
  confetti({ ...burst, angle: 120, origin: { x: 0.97, y: 0.75 } })
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [toggled, setToggled] = useState(false) // bulbs stay hidden (no lift animation) until the first toggle

  // Slow cross-fade into the new theme where the browser supports view transitions; instant otherwise.
  function toggleTheme() {
    const flip = () => flushSync(() => {
      document.documentElement.classList.toggle('dark', !dark)
      setDark(!dark)
      setToggled(true)
    })
    // .ready rejects harmlessly when the browser skips the fade (e.g. tab hidden); the theme still flips.
    if (document.startViewTransition) document.startViewTransition(flip).ready.catch(() => {})
    else flip()
  }

  // Light mode hangs lanterns; dark mode lifts them and drops one connected garland of light bulbs.
  const lanterns = dark ? 'decor-lift' : 'decor-swing'
  const bulbs = dark ? 'decor-drop' : toggled ? 'decor-lift' : 'decor-hidden'

  useEffect(() => {
    const t = setTimeout(firePoppers, 750)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-[radial-gradient(circle_at_top,oklch(0.9_0.05_120),transparent_60%)] px-4 dark:bg-[radial-gradient(circle_at_top,oklch(0.33_0.06_80),transparent_60%)] pt-24 pb-10 sm:pt-28">
      <div aria-hidden className="decor pointer-events-none absolute inset-x-0 top-0 h-dvh overflow-hidden">
        <img src="/decor/lanterns.webp" alt="" className={`${lanterns} absolute top-0 left-[2%] w-[26vw] max-w-64`} />
        <div className="absolute top-0 right-[2%] w-[26vw] max-w-64 -scale-x-100">
          <img src="/decor/lanterns.webp" alt="" className={`${lanterns} w-full [animation-delay:.5s]`} />
        </div>
        <div className={`${bulbs} bulb-glow absolute inset-x-0 top-0 h-[clamp(140px,22vw,260px)] bg-[url(/decor/bulbs-strip.webp)] bg-size-[auto_100%] bg-top bg-repeat-x [animation-delay:.3s]`} />
        {/* Bunting, off for now:
        <div className="decor-drop absolute inset-x-0 top-0 h-[clamp(70px,13vw,150px)] bg-[url(/decor/bunting.webp)] bg-size-[auto_100%] bg-repeat-x" />
        */}
      </div>
      <span aria-hidden className="popper fixed bottom-[18%] left-1 text-6xl sm:text-7xl">🎉</span>
      <span aria-hidden className="popper fixed right-1 bottom-[18%] text-6xl [--d:-1] sm:text-7xl">🎉</span>

      <Card className="relative z-10 w-full max-w-md gap-0 rounded-3xl border-0 px-5 py-8 has-[>img:first-child]:pt-8 shadow-xl shadow-primary/10 ring-1 ring-primary/10 sm:px-8">
        <img src="/decor/scarf.webp" alt="" className="absolute top-3 right-3 size-16 rotate-12 object-contain sm:size-20" />
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="absolute top-4 left-4 rounded-full">
          {dark ? <Sun /> : <Moon />}
        </Button>
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
