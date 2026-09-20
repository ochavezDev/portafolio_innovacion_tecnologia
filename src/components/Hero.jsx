import Reveal from './Reveal'

export default function Hero() {
  return (
    <section className="relative w-full bg-surface-container-lowest overflow-hidden" id="inicio">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high/40 via-transparent to-surface-container-low/50 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-tertiary-container/15 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative max-w-[1280px] mx-auto px-grid-margin-desktop py-unit-3xl lg:py-unit-4xl flex flex-col items-start">
        {/* Meta Badges Tracker */}
        <Reveal delay={0} duration={550}>
          <div className="flex flex-wrap items-center gap-unit-xs mb-unit-lg">
            <div className="inline-flex items-center gap-unit-2xs bg-surface-container-high text-on-surface px-unit-sm py-unit-2xs shadow-sm">
              <span className="w-2 h-2 bg-primary-container inline-block"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                Unidad 1: Alfabetización Digital
              </span>
            </div>
            <div className="inline-flex items-center gap-unit-2xs bg-surface-container-high text-on-surface px-unit-sm py-unit-2xs shadow-sm">
              <span className="w-2 h-2 bg-tertiary inline-block"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                Unidad 2: Innovación y Creatividad en la Era Digital
              </span>
            </div>
          </div>
        </Reveal>

        {/* Main Titles */}
        <Reveal delay={70} duration={650}>
          <div className="max-w-4xl flex flex-col gap-unit-md mb-unit-xl">
            <h1 className="font-display text-headline-lg lg:text-display text-on-surface tracking-tight leading-none font-bold">
              Producción Digital
            </h1>
            <p className="font-headline-sm text-headline-sm text-primary font-semibold max-w-3xl leading-snug">
              Síntesis Integradora de Evidencias de Aprendizaje en Competencias Digitales
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Entorno sistemático de documentación, análisis crítico y validación de capacidades informacionales y tecnológicas orientadas a la resolución de problemas en la era del conocimiento.
            </p>
          </div>
        </Reveal>

        {/* Action Buttons CTA */}
        <Reveal delay={140} duration={600}>
          <div className="flex flex-wrap items-center gap-unit-md mb-unit-3xl">
            <a
              className="inline-flex items-center gap-unit-xs bg-on-surface text-on-primary px-unit-lg py-unit-sm font-label-lg text-label-lg uppercase tracking-wider shadow-[4px_4px_0px_0px_#06b6d4] hover:bg-primary hover:text-on-primary transition-all active:scale-[0.97]"
              href="#proposito"
            >
              <span>Conocer Propósito</span>
              <span className="material-symbols-outlined text-[20px]">explore</span>
            </a>
            <a
              className="inline-flex items-center gap-unit-xs bg-surface-container text-on-surface px-unit-lg py-unit-sm font-label-lg text-label-lg uppercase tracking-wider shadow-sm hover:bg-surface-container-high transition-colors active:scale-[0.97]"
              href="#estructura"
            >
              <span>Ver Unidades</span>
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </a>
            <a
              className="inline-flex items-center gap-unit-xs bg-transparent text-primary px-unit-lg py-unit-sm font-label-lg text-label-lg uppercase tracking-wider hover:bg-surface-container-low transition-colors active:scale-[0.97]"
              href="#autor"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span>Conoce al Autor</span>
            </a>
          </div>
        </Reveal>

        {/* Quick Metrics Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-unit-md">
          {[
            {
              label: 'Dimensiones',
              icon: 'account_tree',
              iconCls: 'text-primary',
              value: '02',
              desc: 'Unidades Académicas Modulares',
            },
            {
              label: 'Hitos de Estudio',
              icon: 'view_timeline',
              iconCls: 'text-primary-container',
              value: '06',
              desc: 'Sesiones de Aprendizaje Práctico',
            },
            {
              label: 'Validación',
              icon: 'verified',
              iconCls: 'text-tertiary',
              value: '100%',
              desc: 'Evidencias Digitales Verificadas',
            },
          ].map((m, i) => (
            <Reveal key={m.label} delay={200 + i * 90} duration={600}>
              <div className="bg-surface-container-low p-unit-lg shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-unit-xs">
                  <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider font-bold">
                    {m.label}
                  </span>
                  <span className={`material-symbols-outlined ${m.iconCls} text-[24px]`}>{m.icon}</span>
                </div>
                <div>
                  <span className="font-display text-headline-lg text-on-surface font-bold">{m.value}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-medium mt-unit-2xs">
                    {m.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}