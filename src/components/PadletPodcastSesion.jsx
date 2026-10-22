import { useState } from 'react'
import { Link } from 'react-router'
import Reveal from './Reveal'

const PADLET_WEB = 'https://padlet.com/'
const PADLET_URL =
  'https://padlet.com/chavezorlho6/empleo-informal-y-emprendimiento-juvenil-en-el-peru-s024r5ldnmimp72q40j5'
const PADLET_SHOT =
  'https://res.cloudinary.com/fuh3zsuf/image/upload/v1792700503/2026-10-22_15h21_31.png'
const NOTEBOK_WEB = 'https://notebook.google.com/'
const NOTEBOKLM_URL = 'https://notebooklm.link.google/i6oUng35B384'

const herramientas = [
  {
    num: '[H1]',
    icon: 'dashboard',
    iconCls: 'text-primary',
    iconBg: 'bg-primary-container/20',
    nombre: 'Padlet',
    web: PADLET_WEB,
    webLabel: 'padlet.com',
    desc: 'Plataforma web de colaboración visual: un tablero o muro donde varias personas agregan tarjetas con texto, imágenes, enlaces, audio o video, y ven los cambios en tiempo real.',
    uso: 'Se utilizó para organizar los hallazgos, datos y propuestas del tema en un muro público, comprensible para cualquier lector.',
    chips: ['Muro colaborativo', 'Tarjetas multimedia', 'Enlace público'],
  },
  {
    num: '[H2]',
    icon: 'podcasts',
    iconCls: 'text-tertiary',
    iconBg: 'bg-tertiary-container/30',
    nombre: 'NotebookLM',
    web: NOTEBOK_WEB,
    webLabel: 'notebook.google.com',
    desc: 'Asistente de investigación de Google basado en IA. A partir de las fuentes entregadas —documentos, enlaces o videos— resume la información, responde preguntas y genera un resumen en audio con dos voces.',
    uso: 'Se utilizó para convertir las fuentes del tema en un guion conversacional y producir un podcast de síntesis verificable.',
    chips: ['Fuentes verificables', 'Resumen en audio', 'IA de Google'],
  },
]

const trabajos = [
  {
    num: '01',
    tipo: 'Muro colaborativo',
    icon: 'dashboard',
    titulo: 'Empleo informal y emprendimiento juvenil en el Perú',
    desc: 'Muro elaborado en Padlet que reúne los hallazgos, las cifras y las propuestas del equipo sobre el empleo informal juvenil: una lectura visual del problema y de sus posibles rutas de solución.',
    herramienta: 'Padlet',
    formato: 'Muro interactivo',
    url: PADLET_URL,
  },
  {
    num: '02',
    tipo: 'Podcast',
    icon: 'graphic_eq',
    titulo: 'Informalidad juvenil peruana ¿oportunidad o supervivencia?',
    desc: 'Episodio de audio producido con NotebookLM a partir de las fuentes recopiladas. El guion sintetiza el diagnóstico, las causas y las consecuencias de la informalidad juvenil en una conversación de dos voces.',
    herramienta: 'NotebookLM',
    formato: 'Audio · Resumen de fuentes',
    url: NOTEBOKLM_URL,
  },
]

function CopyButton({ value, label = 'copiar', ariaLabel = 'Copiar URL' }) {
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
      aria-label={ariaLabel}
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

function BrowserMock({ url, image, alt, label, buttonText, copyAriaLabel }) {
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
        <CopyButton value={url} ariaLabel={copyAriaLabel} />
      </div>

      <div className="relative bg-surface-container-low min-h-[380px] flex flex-col">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full flex-1 object-cover object-top block"
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-unit-xs bg-surface-container-low px-unit-sm py-unit-2xs border-t border-outline-variant">
          <span className="inline-flex items-center gap-unit-2xs font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
            <span className="material-symbols-outlined text-[15px] text-primary">visibility</span>
            {label}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  )
}

function PodcastEvidence({ trabajo }) {
  return (
    <div className="bg-surface-container-lowest shadow-sm flex flex-col lg:flex-row lg:items-stretch">
      <div className="relative bg-on-surface text-surface p-unit-lg lg:w-[320px] lg:shrink-0 flex flex-col justify-between gap-unit-lg overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/30 pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between gap-unit-xs">
          <span className="inline-flex items-center gap-unit-2xs font-label-sm text-[10px] uppercase tracking-widest font-bold text-primary-fixed-dim">
            <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
            Podcast
          </span>
          <span className="font-mono text-[10px] text-surface/60">01 episodio</span>
        </div>

        <div className="relative z-10 flex flex-col gap-unit-sm">
          <span className="w-14 h-14 flex items-center justify-center bg-primary text-on-primary">
            <span className="material-symbols-outlined text-[30px]">podcasts</span>
          </span>
          <div className="flex items-end gap-[3px] h-10" aria-hidden="true">
            {[10, 22, 14, 34, 26, 40, 16, 30, 20, 36, 12, 24, 32, 18, 28, 12].map((h, i) => (
              <span key={i} className="w-[3px] bg-primary-fixed-dim/70" style={{ height: `${h}px` }}></span>
            ))}
          </div>
          <span className="font-label-sm text-[10px] uppercase tracking-widest font-bold text-surface/60">
            Generado con NotebookLM
          </span>
        </div>

        <div className="relative z-10">
          <a
            href={trabajo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-unit-2xs w-full bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">headphones</span>
            Escuchar el Podcast
          </a>
        </div>
      </div>

      <div className="flex-1 p-unit-lg flex flex-col gap-unit-sm">
        <div className="flex flex-wrap items-center gap-unit-2xs">
          <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-primary bg-surface-container-high px-unit-xs py-[2px]">
            Trabajo {trabajo.num}
          </span>
          <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
            {trabajo.herramienta}
          </span>
          <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
            {trabajo.formato}
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight tracking-tight">
          {trabajo.titulo}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-justify">{trabajo.desc}</p>

        <div className="mt-auto pt-unit-sm border-t border-outline-variant flex flex-col sm:flex-row sm:items-center gap-unit-xs">
          <div className="flex items-center gap-unit-2xs bg-surface-container-low border border-outline-variant p-unit-xs min-w-0 flex-1">
            <span className="material-symbols-outlined text-[16px] text-outline shrink-0">link</span>
            <span className="font-mono text-[11px] text-on-surface truncate">{trabajo.url}</span>
          </div>
          <CopyButton value={trabajo.url} ariaLabel="Copiar enlace del podcast" />
        </div>
      </div>
    </div>
  )
}

export default function PadletPodcastSesion() {
  return (
    <section className="w-full bg-surface" id="unidad-2-sesion-5">
      <div className="max-w-[1280px] w-full mx-auto px-grid-margin-mobile sm:px-grid-margin-tablet lg:px-grid-margin-desktop py-unit-xl flex flex-col gap-unit-2xl">
        {/* Encabezado */}
        <Reveal as="header" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-md">
            <nav aria-label="Ruta académica" className="flex items-center flex-wrap gap-unit-2xs font-label-sm text-label-sm uppercase tracking-wider">
              <Link className="text-on-surface-variant hover:text-primary transition-colors" to="/">Producción Digital</Link>
              <span className="text-outline">/</span>
              <span className="text-on-surface-variant">Unidad 2: Innovación y Creatividad</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">Sesión 5: Muro Colaborativo y Podcast</span>
            </nav>

            <div className="w-full flex flex-col justify-between bg-surface-container-lowest p-unit-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-surface-container-low rounded-full opacity-60 pointer-events-none"></div>
              <div className="flex flex-col gap-unit-xs relative z-10">
                <div className="inline-flex items-center gap-unit-xs w-fit bg-surface-container-high px-unit-xs py-[3px]">
                  <span className="text-primary-container font-headline-sm text-xs font-bold leading-none">▪</span>
                  <span className="font-label-sm text-[11px] font-bold text-on-surface tracking-widest uppercase">Entregable Modular Obligatorio</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-none mt-unit-2xs">
                  Padlet y NotebookLM <span className="text-primary font-light">— Sesión 5</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-unit-2xs">
                  Elaboración de un muro colaborativo y un podcast: herramientas utilizadas y evidencias publicadas
                </p>
              </div>
              <div className="pt-unit-lg mt-unit-lg flex flex-wrap gap-unit-md items-center relative z-10 bg-surface-container-low p-unit-sm">
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">dashboard</span>
                  <span className="font-label-sm text-label-sm text-on-surface">MURO COLABORATIVO</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">graphic_eq</span>
                  <span className="font-label-sm text-label-sm text-on-surface">PODCAST CON IA</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">public</span>
                  <span className="font-label-sm text-label-sm text-on-surface">EVIDENCIAS PUBLICADAS</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sección 01 — Resumen de herramientas */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">01</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Resumen de Herramientas Utilizadas</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Dos herramientas complementarias: una para organizar y otra para narrar</p>
                </div>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">2 Herramientas</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={50} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                La sesión combinó dos herramientas web con funciones distintas pero encadenadas. <span className="font-bold text-on-surface">Padlet</span> permitió
                construir un muro colaborativo para ordenar visualmente la información; <span className="font-bold text-on-surface">NotebookLM</span> tomó
                esas fuentes y las convirtió en un podcast de síntesis. El resultado es un mismo tema contado en dos
                formatos: uno visual y colectivo, y otro sonoro y narrativo.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-unit-lg items-stretch">
            {herramientas.map((h, i) => (
              <Reveal as="article" key={h.num} variant="up" delay={i * 70} duration={600}>
                <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm h-full">
                  <div className="flex items-start justify-between gap-unit-sm">
                    <div className="flex items-center gap-unit-sm">
                      <span className={`w-12 h-12 shrink-0 flex items-center justify-center ${h.iconBg} ${h.iconCls}`}>
                        <span className="material-symbols-outlined text-[24px]">{h.icon}</span>
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-primary font-bold">{h.num}</span>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-bold leading-none">{h.nombre}</h3>
                      </div>
                    </div>
                    <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-outline">
                      Herramienta web
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-justify">{h.desc}</p>

                  <div className="bg-surface-container-low p-unit-sm flex items-start gap-unit-xs">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-[2px]">target</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-justify">{h.uso}</p>
                  </div>

                  <div className="flex flex-wrap gap-unit-2xs">
                    {h.chips.map((c) => (
                      <span key={c} className="inline-flex items-center bg-surface-container-high px-unit-xs py-[3px] font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-unit-xs flex flex-col sm:flex-row sm:items-center gap-unit-xs">
                    <a
                      href={h.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      Ir a {h.nombre}
                    </a>
                    <span className="font-mono text-[11px] text-outline truncate">{h.webLabel}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sección 02 — Trabajos */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">02</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Trabajos Elaborados</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Evidencias publicadas y accesibles desde su enlace original</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-unit-2xs bg-primary-fixed-dim/20 text-on-primary-container px-unit-sm py-unit-xs font-label-sm text-label-sm font-semibold uppercase shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                2 Evidencias
              </div>
            </div>
          </Reveal>

          {/* Trabajo 01 — Muro */}
          <div className="flex flex-col gap-unit-md">
            <Reveal variant="up" delay={40} duration={600}>
              <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm">
                <div className="flex flex-wrap items-center gap-unit-2xs">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-primary bg-surface-container-high px-unit-xs py-[2px]">
                    Trabajo 01
                  </span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
                    {trabajos[0].herramienta}
                  </span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
                    {trabajos[0].formato}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight leading-tight">
                  {trabajos[0].titulo}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">{trabajos[0].desc}</p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={70} duration={650}>
              <BrowserMock
                url={trabajos[0].url}
                image={PADLET_SHOT}
                alt="Captura del muro colaborativo «Empleo informal y emprendimiento juvenil en el Perú» publicado en Padlet"
                label="Muro publicado"
                buttonText="Abrir el Muro"
                copyAriaLabel="Copiar URL del muro"
              />
            </Reveal>

            <Reveal variant="up" delay={90} duration={600}>
              <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-unit-2xs">
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  URL del Muro Publicado
                </span>
                <div className="flex items-stretch gap-unit-xs border border-outline-variant bg-surface-container-low p-unit-xs overflow-x-auto">
                  <span className="material-symbols-outlined text-outline text-[18px] shrink-0 self-center hidden sm:block">http</span>
                  <code className="flex-1 font-mono text-body-sm text-body-sm text-on-surface whitespace-nowrap self-center py-unit-2xs">
                    {trabajos[0].url}
                  </code>
                  <CopyButton value={trabajos[0].url} ariaLabel="Copiar URL del muro" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trabajo 02 — Podcast */}
          <div className="flex flex-col gap-unit-md">
            <Reveal variant="up" delay={40} duration={600}>
              <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm">
                <div className="flex flex-wrap items-center gap-unit-2xs">
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-tertiary bg-surface-container-high px-unit-xs py-[2px]">
                    Trabajo 02
                  </span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
                    {trabajos[1].herramienta}
                  </span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
                    {trabajos[1].formato}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                  Del muro al audio: el podcast retoma las fuentes del trabajo anterior y las explica en una
                  conversación breve, pensada para quien prefiere escuchar antes que leer.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={70} duration={650}>
              <PodcastEvidence trabajo={trabajos[1]} />
            </Reveal>
          </div>

          <Reveal variant="up" delay={110} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <div className="flex items-start justify-between gap-unit-md w-full">
                <div className="flex items-start gap-unit-sm w-full">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-[2px]">info</span>
                  <p className="flex-1 font-body-md text-body-md text-on-surface-variant text-justify">
                    Nota de verificación: ambas URL fueron validadas al 22 de octubre de 2026. El muro está publicado
                    en <span className="font-bold text-on-surface">padlet.com</span> con acceso abierto, mientras que el
                    podcast se comparte mediante el enlace de <span className="font-bold text-on-surface">NotebookLM</span> y
                    puede solicitar una cuenta de Google para reproducirse. Las tarjetas de esta sección enlazan siempre
                    a la evidencia original, no a copias locales.
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
