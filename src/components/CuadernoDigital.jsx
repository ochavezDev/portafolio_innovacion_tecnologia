import { Link } from 'react-router'
import Reveal from './Reveal'

function Fraction({ num, den }) {
  return (
    <span className="inline-flex flex-col items-center text-center mx-unit-2xs align-middle">
      <span className="px-unit-2xs leading-tight">{num}</span>
      <span className="w-full border-t border-outline"></span>
      <span className="px-unit-2xs leading-tight">{den}</span>
    </span>
  )
}

const stats = [
  {
    label: 'Riesgo Punitivo',
    value: 'Mitigado',
    icon: 'format_image_left',
    iconCls: 'text-primary',
    sub: 'Prevención de multas muy graves',
  },
  {
    label: 'Marco Normativo',
    value: '3 Decretos & Leyes',
    icon: 'balance',
    iconCls: 'text-tertiary',
    sub: 'D.S. 001-97, Ley 27735, D.L. 713',
  },
  {
    label: 'Alcance Objetivo',
    value: 'Actividad Privada',
    icon: 'business_center',
    iconCls: 'text-primary-container',
    sub: 'Trabajadores bajo Régimen General',
  },
]

const fuentes = [
  {
    num: '[01]',
    nombre: 'Fuente de Información — CTS',
    id: 'ID: REF-LAW-CTS-001',
    img: 'https://res.cloudinary.com/fuh3zsuf/image/upload/v1789881905/2026-09-20_00h24_37.png',
    alt: 'Evidencia digital — captura del artículo sobre el cálculo de CTS (Buk Perú)',
    justificacion:
      '(CTS — Buk Perú): Especialización técnica y actualización normativo-laboral. Buk es un software líder en gestión de planillas en Perú. Se selecciona porque explica con precisión la inclusión del sexto de la gratificación en la remuneración computable (D. Leg. 650), un detalle técnico clave que garantiza un cálculo exacto y conforme a SUNAFIL.',
    apa: 'Buk Perú. (2025, 4 de noviembre). ',
    apaEm: 'Cálculo de CTS: Remuneración, plazos y ejemplos prácticos.',
    apaUrl: 'https://www.buk.pe/blog/calculo-cts-peru-columna-del-experto',
    cita: 'Buk Perú. (2025, 4 de noviembre). Cálculo de CTS: Remuneración, plazos y ejemplos prácticos. https://www.buk.pe/blog/calculo-cts-peru-columna-del-experto',
  },
  {
    num: '[02]',
    nombre: 'Fuente de Información — Gratificaciones',
    id: 'ID: REF-LAW-GRAT-002',
    img: 'https://res.cloudinary.com/fuh3zsuf/image/upload/v1789882074/2026-09-20_00h27_42.png',
    alt: 'Evidencia digital — captura del artículo sobre el cálculo de gratificaciones (Scotiabank Perú)',
    justificacion:
      '(Gratificaciones — Scotiabank Perú): Respaldado por el sistema financiero y alta confiabilidad. Como entidad bancaria regulada por la SBS que procesa abonos masivos de nómina, garantiza exactitud en la aplicación de la Ley N.º 27735 y el cálculo correcto de la Bonificación Extraordinaria del 9% (EsSalud).',
    apa: 'Scotiabank Perú. (2026). ',
    apaEm: '¿Cuándo pagan la gratificación y cómo se calcula? Blog Scotia.',
    apaUrl: 'https://www.scotiabank.com.pe/blog/ahorros/cuenta-sueldo/calculo-de-gratificacion',
    cita: 'Scotiabank Perú. (2026). ¿Cuándo pagan la gratificación y cómo se calcula? Blog Scotia. https://www.scotiabank.com.pe/blog/ahorros/cuenta-sueldo/calculo-de-gratificacion',
  },
  {
    num: '[03]',
    nombre: 'Fuente de Información — Vacaciones',
    id: 'ID: REF-LAW-VAC-003',
    img: 'https://res.cloudinary.com/fuh3zsuf/image/upload/v1789882221/2026-09-20_00h30_19.png',
    alt: 'Evidencia digital — captura del artículo sobre vacaciones truncas (PerúContable)',
    justificacion:
      '(Vacaciones — PerúContable): Referente técnico y especializado en derecho laboral y nóminas. PerúContable es el portal de consulta clave para contadores en Perú. Se selecciona porque aplica con rigor el Decreto Legislativo N.º 713, precisando la fórmula exacta para liquidar los doceavos (meses) y treintavos (días) de vacaciones truncas al cese, evitando inconsistencias en la liquidación de beneficios.',
    apa: 'PerúContable. (2023, 29 de mayo). ',
    apaEm: 'Vacaciones truncas: ¿Qué son y cómo se calculan? Portal Laboral y Contable.',
    apaUrl: 'https://www.perucontable.com/laboral/vacaciones-truncas-que-son-y-como-se-calculan/',
    cita: 'PerúContable. (2023, 29 de mayo). Vacaciones truncas: ¿Qué son y cómo se calculan? Portal Laboral y Contable. https://www.perucontable.com/laboral/vacaciones-truncas-que-son-y-como-se-calculan/',
  },
]

const desarrolloTema = [
  {
    num: '2.1',
    icon: 'account_balance',
    iconCls: 'text-primary',
    iconBg: 'bg-primary-container/20',
    titulo: 'Compensación por Tiempo de Servicios (CTS)',
    texto:
      'La CTS se otorga semestralmente (en mayo y noviembre) como un fondo de protección ante el desempleo. La base de cálculo se compone de la remuneración computable (sueldo básico, asignación familiar y conceptos regulares) más un sexto de la última gratificación percibida.',
    formula: (
      <span className="flex flex-wrap items-center justify-center gap-unit-2xs">
        <span>CTS semestral =</span>
        <Fraction num="RB + AF + 1/6 × GRT" den="12" />
        <span>× M</span>
      </span>
    ),
    leyenda: [
      { abv: 'RB', def: 'Remuneración básica' },
      { abv: 'AF', def: 'Asignación familiar' },
      { abv: 'GRT', def: 'Última gratificación percibida' },
      { abv: 'M', def: 'Meses laborados en el semestre' },
    ],
  },
  {
    num: '2.2',
    icon: 'card_giftcard',
    iconCls: 'text-tertiary',
    iconBg: 'bg-tertiary-container/20',
    titulo: 'Gratificaciones Legales',
    texto:
      'Régida por la Ley N.º 27735, se otorga dos veces al año (Fiestas Patrias en julio y Navidad en diciembre). Equivale a un sueldo mensual completo por cada semestre calendario laborado. Además, incluye una Bonificación Extraordinaria del 9% equivalente al aporte que la empresa deja de hacer a EsSalud (o 6.75% si cuenta con una EPS).',
    formula: (
      <span className="flex flex-wrap items-center justify-center gap-unit-2xs">
        <span>GRT Total =</span>
        <Fraction num="RB + AF" den="6" />
        <span>× MC</span>
        <span>× 1.09 (EsSalud) o 1.0675 (EPS)</span>
      </span>
    ),
    leyenda: [
      { abv: 'GRT', def: 'Gratificación total' },
      { abv: 'RB', def: 'Remuneración básica' },
      { abv: 'AF', def: 'Asignación familiar' },
      { abv: 'MC', def: 'Meses completos laborados' },
    ],
  },
  {
    num: '2.3',
    icon: 'beach_access',
    iconCls: 'text-secondary',
    iconBg: 'bg-secondary-container/50',
    titulo: 'Vacaciones',
    texto:
      'Reguladas por el Decreto Legislativo N.º 713, las vacaciones equivalen a 30 días de descanso remunerado por año completo de servicios. Cuando el vínculo laboral termina antes de cumplir el año, se cancelan las "vacaciones truncas" de forma proporcional por cada mes completo trabajado (en doceavos) y por los días adicionales (en treintavos).',
    formula: (
      <span className="flex flex-wrap items-center justify-center gap-unit-2xs">
        <span>VAC Truncas =</span>
        <Fraction num="RMC" den="12" />
        <span>× MC</span>
        <span>+</span>
        <Fraction num="RMC" den="360" />
        <span>× DA</span>
      </span>
    ),
    leyenda: [
      { abv: 'VAC', def: 'Vacaciones truncas' },
      { abv: 'RMC', def: 'Remuneración computable' },
      { abv: 'MC', def: 'Meses completos trabajados' },
      { abv: 'DA', def: 'Días adicionales' },
    ],
  },
]

export default function CuadernoDigital() {
  return (
    <section className="w-full bg-surface" id="unidad-1-sesion-1">
      <div className="max-w-[1280px] w-full mx-auto px-grid-margin-mobile sm:px-grid-margin-tablet lg:px-grid-margin-desktop py-unit-xl flex flex-col gap-unit-2xl">
        {/* Encabezado del cuaderno */}
        <Reveal as="header" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-md">
            <div className="flex flex-wrap items-center justify-between gap-unit-sm">
              <nav aria-label="Ruta académica" className="flex items-center flex-wrap gap-unit-2xs font-label-sm text-label-sm uppercase tracking-wider">
                <Link className="text-on-surface-variant hover:text-primary transition-colors" to="/">Producción Digital</Link>
                <span className="text-outline">/</span>
                <span className="text-on-surface-variant">Unidad 1: Alfabetización Digital</span>
                <span className="text-outline">/</span>
                <span className="text-primary font-bold">Sesión 1: Cuaderno Digital</span>
              </nav>
            </div>

            <div className="w-full flex flex-col justify-between bg-surface-container-lowest p-unit-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-surface-container-low rounded-full opacity-60 pointer-events-none"></div>
              <div className="flex flex-col gap-unit-xs relative z-10">
                <div className="inline-flex items-center gap-unit-xs w-fit bg-surface-container-high px-unit-xs py-[3px]">
                  <span className="text-primary-container font-headline-sm text-xs font-bold leading-none">▪</span>
                  <span className="font-label-sm text-[11px] font-bold text-on-surface tracking-widest uppercase">Entregable Modular Obligatorio</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-none mt-unit-2xs">
                  Cuaderno Digital <span className="text-primary font-light">— Sesión 1</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-unit-2xs">
                Cálculo de Beneficios Sociales para el Regimen Laboral 728 
                </p>
              </div>
              <div className="pt-unit-lg mt-unit-lg flex flex-wrap gap-unit-md items-center relative z-10 bg-surface-container-low p-unit-sm">
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
                  <span className="font-label-sm text-label-sm text-on-surface">3 FUENTES REVISADAS</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">spellcheck</span>
                  <span className="font-label-sm text-label-sm text-on-surface">NORMA APA 7.ª ED. APLICADA</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">gavel</span>
                  <span className="font-label-sm text-label-sm text-on-surface">D.L. 728 / BENEFICIOS SOCIALES</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sección 01 — Tema & Fundamentación */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">01</span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Tema y Fundamentación</h2>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm hidden sm:flex">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">Eje Temático</span>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-unit-lg">
            <Reveal as="div" variant="up" delay={60} duration={600}>
              <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col justify-between gap-unit-md h-full">
                <div className="flex flex-col gap-unit-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">1. Tema de Investigación Elegido</span>
                  </div>
                  <div className="relative mt-unit-xs group">
                    <div className="bg-surface-container-low p-unit-md text-on-surface font-headline-sm text-headline-sm font-semibold leading-snug">
                      "Cálculo de Beneficios Sociales para el Regimen Laboral 728."
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-unit-xs pt-unit-xs">
                  <span className="font-label-sm text-[11px] text-outline tracking-wider uppercase font-semibold">Principales Beneficios Sociales:</span>
                  <div className="flex flex-wrap gap-unit-xs">
                    <span className="bg-surface-container px-unit-xs py-unit-2xs font-label-sm text-[11px] text-on-surface uppercase font-semibold">CTS</span>
                    <span className="bg-surface-container-highest px-unit-xs py-unit-2xs font-label-sm text-[11px] text-primary uppercase font-bold">GRATIFICACION</span>
                    <span className="bg-surface-container px-unit-xs py-unit-2xs font-label-sm text-[11px] text-on-surface uppercase font-semibold">VACACIONES</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal as="div" variant="up" delay={100} duration={600}>
              <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col justify-between gap-unit-md h-full">
                <div className="flex flex-col gap-unit-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">2. Fundamentación de la Elección del Tema</span>
                    <span className="bg-primary-container/20 text-on-primary-container px-unit-xs py-[2px] font-label-sm text-[10px] font-bold uppercase tracking-widest">Relevancia Jurídica y Tecnológica</span>
                  </div>
                  <div className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-unit-sm mt-unit-xs text-justify">
                    <p>
                      El Régimen Laboral 728 es la columna vertebral del empleo formal privado en el Perú. Conocido como el "régimen común", abarca a la mayoría de los empleos tradicionales y establece el paquete completo de beneficios que exige la ley. Dominar sus reglas es vital tanto para quien contrata como para quien trabaja, pues previene sorpresas desagradables y construye relaciones laborales sólidas, transparentes y duraderas. Para el colaborador, entender estos beneficios va más allá de saber cuánto cobrar cada mes: significa tomar el control de sus finanzas y hacer respetar sus derechos. Para el empleador, conocer la ley no representa un gasto, sino una estrategia clara de protección, sostenibilidad y crecimiento.
                    </p>
                    <p>
                     En definitiva, la formalidad genera una alianza donde todos ganan: el empleado trabaja con la tranquilidad de que sus derechos y su futuro están cubiertos, mientras que la empresa opera protegida ante fiscalizaciones y con la capacidad de proyectar sus costos de manera clara y sostenible.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-unit-xs pt-unit-sm">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-surface-container-low p-unit-sm flex flex-col">
                      <span className="font-label-sm text-[10px] text-outline uppercase font-semibold">{s.label}</span>
                      <span className={`font-headline-sm text-[14px] ${s.iconCls} font-bold mt-unit-2xs flex items-center gap-[4px]`}>
                        <span className={`material-symbols-outlined text-[16px] ${s.iconCls}`}>{s.icon}</span> {s.value}
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">{s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Sección 02 — Desarrollo del Tema */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">02</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Desarrollo del Tema</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Cálculo, base legal y fórmula general de liquidación de cada beneficio social</p>
                </div>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">3 Familias de Beneficios</span>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-unit-lg items-stretch">
            {desarrolloTema.map((s, i) => (
              <Reveal as="article" key={s.num} variant="up" delay={i * 80} duration={600}>
                <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm h-full">
                  <div className="flex items-center gap-unit-sm">
                    <span className={`w-11 h-11 shrink-0 flex items-center justify-center ${s.iconBg} ${s.iconCls}`}>
                      <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                    </span>
                    <h3 className="font-headline-sm text-[15px] text-on-surface font-bold leading-tight">{s.titulo}</h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-justify">{s.texto}</p>
                  <div className="mt-auto pt-unit-2xs flex flex-col gap-unit-xs">
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline font-bold">Fórmula general:</span>
                    <div className="bg-surface-container-low p-unit-sm text-on-surface font-mono text-[13px] leading-snug overflow-x-auto">
                      {s.formula}
                    </div>
                    <div className="flex flex-wrap gap-x-unit-md gap-y-unit-2xs bg-surface-container-lowest p-unit-xs border border-surface-container-high font-label-sm text-[10px] text-on-surface-variant">
                      {s.leyenda.map((l) => (
                        <span key={l.abv} className="flex items-center gap-unit-2xs">
                          <span className="font-bold text-primary font-mono">{l.abv}</span> = {l.def}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sección 03 — Fuentes Doctrinales y Normativas Primarias */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">03</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Fuentes verificadas</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Evidencia documental, justificación y referenciación en formato APA (7.ª Edición)</p>
                </div>
              </div>
              <div className="flex items-center gap-unit-xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm">
                <span className="w-2.5 h-2.5 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">3 / 3 Fuentes Verificadas</span>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-unit-xl">
            {fuentes.map((f, i) => (
              <Reveal as="article" key={f.id} variant="up" delay={i * 70} duration={600}>
                <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-lg relative">
                  <div className="flex flex-wrap items-center justify-between gap-unit-sm bg-surface-container-low px-unit-md py-unit-xs">
                    <div className="flex items-center gap-unit-sm">
                      <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wider bg-surface-container-lowest px-unit-xs py-[2px] shadow-sm">
                        {f.num} {f.nombre}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-unit-2xs bg-primary-fixed-dim/20 text-on-primary-container px-unit-xs py-[2px] font-label-sm text-label-sm font-semibold uppercase">
                      <span className="material-symbols-outlined text-[15px] text-primary">check_circle</span>
                      Verificada Académicamente
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-unit-lg items-stretch">
                    <Reveal as="div" variant="left" delay={i * 70} duration={550} className="lg:col-span-5">
                      <div className="bg-surface-container-low p-unit-md flex flex-col gap-unit-sm h-full">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-[11px] text-on-surface uppercase font-bold flex items-center gap-unit-2xs">
                            <span className="material-symbols-outlined text-[16px] text-primary">image</span> Evidencia Digital
                          </span>
                          <span className="bg-surface-container px-unit-xs py-[2px] font-label-sm text-[10px] text-outline font-mono">PNG</span>
                        </div>

                        <div className="relative bg-surface-container-lowest p-unit-xs shadow-sm border border-surface-container-highest flex flex-col gap-unit-xs overflow-hidden">
                          <img
                            src={f.img}
                            alt={f.alt}
                            loading="lazy"
                            className="w-full h-auto object-cover block"
                          />
                        </div>
                      </div>
                    </Reveal>

                    <Reveal as="div" variant="right" delay={i * 70} duration={550} className="lg:col-span-7">
                      <div className="flex flex-col justify-between gap-unit-md h-full">
                        <div className="flex flex-col gap-unit-xs">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                            Justificación de la Selección de la Fuente de Información:
                          </span>
                          <div className="bg-surface-container-low p-unit-md font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            {f.justificacion}
                          </div>
                        </div>

                        <div className="flex-col gap-unit-2xs">
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold flex items-center gap-unit-2xs">
                              <span className="material-symbols-outlined text-primary text-[16px]">format_quote</span>
                              Referencia según Normas APA (7.ª edición):
                            </span>
                          <div className="bg-surface-container-high p-unit-md text-on-surface font-body-md text-body-md shadow-inner [text-indent:-2rem] [padding-left:3rem]">
                            {f.apa}
                            <em className="font-serif">{f.apaEm}</em>{' '}
                            <a className="text-primary underline break-all" href={f.apaUrl} rel="noopener" target="_blank">
                              {f.apaUrl}
                            </a>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}