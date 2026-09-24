import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import Reveal from './Reveal'

const API_KEY = import.meta.env.VITE_SHEETS_API_KEY || ''
const SPREADSHEET_ID =
  import.meta.env.VITE_SHEETS_SPREADSHEET_ID || '1h36l0WyCCbHBawofK7zicNsAUfdIDQzAAEeVIQZeRbE'
const SHEET_GID = import.meta.env.VITE_SHEETS_GID || '786191204'
const TAB_NAME = import.meta.env.VITE_SHEETS_TAB || 'Respuestas de formulario 1'

const isConfigured = Boolean(SPREADSHEET_ID)

function buildValuesUrl() {
  if (API_KEY && SPREADSHEET_ID) {
    const range = encodeURIComponent(TAB_NAME)
    return `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?majorDimension=ROWS&key=${API_KEY}`
  }
  const gidParam = SHEET_GID ? `&gid=${encodeURIComponent(SHEET_GID)}` : ''
  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv${gidParam}`
}

function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i += 1
      row.push(field)
      field = ''
      rows.push(row)
      row = []
    } else {
      field += ch
    }
  }
  if (field !== '' || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((r) => r.some((c) => c !== undefined && c !== null && String(c).trim() !== ''))
}

const aportes = [
  {
    num: '[01]',
    icon: 'monitor_heart',
    title: 'Salud',
    desc: 'Apoya el diagnóstico precoz, la lectura de exámenes médicos y la gestión de citas, acercando la atención a más personas en menos tiempo.',
  },
  {
    num: '[02]',
    icon: 'school',
    title: 'Educación',
    desc: 'Crea materiales de estudio, resúmenes y retroalimentación personalizada para estudiantes de distintos niveles y ritmos de aprendizaje.',
  },
  {
    num: '[03]',
    icon: 'work',
    title: 'Trabajo y productividad',
    desc: 'Automatiza tareas repetitivas, redacta borradores, organiza información y libera tiempo para el pensamiento creativo y la toma de decisiones.',
  },
]

const casosUso = [
  {
    num: '[01]',
    icon: 'smart_toy',
    title: 'Asistentes virtuales',
    desc: 'Chatbots y asistentes que responden consultas, guían trámites y acompañan la navegación de los usuarios las 24 horas.',
  },
  {
    num: '[02]',
    icon: 'image',
    title: 'Generación de imágenes',
    desc: 'Modelos que crean ilustraciones, logotipos y fotografías a partir de una descripción de texto, usados en diseño y comunicación.',
  },
  {
    num: '[03]',
    icon: 'query_stats',
    title: 'Análisis de datos y encuestas',
    desc: 'Lectura de formularios y hojas de cálculo para resumir respuestas, detectar tendencias y generar cuadros estadísticos automáticos.',
  },
]

function isEmailHeader(h) {
  return /correo|email|e-mail/i.test(h)
}

function isOpenQuestion(header) {
  return /comentario|observaci|sugere|justific/i.test(header)
}

const SURVEY_TOTAL = 15
const SURVEY_URL = 'https://forms.gle/jY633fCRjp8NQDMH8'

const AGE_RANKED = ['Menos de 18 años', 'Entre 18 y 30 años', 'Entre 31 y 45 años', 'Más de 45 años']

const normalizeKey = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()

function buildQuestionStats(rows, colIndex, header, orderedLabels) {
  const answers = rows
    .map((r) => (Array.isArray(r) ? r[colIndex] : undefined))
    .filter((v) => v !== undefined && v !== null && String(v).trim() !== '')
    .map((v) => String(v).trim())
  const counts = {}
  const normCounts = {}
  for (const a of answers) {
    counts[a] = (counts[a] || 0) + 1
    normCounts[normalizeKey(a)] = (normCounts[normalizeKey(a)] || 0) + 1
  }
  const n = answers.length
  const distinct = Object.keys(counts).length
  const isOpen = isOpenQuestion(header) || distinct > 14
  const entries = orderedLabels && orderedLabels.length
    ? orderedLabels.map((label) => ({ label, count: normCounts[normalizeKey(label)] || 0 }))
    : Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([label, count]) => ({ label, count }))
  return { n, entries, isOpen }
}

const liveBarColors = ['bg-primary', 'bg-tertiary', 'bg-secondary', 'bg-primary-container', 'bg-tertiary-container']

const CHART_PALETTE = ['#00687a', '#0053db', '#06b6d4', '#565e74', '#d16c00', '#85a3ff', '#4cd7f6', '#b4c5ff']

const CHART_ASSIGN = ['bars', 'bars', 'donut', 'donut', 'columns', 'columns', 'stack', 'stack', 'donut', 'donut']

function BarRow({ label, count, n, color, top }) {
  const pct = n > 0 && count > 0 ? Math.max(2, Math.round((count / n) * 100)) : 0
  const displayPct = n > 0 ? Math.round((count / n) * 100) : 0
  return (
    <div className="flex items-center gap-unit-sm min-w-0">
      <span className="w-[34%] shrink-0 font-body-sm text-body-sm text-on-surface truncate min-w-0">{label}</span>
      <div className="flex-1 h-5 bg-surface-container-high flex items-center min-w-[60px]">
        <div className={`h-full ${color} ${top ? 'shrink-0' : ''}`} style={{ width: `${pct}%` }}></div>
      </div>
      <span className="w-9 shrink-0 text-right font-mono text-[12px] text-on-surface">{count}</span>
      <span className="w-11 shrink-0 text-right font-body-sm text-body-sm text-on-surface-variant">{displayPct}%</span>
    </div>
  )
}

function DonutChart({ entries, n }) {
  const R = 40
  const STROKE = 16
  const C = 2 * Math.PI * R
  let acc = 0
  const segs = entries.map((e) => {
    const frac = n > 0 ? e.count / n : 0
    const seg = { ...e, frac, dash: frac * C, offset: -acc * C }
    acc += frac
    return seg
  })
  return (
    <div className="w-full min-w-0 flex flex-col sm:flex-row sm:items-center gap-unit-md">
      <div className="w-full sm:w-[160px] shrink-0 flex justify-center">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label="Gráfico de torta de los resultados"
          className="w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] -rotate-90"
        >
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--color-surface-container-high)" strokeWidth={STROKE} />
          {segs.map((s, i) =>
            s.frac > 0 ? (
              <circle
                key={s.label}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={CHART_PALETTE[i % CHART_PALETTE.length]}
                strokeWidth={STROKE}
                strokeDasharray={`${s.dash} ${C - s.dash}`}
                strokeDashoffset={s.offset}
              />
            ) : null,
          )}
        </svg>
      </div>
      <div className="flex-1 min-w-0 w-full flex flex-col gap-unit-2xs">
        {segs.map((s, i) => (
          <div key={s.label} className="flex items-center gap-unit-2xs min-w-0">
            <span className="w-2.5 h-2.5 shrink-0 rounded-full" style={{ background: CHART_PALETTE[i % CHART_PALETTE.length] }}></span>
            <span className="flex-1 min-w-0 font-body-sm text-body-sm text-on-surface truncate">{s.label}</span>
            <span className="font-mono text-[12px] text-on-surface shrink-0">{s.count}</span>
            <span className="w-11 text-right font-body-sm text-body-sm text-on-surface-variant shrink-0">{Math.round(s.frac * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ColumnChart({ entries, n }) {
  const max = Math.max(1, ...entries.map((e) => e.count))
  return (
    <div className="flex flex-col gap-unit-2xs">
      <div className="flex items-end gap-unit-sm h-[130px] border-b border-outline-variant">
        {entries.map((e, i) => {
          const pctH = n > 0 && e.count > 0 ? Math.max(10, Math.round((e.count / max) * 100)) : 0
          return (
            <div key={e.label} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
              <span className="font-mono text-[12px] text-on-surface leading-none mb-unit-2xs">{e.count}</span>
              <div
                title={`${e.label} — ${e.count}`}
                className="w-full"
                style={{ height: `${pctH}%`, background: CHART_PALETTE[i % CHART_PALETTE.length] }}
              ></div>
            </div>
          )
        })}
      </div>
      <div className="flex gap-unit-sm">
        {entries.map((e, i) => (
          <span key={e.label} title={e.label} className="flex-1 text-center font-body-sm text-body-sm text-on-surface-variant truncate min-w-0">
            {e.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function StackChart({ entries, n }) {
  return (
    <div className="flex flex-col gap-unit-md">
      <div className="flex h-6 w-full overflow-hidden rounded-full border border-surface-container-high">
        {entries.map((e, i) =>
          n > 0 && e.count > 0 ? (
            <div
              key={e.label}
              title={`${e.label} — ${e.count}`}
              style={{ width: `${(e.count / n) * 100}%`, background: CHART_PALETTE[i % CHART_PALETTE.length] }}
            ></div>
          ) : null,
        )}
      </div>
      <div className="flex flex-wrap gap-unit-sm">
        {entries.map((e, i) => (
          <span key={e.label} className="inline-flex items-center gap-unit-2xs font-body-sm text-body-sm text-on-surface">
            <span className="w-2.5 h-2.5 shrink-0 rounded-full" style={{ background: CHART_PALETTE[i % CHART_PALETTE.length] }}></span>
            {e.label}
            <span className="text-on-surface-variant">· {e.count}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function WaffleChart({ entries, n }) {
  const filled = entries.map((e) => (n > 0 ? Math.round((e.count / n) * 100) : 0))
  const cellsList = []
  entries.forEach((e, s) => {
    for (let c = 0; c < (filled[s] || 0); c += 1) cellsList.push(s)
  })
  const cells = Array.from({ length: 100 }, (_, i) => (i < cellsList.length ? cellsList[i] : -1))
  return (
    <div className="flex flex-col gap-unit-md">
      <div className="grid grid-cols-10 gap-[3px]">
        {cells.map((s, i) => (
          <div
            key={i}
            className="aspect-square rounded-[2px]"
            style={{ background: s === -1 ? 'var(--color-surface-container-high)' : CHART_PALETTE[s % CHART_PALETTE.length] }}
          ></div>
        ))}
      </div>
      <div className="flex flex-wrap gap-unit-sm">
        {entries.map((e, i) => (
          <span key={e.label} className="inline-flex items-center gap-unit-2xs font-body-sm text-body-sm text-on-surface">
            <span className="w-2.5 h-2.5 shrink-0 rounded-full" style={{ background: CHART_PALETTE[i % CHART_PALETTE.length] }}></span>
            {e.label}
            <span className="text-on-surface-variant">· {e.count}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function QuestionChart({ header, rows, titleIndex, chartType }) {
  const ordered = /\bedad\b|\brango\b|\baños\b/i.test(header) ? AGE_RANKED : null
  const { n, entries, isOpen } = useMemo(
    () => buildQuestionStats(rows, titleIndex, header, ordered),
    [rows, titleIndex, header, ordered],
  )
  const topLabel = entries.length ? entries[0].label : ''

  let body = null
  if (entries.length === 0) {
    body = <span className="font-body-sm text-body-sm text-on-surface-variant">Sin respuestas registradas para esta pregunta.</span>
  } else if (chartType === 'donut') {
    body = <DonutChart entries={entries} n={n} />
  } else if (chartType === 'columns') {
    body = <ColumnChart entries={entries} n={n} />
  } else if (chartType === 'stack') {
    body = <StackChart entries={entries} n={n} />
  } else if (chartType === 'waffle') {
    body = <WaffleChart entries={entries} n={n} />
  } else {
    body = (
      <div className="flex flex-col gap-unit-sm">
        {entries.map((e, i) => (
          <BarRow
            key={e.label}
            label={e.label}
            count={e.count}
            n={n}
            color={liveBarColors[i % liveBarColors.length]}
            top={i === 0 && entries.length > 1}
          />
        ))}
      </div>
    )
  }

  return (
    <Reveal variant="up" delay={40} duration={550}>
      <article className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-md h-full">
        <div className="flex items-start justify-between gap-unit-sm min-w-0">
          <h3 className="font-headline-sm text-[15px] text-on-surface font-bold leading-tight min-w-0">{header}</h3>
          <span className="shrink-0 inline-flex items-center gap-unit-2xs bg-surface-container px-unit-xs py-[2px] font-label-sm text-[10px] text-outline font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            N = {n}
          </span>
        </div>

        {isOpen ? (
          <div className="flex flex-col gap-unit-xs">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline font-bold">
              Respuesta abierta · {entries.length} respuestas distintas
            </span>
            <ul className="flex flex-wrap gap-unit-2xs">
              {entries.slice(0, 10).map((e) => (
                <li key={e.label} className="bg-surface-container-high text-on-surface px-unit-sm py-unit-2xs font-body-sm text-[12px] min-w-0">
                  <span className="max-w-[220px] inline-block truncate align-bottom">{e.label}</span>
                  <span className="text-outline"> · {e.count}</span>
                </li>
              ))}
            </ul>
            {entries.length > 10 && (
              <span className="font-body-sm text-body-sm text-outline">y {entries.length - 10} respuestas distintas más.</span>
            )}
            {n > 0 && topLabel && (
              <p className="font-body-sm text-body-sm text-on-surface-variant text-justify">
                La respuesta más frecuente fue <span className="font-bold text-on-surface">“{topLabel}”</span> con{' '}
                {entries[0].count} de {n} opiniones.
              </p>
            )}
          </div>
        ) : (
          body
        )}
      </article>
    </Reveal>
  )
}

function SurveyLive() {
  const [state, setState] = useState({
    status: isConfigured ? 'loading' : 'unconfigured',
    rows: [],
    updatedAt: null,
    error: '',
  })

  const load = async (silent = false) => {
    if (!isConfigured) {
      setState({ status: 'unconfigured', rows: [], updatedAt: null, error: '' })
      return
    }
    try {
      const res = await fetch(buildValuesUrl())
      if (!res.ok) {
        const detail = await res.text().catch(() => '')
        throw new Error(`${res.status}${detail ? ` — ${detail.slice(0, 120)}` : ''}`)
      }
      const text = await res.text()
      const rows = parseCSV(text)
      setState({ status: 'ok', rows, updatedAt: new Date(), error: '' })
    } catch (err) {
      setState((prev) => ({ ...prev, status: 'error', error: err.message }))
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isConfigured) {
      setState({ status: 'unconfigured', rows: [], updatedAt: null, error: '' })
      return
    }
    load(true)
  }, [])

  const questions = useMemo(() => {
    if (state.status !== 'ok') return []
    const headers = state.rows[0] || []
    const qCols = []
    for (let i = 0; i < headers.length; i += 1) {
      if (i === 0) continue
      if (isEmailHeader(headers[i])) continue
      qCols.push({ index: i, header: String(headers[i]).trim() })
    }
    return qCols
  }, [state.status, state.rows])

  const dataRows = useMemo(
    () => (state.status === 'ok' ? state.rows.slice(1).filter((r) => r.some((c) => c && String(c).trim()) !== '') : []),
    [state.status, state.rows],
  )

  const firstColumnTotal = useMemo(() => {
    if (state.status !== 'ok' || dataRows.length === 0) return dataRows.length
    const col = (state.rows[0] || [])[0]
    if (/marca|fecha|hora|timestamp/i.test(col)) {
      return dataRows.filter((r) => r[0] && String(r[0]).trim() !== '').length
    }
    return dataRows.length
  }, [state.status, state.rows, dataRows])

  if (state.status === 'unconfigured') {
    return (
      <Reveal variant="up" duration={600}>
        <div className="bg-surface-container-lowest p-unit-xl shadow-sm flex flex-col gap-unit-md">
          <div className="flex items-center gap-unit-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">link_off</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Sincronización pendiente de configuración</h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
            Para conectar la encuesta en vivo se requieren dos datos (la hoja de respuestas debe estar
            compartida como “Cualquier persona con el enlace → Lector”, ya es el caso):
          </p>
          <ol className="list-decimal list-inside flex flex-col gap-unit-2xs font-body-sm text-body-sm text-on-surface-variant">
            <li><span className="font-mono text-[12px]">VITE_SHEETS_SPREADSHEET_ID</span> — ID de la hoja de respuestas del formulario.</li>
            <li><span className="font-mono text-[12px]">VITE_SHEETS_GID</span> — número de la pestaña de respuestas (aparece en la URL como gid=…).</li>
          </ol>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Se registran en el archivo <span className="font-mono text-[12px]">.env</span> o como variables de
            entorno de Vite; la vista consulta la hoja de respuestas para mostrar los resultados finales de la encuesta.
          </p>
        </div>
      </Reveal>
    )
  }

  if (state.status === 'error') {
    return (
      <Reveal variant="up" duration={600}>
        <div className="bg-surface-container-lowest p-unit-xl shadow-sm flex flex-col gap-unit-sm">
          <div className="flex items-center gap-unit-xs">
            <span className="material-symbols-outlined text-error text-[22px]">error</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">No se pudo conectar con la hoja de respuestas</h3>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-mono text-[12px]">Error: {state.error}</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Verifica que la API Key sea válida, que la hoja esté compartida como “Cualquier persona con el enlace” y que el
            ID de la hoja y el nombre de la pestaña sean correctos, luego pulsa “Actualizar ahora”.
          </p>
          <button
            type="button"
            onClick={() => load(true)}
            className="self-start inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Reintentar
          </button>
        </div>
      </Reveal>
    )
  }

  if (state.status === 'loading') {
    return (
      <Reveal variant="up" duration={600}>
        <div className="bg-surface-container-lowest p-unit-xl shadow-sm flex items-center gap-unit-md">
          <span className="w-5 h-5 rounded-full border-2 border-primary-container border-t-primary animate-spin"></span>
          <span className="font-body-md text-body-md text-on-surface-variant">Cargando respuestas de Google Forms…</span>
        </div>
      </Reveal>
    )
  }

  const topConsensus = questions.reduce((acc, q) => {
    const stats = buildQuestionStats(dataRows, q.index, q.header)
    if (!stats.entries.length) return acc
    const best = stats.entries[0]
    const pct = Math.round((best.count / stats.n) * 100)
    const score = pct
    if (score >= acc.score) return { question: q.header, answer: best.label, count: best.count, total: stats.n, pct }
    return acc
  }, { question: '', answer: '', count: 0, total: 1, pct: 0 })

  const moreActive = questions.reduce((acc, q) => {
    const stats = buildQuestionStats(dataRows, q.index, q.header)
    if (stats.n > acc.n) return { question: q.header, n: stats.n }
    return acc
  }, { question: '', n: 0 })

  return (
    <>
      <Reveal variant="up" duration={600}>
        <div className="bg-surface-container-lowest p-unit-md shadow-sm flex flex-col sm:flex-row sm:items-center gap-unit-md justify-between">
          <div className="flex items-center gap-unit-sm min-w-0">
            <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-outline"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-on-surface">Encuesta Cerrada</span>
            <span className="hidden md:inline-block text-outline">|</span>
            <span className="hidden md:inline-block font-body-sm text-body-sm text-on-surface-variant">
              Google Forms → Google Sheets · resultados definitivos
            </span>
          </div>
          <div className="flex items-center gap-unit-sm flex-wrap">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Recolección finalizada ·{' '}
              <span className="font-mono text-[12px] text-on-surface">{firstColumnTotal} respuestas</span>
            </span>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-unit-md items-stretch">
        <Reveal as="article" variant="up" delay={40} duration={550}>
          <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-2xs h-full">
            <span className="material-symbols-outlined text-primary text-[22px]">fact_check</span>
            <span className="font-headline-sm text-[15px] text-on-surface font-bold">{firstColumnTotal}</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Respuestas registradas</span>
          </div>
        </Reveal>
        <Reveal as="article" variant="up" delay={80} duration={550}>
          <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-2xs h-full">
            <span className="material-symbols-outlined text-tertiary text-[22px]">bar_chart</span>
            <span className="font-headline-sm text-[15px] text-on-surface font-bold">{questions.length}</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Preguntas del formulario</span>
          </div>
        </Reveal>
        <Reveal as="article" variant="up" delay={120} duration={550}>
          <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-2xs h-full">
            <span className="material-symbols-outlined text-secondary text-[22px]">lock</span>
            <span className="font-headline-sm text-[15px] text-on-surface font-bold">CERRADA</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Muestra definitiva · estudio completo</span>
          </div>
        </Reveal>
      </div>

      {questions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-unit-lg items-stretch">
          {questions.map((q, i) => {
            const chartType = CHART_ASSIGN[i % CHART_ASSIGN.length]
            return (
              <QuestionChart
                key={`${i}-${q.header}`}
                header={q.header}
                rows={dataRows}
                titleIndex={q.index}
                chartType={chartType}
              />
            )
          })}
        </div>
      ) : (
        <Reveal variant="up" duration={600}>
          <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex items-center gap-unit-md">
            <span className="material-symbols-outlined text-outline text-[22px]">table_rows</span>
            <span className="font-body-md text-body-md text-on-surface-variant">
              La hoja respondió correctamente pero no se detectaron columnas de preguntas. Verifica el nombre de la pestaña configurada.
            </span>
          </div>
        </Reveal>
      )}

      <Reveal variant="up" delay={40} duration={600}>
        <div className="bg-surface-container-low p-unit-lg shadow-sm flex flex-col gap-unit-sm">
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-primary font-bold flex items-center gap-unit-2xs">
            <span className="material-symbols-outlined text-[16px]">lightbulb</span>
            Lectura rápida
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-unit-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant text-justify">
              <span className="font-bold text-on-surface">Mayor consenso:</span>{' '}
              {topConsensus.question && topConsensus.answer
                ? `en “${topConsensus.question}”, la opción más elegida fue “${topConsensus.answer}” con un ${topConsensus.pct}% de las respuestas.`
                : 'aún no hay respuestas suficientes para calcular un consenso.'}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-justify">
              <span className="font-bold text-on-surface">Mayor participación:</span>{' '}
              {moreActive.question
                ? `la pregunta “${moreActive.question}” concentró la mayor cantidad de respuestas (${moreActive.n}).`
                : 'la pregunta con mayor actividad aparecerá aquí cuando lleguen las primeras respuestas.'}
            </p>
          </div>
        </div>
      </Reveal>
    </>
  )
}

function SurveyClosed() {
  return (
    <Reveal variant="up" duration={550}>
      <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex items-start xl:items-center gap-unit-lg">
        <span className="w-11 h-11 shrink-0 flex items-center justify-center bg-primary-container/20 text-primary">
          <span className="material-symbols-outlined text-[22px]">check_circle</span>
        </span>
        <div className="flex flex-col gap-unit-2xs min-w-0">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Encuesta cerrada — ¡gracias por participar!</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-justify">
            El formulario finalizó su período de recolección y las 15 respuestas obtenidas constituyen la muestra
            definitiva de esta página. Los cuadros estadísticos de esta sección presentan los resultados finales y la
            conclusión (sección 03) sintetiza los hallazgos más relevantes del estudio.
          </p>
          <div className="mt-unit-xs flex flex-col sm:flex-row items-start sm:items-center gap-unit-2xs sm:gap-unit-xs flex-wrap">
            <span className="inline-flex items-center gap-unit-2xs bg-surface-container p-unit-xs w-fit max-w-full min-w-0">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0">link</span>
              <span className="font-mono text-[12px] text-on-surface truncate min-w-0">{SURVEY_URL}</span>
            </span>
            <a
              href={SURVEY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-unit-2xs bg-primary text-on-primary px-unit-sm py-unit-xs font-label-sm text-label-sm uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-[0.96]"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              Ver las preguntas del formulario
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function InteligenciaArtificialSesion() {
  return (
    <section className="w-full bg-surface" id="unidad-1-sesion-3">
      <div className="max-w-[1280px] w-full mx-auto px-grid-margin-mobile sm:px-grid-margin-tablet lg:px-grid-margin-desktop py-unit-xl flex flex-col gap-unit-2xl">
        <Reveal as="header" variant="up" duration={600}>
          <div className="flex flex-col gap-unit-md">
            <nav aria-label="Ruta académica" className="flex items-center flex-wrap gap-unit-2xs font-label-sm text-label-sm uppercase tracking-wider">
              <Link className="text-on-surface-variant hover:text-primary transition-colors" to="/">Producción Digital</Link>
              <span className="text-outline">/</span>
              <span className="text-on-surface-variant">Unidad 1: Alfabetización Digital</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">Sesión 3: IA y Visualización de Datos</span>
            </nav>

            <div className="w-full flex flex-col justify-between bg-surface-container-lowest p-unit-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-primary-fixed-dim/20 rounded-full opacity-60 pointer-events-none"></div>
              <div className="absolute right-24 bottom-2 w-20 h-20 bg-tertiary-fixed/40 rounded-full opacity-40 pointer-events-none"></div>
              <div className="flex flex-col gap-unit-xs relative z-10">
                <div className="inline-flex items-center gap-unit-xs w-fit bg-surface-container-high px-unit-xs py-[3px]">
                  <span className="text-primary-container font-headline-sm text-xs font-bold leading-none">▪</span>
                  <span className="font-label-sm text-[11px] font-bold text-on-surface tracking-widest uppercase">Entregable Modular Obligatorio</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-none mt-unit-2xs">
                  Inteligencia Artificial <span className="text-primary font-light">— Sesión 3</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-unit-2xs">
                  Visualización de Datos y Generación de Información con IA: presentación del tema, encuesta en vivo
                  y cuadros estadísticos por pregunta.
                </p>
              </div>
              <div className="pt-unit-lg mt-unit-lg flex flex-wrap gap-unit-md items-center relative z-10 bg-surface-container-low p-unit-sm">
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">neurology</span>
                  <span className="font-label-sm text-label-sm text-on-surface">IA APLICADA</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">query_stats</span>
                  <span className="font-label-sm text-label-sm text-on-surface">ENCUESTA EN VIVO</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">bar_chart</span>
                  <span className="font-label-sm text-label-sm text-on-surface">CUADROS ESTADÍSTICOS</span>
                </div>
                <span className="text-outline">|</span>
                <div className="flex items-center gap-unit-xs">
                  <span className="material-symbols-outlined text-secondary text-[18px]">image</span>
                  <span className="font-label-sm text-label-sm text-on-surface">ILUSTRACIÓN TEMÁTICA</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sección 01 — Presentación IA */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">01</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">La IA en la Vida Cotidiana</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">¿Qué es, cómo aporta a la población y cuáles son sus casos de uso?</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-unit-2xs bg-primary-fixed-dim/20 text-on-primary-container px-unit-sm py-unit-xs font-label-sm text-label-sm font-semibold uppercase shadow-sm">
                Presentación del tema
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" delay={50} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm">
              <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl text-justify">
                La Inteligencia Artificial (IA) es la capacidad de las máquinas para aprender de los datos y realizar
                tareas que normalmente requieren inteligencia humana: comprender lenguaje, reconocer imágenes, predecir
                resultados y generar contenido. A diferencia de la programación tradicional, la IA no sigue reglas fijas:
                <span className="font-bold text-on-surface"> encuentra patrones</span> y, aplicada a encuestas y hojas de
                cálculo, convierte respuestas sueltas en cuadros estadísticos, tendencias y conclusiones accionables.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-unit-lg">
            <Reveal variant="up" duration={550}>
              <div className="flex items-center gap-unit-xs">
                <span className="w-2 h-2 bg-primary-container"></span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Aporte a la Población</h3>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-unit-lg items-stretch">
              {aportes.map((n, i) => (
                <Reveal as="article" key={n.num} variant="up" delay={i * 70} duration={600}>
                  <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm h-full">
                    <div className="flex items-center gap-unit-sm">
                      <span className="w-11 h-11 shrink-0 flex items-center justify-center bg-primary-container/20 text-primary">
                        <span className="material-symbols-outlined text-[22px]">{n.icon}</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-primary font-bold">{n.num}</span>
                    </div>
                    <h4 className="font-headline-sm text-[15px] text-on-surface font-bold leading-tight">{n.title}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-justify">{n.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-unit-lg mt-unit-sm">
            <Reveal variant="up" duration={550}>
              <div className="flex items-center gap-unit-xs">
                <span className="w-2 h-2 bg-tertiary-container"></span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Casos de Uso</h3>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-unit-lg items-stretch">
              {casosUso.map((n, i) => (
                <Reveal as="article" key={n.num} variant="up" delay={i * 70} duration={600}>
                  <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-sm h-full">
                    <div className="flex items-center gap-unit-sm">
                      <span className="w-11 h-11 shrink-0 flex items-center justify-center bg-tertiary-container/30 text-tertiary">
                        <span className="material-symbols-outlined text-[22px]">{n.icon}</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">{n.num}</span>
                    </div>
                    <h4 className="font-headline-sm text-[15px] text-on-surface font-bold leading-tight">{n.title}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-justify">{n.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 02 — Encuesta Final */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">02</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Cuadros Estadísticos: Encuesta Final</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Gráficos variados por pregunta · resultados definitivos de Google Forms → Google Sheets</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-unit-2xs bg-surface-container-lowest px-unit-sm py-unit-xs shadow-sm">
                <span className="w-2.5 h-2.5 bg-outline"></span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase">encuesta cerrada</span>
              </div>
            </div>
          </Reveal>

          <SurveyClosed />

          <SurveyLive />
        </section>

        {/* Sección 03 — Conclusión */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">03</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Conclusión de los Resultados</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Síntesis de la información obtenida en los gráficos</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-unit-2xs bg-secondary-container/50 text-on-secondary px-unit-sm py-unit-xs font-label-sm text-label-sm font-semibold uppercase shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-secondary">summarize</span>
                Análisis final
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" delay={50} duration={600}>
            <div className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-md">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-unit-md items-stretch">
                <div className="bg-surface-container p-unit-md flex flex-col gap-unit-2xs">
                  <span className="font-headline-md text-headline-md text-primary font-bold">{SURVEY_TOTAL} respuestas</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">muestra final obtenida</span>
                </div>
                <div className="bg-surface-container p-unit-md flex flex-col gap-unit-2xs">
                  <span className="font-headline-md text-headline-md text-primary font-bold">73%</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">valora la IA como positiva</span>
                </div>
                <div className="bg-surface-container p-unit-md flex flex-col gap-unit-2xs">
                  <span className="font-headline-md text-headline-md text-primary font-bold">60%</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">usa IA varias veces a la semana</span>
                </div>
                <div className="bg-surface-container p-unit-md flex flex-col gap-unit-2xs">
                  <span className="font-headline-md text-headline-md text-primary font-bold">73%</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">avala regulación flexible</span>
                </div>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant text-justify">
                La encuesta cerró su período de recolección con <span className="font-bold text-on-surface">15 respuestas</span>,
                que constituyen la muestra definitiva de esta página. El perfil predominante es el de adultos jóvenes en
                etapa de formación y vida laboral: el <span className="font-bold text-on-surface">53% tiene entre 18 y 30
                años</span> y el 33% entre 31 y 45; en cuanto a la ocupación, el 47% combina trabajo y estudio y el 40% se
                dedica principalmente a trabajar.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant text-justify">
                En su relación con la IA, los participantes declaran un nivel de conocimiento intermedio (promedio cercano
                a 3 en una escala del 1 al 5, valor elegido por el 53%), pero un uso habitual: el <span className="font-bold text-on-surface">60% emplea
                herramientas de IA varias veces a la semana</span> y el 20% a diario. Las herramientas más usadas son
                ChatGPT y Gemini (40% cada una), seguidas de Claude (20%).
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant text-justify">
                La percepción sobre el avance de la IA es mayoritariamente favorable: el <span className="font-bold text-on-surface">73% de los
                encuestados (11 de 15) lo considera positivo</span> —principal o muy positivo— y ninguno lo calificó como
                negativo. No obstante, esta valoración convive con reservas concretas: la principal preocupación es la
                dependencia excesiva de la tecnología (33%), seguida del reemplazo de puestos de trabajo (27%) y de la
                difusión de información falsa o sesgada (20%).
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant text-justify">
                Para afrontar esos riesgos, el <span className="font-bold text-on-surface">73% respalda una regulación legal o ética de la
                IA</span>, aunque flexible para no frenar la innovación, y un 13% adicional la considera necesaria de forma
                estricta e inmediata. La disposición a capacitarse es total: un tercio de los participantes lo haría de
                forma prioritaria y los dos tercios restantes si encuentran un curso o taller de su interés.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant text-justify">
                Como síntesis, la IA es valorada como una <span className="font-bold text-on-surface">herramienta útil</span> —sobre todo para
                generar ideas, apoyar la resolución de problemas y el aprendizaje, y ahorrar tiempo en tareas
                repetitivas—, pero su adopción responsable exige combinar el entusiasmo por sus beneficios con
                regulación, formación continua y atención a la dependencia tecnológica y al empleo. La IA aporta aquí de
                dos maneras: <span className="font-bold text-on-surface">organiza la información</span>, al convertir cada pregunta en un cuadro
                estadístico comparable, y <span className="font-bold text-on-surface">genera información</span>, al destacar los resultados de mayor
                consenso que orientan esta interpretación. Los resultados completos se pueden consultar en la sección 02
                de esta misma página.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Sección 04 — Ilustración del tema */}
        <section className="flex flex-col gap-unit-lg">
          <Reveal variant="up" duration={550}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-xs">
              <div className="flex items-center gap-unit-xs">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface bg-surface-container-high px-unit-xs py-unit-2xs">04</span>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">Ilustración del Tema</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Imagen generada con IA que sintetiza la Inteligencia Artificial aplicada al análisis de datos</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-unit-2xs bg-tertiary-fixed/50 text-on-tertiary-container px-unit-sm py-unit-xs font-label-sm text-label-sm font-semibold uppercase shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-tertiary">auto_awesome</span>
                Imagen generada con IA
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" delay={50} duration={600}>
            <figure className="bg-surface-container-lowest p-unit-lg shadow-sm flex flex-col gap-unit-md">
              <img
                src="https://res.cloudinary.com/fuh3zsuf/image/upload/v1789956648/Gemini_Generated_Image_7zp2if7zp2if7zp2.jpg"
                alt="Ilustración de inteligencia artificial generada por Gemini: red neuronal sobre datos y gráficos estadísticos"
                loading="lazy"
                className="w-full h-auto rounded-sm"
              />
              <figcaption className="flex items-center flex-wrap gap-unit-2xs font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
                Imagen generada con Gemini ·
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-unit-2xs text-primary font-bold hover:underline"
                >
                  Créditos: Google Gemini
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </section>
      </div>
    </section>
  )
}