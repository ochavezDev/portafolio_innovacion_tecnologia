import Reveal from "./Reveal";

const estructura = [
  "Unidad 1: Entorno Digital y Alfabetización",
  "Unidad 2: Innovación, Visual y Marca Personal",
  "Sesión 1: Entorno Digital Institucional",
];

const marco = [
  "Facultad de Comunicación y Tecnología",
  "Código de Ética y Propiedad Intelectual",
  "Normativa Académica de Entornos Virtuales",
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] mt-unit-4xl">
      <div className="max-w-[1280px] mx-auto px-grid-margin-desktop py-unit-3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-start pb-unit-2xl">
          <Reveal
            as="div"
            variant="left"
            duration={600}
            className="md:col-span-5"
          >
            <div className="flex flex-col gap-unit-sm">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Innovación y Tecnologia
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Su propósito principal es desarrollar y fortalecer competencias
                digitales que le permitan al estudiante aprender de forma
                autónoma y colaborativa, para que se desenvuelva ética y
                responsablemente en entornos virtuales.
              </p>
              <div className="flex items-center gap-unit-xs pt-unit-xs">
                <span className="inline-block w-2 h-2 bg-primary-container"></span>
                <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
                  Semestre Académico 2026-II
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal
            as="div"
            variant="left"
            delay={90}
            duration={600}
            className="md:col-span-4"
          >
            <div className="flex flex-col gap-unit-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Estructura de Unidades
              </span>
              <ul className="flex flex-col gap-unit-2xs pt-unit-2xs">
                <li className="font-body-sm text-body-sm text-on-surface-variant">
                  Unidad 1: Entorno Digital y Alfabetización
                </li>
                <li className="font-body-sm text-body-sm text-on-surface-variant">
                  Unidad 2: Innovación, Visual y Marca Personal
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal
            as="div"
            variant="left"
            delay={180}
            duration={600}
            className="md:col-span-3"
          >
            <div className="flex flex-col gap-unit-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Marco Institucional
              </span>
              <ul className="flex flex-col gap-unit-2xs pt-unit-2xs">
                <li className="font-body-sm text-body-sm text-on-surface-variant">
                  Universidad Autonoma del Perú
                </li>
                <li className="font-body-sm text-body-sm text-on-surface-variant">
                  Ingenieria de Software
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="pt-unit-lg flex flex-col sm:flex-row items-center justify-between gap-unit-md">
          <p className="font-body-sm text-body-sm text-outline">
            © 2026 Portal Producción Digital. Documentación e investigación.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
