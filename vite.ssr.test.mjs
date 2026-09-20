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
} finally {
  await server.close()
}