import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Hero from './components/Hero'
import Proposito from './components/Proposito'
import Estructura from './components/Estructura'
import Autor from './components/Autor'
import CuadernoDigital from './components/CuadernoDigital'
import GoogleSitesSesion from './components/GoogleSitesSesion'
import InteligenciaArtificialSesion from './components/InteligenciaArtificialSesion'
import GeniallySesion from './components/GeniallySesion'
import PadletPodcastSesion from './components/PadletPodcastSesion'
import Footer from './components/Footer'

function Landing() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <Hero />
          <Autor />
          <Proposito />
          <Estructura />
        </div>
      </main>
      <Footer />
    </>
  )
}

function Sesion1Page() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface">
        <CuadernoDigital />
      </main>
    </>
  )
}

function Sesion2Page() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface">
        <GoogleSitesSesion />
      </main>
    </>
  )
}

function Sesion3Page() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface">
        <InteligenciaArtificialSesion />
      </main>
    </>
  )
}

function Sesion4Page() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface">
        <GeniallySesion />
      </main>
    </>
  )
}

function Sesion5Page() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface">
        <PadletPodcastSesion />
      </main>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="unidad-1/sesion-1" element={<Sesion1Page />} />
      <Route path="unidad-1/sesion-2" element={<Sesion2Page />} />
      <Route path="unidad-1/sesion-3" element={<Sesion3Page />} />
      <Route path="unidad-2/sesion-4" element={<Sesion4Page />} />
      <Route path="unidad-2/sesion-5" element={<Sesion5Page />} />
    </Routes>
  )
}