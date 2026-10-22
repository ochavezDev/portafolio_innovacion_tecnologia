import { useState } from 'react'
import { Link } from 'react-router'
import Reveal from './Reveal'

const PRESENTATION_URL = 'https://view.genially.com/6ada3ff7ad0d4ae6a81c5c2d'
const PRESENTATION_SHOT =
  'https://res.cloudinary.com/fuh3zsuf/image/upload/v1792688935/2026-10-22_12h07_17.png'

const necesidades = [
  {
    num: '[N1]',
    icon: 'touch_app',
    iconCls: 'text-primary',
    iconBg: 'bg-primary-container/20',
    title: 'Contenido interactivo',
    desc: 'Elementos que reaccionan al clic o al pasar el cursor: ventanas emergentes, tooltips, botones y enlaces que convierten una diapositiva pasiva en una experiencia navegable.',
  },
  {
    num: '[N2]',
    icon: 'dashboard_customize',
    iconCls: 'text-primary-container',
    iconBg: 'bg-primary/20',
    title: 'Diseño sin código',
    desc: 'Editor visual de arrastrar y soltar con plantillas profesionales para presentaciones, infografías, imágenes interactivas y quizzes, sin escribir programación.',
  },
  {
    num: '[N3]',
    icon: 'animation',
    iconCls: 'text-tertiary',
    iconBg: 'bg-tertiary-container/30',
    title: 'Animación y multimedia',
    desc: 'Efectos de entrada, transiciones entre escenas, audio y video integrados que captan la atención y explican ideas complejas con movimiento.',
  },
  {
    num: '[N4]',
    icon: 'sports_esports',
    iconCls: 'text-primary',
    iconBg: 'bg-secondary-container/50',
    title: 'Gamificación y evaluación',
    desc: 'Quizzes, juegos, ruletas y escape rooms con puntuación y retroalimentación: la misma herramienta sirve para exponer y para comprobar aprendizajes.',
  },
  {
    num: '[N5]',
    icon: 'public',
    iconCls: 'text-primary-container',
    iconBg: 'bg-primary-fixed-dim/30',
    title: 'Publicación en la web',
    desc: 'Cada creación se comparte con un enlace propio o se incrusta en un sitio web. Se visualiza en cualquier navegador, sin instalar software ni descargar archivos.',
  },
  {
    num: '[N6]',
    icon: 'group_work',
    iconCls: 'text-tertiary',
    iconBg: 'bg-tertiary-fixed/50',
    title: 'Colaboración y reutilización',
    desc: 'Coedición con el equipo, comentarios, control de versiones y plantillas reutilizables que mantienen una identidad visual consistente en cada proyecto.',
  },
]

const pasos = [
  {
    num: '[01]',
    icon: 'login',
    title: 'Ingresa a Genially con tu cuenta',
    desc: 'Entra a app.genially.com e inicia sesión con Google o con tu correo. El plan gratuito permite crear y publicar presentaciones interactivas.',
    chip: 'app.genially.com',
  },
  {
    num: '[02]',
    icon: 'dashboard_customize',
    title: 'Elige una plantilla o empieza en blanco',
    desc: 'En el panel de inicio selecciona "Presentación" y escoge una plantilla interactiva o un lienzo vacío para construir tu propio diseño.',
    chip: 'Crear → Presentación',
  },
  {
    num: '[03]',
    icon: 'view_carousel',
    title: 'Estructura las escenas y el contenido',
    desc: 'Agrega escenas como diapositivas, define el título y el orden de la información, e incorpora textos, imágenes, íconos y gráficos.',
    chip: 'Escenas y capas',
  },
  {
    num: '[04]',
    icon: 'ads_click',
    title: 'Añade interactividad',
    desc: 'Convierte textos, imágenes o botones en elementos interactivos: ventanas emergentes, enlaces, tooltips, audio o preguntas con retroalimentación.',
    chip: 'Interactividad',
  },
  {
    num: '[05]',
    icon: 'palette',
    title: 'Personaliza estilo y animación',
    desc: 'Aplica el tema de color y tipografía, ajusta fondos y agrega animaciones de entrada o transiciones para dar ritmo a la presentación.',
    chip: 'Diseño y animación',
  },
  {
    num: '[06]',
    icon: 'publish',
    title: 'Publica, comparte o incrusta',
    desc: 'Pulsa "Presentar" o "Compartir" para obtener el enlace view.genially.com. Elige acceso público y, si lo necesitas, copia el código para incrustarlo en otra web.',
    chip: 'Compartir → Enlace',
  },
]

function CopyButton({ value, label = 'copiar' }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = value
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        setCopied(true)
      } finally {
        document.body.removeChild(ta)
      }
    }
    setTimeout(() => setCopied(false), 2200)
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copiar URL de la presentación"
      title={copied ? 'URL copiada' : 'Copiar URL'}
      className={`inline-flex items-center gap-unit-2xs px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider transition-colors active:scale-[0.96] border ${
        copied
          ? 'bg-primary-container/20 text-on-primary-container border-primary-container'
          : 'bg-primary text-on-primary border-primary hover:bg-primary-container hover:text-on-primary-container'
      }`}
    >
      <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
      <span className="hidden sm:inline">{copied ? 'copiada' : label}</span>
    </button>
  )
}

function BrowserMock({ url }) {
  return (
    <div className="bg-surface-container-lowest shadow-[4px_4px_0px_0px_#d3e4fe] border border-outline-variant flex flex-col overflow-hidden">
      <div className="flex items-center gap-unit-sm px-unit-sm py-unit-2xs bg-surface-container-low border-b border-outline-variant">
        <div className="flex items-center gap-[5px]">
          <span className="w-2.5 h-2.5 rounded-full bg-error/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim"></span>
        </div>
        <div className="flex-1 flex items-center gap-unit-2xs bg-surface-container-lowest border border-outline-variant px-unit-xs py-[3px] min-w-0">
          <span className="material-symbols-outlined text-[14px] text-primary shrink-0">lock</span>
          <span className="font-mono text-[11px] text-on-surface truncate">{url}</span>
        </div>
        <CopyButton value={url} />
      </div>

      <div className="relative bg-surface-container-low min-h-[420px] flex flex-col">
        <img
          src={PRESENTATION_SHOT}
          alt="Portada de la presentación interactiva «El Trabajo Informal en el Perú: Realidad y Desafíos» publicada en Genially"
          loading="lazy"
          className="w-full flex-1 object-cover object-top block"
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-unit-xs bg-surface-container-low px-unit-sm py-unit-2xs border-t border-outline-variant">
          <span className="inline-flex items-center gap-unit-2xs font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
            <span className="material-symbols-outlined text-[15px] text-primary">slideshow</span>
            Portada de la presentación
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Abrir la Presentación
          </a>
        </div>
      </div>
    </div>
  )
}

export default function GeniallySesion() {
  return (
    <section className="w-full bg-surface" id="unidad-2-sesion-4">
      <div className="max-w-[1280px] w-full mx-auto px-grid-margin-mobile sm:px-grid-margin-tablet lg:px-grid-margin-desktop py-unit-xl flex flex-col gap-unit-2xl">
        {/* Encabezado */}
        <Reveal as="header" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-md">
            <nav aria-label="Ruta académica" className="flex items-center flex-wrap gap-unit-2xs font-label-sm text-label-sm uppercase tracking-wider">
              <Link className="text-on-surface-variant hover:text-primary transition-colors" to="/">Producción Digital</Link>
              <span className="text-outline">/</span>
              <span className="text-on-surface-variant">Unidad 2: Innovación y Creatividad</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">Sesión 4: Presentaciones Interactivas</span>
            </nav>

            <div className="w-full flex flex-col justify-between bg-surface-container-lowest p-unit-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-surface-container-low rounded-full opacity-60 pointer-events-none"></div>
              <div className="flex flex-col gap-unit-xs relative z-10">
                <div className="inline-flex items-center gap-unit-xs w-fit bg-surface-container-high px-unit-xs py-[3px]">
                  <span className="text-primary-container font-headline-sm text-xs font-bold leading-none">▪</span>
                  <span className="font-label-sm text-[11px] font-bold text-on-surface tracking-widest uppercase">Entregable Modular Obligatorio</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-none mt-unit-2xs">
                  Genially <span className="text-primary font-light">— Sesión 4</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-unit-2xs">
                  Creación de Organizadores Visuales y Presentaciones Interactivas: del contenido estructurado a la
                  experiencia publicada en la web
                </p>
              </div>
              <div className="pt-unit-lg mt-unit-lg flex flex-wrap gap-unit-md items-center relative z-10 bg-surface-container-low p-unit-sm">
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">slideshow</span>
                  <span className="font-label-sm text-label-sm text-on-surface">PRESENTACIÓN PUBLICADA</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">touch_app</span>
                  <span className="font-label-sm text-label-sm text-on-surface">CONTENIDO INTERACTIVO</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">code_off</span>
                  <span className="font-label-sm text-label-sm text-on-surface">0 CÓDIGO REQUERIDO</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sección 01 — Introducción */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">01</span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Introducción a Genially</h2>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm hidden sm:flex">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Herramienta de la sesión</span>
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" delay={60} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-md">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                <span className="font-bold text-on-surface">Genially</span> es una plataforma web de origen español para
                crear contenido interactivo y animado sin necesidad de programar. Nació como una alternativa a las
                diapositivas estáticas y hoy reúne presentaciones, infografías, imágenes interactivas, quizzes, juegos y
                materiales de formación en un mismo editor visual. Su propuesta central es sencilla: que el espectador
                deje de ser un lector pasivo y pueda explorar, hacer clic, descubrir información oculta y avanzar por el
                contenido según su propio interés.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                En el ámbito académico permite transformar una investigación —como el análisis de una problemática
                social— en una pieza comunicable: portada, datos, gráficos, conclusiones y fuentes organizados en
                escenas, con un enlace público que se abre desde cualquier navegador. Esa combinación de diseño,
                interactividad y publicación en línea es la que la convierte en la herramienta de esta sesión.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-unit-sm">
                <div className="bg-surface-container-low p-unit-sm flex items-start gap-unit-xs">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0">categories</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">Multiformato</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Presentaciones, infografías y quizzes con el mismo editor.</span>
                  </div>
                </div>
                <div className="bg-surface-container-low p-unit-sm flex items-start gap-unit-xs">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0">extension</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">Interactivo</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Capas, enlaces y animaciones que responden al usuario.</span>
                  </div>
                </div>
                <div className="bg-surface-container-low p-unit-sm flex items-start gap-unit-xs">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0">public</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">En línea</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Se comparte con un enlace o se incrusta en otra web.</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Sección 02 — Necesidades que cubre */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">02</span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Necesidades que Cubre</h2>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm hidden sm:flex">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Resumen Funcional</span>
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" delay={60} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                El material académico suele quedarse en documentos extensos o diapositivas que el público solo mira.
                Genially cubre la necesidad de <span className="font-bold text-on-surface">comunicar de forma clara, visual y participativa</span>,
                integrando diseño, interactividad y publicación en una sola herramienta. Sus beneficios centrales son:
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-unit-lg items-stretch">
            {necesidades.map((n, i) => (
              <Reveal as="article" key={n.num} variant="up" delay={i * 70} duration={600}>
                <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm h-full">
                  <div className="flex items-center gap-unit-sm">
                    <span className={`w-11 h-11 shrink-0 flex items-center justify-center ${n.iconBg} ${n.iconCls}`}>
                      <span className="material-symbols-outlined text-[22px]">{n.icon}</span>
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">{n.num}</span>
                  </div>
                  <h3 className="font-headline-sm text-[15px] text-on-surface font-bold leading-tight">{n.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-justify">{n.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sección 03 — Paso a paso */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">03</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Paso a Paso: Crear una Presentación Interactiva</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Del inicio de sesión en Genially a la publicación del enlace</p>
                </div>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">6 Pasos</span>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-unit-sm">
            {pasos.map((p, i) => (
              <Reveal as="article" key={p.num} variant="up" delay={i * 40} duration={550}>
                <div className="bg-surface-container-lowest p-unit-md shadow-sm flex flex-col sm:flex-row sm:items-center gap-unit-md relative">
                  <div className="flex items-center gap-unit-sm sm:w-[240px] sm:shrink-0">
                    <span className="font-label-sm text-label-sm font-bold text-primary-container bg-surface-container-high px-unit-xs py-unit-2xs shadow-sm">
                      {p.num}
                    </span>
                    <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary-container/20 text-primary">
                      <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                    </span>
                    <span className="hidden lg:block font-label-sm text-[10px] uppercase tracking-wider text-outline font-bold">
                      {p.chip}
                    </span>
                  </div>
                  <div className="flex flex-col gap-unit-2xs flex-1">
                    <h3 className="font-headline-sm text-[15px] text-on-surface font-bold leading-tight">{p.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-justify">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sección 04 — Mi presentación */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">04</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Mi Presentación: Evidencia Publicada</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Presentación interactiva creada y publicada con Genially</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-unit-2xs bg-primary-fixed-dim/20 text-on-primary-container px-unit-sm py-unit-xs font-label-sm text-label-sm font-semibold uppercase shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                Publicada en Genially
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={50} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm">
              <div className="flex items-center justify-between gap-unit-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-unit-2xs">
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  URL de la Presentación Publicada
                </span>
                <span className="hidden sm:inline-flex items-center gap-unit-2xs bg-surface-container px-unit-xs py-[2px] font-label-sm text-[10px] text-outline font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Copiar disponible
                </span>
              </div>
              <div className="flex items-stretch gap-unit-xs border border-outline-variant bg-surface-container-low p-unit-xs overflow-x-auto">
                <span className="material-symbols-outlined text-outline text-[18px] shrink-0 self-center hidden sm:block">http</span>
                <code className="flex-1 font-mono text-body-sm text-body-sm text-on-surface whitespace-nowrap self-center py-unit-2xs">
                  {PRESENTATION_URL}
                </code>
                <CopyButton value={PRESENTATION_URL} />
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={70} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-2xs">
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Título del proyecto</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                El Trabajo Informal en el Perú: Realidad y Desafíos
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-justify">
                Análisis de la informalidad laboral en el Perú: causas, estadísticas actuales del INEI, consecuencias
                para el trabajador y el país, y posibles rutas hacia una mayor formalización económica.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={90} duration={650}>
            <BrowserMock url={PRESENTATION_URL} />
          </Reveal>

          <Reveal variant="up" delay={120} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <div className="flex items-start justify-between gap-unit-md w-full">
                <div className="flex items-start gap-unit-sm w-full">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-[2px]">info</span>
                  <p className="flex-1 font-body-md text-body-md text-on-surface-variant text-justify">
                    Nota de verificación: la URL fue validada al 22 de octubre de 2026. La presentación está publicada
                    en <span className="font-bold text-on-surface">view.genially.com</span> con acceso
                    <span className="font-bold text-on-surface"> público</span>: cualquier visitante puede recorrerla
                    desde el botón "Abrir la Presentación" sin credenciales adicionales. La imagen superior es una
                    captura de su portada y la navegación interactiva se mantiene activa en el enlace original.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </section>
  )
}
