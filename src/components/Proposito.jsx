import Reveal from './Reveal'

const pilares = [
  {
    num: '[PILAR 01]',
    title: 'Alfabetización Digital',
    desc: 'Es la habilidad de usar la tecnología con criterio, organizando la información y distinguiendo fuentes confiables. Permite comunicar ideas con impacto y aprovechar lo digital para aprender y crecer de forma responsable.',
    cta: 'Metodología de Curación',
    icon: 'data_object',
    iconBox: 'bg-primary-container/20 text-primary-container',
  },
  {
    num: '[PILAR 02]',
    title: 'Innovación y Creatividad',
    desc: 'Es la capacidad de mirar los retos con una mente abierta y crítica, aprovechando herramientas modernas para dar forma a ideas nuevas que propongan soluciones originales que transformen los desafíos en oportunidades de crecimiento.',
    cta: 'Diseño Disruptivo',
    icon: 'psychology',
    iconBox: 'bg-tertiary-container/30 text-tertiary',
  },
  {
    num: '[PILAR 03]',
    title: 'Evidencia Integradora',
    desc: 'Es la demostración de cómo el estudiante transforma lo aprendido en la teoría en proyectos y resultados concretos que pueden revisarse. Estos trabajos reflejan su capacidad para aplicar lo que sabe de manera práctica y profesional.',
    cta: 'Portafolio Tangible',
    icon: 'layers',
    iconBox: 'bg-primary/20 text-primary',
  },
]

function PilaresGraph() {
  const R = 52
  const C = 2 * Math.PI * R
  const gap = 14
  const n = 3
  const seg = (C - gap * n) / n
  const segments = [
    { label: 'Alfabetización Digital', color: '#06b6d4', dot: 'bg-primary-container' },
    { label: 'Innovación y Creatividad', color: '#85a3ff', dot: 'bg-tertiary-container' },
    { label: 'Evidencia Integradora', color: '#b4c5ff', dot: 'bg-tertiary-fixed-dim' },
  ]

  return (
    <div className="relative w-full max-w-[300px] mx-auto my-unit-lg">
      <div className="relative w-52 h-52 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          {segments.map((d, i) => (
            <circle
              key={d.label}
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={d.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${seg} ${C - seg}`}
              strokeDashoffset={-i * (seg + gap)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-headline-md text-on-primary font-bold leading-none">03</span>
          <span className="font-label-sm text-[10px] text-surface-variant uppercase tracking-widest mt-unit-2xs">
            Pilares
          </span>
        </div>
      </div>

      <div className="mt-unit-lg flex flex-col gap-unit-2xs">
        {segments.map((d) => (
          <div key={d.label} className="flex items-center gap-unit-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${d.dot}`}></span>
            <span className="font-body-sm text-body-sm text-on-primary font-bold">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Proposito() {
  return (
    <section className="w-full bg-surface py-unit-3xl lg:py-unit-4xl" id="proposito">
      <div className="max-w-[1280px] mx-auto px-grid-margin-desktop flex flex-col gap-unit-2xl">
        {/* Section Label & Title */}
        <Reveal as="div" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-xs max-w-3xl">
            <div className="flex items-center gap-unit-xs">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Fundamentación
              </span>
            </div>
            <h2 className="font-display text-headline-lg text-on-surface font-bold">Presentación y Propósito</h2>
          </div>
        </Reveal>

        {/* Main Editorial Text Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          <Reveal as="div" variant="left" delay={80} duration={650} className="lg:col-span-7">
            <div className="bg-surface-container-lowest p-unit-xl shadow-[4px_4px_0px_0px_#dce9ff] flex flex-col gap-unit-md h-full">            <div className="flex items-center gap-unit-xs text-primary">
              <span className="material-symbols-outlined text-[24px]">format_quote</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                Declaración Principal de Propósito
              </span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface font-medium leading-relaxed">
              Esta producción digital constituye una síntesis articulada e integradora de las evidencias de aprendizaje desarrolladas en la Unidad 1 (Alfabetización Digital) y la Unidad 2 (Innovación y Creatividad en la Era Digital). Su propósito fundamental es visibilizar el desarrollo progresivo y sustantivo de la competencia digital, así como la capacidad analítica para estructurar, gestionar y comunicar información académica en entornos virtuales.
            </p>
            <div className="pt-unit-xs">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                A través de un proceso reflexivo e interdisciplinario, este producto evidencia la convergencia entre el trabajo colaborativo, el pensamiento crítico y el uso estratégico de herramientas tecnológicas de vanguardia, transformando la teoría en soluciones creativas que responden a las exigencias de la era digital.
              </p>
            </div>
            </div>
          </Reveal>

          {/* Modelo Tripilar Visual */}
          <Reveal as="div" variant="right" delay={140} duration={650} className="lg:col-span-5">
            <div className="bg-on-surface text-on-primary p-unit-xl shadow-md flex flex-col justify-between h-full">
            <div className="flex flex-col gap-unit-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim font-bold">
                  Esquema Integrador
                </span>
                <span className="font-label-sm text-label-sm text-surface-container-highest">MODELO TRIPILAR</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                Tres Pilares de la Competencia Digital
              </h3>
              <p className="font-body-sm text-body-sm text-surface-variant mt-unit-2xs">
                Alfabetización, innovación y evidencia convergen en un único núcleo de competencia digital.
              </p>
            </div>

            <PilaresGraph />
            </div>
          </Reveal>
        </div>

        {/* 3 Tarjetas de Pilares Clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop pt-unit-md">
          {pilares.map((p, i) => (
            <Reveal key={p.num} delay={i * 90} duration={600}>
              <div
                className="bg-surface-container-lowest p-unit-xl shadow-sm flex flex-col gap-unit-sm hover:-translate-y-1 transition-transform"
              >
                <div className={`w-12 h-12 ${p.iconBox} text-primary-container flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[28px] text-on-surface">{p.icon}</span>
                </div>
                <div className="flex items-center gap-unit-2xs text-primary font-bold">
                  <span className="font-label-sm text-label-sm">{p.num}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">{p.title}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">{p.desc}</p>
                <div className="mt-auto pt-unit-sm flex items-center gap-unit-2xs text-primary font-bold">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">{p.cta}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}