import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { default: AppSSR } = await server.ssrLoadModule('/src/App.ssr.jsx')
  const html = renderToString(React.createElement(AppSSR, { entry: '/' }))
  const checks = ['Innovación y Tecnología', 'menu', 'mobile-panel', 'reveal', 'Integrante', 'Estructura Curricular']
  const missing = checks.filter((c) => !html.includes(c))
  console.log(missing.length ? `MISSING: ${missing.join(', ')}` : `OK length=${html.length}`)

  const cuaderno = renderToString(React.createElement(AppSSR, { entry: '/unidad-1/sesion-1' }))
  const cChecks = ['Cuaderno Digital', 'Desarrollo del Tema', 'Fuente de Información — CTS', 'Universidad Autónoma del Perú']
  const cMissing = cChecks.filter((c) => !cuaderno.includes(c))
  console.log(
    cMissing.length ? `CUADERNO MISSING: ${cMissing.join(', ')}` : `CUADERNO OK length=${cuaderno.length}`,
  )

  const sites = renderToString(React.createElement(AppSSR, { entry: '/unidad-1/sesion-2' }))
  const sChecks = ['Google Sites', 'Necesidades que Cubre', 'Paso a Paso', 'sites.google.com/autonoma.edu.pe/react/inicio', 'Abrir el Sitio']
  const sMissing = sChecks.filter((c) => !sites.includes(c))
  console.log(
    sMissing.length ? `SESION2 MISSING: ${sMissing.join(', ')}` : `SESION2 OK length=${sites.length}`,
  )

  const ia = renderToString(React.createElement(AppSSR, { entry: '/unidad-1/sesion-3' }))
  const iChecks = ['Inteligencia Artificial', 'Aporte a la Población', 'Casos de Uso', 'Encuesta Final', 'Conclusión de los Resultados', 'Ilustración del Tema', 'Encuesta cerrada — ¡gracias por participar!', '15 respuestas', 'forms.gle/jY633fCRjp8NQDMH8', 'Ver las preguntas del formulario']
  const iMissing = iChecks.filter((c) => !ia.includes(c))
  console.log(
    iMissing.length ? `SESION3 MISSING: ${iMissing.join(', ')}` : `SESION3 OK length=${ia.length}`,
  )
} finally {
  await server.close()
}