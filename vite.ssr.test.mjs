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

  const genially = renderToString(React.createElement(AppSSR, { entry: '/unidad-2/sesion-4' }))
  const gChecks = ['Genially', 'Introducción a Genially', 'Necesidades que Cubre', 'Paso a Paso', '6 Pasos', 'Mi Presentación', 'view.genially.com/6ada3ff7ad0d4ae6a81c5c2d', 'Abrir la Presentación', 'El Trabajo Informal en el Perú']
  const gMissing = gChecks.filter((c) => !genially.includes(c))
  console.log(
    gMissing.length ? `SESION4 MISSING: ${gMissing.join(', ')}` : `SESION4 OK length=${genially.length}`,
  )

  const muro = renderToString(React.createElement(AppSSR, { entry: '/unidad-2/sesion-5' }))
  const mChecks = ['Padlet', 'NotebookLM', 'Resumen de Herramientas Utilizadas', 'Trabajos Elaborados', 'Empleo informal y emprendimiento juvenil en el Perú', 'Informalidad juvenil peruana ¿oportunidad o supervivencia?', 'Abrir el Muro', 'Escuchar el Podcast', 'padlet.com/chavezorlho6/empleo-informal-y-emprendimiento-juvenil-en-el-peru-s024r5ldnmimp72q40j5', 'notebooklm.link.google/i6oUng35B384']
  const mMissing = mChecks.filter((c) => !muro.includes(c))
  console.log(
    mMissing.length ? `SESION5 MISSING: ${mMissing.join(', ')}` : `SESION5 OK length=${muro.length}`,
  )

  const revista = renderToString(React.createElement(AppSSR, { entry: '/unidad-2/sesion-6' }))
  const rChecks = ['Canva', 'Heyzine', 'Google Sites', 'Resumen de Herramientas Utilizadas', 'Trabajos Elaborados', 'Revista Digital: Innovación y Tecnología', 'Cómo crear un sitio web con Google Sites', 'Abrir la Revista', 'Ver en Drive', 'Código QR', 'heyzine.com/flip-book/2c2164833a.html#page/1', 'drive.google.com/file/d/13CVeNaCjdlmD8Xuv1hasXt8SZAJCzhCf/view?usp=sharing', 'VideoExplicativo_GoogleSites_V02.mp4']
  const rMissing = rChecks.filter((c) => !revista.includes(c))
  console.log(
    rMissing.length ? `SESION6 MISSING: ${rMissing.join(', ')}` : `SESION6 OK length=${revista.length}`,
  )
} finally {
  await server.close()
}