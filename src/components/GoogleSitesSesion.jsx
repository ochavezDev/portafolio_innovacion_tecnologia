import { useState } from 'react'
import { Link } from 'react-router'
import Reveal from './Reveal'

const SITE_URL = 'https://sites.google.com/autonoma.edu.pe/react/inicio'
const SITE_SHOT =
  'https://res.cloudinary.com/fuh3zsuf/image/upload/v1789938854/2026-09-20_16h13_36.png'

const necesidades = [
  {
    num: '[N1]',
    icon: 'web',
    iconCls: 'text-primary',
    iconBg: 'bg-primary-container/20',
    title: 'Sitios web sin código',
    desc: 'Editor visual de arrastrar y soltar con rejilla automática: estructura y diseño profesional sin escribir una sola línea de programación.',
  },
  {
    num: '[N2]',
    icon: 'cloud',
    iconCls: 'text-primary-container',
    iconBg: 'bg-primary/20',
    title: 'Alojamiento en la nube',
    desc: 'Google almacena el sitio en Drive y lo publica con URL propia y HTTPS. No se contrata hosting ni dominio: todo incluido y gratuito.',
  },
  {
    num: '[N3]',
    icon: 'group',
    iconCls: 'text-tertiary',
    iconBg: 'bg-tertiary-container/30',
    title: 'Trabajo colaborativo',
    desc: 'Coedición en tiempo real con control de roles (Editor / Lector), tal como se trabaja en Google Docs y Hojas de cálculo.',
  },
  {
    num: '[N4]',
    icon: 'extension',
    iconCls: 'text-primary',
    iconBg: 'bg-secondary-container/50',
    title: 'Integración con Workspace',
    desc: 'Documentos, hojas de cálculo, formularios, YouTube, Calendar y Maps: contenido dinámico incrustable sin salir del ecosistema Google.',
  },
  {
    num: '[N5]',
    icon: 'devices',
    iconCls: 'text-primary-container',
    iconBg: 'bg-primary-fixed-dim/30',
    title: 'Diseño responsive',
    desc: 'El sitio se adapta automáticamente a celulares, tabletas y escritorio gracias a su cuadrícula fluida y plantillas optimizadas.',
  },
  {
    num: '[N6]',
    icon: 'admin_panel_settings',
    iconCls: 'text-tertiary',
    iconBg: 'bg-tertiary-fixed/50',
    title: 'Seguridad administrada',
    desc: 'Acceso público o restringido por persona y grupo. Hosting, copias de seguridad y mantenimiento están a cargo de Google.',
  },
]

const pasos = [
  {
    num: '[01]',
    icon: 'login',
    title: 'Accede con tu cuenta institucional',
    desc: 'Ingresa a sites.google.com o desde Google Drive → Nuevo → Más → Google Sites, iniciando sesión con tu cuenta @autonoma.edu.pe.',
    chip: 'sites.google.com',
  },
  {
    num: '[02]',
    icon: 'dashboard_customize',
    title: 'Elige plantilla o empieza en blanco',
    desc: 'Selecciona una plantilla prediseñada para ahorrar tiempo o un sitio en blanco, y asigna un nombre de documento (el archivo se guarda en Drive).',
    chip: 'Plantilla / En blanco',
  },
  {
    num: '[03]',
    icon: 'edit',
    title: 'Define el título del sitio web',
    desc: 'Escribe el nombre que aparecerá en la barra del navegador y en el encabezado del sitio publicado, junto con el logotipo.',
    chip: 'Título del sitio',
  },
  {
    num: '[04]',
    icon: 'pages',
    title: 'Crea y organiza la estructura de páginas',
    desc: 'Agrega páginas desde el panel "Páginas", renómbralas, arrástralas para reordenar y crea hasta cinco niveles de subpáginas.',
    chip: 'Panel Páginas',
  },
  {
    num: '[05]',
    icon: 'add_box',
    title: 'Inserta bloques de contenido',
    desc: 'Con arrastrar y soltar agrega textos, títulos, imágenes, carruseles, botones y barras de búsqueda; la cuadrícula los alinea automáticamente.',
    chip: 'Insertar',
  },
  {
    num: '[06]',
    icon: 'extension',
    title: 'Integra contenido de Google Workspace',
    desc: 'Incrusta Documentos, Hojas de cálculo, Formularios, videos de YouTube, Calendario y Mapas para hacer tu sitio dinámico y verificable.',
    chip: 'Insertar → Google Drive',
  },
  {
    num: '[07]',
    icon: 'palette',
    title: 'Personaliza el tema y la apariencia',
    desc: 'Ajusta colores, fuentes, diseño de menú, logotipo e imagen de banner para mantener una línea visual consistente en todas las páginas.',
    chip: 'Temas',
  },
  {
    num: '[08]',
    icon: 'group',
    title: 'Colabora en la edición',
    desc: 'Usa "Compartir" para invitar a tu equipo con roles de Editor; todos ven los cambios al instante mediante la coedición en tiempo real.',
    chip: 'Compartir',
  },
  {
    num: '[09]',
    icon: 'devices',
    title: 'Previsualiza antes de publicar',
    desc: 'Pulsa "Vista previa" para revisar el diseño en escritorio, tableta y móvil, y verifica la navegación antes de salir al aire.',
    chip: 'Vista previa',
  },
  {
    num: '[10]',
    icon: 'publish',
    title: 'Publica y administra los accesos',
    desc: 'Pulsa "Publicar", define tu dirección web (sites.google.com/autonoma.edu.pe/…) y elige quién puede verlo: Público o Restringido. Cada cambio posterior se aplica con "Publicar cambios".',
    chip: 'Publicar',
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
      aria-label={`Copiar URL del sitio`}
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
      {/* Barra de navegador */}
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

      {/* Área de contenido — pantalla de inicio */}
      <div className="relative bg-surface-container-low min-h-[420px] flex flex-col">
        <img
          src={SITE_SHOT}
          alt="Pantalla de inicio del sitio web publicado en Google Sites (https://sites.google.com/autonoma.edu.pe/react/inicio)"
          loading="lazy"
          className="w-full flex-1 object-cover object-top block"
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-unit-xs bg-surface-container-low px-unit-sm py-unit-2xs border-t border-outline-variant">
          <span className="inline-flex items-center gap-unit-2xs font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
            <span className="material-symbols-outlined text-[15px] text-primary">visibility</span>
            Pantalla de inicio
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            Abrir el Sitio
          </a>
        </div>
      </div>
    </div>
  )
}

export default function GoogleSitesSesion() {
  return (
    <section className="w-full bg-surface" id="unidad-1-sesion-2">
      <div className="max-w-[1280px] w-full mx-auto px-grid-margin-mobile sm:px-grid-margin-tablet lg:px-grid-margin-desktop py-unit-xl flex flex-col gap-unit-2xl">
        {/* Encabezado */}
        <Reveal as="header" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-md">
            <nav aria-label="Ruta académica" className="flex items-center flex-wrap gap-unit-2xs font-label-sm text-label-sm uppercase tracking-wider">
              <Link className="text-on-surface-variant hover:text-primary transition-colors" to="/">Producción Digital</Link>
              <span className="text-outline">/</span>
              <span className="text-on-surface-variant">Unidad 1: Alfabetización Digital</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">Sesión 2: Sitio Web Colaborativo</span>
            </nav>

            <div className="w-full flex flex-col justify-between bg-surface-container-lowest p-unit-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-surface-container-low rounded-full opacity-60 pointer-events-none"></div>
              <div className="flex flex-col gap-unit-xs relative z-10">
                <div className="inline-flex items-center gap-unit-xs w-fit bg-surface-container-high px-unit-xs py-[3px]">
                  <span className="text-primary-container font-headline-sm text-xs font-bold leading-none">▪</span>
                  <span className="font-label-sm text-[11px] font-bold text-on-surface tracking-widest uppercase">Entregable Modular Obligatorio</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-none mt-unit-2xs">
                  Google Sites <span className="text-primary font-light">— Sesión 2</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-unit-2xs">
                  Almacenamiento en la Nube y Trabajo Colaborativo: creación y publicación de un sitio web con Google Sites
                </p>
              </div>
              <div className="pt-unit-lg mt-unit-lg flex flex-wrap gap-unit-md items-center relative z-10 bg-surface-container-low p-unit-sm">
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">web</span>
                  <span className="font-label-sm text-label-sm text-on-surface">SITIO PUBLICADO</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">cloud_done</span>
                  <span className="font-label-sm text-label-sm text-on-surface">GOOGLE WORKSPACE</span>
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

        {/* Sección 01 — Necesidades que cubre */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">01</span>
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
                Google Sites es la herramienta de creación de sitios web de Google Workspace. Cubre la necesidad de
                publicar contenido institucional y académico en la web de forma rápida, sin conocimientos de
                programación, conectada al almacenamiento en la nube de Google Drive y lista para trabajarse en equipo.
                Sus beneficios centrales son:
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

        {/* Sección 02 — Paso a paso */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">02</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Paso a Paso: Crear y Publicar</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Del inicio en Google Sites hasta la publicación del sitio web</p>
                </div>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">10 Pasos</span>
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
                    <span className={`w-9 h-9 shrink-0 flex items-center justify-center bg-primary-container/20 text-primary`}>
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

        {/* Sección 03 — Mi Sitio */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">03</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Mi Sitio: Evidencia Desplegada</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Sitio web publicado con la cuenta institucional @autonoma.edu.pe</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-unit-2xs bg-primary-fixed-dim/20 text-on-primary-container px-unit-sm py-unit-xs font-label-sm text-label-sm font-semibold uppercase shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                Desplegado en Google Sites
              </div>
            </div>
          </Reveal>

          {/* Campo URL + botón copiar */}
          <Reveal variant="up" delay={50} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm">
              <div className="flex items-center justify-between gap-unit-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-unit-2xs">
                  <span className="material-symbols-outlined text-[16px]">link</span>
                  URL del Sitio Publicado
                </span>
                <span className="hidden sm:inline-flex items-center gap-unit-2xs bg-surface-container px-unit-xs py-[2px] font-label-sm text-[10px] text-outline font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Copiar disponible
                </span>
              </div>
              <div className="flex items-stretch gap-unit-xs border border-outline-variant bg-surface-container-low p-unit-xs overflow-x-auto">
                <span className="material-symbols-outlined text-outline text-[18px] shrink-0 self-center hidden sm:block">http</span>
                <code className="flex-1 font-mono text-body-sm text-body-sm text-on-surface whitespace-nowrap self-center py-unit-2xs">
                  {SITE_URL}
                </code>
                <CopyButton value={SITE_URL} />
              </div>
            </div>
          </Reveal>

          {/* Mock de navegador */}
          <Reveal variant="up" delay={90} duration={650}>
            <BrowserMock url={SITE_URL} />
          </Reveal>

          <Reveal variant="up" delay={120} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <div className="flex items-start justify-between gap-unit-md w-full">
                <div className="flex items-start gap-unit-sm w-full">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-[2px]">info</span>
                  <p className="flex-1 font-body-md text-body-md text-on-surface-variant text-justify">
                    Nota de verificación: la URL fue validada al 20 de septiembre de 2026. El sitio está publicado bajo
                    el dominio institucional <span className="font-bold text-on-surface">autonoma.edu.pe</span> con la
                    ruta <span className="font-mono text-[12px]">/react/inicio</span> y está configurado con acceso
                    <span className="font-bold text-on-surface"> público</span>: cualquier visitante puede visualizarlo
                    desde el botón "Abrir el Sitio" sin credenciales adicionales. La imagen superior es una captura de
                    su pantalla de inicio.
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