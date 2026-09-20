import Reveal from './Reveal'

const unidades = [
  {
    codigo: 'Módulo 01',
    titulo: 'Alfabetización Digital',
    icon: 'dataset',
    iconColor: 'text-primary',
    desc: 'Establecimiento de competencias operativas para la búsqueda, validación metodológica, estructuración lógica y gestión de fuentes informativas complejas en la web académica.',
    sesiones: [
      { num: '01', titulo: 'Sesión 1', desc: 'Entorno Digital Institucional' },
      { num: '02', titulo: 'Sesión 2', desc: 'Almacenamiento en la Nube y Trabajo Colaborativo' },
      { num: '03', titulo: 'Sesión 3', desc: 'Visualización de Datos y Generación de Información con Inteligencia Artificial' },
    ],
    fase: 'Fase 1/2',
    sesionColor: 'text-primary',
  },
  {
    codigo: 'Módulo 02',
    titulo: 'Innovación y Creatividad',
    icon: 'lightbulb',
    iconColor: 'text-primary-container',
    desc: 'Aplicación de pensamiento inventivo, convergencia de herramientas multimedia emergentes y construcción del producto de síntesis final en soporte web.',
    sesiones: [
      { num: '04', titulo: 'Sesión 4', desc: 'Creación de Organizadores Visuales y Presentaciones Interactivas' },
      { num: '05', titulo: 'Sesión 5', desc: 'Edición de Vídeos y Producción Audiovisual' },
      { num: '06', titulo: 'Sesión 6', desc: 'Marca Personal y Presencia Profesional en la Web' },
    ],
    fase: 'Fase 2/2',
    sesionColor: 'text-primary-container',
  },
]

function SesionRow({ s }) {
  return (
    <div className="bg-surface-container-low p-unit-md flex items-center gap-unit-sm">
      <div className="flex items-start gap-unit-sm">
        <span className={`font-label-sm text-label-sm font-bold ${s.sesionColor} bg-surface-container px-unit-xs py-unit-2xs`}>
          {s.num}
        </span>
        <div className="flex flex-col">
          <span className="font-label-lg text-label-lg text-on-surface font-bold">{s.titulo}</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">{s.desc}</span>
        </div>
      </div>
    </div>
  )
}

export default function Estructura() {
  return (
    <section className="w-full bg-surface-container-low py-unit-3xl lg:py-unit-4xl" id="estructura">
      <div className="max-w-[1280px] mx-auto px-grid-margin-desktop flex flex-col gap-unit-2xl">
        {/* Section Header */}
        <Reveal as="div" variant="up" duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-unit-md">
            <div className="flex flex-col gap-unit-xs max-w-2xl">
              <div className="flex items-center gap-unit-xs">
                <span className="w-6 h-[2px] bg-primary"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                  Mapa Modular de Estudio
                </span>
              </div>
              <h2 className="font-display text-headline-lg text-on-surface font-bold">Estructura Curricular</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sesiones de aprendizaje correspondientes a las dos unidades del curso.
              </p>
            </div>
            <div className="flex items-center gap-unit-xs bg-surface-container-highest px-unit-md py-unit-xs shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-primary">info</span>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold tracking-wider">
                6 Sesiones Programadas
              </span>
            </div>
          </div>
        </Reveal>

        {/* Grid de Dos Columnas para Unidades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
          {unidades.map((u, i) => (
            <Reveal key={u.codigo} delay={i * 110} duration={650}>
              <div className="bg-surface-container-lowest p-unit-xl shadow-md flex flex-col justify-between h-full">
                <div>
                  {/* Header Card */}
                  <div className="flex items-center justify-between pb-unit-md mb-unit-md bg-surface-container-low -mx-unit-xl -mt-unit-xl px-unit-xl pt-unit-xl">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                        {u.codigo}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{u.titulo}</h3>
                    </div>
                    <span className={`material-symbols-outlined ${u.iconColor} text-[36px]`}>{u.icon}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-unit-lg">{u.desc}</p>

                  {/* Sesiones List */}
                  <div className="flex flex-col gap-unit-sm">
                    {u.sesiones.map((s, si) => (
                      <Reveal key={s.num} variant="left" duration={550} delay={si * 60}>
                        <SesionRow s={{ ...s, sesionColor: u.sesionColor }} />
                      </Reveal>
                    ))}
                  </div>
                </div>

                <div className="mt-unit-xl pt-unit-md flex items-center justify-between text-outline">
                  <span className="font-label-sm text-label-sm">{u.fase}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}