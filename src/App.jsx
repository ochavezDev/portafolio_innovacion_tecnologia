import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Hero from './components/Hero'
import Proposito from './components/Proposito'
import Estructura from './components/Estructura'
import Autor from './components/Autor'
import CuadernoDigital from './components/CuadernoDigital'
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

export default function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="unidad-1/sesion-1" element={<Sesion1Page />} />
    </Routes>
  )
}