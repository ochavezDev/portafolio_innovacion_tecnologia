import { PROFILE_IMG } from '../assets'
import Reveal from './Reveal'

const skills = [
  { label: 'Recursos Humanos (15+ años)', cls: 'bg-surface-container text-on-surface shadow-sm' },
  { label: 'Ingeniería de Software', cls: 'bg-surface-container text-on-surface shadow-sm' },
  { label: 'Desarrollo Web Autodidacta', cls: 'bg-surface-container text-on-surface shadow-sm' },
]

const facetas = [
  {
    icon: 'groups',
    iconCls: 'text-primary',
    tag: '15+ AÑOS',
    title: 'Trayectoria RRHH',
    desc: 'Gestión humana y nomina.',
  },
  {
    icon: 'code',
    iconCls: 'text-primary-container',
    tag: 'AUTODIDACTA',
    title: 'Tecnología &amp; Código',
    desc: 'Desarrollo web moderno.',
  },
  {
    icon: 'sports_esports',
    iconCls: 'text-tertiary',
    tag: 'HOBIES',
    title: 'Gaming &amp; Hobbies',
    desc: 'Shooters &amp; Aventura',
  },
  {
    icon: 'movie',
    iconCls: 'text-primary',
    tag: 'VIDA',
    title: 'Familia &amp; Cine',
    desc: 'Mar, hogar e historias',
  },
]

export default function Autor() {
  return (
    <section className="w-full bg-surface py-unit-3xl lg:py-unit-4xl" id="autor">
      <div className="max-w-[1280px] mx-auto px-grid-margin-desktop flex flex-col gap-unit-2xl">
        {/* Header */}
        <Reveal as="div" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-xs max-w-2xl">
            <div className="flex items-center gap-unit-xs">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Perfil del Integrante
              </span>
            </div>
            <h2 className="font-display text-headline-lg text-on-surface font-bold">Integrante</h2>
          </div>
        </Reveal>

        {/* Main Profile Bento Card */}
        <Reveal as="div" variant="up" delay={80} duration={650}>
          <div className="bg-surface-container-lowest p-unit-lg lg:p-unit-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
              {/* Image and Personal Column */}
              <div className="lg:col-span-4 flex flex-col gap-unit-md">
                <div className="relative w-full aspect-square overflow-hidden shadow-sm">
                  <img alt="Orlando Chávez" className="w-full h-full object-cover object-[50%_35%]" src={PROFILE_IMG} />
                  <div className="absolute top-unit-sm left-unit-sm bg-on-surface/80 backdrop-blur-sm text-on-primary px-unit-sm py-unit-2xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                      Integrante Líder
                    </span>
                  </div>
                </div>

                {/* Ámbito Personal */}
                <Reveal variant="left" delay={160} duration={600}>
                  <div className="bg-surface-container-low p-unit-md shadow-sm">
                    <div className="flex items-center gap-unit-xs mb-unit-2xs text-secondary font-bold">
                      <span className="material-symbols-outlined text-[20px]">family_restroom</span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider">
                        Ámbito Personal, Familia &amp; Hobbies
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                      En mi tiempo libre, disfruto de los videojuegos —especialmente los shooters como Call of
                      Duty, Fortnite y Valorant, además de los títulos de aventura— y de compartir tiempo de
                      calidad con mi familia. Estoy felizmente casado y tengo una maravillosa hija de 10 años
                      con quien comparto la afición por el cine y las escapadas al mar.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Bio & Expertises Column */}
              <div className="lg:col-span-8 flex flex-col gap-unit-lg">
                <Reveal variant="right" delay={80} duration={600}>
                  <div className="flex flex-col gap-unit-2xs">
                    <h3 className="font-display text-headline-md lg:text-headline-lg text-on-surface font-bold">
                      Orlando Chávez
                    </h3>
                    <p className="font-headline-sm text-body-lg lg:text-headline-sm text-primary font-semibold">
                      Profesional en Gestión de Recursos Humanos y Estudiante de Ingeniería de Software
                    </p>
                  </div>
                </Reveal>

                {/* Skills Tags */}
                <Reveal variant="right" delay={140} duration={600}>
                  <div className="flex flex-wrap gap-unit-xs">
                    {skills.map((s) => (
                      <span
                        key={s.label}
                        className={`px-unit-sm py-unit-2xs font-label-sm text-label-sm uppercase font-bold ${s.cls}`}
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                </Reveal>

                {/* Resumen Profesional */}
                <Reveal variant="right" delay={200} duration={650}>
                  <p className="font-body-lg text-body-lg leading-relaxed text-on-surface max-w-3xl">
                    Profesional con más de 15 años de trayectoria en Recursos Humanos y Nominas. Apasionado por
                    la tecnología, he complementado mi perfil de forma autodidacta en programacion y desarrollo web para
                    diseñar e implementar soluciones tecnológicas que automatizan y optimizan la gestión del
                    talento.
                  </p>
                </Reveal>

                {/* Interactivity: Facet Tabs / Cards Selector */}
                <div className="flex flex-col gap-unit-sm pt-unit-xs">
                  <Reveal variant="right" delay={260} duration={550}>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline font-bold">
                      Facetas Profesionales e Intereses Clave
                    </span>
                  </Reveal>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-unit-xs">
                    {facetas.map((f, i) => (
                      <Reveal key={f.title} variant="up" delay={300 + i * 70} duration={550}>
                        <div
                          className="bg-surface-container-high p-unit-sm shadow-sm flex flex-col justify-between cursor-pointer hover:bg-surface-variant transition-colors active:scale-[0.97] h-full"
                        >
                          <div className="flex items-center justify-between">
                            <span className={`material-symbols-outlined ${f.iconCls} text-[20px]`}>{f.icon}</span>
                            <span className="font-label-sm text-[10px] text-outline font-bold">{f.tag}</span>
                          </div>
                          <div className="mt-unit-xs">
                            <span className="font-label-sm text-label-sm text-on-surface font-bold block">
                              <span dangerouslySetInnerHTML={{ __html: f.title }} />
                            </span>
                            <span className="font-body-sm text-[12px] text-on-surface-variant">
                              <span dangerouslySetInnerHTML={{ __html: f.desc }} />
                            </span>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}