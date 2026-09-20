import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { LOGO } from '../assets'

const unidad1 = [
  { num: '[01]', title: 'Sesión 1', desc: 'Entorno Digital Institucional', to: '/unidad-1/sesion-1' },
  { num: '[02]', title: 'Sesión 2', desc: 'Almacenamiento en la Nube y Trabajo Colaborativo', href: '#unidad-1-sesion-2' },
  { num: '[03]', title: 'Sesión 3', desc: 'Visualización de Datos y Generación de Información con IA', href: '#unidad-1-sesion-3' },
]

const unidad2 = [
  { num: '[04]', title: 'Sesión 4', desc: 'Creación de Organizadores Visuales y Presentaciones Interactivas', href: '#unidad-2-sesion-4' },
  { num: '[05]', title: 'Sesión 5', desc: 'Edición de Vídeos y Producción Audiovisual', href: '#unidad-2-sesion-5' },
  { num: '[06]', title: 'Sesión 6', desc: 'Marca Personal y Presencia Profesional en la Web', href: '#unidad-2-sesion-6' },
]

function Dropdown({ label, badge, items, active }) {
  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-unit-2xs font-label-sm text-label-sm uppercase transition-colors py-unit-xs focus:outline-none ${
          active
            ? 'text-primary font-bold underline underline-offset-[10px] decoration-primary decoration-2'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
        type="button"
      >
        {label}
        <span className="material-symbols-outlined text-[16px] text-outline group-hover:rotate-180 transition-transform duration-200">
          expand_more
        </span>
      </button>
      <div className="absolute left-0 top-full pt-unit-xs hidden group-hover:block z-50 min-w-[340px]">
        <div className="bg-surface-container-lowest shadow-[4px_4px_0px_0px_#0b1c30] p-unit-xs flex flex-col gap-unit-2xs">
          <div className="px-unit-sm py-unit-2xs bg-surface-container-low">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              {badge}
            </span>
          </div>
          {items.map((it) => {
            const cls =
              'flex items-start gap-unit-xs p-unit-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors'
            const content = (
              <>
                <span className="font-label-sm text-label-sm text-primary-container font-bold">{it.num}</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">{it.title}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{it.desc}</span>
                </div>
              </>
            )
            return it.to ? (
              <Link key={it.num} to={it.to} className={cls}>
                {content}
              </Link>
            ) : (
              <a key={it.num} href={it.href} className={cls}>
                {content}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MobileUnitAccordion({ label, badge, items, open, onToggle, onNavigate, index, delay, active }) {
  const isOpen = open === index
  return (
    <div className="mobile-item flex flex-col border-t border-outline-variant" style={delay}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-unit-xs px-unit-md py-unit-sm font-label-sm text-label-sm uppercase font-bold transition-colors active:scale-[0.98] hover:text-primary ${
          active ? 'text-primary' : 'text-on-surface'
        }`}
      >
        <span>{label}</span>
        <span
          className={`material-symbols-outlined text-[20px] text-primary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-unit-md pb-unit-sm">
            <div className="mb-unit-xs px-unit-sm py-unit-2xs bg-surface-container-low">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                {badge}
              </span>
            </div>
            <div className="flex flex-col gap-unit-2xs">
              {items.map((it) => {
                  const cls =
                    'flex items-start gap-unit-xs p-unit-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors active:scale-[0.98]'
                  const content = (
                    <>
                      <span className="font-label-sm text-label-sm text-primary-container font-bold">{it.num}</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">{it.title}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">{it.desc}</span>
                      </div>
                    </>
                  )
                  return it.to ? (
                    <Link key={it.num} to={it.to} onClick={onNavigate} className={cls}>
                      {content}
                    </Link>
                  ) : (
                    <a key={it.num} href={it.href} onClick={onNavigate} className={cls}>
                      {content}
                    </a>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const navItems = [
  { label: 'Inicio', path: 'inicio', href: '#inicio' },
  { label: 'Integrante', path: 'integrante', href: '#autor' },
  { label: 'Presentación', path: 'presentacion', href: '#proposito' },
  { label: 'Currícula', path: 'ruta', href: '#estructura' },
]

export default function Header() {
  const [active, setActive] = useState('inicio')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openUnit, setOpenUnit] = useState(null)
  const progressRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleFragment = (e, href, activeKey) => {
    setActive(activeKey)
    if (location.pathname === '/') return
    e.preventDefault()
    navigate('/', { state: { scrollTo: href } })
  }

  useEffect(() => {
    const state = location.state
    if (state && state.scrollTo) {
      const el = document.querySelector(state.scrollTo)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (location.pathname === '/') return
    const t = setTimeout(() => window.scrollTo(0, 0), 0)
    return () => clearTimeout(t)
  }, [location.key, location.pathname, location.state])

  useEffect(() => {
    const sections = ['inicio', 'proposito', 'estructura', 'autor']
    const map = { inicio: 'inicio', proposito: 'presentacion', estructura: 'ruta', autor: 'integrante' }
    const onScroll = () => {
      const offset = 100
      const y = window.scrollY
      let current = 'inicio'
      let last = 'integrante'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        last = map[id]
        if (y >= el.offsetTop - offset && y < el.offsetTop + el.offsetHeight - offset) {
          current = map[id]
          break
        }
      }
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 2) current = last
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let ticking = false
    const update = () => {
      const el = progressRef.current
      if (!el) return
      const total = document.documentElement.scrollHeight - window.innerHeight
      const ratio = total > 0 ? window.scrollY / total : 0
      el.style.transform = `scaleX(${ratio})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setMobileOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const isUnitActive = location.pathname.startsWith('/unidad-1')

  const isActive = (path) => {
    if (isUnitActive) return false
    if (path === 'inicio') return active === 'inicio'
    if (path === 'presentacion') return active === 'presentacion'
    if (path === 'integrante') return active === 'integrante'
    if (path === 'ruta') return active === 'ruta'
    return false
  }

  const staggerDelay = (i) => ({ transitionDelay: mobileOpen ? `${60 + i * 45}ms` : '0ms' })

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-grid-margin-desktop flex items-center justify-between gap-unit-xl">
        <div className="flex items-center gap-unit-sm">
          <img
            alt="Logo Universidad Autónoma del Perú"
            className="h-9 w-auto object-contain"
            src={LOGO}
          />
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg tracking-wider uppercase text-on-surface font-bold">
              Innovación y Tecnología
            </span>
          </div>
        </div>

        <div className="flex items-center gap-unit-2xl">
          <nav className="hidden lg:flex items-center gap-unit-xl lg:gap-unit-2xl">
            {navItems.map((item) => (
              <a
                key={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={`font-label-sm text-label-sm uppercase transition-colors py-unit-xs ${
                  isActive(item.path)
                    ? 'text-primary font-bold underline underline-offset-[10px] decoration-primary decoration-2'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                href={item.href}
                onClick={(e) => handleFragment(e, item.href, item.path)}
              >
                {item.label}
              </a>
            ))}
            <Dropdown label="Unidad 1" badge="Unidad Curricular 01" items={unidad1} active={isUnitActive} />
            <Dropdown label="Unidad 2" badge="Unidad Curricular 02" items={unidad2} />
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="menu-movil"
            className="lg:hidden flex items-center justify-center w-11 h-11 bg-surface-container text-on-surface border border-on-surface hover:bg-surface-container-high transition-colors active:scale-[0.95]"
          >
              <span className="material-symbols-outlined text-[24px]">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
        </div>
      </div>

      {/* Barra de progreso de lectura */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-surface-container-low pointer-events-none" aria-hidden="true">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-primary-container"
          style={{ transition: 'transform 80ms linear' }}
        />
      </div>

      {/* Backdrop del menú móvil */}
      <div
        className={`fixed inset-0 z-40 bg-on-surface/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel del menú móvil */}
      <aside
        id="menu-movil"
        className={`mobile-panel fixed left-0 right-0 top-20 z-40 lg:hidden bg-surface-container-lowest border-b border-on-surface shadow-[0_6px_0_0_#06b6d4] ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Links principales */}
          <nav className="flex flex-col" aria-label="Navegación móvil">
            {navItems.map((item, i) => (
              <a
                key={item.path}
                href={item.href}
                onClick={(e) => {
                  handleFragment(e, item.href, item.path)
                  setMobileOpen(false)
                }}
                className={`mobile-item flex items-center justify-between px-grid-margin-desktop py-unit-md font-label-sm text-label-sm uppercase border-b border-outline-variant transition-colors active:scale-[0.99] ${
                  isActive(item.path)
                    ? 'text-primary font-bold bg-secondary-container/60'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                style={staggerDelay(i + 1)}
              >
                <span>{item.label}</span>
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isActive(item.path) ? 'text-primary' : 'text-outline'
                  }`}
                >
                  arrow_forward
                </span>
              </a>
            ))}
          </nav>

          {/* Unidades (acordeón) */}
          <MobileUnitAccordion
            index="u1"
            label="Unidad 1"
            badge="Unidad Curricular 01"
            items={unidad1}
            open={openUnit}
            onToggle={() => setOpenUnit((v) => (v === 'u1' ? null : 'u1'))}
            onNavigate={() => setMobileOpen(false)}
            delay={staggerDelay(2)}
            active={isUnitActive}
          />
          <MobileUnitAccordion
            index="u2"
            label="Unidad 2"
            badge="Unidad Curricular 02"
            items={unidad2}
            open={openUnit}
            onToggle={() => setOpenUnit((v) => (v === 'u2' ? null : 'u2'))}
            onNavigate={() => setMobileOpen(false)}
            delay={staggerDelay(3)}
          />
        </div>
      </aside>
    </header>
  )
}