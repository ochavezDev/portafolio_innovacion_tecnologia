import { useState } from 'react'
import { Link } from 'react-router'
import Reveal from './Reveal'

const CANVA_WEB = 'https://www.canva.com/'
const HEYZINE_WEB = 'https://heyzine.com/'
const SITES_WEB = 'https://sites.google.com/'

const REVISTA_URL = 'https://heyzine.com/flip-book/2c2164833a.html#page/1'
const REVISTA_SHOT =
  'https://res.cloudinary.com/fuh3zsuf/image/upload/v1792709093/2026-10-22_17h44_17.png'
const REVISTA_QR =
  'https://res.cloudinary.com/fuh3zsuf/image/upload/v1792709251/qr.png'

const VIDEO_DRIVE_URL =
  'https://drive.google.com/file/d/13CVeNaCjdlmD8Xuv1hasXt8SZAJCzhCf/view?usp=sharing'
const VIDEO_MP4 =
  'https://res.cloudinary.com/fuh3zsuf/video/upload/v1792711683/VideoExplicativo_GoogleSites_V02.mp4'
const VIDEO_POSTER = '/google-sites-referencial.svg'

const herramientas = [
  {
    num: '[H1]',
    icon: 'draw',
    iconCls: 'text-primary',
    iconBg: 'bg-primary-container/20',
    nombre: 'Canva',
    web: CANVA_WEB,
    webLabel: 'canva.com',
    desc: 'Plataforma de diseño gráfico en línea con editor de arrastrar y soltar, plantillas profesionales, tipografías, fotografías e ilustraciones. Permite maquetar documentos de varias páginas y exportarlos en PDF.',
    uso: 'Se utilizó para maquetar la revista: portada, secciones, jerarquía tipográfica y recursos gráficos, y para exportarla en PDF.',
    chips: ['Maquetación multipágina', 'Plantillas y recursos', 'Exportación en PDF'],
  },
  {
    num: '[H2]',
    icon: 'auto_stories',
    iconCls: 'text-tertiary',
    iconBg: 'bg-tertiary-container/30',
    nombre: 'Heyzine',
    web: HEYZINE_WEB,
    webLabel: 'heyzine.com',
    desc: 'Servicio web que convierte un PDF en un folleto o revista interactiva con efecto de pasar página. Añade sonido, enlaces y botones, y permite compartir el resultado mediante una URL o un código QR.',
    uso: 'Se utilizó para publicar la revista de Canva como flipbook navegable, accesible desde un enlace y un código QR.',
    chips: ['Efecto de página', 'Enlace y QR', 'Publicación web'],
  },
  {
    num: '[H3]',
    icon: 'web',
    iconCls: 'text-primary-container',
    iconBg: 'bg-primary-fixed-dim/30',
    nombre: 'Google Sites',
    web: SITES_WEB,
    webLabel: 'sites.google.com',
    desc: 'Creador de sitios web de Google que no requiere programación. Permite componer páginas con bloques, insertar archivos y multimedia desde Drive, definir la navegación y publicar el sitio con un dominio propio.',
    uso: 'Fue el tema del video explicativo: se documentó paso a paso cómo crear, estructurar y publicar un sitio en Google Sites.',
    chips: ['Editor por bloques', 'Integración con Drive', 'Publicación web'],
  },
]

const trabajos = [
  {
    num: '01',
    tipo: 'Revista digital',
    icon: 'auto_stories',
    titulo: 'Revista Digital: Innovación y Tecnología',
    desc: 'Revista maquetada en Canva y publicada como flipbook en Heyzine. Reúne los contenidos de la unidad en un formato editorial: portada, secciones, imágenes y una navegación que imita la lectura de una revista impresa.',
    herramienta: 'Canva + Heyzine',
    formato: 'Flipbook interactivo',
    url: REVISTA_URL,
  },
  {
    num: '02',
    tipo: 'Video explicativo',
    icon: 'smart_display',
    titulo: 'Cómo crear un sitio web con Google Sites',
    desc: 'Video tutorial que explica el uso de Google Sites: creación del sitio, elección de plantilla, organización de las páginas, inserción de contenido y publicación final. Se reproduce directamente en esta página y se comparte mediante un enlace de Google Drive.',
    herramienta: 'Google Sites',
    formato: 'Video tutorial · Drive',
    url: VIDEO_DRIVE_URL,
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

function BrowserChrome({ url, copyAriaLabel }) {
  return (
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
  )
}

function MagazineEvidence() {
  return (
    <div className="bg-surface-container-lowest shadow-sm flex flex-col lg:flex-row lg:items-stretch">
      <div className="relative bg-on-surface p-unit-lg lg:w-[340px] lg:shrink-0 flex items-center justify-center overflow-hidden">
        <div className="absolute -left-12 -top-12 w-44 h-44 rounded-full bg-primary/25 pointer-events-none"></div>
        <div className="absolute -right-10 bottom-6 w-36 h-36 rounded-full bg-tertiary/20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center gap-unit-sm w-full">
          <img
            src={REVISTA_SHOT}
            alt="Portada de la revista digital elaborada en Canva y publicada en Heyzine"
            loading="lazy"
            className="w-full max-w-[248px] border border-surface/20 shadow-[10px_10px_0px_0px_rgba(6,182,212,0.35)]"
          />
          <span className="inline-flex items-center gap-unit-2xs font-label-sm text-[10px] uppercase tracking-widest font-bold text-surface/70">
            <span className="material-symbols-outlined text-[15px] text-primary-fixed-dim">menu_book</span>
            Flipbook publicado
          </span>
        </div>
      </div>

      <div className="flex-1 p-unit-lg flex flex-col gap-unit-sm">
        <div className="flex flex-wrap items-center gap-unit-2xs">
          <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-primary bg-surface-container-high px-unit-xs py-[2px]">
            Trabajo {trabajos[0].num}
          </span>
          <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
            {trabajos[0].herramienta}
          </span>
          <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-on-surface-variant bg-surface-container px-unit-xs py-[2px]">
            {trabajos[0].formato}
          </span>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight tracking-tight">
          {trabajos[0].titulo}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-justify">{trabajos[0].desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-unit-sm items-stretch">
          <div className="bg-surface-container-low border border-outline-variant p-unit-sm flex items-center gap-unit-sm">
            <img
              src={REVISTA_QR}
              alt="Código QR para abrir la revista digital en el teléfono"
              loading="lazy"
              className="w-24 h-24 bg-white p-1 border border-outline-variant shrink-0"
            />
            <div className="flex flex-col gap-[2px]">
              <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-primary">
                Código QR
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                Escanea con la cámara del celular para abrir la revista.
              </span>
            </div>
          </div>

          <dl className="flex flex-col justify-center gap-unit-2xs bg-surface-container-low border border-outline-variant p-unit-sm">
            <div className="flex items-start justify-between gap-unit-xs">
              <dt className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-outline">Diseño</dt>
              <dd className="font-body-sm text-body-sm text-on-surface font-semibold">Canva</dd>
            </div>
            <div className="flex items-start justify-between gap-unit-xs">
              <dt className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-outline">Publicación</dt>
              <dd className="font-body-sm text-body-sm text-on-surface font-semibold">Heyzine</dd>
            </div>
            <div className="flex items-start justify-between gap-unit-xs">
              <dt className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-outline">Acceso</dt>
              <dd className="font-body-sm text-body-sm text-on-surface font-semibold">Enlace público + QR</dd>
            </div>
          </dl>
        </div>

        <div className="mt-auto pt-unit-sm border-t border-outline-variant flex flex-wrap items-center gap-unit-xs">
          <a
            href={trabajos[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Abrir la Revista
          </a>
          <CopyButton value={trabajos[0].url} ariaLabel="Copiar URL de la revista" />
        </div>
      </div>
    </div>
  )
}

function VideoPlayer() {
  return (
    <div className="bg-surface-container-lowest shadow-[4px_4px_0px_0px_#d3e4fe] border border-outline-variant flex flex-col overflow-hidden">
      <BrowserChrome url={VIDEO_MP4} copyAriaLabel="Copiar URL del video" />

      <div className="relative bg-on-surface">
        <video
          controls
          playsInline
          preload="metadata"
          poster={VIDEO_POSTER}
          className="w-full aspect-video object-cover bg-on-surface"
        >
          <source src={VIDEO_MP4} type="video/mp4" />
          Tu navegador no admite la reproducción de video HTML5. Puedes abrir el video en Google Drive.
        </video>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-unit-xs bg-surface-container-low px-unit-sm py-unit-2xs border-t border-outline-variant">
        <span className="inline-flex items-center gap-unit-2xs font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
          <span className="material-symbols-outlined text-[15px] text-primary">smart_display</span>
          Reproducción directa en la web
        </span>
        <a
          href={VIDEO_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
        >
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          Ver en Drive
        </a>
      </div>
    </div>
  )
}

export default function RevistaVideoSesion() {
  return (
    <section className="w-full bg-surface" id="unidad-2-sesion-6">
      <div className="max-w-[1280px] w-full mx-auto px-grid-margin-mobile sm:px-grid-margin-tablet lg:px-grid-margin-desktop py-unit-xl flex flex-col gap-unit-2xl">
        {/* Encabezado */}
        <Reveal as="header" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-md">
            <nav aria-label="Ruta académica" className="flex items-center flex-wrap gap-unit-2xs font-label-sm text-label-sm uppercase tracking-wider">
              <Link className="text-on-surface-variant hover:text-primary transition-colors" to="/">Producción Digital</Link>
              <span className="text-outline">/</span>
              <span className="text-on-surface-variant">Unidad 2: Innovación y Creatividad</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">Sesión 6: Revista Digital y Video Explicativo</span>
            </nav>

            <div className="w-full flex flex-col justify-between bg-surface-container-lowest p-unit-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-surface-container-low rounded-full opacity-60 pointer-events-none"></div>
              <div className="flex flex-col gap-unit-xs relative z-10">
                <div className="inline-flex items-center gap-unit-xs w-fit bg-surface-container-high px-unit-xs py-[3px]">
                  <span className="text-primary-container font-headline-sm text-xs font-bold leading-none">▪</span>
                  <span className="font-label-sm text-[11px] font-bold text-on-surface tracking-widest uppercase">Entregable Modular Obligatorio</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-none mt-unit-2xs">
                  Canva y Heyzine <span className="text-primary font-light">— Sesión 6</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-unit-2xs">
                  Elaboración de una revista digital y un video explicativo sobre Google Sites: herramientas utilizadas y evidencias publicadas
                </p>
              </div>
              <div className="pt-unit-lg mt-unit-lg flex flex-wrap gap-unit-md items-center relative z-10 bg-surface-container-low p-unit-sm">
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">auto_stories</span>
                  <span className="font-label-sm text-label-sm text-on-surface">REVISTA DIGITAL</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">flip_to_front</span>
                  <span className="font-label-sm text-label-sm text-on-surface">FLIPBOOK INTERACTIVO</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">smart_display</span>
                  <span className="font-label-sm text-label-sm text-on-surface">VIDEO EXPLICATIVO</span>
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
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Diseñar, publicar y explicar: tres herramientas para un mismo producto</p>
                </div>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">3 Herramientas</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={50} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                La sesión encadenó tres herramientas web con funciones complementarias. <span className="font-bold text-on-surface">Canva</span> sirvió para
                maquetar la revista; <span className="font-bold text-on-surface">Heyzine</span> la convirtió en un flipbook navegable y compartible; y
                <span className="font-bold text-on-surface"> Google Sites</span> fue el tema del video explicativo, donde se muestra cómo construir y publicar
                un sitio web sin programar. El resultado son dos evidencias: una revista que se lee y un video que enseña.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-unit-lg items-stretch">
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
                    <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold text-outline text-right">
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

          {/* Trabajo 01 — Revista */}
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
                <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                  De la maqueta al flipbook: la revista se diseñó página por página en Canva y se publicó en Heyzine
                  para conservar la lectura editorial con el efecto de pasar hoja. Se comparte con enlace y QR.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={70} duration={650}>
              <MagazineEvidence />
            </Reveal>

            <Reveal variant="up" delay={90} duration={600}>
              <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-unit-2xs">
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  URL de la Revista Publicada
                </span>
                <div className="flex items-stretch gap-unit-xs border border-outline-variant bg-surface-container-low p-unit-xs overflow-x-auto">
                  <span className="material-symbols-outlined text-outline text-[18px] shrink-0 self-center hidden sm:block">http</span>
                  <code className="flex-1 font-mono text-body-sm text-body-sm text-on-surface whitespace-nowrap self-center py-unit-2xs">
                    {trabajos[0].url}
                  </code>
                  <CopyButton value={trabajos[0].url} ariaLabel="Copiar URL de la revista" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trabajo 02 — Video */}
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
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight leading-tight">
                  {trabajos[1].titulo}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">{trabajos[1].desc}</p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={70} duration={650}>
              <VideoPlayer />
            </Reveal>
          </div>

          <Reveal variant="up" delay={110} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <div className="flex items-start justify-between gap-unit-md w-full">
                <div className="flex items-start gap-unit-sm w-full">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-[2px]">info</span>
                  <p className="flex-1 font-body-md text-body-md text-on-surface-variant text-justify">
                    Nota de verificación: ambas URL fueron validadas al 22 de octubre de 2026. La revista está publicada
                    como flipbook abierto en <span className="font-bold text-on-surface">heyzine.com</span>, con enlace directo y
                    código QR; el video se reproduce directamente en esta página desde
                    <span className="font-bold text-on-surface"> Cloudinary</span> y conserva un enlace de respaldo en
                    <span className="font-bold text-on-surface"> Google Drive</span>. Las tarjetas de esta sección enlazan
                    siempre a la evidencia original, no a copias locales.
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
