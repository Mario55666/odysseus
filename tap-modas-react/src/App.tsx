import { useState, useEffect, useRef } from 'react'
import type { TapData } from '@/types/tap'
import { EMPTY_TAP, DEMO_DATA } from '@/types/tap'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { exportWord } from '@/lib/exportWord'
import { exportKimiPrompt } from '@/lib/exportKimi'

function IdcIcon({ size = 36, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity, flexShrink: 0 }}>
      <circle cx="20" cy="20" r="20" fill="#e14a94" />
      <polygon points="20,9 28,16 26,31 14,31 12,16" fill="white" />
      <rect x="17" y="6" width="6" height="5" rx="2.5" fill="white" />
    </svg>
  )
}

function Toast({ msg, type }: { msg: string; type: string }) {
  const bg = type === 'ok' ? '#10b981' : type === 'ai' ? '#7c3aed' : '#004f80'
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: bg, color: '#fff', padding: '.85rem 1.3rem', borderRadius: 999,
      fontSize: '.85rem', fontWeight: 600, boxShadow: '0 24px 60px rgba(0,0,0,.18)',
      zIndex: 9999, display: 'flex', alignItems: 'center', gap: '.5rem',
      animation: 'slideUp .3s ease', maxWidth: '90vw'
    }}>{msg}</div>
  )
}

interface FieldProps {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  multiline?: boolean
  rows?: number
  onAI?: () => void
  required?: boolean
}

function Field({ label, id, value, onChange, placeholder, hint, multiline, rows = 3, onAI, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}{required && <span style={{ color: '#f3a100', marginLeft: 2 }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        {multiline ? (
          <textarea
            id={id} className="ctrl" rows={rows}
            value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} style={{ paddingBottom: onAI ? '2.4rem' : undefined }}
          />
        ) : (
          <input
            type="text" id={id} className="ctrl"
            value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} style={{ paddingRight: onAI ? '5.5rem' : undefined }}
          />
        )}
        {onAI && (
          <button
            className="btn-ai"
            style={{ position: 'absolute', right: '.5rem', ...(multiline ? { bottom: '.5rem' } : { top: '.5rem' }) }}
            onClick={onAI}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            ✦ IA
          </button>
        )}
      </div>
      {hint && <p className="field-hint">{hint}</p>}
    </div>
  )
}

function StepLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="step-label">
      <span className="step-num">{n}</span>
      {children}
    </div>
  )
}

function SlidePreview({ d, visible }: { d: TapData; visible: boolean }) {
  const [cur, setCur] = useState(0)
  const slides = [
    'Portada', 'Dedicatoria', 'Agradecimiento', 'Índice',
    'Resumen', 'Introducción', 'Cap.1: Marco', 'Cap.2: Contexto',
    'Cap.3: Proyecto', 'Cap.3: Proceso', 'Cap.4: Evaluación',
    'Conclusiones', 'Recomendaciones', 'Referencias', 'Cierre'
  ]

  if (!visible) return null

  const Foot = ({ n }: { n: number }) => (
    <div style={{ background: '#f4f4f2', padding: '1% 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #f9d4e9', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.4em' }}>
        <IdcIcon size={11} />
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.4rem', color: '#555', opacity: .7 }}>
          {d.autor || 'Autor'} · TAP Diseño de Modas · IDC {d.anio || '2026'}
        </span>
      </div>
      <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '.65rem', color: '#e14a94' }}>{n}</span>
    </div>
  )

  const Hdr = ({ num, title }: { num: string; title: string }) => (
    <div style={{ background: 'linear-gradient(135deg,#e14a94,#b5307a)', color: '#fff', padding: '2% 5%', display: 'flex', alignItems: 'center', gap: '1%', flexShrink: 0 }}>
      <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.4rem', opacity: .4 }}>{num}</span>
      <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: '.95rem', color: '#fff', margin: 0 }}>{title}</h3>
    </div>
  )

  const ColT = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.48rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#e14a94', fontWeight: 700, marginBottom: '.4em', paddingBottom: '.2em', borderBottom: '2px solid #f9d4e9' }}>{children}</p>
  )

  const Txt = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <p style={{ fontSize: '.78rem', color: '#555', lineHeight: 1.6, marginBottom: '.5em', ...style }}>{children}</p>
  )

  const renderSlide = (i: number) => {
    switch (i) {
      case 0: return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg,#e14a94 0%,#b5307a 50%,#004f80 100%)', padding: '5% 8%', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2%', marginBottom: '2%' }}>
              <IdcIcon size={28} opacity={0.9} />
              <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.48rem', letterSpacing: '.1em', background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.3)', padding: '.2em .6em', borderRadius: 999, color: '#fff' }}>
                Instituto de Educación Superior Público “Diseño y Comunicación” (IDC)
              </span>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.48rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#fff', opacity: .7, marginBottom: '.3em' }}>Programa de Estudios · Diseño de Modas</p>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#fff', lineHeight: 1.05, margin: '.4em 0 .6em' }}>{d.titulo || '[Título del TAP]'}</h2>
            <p style={{ fontSize: '.85rem', opacity: .85, color: '#fff', marginBottom: '.3em' }}>Informe de Trabajo de Aplicación Profesional</p>
            <p style={{ fontSize: '.72rem', opacity: .75, color: '#fff' }}>Autor(a): <strong>{d.autor || '[Autor]'}</strong>{d.asesor ? ' · Asesor(a): ' + d.asesor : ''}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.48rem', opacity: .75, color: '#fff' }}>
            <span>{d.semestre || d.anio || '2026'}</span>
            <span style={{ fontWeight: 700, opacity: .95 }}>Examen escrito 30% · Sustentación oral 70%</span>
            <span>IDC · {d.anio || '2026'}</span>
          </div>
        </div>
      )
      case 1: return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Hdr num="" title="Dedicatoria" />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '8%' }}>
            <p style={{ fontSize: '.88rem', fontStyle: 'italic', lineHeight: 1.8, color: '#004f80', maxWidth: 480 }}>{d.dedicatoria || '[Dedicatoria personal]'}</p>
          </div>
          <Foot n={2} />
        </div>
      )
      case 2: return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Hdr num="" title="Agradecimiento" />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6%' }}>
            <p style={{ fontSize: '.82rem', lineHeight: 1.8, color: '#555', maxWidth: 550 }}>{d.agradecimiento || '[Agradecimiento]'}</p>
          </div>
          <Foot n={3} />
        </div>
      )
      case 3: {
        const secs = ['Resumen Ejecutivo', 'Introducción', 'Cap.1: Marco Teórico', 'Cap.2: Contexto Laboral', 'Cap.3: Proyecto', 'Cap.3: Proceso', 'Cap.4: Evaluación', 'Conclusiones', 'Recomendaciones', 'Referencias y Anexos']
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Hdr num="00" title="Índice de Contenido" />
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5% 4%', padding: '2% 5%' }}>
              {secs.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '.6em', padding: '.35em 0', borderBottom: '1px dashed #eee' }}>
                  <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.48rem', color: '#e14a94', fontWeight: 700, minWidth: '1.4em' }}>{String(idx + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: '.75rem', color: '#004f80', fontWeight: 600 }}>{s}</span>
                </div>
              ))}
            </div>
            <Foot n={4} />
          </div>
        )
      }
      case 4: return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Hdr num="01" title="Resumen Ejecutivo" />
          <div style={{ flex: 1, padding: '2% 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3%', alignContent: 'start' }}>
            <div>
              <ColT>Experiencia laboral</ColT>
              {d.empresa && <Txt><strong>Empresa:</strong> {d.empresa}</Txt>}
              {d.cargo && <Txt><strong>Cargo:</strong> {d.cargo}</Txt>}
              {d.periodo && <Txt><strong>Período:</strong> {d.periodo}</Txt>}
              {d.linea && <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.48rem', letterSpacing: '.1em', background: '#f9d4e9', color: '#b5307a', padding: '.15em .5em', borderRadius: 4, display: 'inline-block' }}>{d.linea}</span>}
            </div>
            <div>
              <ColT>Síntesis de aportes</ColT>
              <Txt>{d.resumen || '[Descripción de la experiencia]'}</Txt>
            </div>
          </div>
          <Foot n={5} />
        </div>
      )
      case 14: return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#e14a94 0%,#b5307a 50%,#004f80 100%)', textAlign: 'center', padding: '8%' }}>
          <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.48rem', letterSpacing: '.25em', textTransform: 'uppercase', opacity: .7, marginBottom: '.8em', color: '#fff' }}>Trabajo de Aplicación Profesional</p>
          <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#fff', marginBottom: '.5em', lineHeight: 1.05 }}>Gracias por su atención</h2>
          <p style={{ fontSize: '.85rem', opacity: .85, color: '#fff', marginBottom: '1.2em' }}>{d.autor || '[Autor]'}</p>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 999, padding: '.4em 1.2em', fontSize: '.48rem', fontFamily: 'JetBrains Mono,monospace', letterSpacing: '.14em', color: '#fff' }}>
            DISEÑO DE MODAS · IDC · {d.anio || '2026'}
          </div>
          <p style={{ fontSize: '.4rem', opacity: .55, marginTop: '.8em', fontFamily: 'JetBrains Mono,monospace', color: '#fff' }}>✦ Presentación asistida por IA</p>
        </div>
      )
      default: return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Hdr num={String(i - 3).padStart(2, '0')} title={slides[i]} />
          <div style={{ flex: 1, padding: '3% 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: '.8rem', color: '#888', fontStyle: 'italic' }}>Slide {i + 1} · {slides[i]}</p>
          </div>
          <Foot n={i + 1} />
        </div>
      )
    }
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ background: '#fff', border: '1px solid #f9d4e9', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <IdcIcon size={22} />
        <div>
          <p style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#004f80', margin: '0 0 .2rem' }}>
            {slides.length} diapositivas · Previzualización de referencia
          </p>
          <p style={{ fontSize: '.8rem', color: '#555', margin: 0, lineHeight: 1.5 }}>
            Esta es una <strong style={{ color: '#004f80' }}>previzualización de referencia</strong>. Para la versión final usa{' '}
            <strong style={{ color: '#f3a100' }}>PowerPoint</strong>, <strong style={{ color: '#f3a100' }}>Canva</strong>,{' '}
            <strong style={{ color: '#f3a100' }}>Kimi</strong> o <strong style={{ color: '#f3a100' }}>Gamma</strong>.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '.3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {slides.map((s, i) => (
          <button key={i} onClick={() => setCur(i)}
            style={{ fontSize: '.68rem', fontWeight: 600, padding: '.3rem .7rem', borderRadius: 999, border: `1.5px solid ${cur === i ? '#e14a94' : '#d8d8d4'}`, background: cur === i ? '#e14a94' : '#fff', color: cur === i ? '#fff' : '#555', cursor: 'pointer', transition: 'all .2s' }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 24px 60px rgba(0,0,0,.18)', overflow: 'hidden', aspectRatio: '16/9', width: '100%', position: 'relative' }}>
        {renderSlide(cur)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.6rem', padding: '.6rem 1rem', background: '#fff', borderRadius: 12, border: '1px solid #d8d8d4' }}>
        <button onClick={() => setCur(c => Math.max(0, c - 1))} disabled={cur === 0}
          style={{ background: '#f4f4f2', border: 'none', borderRadius: 8, padding: '.4rem .9rem', fontWeight: 600, fontSize: '.82rem', cursor: cur === 0 ? 'not-allowed' : 'pointer', opacity: cur === 0 ? .35 : 1, color: '#004f80' }}>
          ◄ Anterior
        </button>
        <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.82rem', color: '#555', fontWeight: 600 }}>{cur + 1} / {slides.length}</span>
        <button onClick={() => setCur(c => Math.min(slides.length - 1, c + 1))} disabled={cur === slides.length - 1}
          style={{ background: '#f4f4f2', border: 'none', borderRadius: 8, padding: '.4rem .9rem', fontWeight: 600, fontSize: '.82rem', cursor: cur === slides.length - 1 ? 'not-allowed' : 'pointer', opacity: cur === slides.length - 1 ? .35 : 1, color: '#004f80' }}>
          Siguiente ►
        </button>
      </div>
    </div>
  )
}

interface ApaPanelProps {
  onInsert: (cita: string) => void
  onClose: () => void
}

function ApaPanel({ onInsert, onClose }: ApaPanelProps) {
  const [tipo, setTipo] = useState('libro')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [result, setResult] = useState('')

  const f = (id: string) => fields[id] ?? ''
  const set = (id: string, v: string) => setFields(prev => ({ ...prev, [id]: v }))

  const generar = () => {
    let cita = ''
    if (tipo === 'libro') cita = `${f('autor')} (${f('anio')}). *${f('titulo')}*. ${f('editorial')}.${f('doi') ? ' ' + f('doi') : ''}`
    else if (tipo === 'articulo') cita = `${f('autor')} (${f('anio')}). ${f('titulo')}. *${f('revista')}, ${f('volnum')}*, ${f('pags')}. ${f('doi')}`
    else if (tipo === 'web') cita = `${f('autor')} (${f('anio')}). *${f('titulo')}*. ${f('sitio')}. ${f('url')}`
    else if (tipo === 'tesis') cita = `${f('autor')} (${f('anio')}). *${f('titulo')}* [Trabajo de Aplicación Profesional]. ${f('inst')}. ${f('repo')}`
    else if (tipo === 'ia') cita = `${f('empresa')} (${f('anio')}). *${f('herramienta')} ${f('version')}* [Herramienta de inteligencia artificial generativa]. ${f('empresa')}. ${f('url')} Nota: Prompt utilizado: ${f('prompt')}`
    setResult(cita)
  }

  const InputF = ({ id, label, placeholder }: { id: string; label: string; placeholder: string }) => (
    <div style={{ marginBottom: '.6rem' }}>
      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#004f80', marginBottom: '.2rem' }}>{label}</label>
      <input type="text" className="ctrl" placeholder={placeholder} value={f(id)} onChange={e => set(id, e.target.value)} />
    </div>
  )

  return (
    <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: '#fff', borderRadius: 24, boxShadow: '0 32px 80px rgba(0,0,0,.22)', zIndex: 6000, width: 'min(600px,95vw)', maxHeight: '88vh', overflowY: 'auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: '1px solid #d8d8d4' }}>
        <div>
          <p style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#004f80', margin: '0 0 .2rem' }}>Generador de Citas APA 7.ª</p>
          <p style={{ fontSize: '.76rem', color: '#555', margin: 0 }}>Para referencias bibliográficas del marco teórico y anexos</p>
        </div>
        <button onClick={onClose} style={{ background: '#f4f4f2', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: '.9rem' }}>✕</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#004f80', marginBottom: '.3rem' }}>Tipo de fuente</label>
        <select className="ctrl" value={tipo} onChange={e => { setTipo(e.target.value); setResult(''); setFields({}) }}>
          <option value="libro">📚 Libro</option>
          <option value="articulo">📄 Artículo de revista académica</option>
          <option value="web">🌐 Sitio web / recurso en línea</option>
          <option value="tesis">🎓 Tesis / TAP / trabajo académico</option>
          <option value="ia">🤖 Herramienta de IA (ChatGPT, etc.)</option>
        </select>
      </div>

      {tipo === 'libro' && (<><InputF id="autor" label="Autor(es)" placeholder="Apellido, N. N., & Apellido, N." /><InputF id="anio" label="Año" placeholder="2023" /><InputF id="titulo" label="Título (cursiva)" placeholder="Sustainable fashion design" /><InputF id="editorial" label="Editorial" placeholder="Laurence King Publishing" /><InputF id="doi" label="DOI o URL (opcional)" placeholder="https://doi.org/..." /></>)}
      {tipo === 'articulo' && (<><InputF id="autor" label="Autor(es)" placeholder="Apellido, N. N., & Apellido, N." /><InputF id="anio" label="Año" placeholder="2023" /><InputF id="titulo" label="Título del artículo" placeholder="Slow fashion movement..." /><InputF id="revista" label="Nombre de la revista (cursiva)" placeholder="Journal of Retailing..." /><InputF id="volnum" label="Volumen(número)" placeholder="30(4)" /><InputF id="pags" label="Páginas" placeholder="200–210" /><InputF id="doi" label="DOI" placeholder="https://doi.org/10.1016/..." /></>)}
      {tipo === 'web' && (<><InputF id="autor" label="Autor u Organización" placeholder="Textile Exchange" /><InputF id="anio" label="Año" placeholder="2024" /><InputF id="titulo" label="Título (cursiva)" placeholder="Preferred Fiber Report 2024" /><InputF id="sitio" label="Nombre del sitio" placeholder="Textile Exchange" /><InputF id="url" label="URL completa" placeholder="https://textileexchange.org/..." /></>)}
      {tipo === 'tesis' && (<><InputF id="autor" label="Autor" placeholder="Apellido, N. N." /><InputF id="anio" label="Año" placeholder="2025" /><InputF id="titulo" label="Título (cursiva)" placeholder="Diseño de colección cápsula..." /><InputF id="inst" label="Institución" placeholder="IDC · Instituto de Educación Superior Público" /><InputF id="repo" label="Repositorio / URL" placeholder="https://repositorio.idc.edu.pe/..." /></>)}
      {tipo === 'ia' && (<><InputF id="herramienta" label="Herramienta de IA" placeholder="ChatGPT" /><InputF id="version" label="Versión" placeholder="GPT-4o (mayo 2025)" /><InputF id="empresa" label="Empresa desarrolladora" placeholder="OpenAI" /><InputF id="anio" label="Año" placeholder="2025" /><InputF id="prompt" label="Descripción del prompt" placeholder="Generación de sugerencias para marco teórico..." /><InputF id="url" label="URL de acceso" placeholder="https://chat.openai.com" /></>)}

      <button
        onClick={generar}
        style={{ width: '100%', padding: '.7rem', background: 'linear-gradient(135deg,#b5307a,#e14a94)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 700, fontSize: '.9rem', cursor: 'pointer', marginTop: '.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.4rem' }}>
        ✦ Generar cita APA 7.ª
      </button>

      {result && (
        <div style={{ marginTop: '1rem', background: '#cfe6f5', borderRadius: 8, padding: '1rem' }}>
          <p style={{ fontSize: '.7rem', fontWeight: 700, color: '#004f80', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.4rem' }}>Cita generada:</p>
          <p style={{ fontSize: '.86rem', color: '#004f80', lineHeight: 1.8, marginBottom: '.8rem' }}>{result}</p>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button onClick={() => { onInsert(result); onClose() }}
              style={{ background: '#e14a94', color: '#fff', border: 'none', borderRadius: 6, padding: '.3rem .8rem', fontSize: '.72rem', fontWeight: 700, cursor: 'pointer' }}>
              ✚ Insertar en Referencias
            </button>
            <button onClick={() => navigator.clipboard.writeText(result)}
              style={{ background: '#004f80', color: '#fff', border: 'none', borderRadius: 6, padding: '.3rem .8rem', fontSize: '.72rem', fontWeight: 700, cursor: 'pointer' }}>
              Copiar cita
            </button>
          </div>
          <p style={{ fontSize: '.68rem', color: '#555', marginTop: '.6rem' }}>Verifica la cita antes de incluirla en tu informe.</p>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [data, setData] = useLocalStorage<TapData>('tap_idc_data', EMPTY_TAP)
  const [generated, setGenerated] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)
  const [showApa, setShowApa] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const scrollBarRef = useRef<HTMLDivElement>(null)

  const set = (field: keyof TapData, value: string) =>
    setData(prev => ({ ...prev, [field]: value }))

  const showToast = (msg: string, type = '') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3200)
  }

  useEffect(() => {
    const handler = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if (scrollBarRef.current) scrollBarRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const activarDemo = () => {
    showToast('▶ Ejecutando demo...', 'ai')
    const entries = Object.entries(DEMO_DATA).filter(([k]) => k !== 'imgs') as [keyof TapData, string][]
    let i = 0
    const next = () => {
      if (i >= entries.length) { showToast('✓ Demo completado', 'ok'); setGenerated(true); return }
      const [k, v] = entries[i++]
      if (typeof v === 'string') setData(prev => ({ ...prev, [k]: v }))
      setTimeout(next, 60)
    }
    setTimeout(next, 300)
  }

  const generar = () => {
    if (!data.autor || !data.titulo) { showToast('Completa Autor y Título primero'); return }
    setGenerated(true)
    showToast('✓ 15 diapositivas generadas', 'ok')
    setTimeout(() => {
      document.getElementById('slidesPreview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  const imprimirPDF = () => {
    if (!generated) { showToast('Genera la presentación primero'); return }
    window.print()
  }

  const navItems = [
    { label: 'Generador', href: '#generador' },
    { label: 'APA 7.ª', onClick: () => setShowApa(true) },
    { label: '⊙ Demo', onClick: activarDemo, subtle: true },
  ]

  return (
    <div style={{ fontFamily: 'Manrope, system-ui, sans-serif', background: '#fbfaf6', color: '#555', minHeight: '100vh' }}>
      <div ref={scrollBarRef} className="scroll-bar" />

      <header style={{ background: 'rgba(255,255,255,.95)', borderBottom: '1px solid #d8d8d4', position: 'sticky', top: 0, zIndex: 1000, backdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IdcIcon size={36} />
            <svg viewBox="0 0 200 52" height="36" style={{ flexShrink: 0 }}>
              <polygon points="11,2 19,2 16,10 14,10" fill="#e14a94" />
              <circle cx="15" cy="17" r="3" fill="#e14a94" />
              <rect x="13" y="22" width="5" height="14" rx="2.5" fill="#e14a94" />
              <rect x="25" y="12" width="5" height="24" rx="2.5" fill="#e14a94" />
              <path d="M30 17 Q42 17 42 24 Q42 31 30 31" fill="none" stroke="#e14a94" strokeWidth="5" strokeLinecap="round" />
              <path d="M58 17 Q46 17 46 24 Q46 31 58 31" fill="none" stroke="#e14a94" strokeWidth="5" strokeLinecap="round" />
              <text x="65" y="25" fontFamily="'Segoe UI',sans-serif" fontSize="11" fill="#555">diseño &amp; comunicación</text>
              <text x="13" y="45" fontFamily="'Segoe UI',sans-serif" fontSize="8" fill="#868686">Programa de Estudios · Diseño de Modas</text>
            </svg>
            <div style={{ borderLeft: '1px solid #d8d8d4', paddingLeft: '.9rem' }}>
              <p style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: '.9rem', color: '#004f80', margin: 0 }}>Trabajo de Aplicación Profesional</p>
              <p style={{ fontSize: '.66rem', color: '#555', textTransform: 'uppercase', letterSpacing: '.08em', margin: 0 }}>IDC · APA 7.ª · Asistido por IA</p>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {navItems.map((item, idx) => (
              <a key={idx} href={item.href ?? '#'}
                onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!() } : undefined}
                style={{ fontSize: '.76rem', fontWeight: 600, padding: '.38rem .85rem', borderRadius: 999, color: '#555', textDecoration: 'none', border: '1.5px solid transparent', transition: 'all .22s', opacity: item.subtle ? .65 : 1, cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e14a94'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#e14a94' }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'transparent' }}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section style={{ background: 'linear-gradient(135deg,#e14a94 0%,#b5307a 50%,#004f80 100%)', color: '#fff', padding: '4.5rem 0 5.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.8rem' }}>
            <IdcIcon size={44} opacity={0.9} />
            <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', padding: '.45rem .95rem', border: '1px solid rgba(255,255,255,.35)', borderRadius: 999, background: 'rgba(255,255,255,.08)', color: '#fff' }}>
              TAP Diseño de Modas · IDC 2026 · Asistido por IA
            </span>
          </div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5.5vw,4rem)', color: '#fff', letterSpacing: '-.04em', lineHeight: .95, margin: '1rem 0 .9rem' }}>
            Trabajo de <em style={{ color: '#f3a100', fontStyle: 'italic' }}>Aplicación</em><br />Profesional
          </h1>
          <p style={{ fontSize: 'clamp(.95rem,1.4vw,1.15rem)', maxWidth: 700, color: 'rgba(255,255,255,.85)', lineHeight: 1.55, marginBottom: '1rem' }}>
            El TAP es el instrumento de evaluación final que acredita tu competencia como profesional titulada en Diseño de Modas.
            El informe escrito vale el <strong style={{ color: '#f3a100' }}>30%</strong> y la Sustentación Oral ante Jurado el <strong style={{ color: '#f3a100' }}>70%</strong>.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1.5rem' }}>
            {[
              { label: '✦ IA por campo', bg: 'rgba(124,58,237,.25)', border: 'rgba(124,58,237,.5)' },
              { label: 'APA 7.ª integrado', bg: 'rgba(255,255,255,.12)', border: 'rgba(255,255,255,.25)' },
            ].map((b, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.35rem .85rem', borderRadius: 999, fontSize: '.76rem', fontWeight: 600, background: b.bg, border: `1px solid ${b.border}`, color: '#fff' }}>{b.label}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.8rem' }}>
            {[['15', 'Secciones TAP'], ['50+', 'Sugerencias IA'], ['15', 'Diapositivas'], ['30/70', 'Escrito / Oral']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#f3a100', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.68)', marginTop: '.25rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="generador" style={{ background: 'linear-gradient(160deg,#004f80 0%,#b5307a 100%)', padding: '4.5rem 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <p style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '.7rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#f3a100', fontWeight: 600, marginBottom: '.7rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
            <span style={{ display: 'inline-block', width: 28, height: 2, background: '#f3a100' }} />
            Generador Interactivo
          </p>
          <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 800, fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', color: '#fff', letterSpacing: '-.035em', marginBottom: '.9rem' }}>
            Completa tu TAP con <em style={{ color: '#f3a100', fontStyle: 'italic' }}>ayuda de IA</em>
          </h2>

          <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 16, marginBottom: '1.8rem' }}>
            <button onClick={() => setGuideOpen(o => !o)}
              style={{ width: '100%', padding: '1rem 1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: '.9rem' }}>
              <span>📋 Guía para completar tu TAP correctamente — léela antes de empezar</span>
              <span>{guideOpen ? '▲' : '▼'}</span>
            </button>
            {guideOpen && (
              <div style={{ padding: '0 1.4rem 1.4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '.75rem' }}>
                {[
                  ['Título del TAP', 'Máx. 25 palabras. Estructura: Verbo + objeto + línea temática + lugar + año.'],
                  ['Resumen ejecutivo', 'Redacta en tercera persona. Incluye: empresa, cargo, período, logros. Máx. 150 palabras.'],
                  ['Objetivos', 'El OG comienza con verbo en infinitivo. Los 3 OE usan verbos de nivel Bloom.'],
                  ['Marco teórico', 'Cita solo fuentes de los últimos 5 años en APA 7.ª. Al menos 1 autor peruano.'],
                  ['Logros y mejoras', 'El jurado valora resultados concretos: porcentajes, cantidades, métricas.'],
                  ['Demo', 'Usa el botón Demo para ver cómo se completa cada campo con datos de ejemplo.'],
                ].map(([t, desc]) => (
                  <div key={t} style={{ display: 'flex', gap: '.75rem', background: 'rgba(255,255,255,.07)', borderRadius: 8, padding: '.9rem', border: '1px solid rgba(255,255,255,.1)' }}>
                    <span style={{ width: 24, height: 24, background: '#f3a100', color: '#004f80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, flexShrink: 0, marginTop: '.1rem' }}>●</span>
                    <div>
                      <strong style={{ fontSize: '.85rem', color: '#fff', display: 'block', marginBottom: '.25rem' }}>{t}</strong>
                      <p style={{ fontSize: '.77rem', color: 'rgba(255,255,255,.72)', margin: 0, lineHeight: 1.55 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: 'rgba(124,58,237,.07)', border: '1px dashed rgba(124,58,237,.25)', borderRadius: 8, padding: '.7rem 1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.75)' }}>¿Primera vez? </span>
            <button onClick={activarDemo}
              style={{ background: 'none', border: 'none', color: '#c4b5fd', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
              Ver demo con datos de ejemplo
            </button>
            <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)' }}> — observa cómo se completa cada campo.</span>
          </div>

          <div style={{ background: '#fff', borderRadius: 32, padding: '2.2rem', boxShadow: '0 24px 60px rgba(0,0,0,.18)' }}>

            <StepLabel n={1}>Datos del estudiante y del TAP</StepLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <Field label="Apellidos y nombres" id="autor" value={data.autor} onChange={v => set('autor', v)} placeholder="García Quispe, María Fernanda" required />
              <Field label="DNI" id="dni" value={data.dni} onChange={v => set('dni', v)} placeholder="12345678" />
              <Field label="Año" id="anio" value={data.anio} onChange={v => set('anio', v)} placeholder="2026" />
              <div>
                <label className="field-label">Semestre</label>
                <select className="ctrl" value={data.semestre} onChange={e => set('semestre', e.target.value)}>
                  <option value="2026-I">2026-I</option>
                  <option value="2025-II">2025-II</option>
                  <option value="2026-II">2026-II</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <Field label="Título del TAP" id="titulo" value={data.titulo} onChange={v => set('titulo', v)}
                placeholder="Verbo de acción + objeto + línea temática + lugar + año (máx. 25 palabras)"
                hint="Máx. 25 palabras · Estructura: Verbo + objeto + línea temática + lugar + año" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <Field label="Asesor(a)" id="asesor" value={data.asesor} onChange={v => set('asesor', v)} placeholder="Mg. Juan Pérez Torres" />
              <div>
                <label className="field-label">Línea de investigación</label>
                <select className="ctrl" value={data.linea} onChange={e => set('linea', e.target.value)}>
                  <option value="Moda sostenible y reciclaje textil">DM-L1 · Moda sostenible</option>
                  <option value="Innovación textil">DM-L2 · Innovación textil</option>
                  <option value="Diseño de moda inclusivo">DM-L3 · Moda inclusiva</option>
                  <option value="Tendencias y consumo responsable">DM-L4 · Tendencias</option>
                  <option value="Tecnología en la moda">DM-L5 · Fashion Tech</option>
                </select>
              </div>
            </div>

            <StepLabel n={2}>Dedicatoria y Agradecimiento</StepLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <Field label="Dedicatoria" id="dedicatoria" value={data.dedicatoria} onChange={v => set('dedicatoria', v)}
                multiline rows={3} placeholder="A mis padres, quienes con su esfuerzo..."
                hint="150–250 caracteres · Breve y personal" />
              <Field label="Agradecimiento" id="agradecimiento" value={data.agradecimiento} onChange={v => set('agradecimiento', v)}
                multiline rows={3} placeholder="A la institución IDC, a mi asesora..."
                hint="200–400 caracteres · IDC, asesor(a), empresa" />
            </div>

            <StepLabel n={3}>Resumen Ejecutivo e Introducción</StepLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <Field label="Empresa / Marca / Taller" id="empresa" value={data.empresa} onChange={v => set('empresa', v)} placeholder="Ej. Atelier Lima S.A.C." required />
              <Field label="Cargo" id="cargo" value={data.cargo} onChange={v => set('cargo', v)} placeholder="Diseñadora junior" />
              <Field label="Período laboral" id="periodo" value={data.periodo} onChange={v => set('periodo', v)} placeholder="Ene 2024 – Dic 2025" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field label="Síntesis de experiencia profesional" id="resumen" value={data.resumen} onChange={v => set('resumen', v)}
                multiline rows={3} placeholder="Describe tu experiencia laboral: sector, logros principales..."
                hint="400–600 caracteres · Incluye: sector, empresa, logros medibles" required />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <Field label="Introducción / Contexto profesional" id="introduccion" value={data.introduccion} onChange={v => set('introduccion', v)}
                multiline rows={3} placeholder="Contextualiza tu experiencia en el sector moda peruano..."
                hint="500–800 caracteres · Sector moda, Economía Naranja, línea de investigación" />
            </div>

            <StepLabel n={4}>Descripción del Proyecto / Colección</StepLabel>
            <div style={{ marginBottom: '1rem' }}>
              <Field label="Nombre del proyecto / colección" id="proyecto" value={data.proyecto} onChange={v => set('proyecto', v)}
                placeholder="Ej. Colección cápsula «Terra» — 8 prendas upcycled" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <Field label="Tecnología / técnica empleada" id="tecnologia" value={data.tecnologia} onChange={v => set('tecnologia', v)} placeholder="CLO3D, Patronaje zero-waste..." />
              <Field label="Marco teórico principal" id="marco" value={data.marco} onChange={v => set('marco', v)} placeholder="Teoría del diseño circular (Ellen MacArthur, 2022)" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field label="Objetivo general" id="obj_general" value={data.obj_general} onChange={v => set('obj_general', v)}
                placeholder="Diseñar una colección de 8 prendas sostenibles para el segmento juvenil..." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <Field label="Objetivo específico 1" id="oe1" value={data.oe1} onChange={v => set('oe1', v)} placeholder="Investigar tendencias..." />
              <Field label="Objetivo específico 2" id="oe2" value={data.oe2} onChange={v => set('oe2', v)} placeholder="Diseñar y confeccionar..." />
              <Field label="Objetivo específico 3" id="oe3" value={data.oe3} onChange={v => set('oe3', v)} placeholder="Validar ante jurado..." />
            </div>

            <StepLabel n={5}>Contexto Laboral · Funciones y Proceso</StepLabel>
            <div style={{ marginBottom: '1rem' }}>
              <Field label="Funciones realizadas (Cap. 2)" id="funciones" value={data.funciones} onChange={v => set('funciones', v)}
                multiline rows={3} placeholder="Diseño de colecciones, patronaje, confección, gestión de tendencias..."
                hint="300–500 caracteres · Lista las funciones principales de tu cargo" />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <Field label="Proceso por fases (Cap. 3)" id="proceso" value={data.proceso} onChange={v => set('proceso', v)}
                multiline rows={3} placeholder="Fase 1 — Investigación... Fase 2 — Diseño... Fase 3 — Confección... Fase 4 — Validación..."
                hint="400–700 caracteres · Detalla cada fase del proyecto" />
            </div>

            <StepLabel n={6}>Evaluación, Resultados y Mejoras</StepLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <Field label="Logro principal obtenido" id="logro" value={data.logro} onChange={v => set('logro', v)}
                placeholder="Colección de 8 prendas con 92% de aceptación..." />
              <Field label="Mejora implementada" id="mejora" value={data.mejora} onChange={v => set('mejora', v)}
                placeholder="Reducción de merma textil en 35%..." />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field label="Conclusión principal" id="conclusion" value={data.conclusion} onChange={v => set('conclusion', v)}
                multiline rows={2} placeholder="Redacta una conclusión categórica que derive de la experiencia..." />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <Field label="Recomendación principal al sector" id="recomendacion" value={data.recomendacion} onChange={v => set('recomendacion', v)}
                multiline rows={2} placeholder="Plantea sugerencias accionables para el sector..." />
            </div>

            <StepLabel n={7}>Referencias Bibliográficas APA 7.ª</StepLabel>
            <div style={{ marginBottom: '2rem' }}>
              <Field label="Referencias incluidas en tu informe" id="referencias" value={data.referencias} onChange={v => set('referencias', v)}
                multiline rows={4}
                placeholder={'Fletcher, K. (2022). Fashion & Sustainability. Laurence King.\nPookulangara, S. & Shephard, A. (2023)...'}
                hint="Mín. 5 referencias de los últimos 5 años · Usa el botón APA 7.ª de la barra superior" />
              <button onClick={() => setShowApa(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem', marginTop: '.5rem', background: 'linear-gradient(135deg,#7c3aed,#e14a94)', color: '#fff', border: 'none', borderRadius: 6, padding: '.35rem .8rem', fontSize: '.72rem', fontWeight: 700, cursor: 'pointer' }}>
                ✦ Abrir generador APA 7.ª
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={generar}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '1rem 2.2rem', background: '#b5307a', color: '#fff', fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: '1rem', border: 'none', borderRadius: 999, cursor: 'pointer', transition: 'all .3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(225,74,148,.38)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Generar Presentación
              </button>
              <button onClick={() => showToast('Borrador guardado', 'ok')}
                style={{ background: 'transparent', color: '#555', border: '1.5px solid #d8d8d4', padding: '.65rem 1.3rem', borderRadius: 999, fontSize: '.84rem', fontWeight: 600, cursor: 'pointer' }}>
                💾 Guardar borrador
              </button>
              <button onClick={() => { if (confirm('¿Limpiar todos los campos?')) { setData(EMPTY_TAP); setGenerated(false) } }}
                style={{ background: 'transparent', color: '#555', border: '1.5px solid #d8d8d4', padding: '.65rem 1.3rem', borderRadius: 999, fontSize: '.84rem', fontWeight: 600, cursor: 'pointer' }}>
                ↺ Limpiar
              </button>
            </div>

            <div id="slidesPreview">
              <SlidePreview d={data} visible={generated} />
            </div>

            {generated && (
              <div style={{ background: '#f4f4f2', borderRadius: 16, padding: '1.8rem', marginTop: '1.2rem', border: '1px solid #d8d8d4' }}>
                <p style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontWeight: 700, fontSize: '1rem', color: '#004f80', marginBottom: '.9rem' }}>Exportar contenido del TAP</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '.8rem' }}>
                  {[
                    { icon: '📝', label: 'Word (.doc)', desc: 'Informe TAP completo', color: '#2B579A', action: () => { exportWord(data); showToast('Informe TAP en Word descargado', 'ok') } },
                    { icon: '🤖', label: 'Prompt KIMI / Canva', desc: 'Prompt para generar PPT', color: '#7c3aed', action: () => { exportKimiPrompt(data); showToast('Prompt KIMI/Canva descargado', 'ok') } },
                    { icon: '🌐', label: 'HTML interactivo', desc: 'Presentación web completa', color: '#0072b9', action: () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([document.documentElement.outerHTML], { type: 'text/html' })); a.download = 'TAP_DisenioModas.html'; a.click(); showToast('HTML descargado', 'ok') } },
                    { icon: '🖨️', label: 'PDF / Imprimir', desc: 'Ctrl+P → Guardar PDF', color: '#555', action: imprimirPDF },
                  ].map(card => (
                    <div key={card.label} className="exp-card" onClick={card.action}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: card.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .65rem', fontSize: '1.3rem' }}>{card.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: '.88rem', color: '#004f80' }}>{card.label}</div>
                      <div style={{ fontSize: '.76rem', color: '#555' }}>{card.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showApa && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 5999, backdropFilter: 'blur(3px)' }} onClick={() => setShowApa(false)} />
          <ApaPanel
            onClose={() => setShowApa(false)}
            onInsert={(cita) => {
              set('referencias', data.referencias ? data.referencias + '\n' + cita : cita)
              showToast('✓ Cita insertada en Referencias', 'ok')
            }}
          />
        </>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(60px); opacity: 0; }
          to   { transform: translateX(-50%) translateY(0);   opacity: 1; }
        }
        @media print {
          header, #scrollBar { display: none !important; }
        }
      `}</style>
    </div>
  )
}
