import type { TapData } from '@/types/tap'

export function exportKimiPrompt(d: TapData): void {
  const sep = '='.repeat(65)
  const txt = `PROMPT PARA KIMI / GAMMA / CANVA PRESENTACIONES
TAP Diseño de Modas · IDC · ${d.anio || '2026'}
${sep}

INSTRUCCIÓN PRINCIPAL:
Crea una presentación profesional de 15 diapositivas para la sustentación oral del Trabajo de Aplicación Profesional (TAP) de Diseño de Modas del Instituto IDC. Esta presentación es para el Examen Oral ante Jurado Calificador (70% de la nota final).

DATOS DEL TRABAJO DE APLICACIÓN PROFESIONAL:
${'─'.repeat(42)}
Autor(a):              ${d.autor || '[completar]'}
Título del TAP:        ${d.titulo || '[completar]'}
Empresa / Marca:       ${d.empresa || '[completar]'}
Cargo:                 ${d.cargo || '[completar]'}
Período:               ${d.periodo || '[completar]'}
Proyecto / Colección:  ${d.proyecto || '[completar]'}
Línea investigación:   ${d.linea || '[completar]'}
Tecnología:            ${d.tecnologia || '[completar]'}
Logro principal:       ${d.logro || '[completar]'}
Año:                   ${d.anio || '2026'}

ESTRUCTURA EXACTA DE LAS 15 DIAPOSITIVAS:
${'─'.repeat(42)}

DIAPOSITIVA 01 — PORTADA
• Logo IDC (círculo rosa con ícono de vestido blanco)
• Texto: "INSTITUTO DE EDUCACIÓN SUPERIOR PÚBLICO 'DISEÑO Y COMUNICACIÓN' (IDC)"
• Texto: "Programa de Estudios: Diseño de Modas"
• Título: "${d.titulo || '[TÍTULO]'}"
• "TRABAJO DE APLICACIÓN PROFESIONAL"
• Autor(a): ${d.autor || '[Autor]'}
• Año: ${d.anio || '2026'} · Lima, Perú
• FONDO: degradado diagonal #E14A94 → #B5307A → #004F80
• TEXTO: blanco

DIAPOSITIVA 02 — DEDICATORIA
• Título: "DEDICATORIA"
• Texto centrado, cursiva: "${d.dedicatoria || '[Dedicatoria]'}"

DIAPOSITIVA 03 — AGRADECIMIENTO
• Título: "AGRADECIMIENTO"
• Texto justificado: "${d.agradecimiento || '[Agradecimiento]'}"

DIAPOSITIVA 04 — ÍNDICE
• Lista numerada en 2 columnas:
  01 Resumen Ejecutivo       06 Cap.3: Proceso por Fases
  02 Introducción            07 Cap.4: Evaluación y Mejora
  03 Cap.1: Marco Teórico    08 Conclusiones
  04 Cap.2: Contexto Laboral 09 Recomendaciones
  05 Cap.3: Proyecto         10 Referencias y Anexos

DIAPOSITIVA 05 — RESUMEN EJECUTIVO
• Encabezado rosa: "01 · RESUMEN EJECUTIVO"
• Tabla con datos: Empresa: ${d.empresa || '—'} | Cargo: ${d.cargo || '—'} | Período: ${d.periodo || '—'}
• Párrafo: "${d.resumen?.substring(0, 150) || '[Síntesis]'}..."

DIAPOSITIVA 06 — INTRODUCCIÓN
• Encabezado rosa: "02 · INTRODUCCIÓN"
• Párrafo: "${d.introduccion?.substring(0, 200) || '[Contexto]'}..."
• Caja azul: "Informe escrito = 30% · Sustentación oral ante jurado = 70%"

DIAPOSITIVA 07 — CAPÍTULO 1: MARCO TEÓRICO
• Encabezado rosa: "CAP.1 · MARCO TEÓRICO"
• Base teórica: ${d.marco?.substring(0, 120) || '[Marco]'}
• Enfoques de la línea de investigación: 5 puntos

DIAPOSITIVA 08 — CAPÍTULO 2: CONTEXTO LABORAL
• Encabezado rosa: "CAP.2 · CONTEXTO LABORAL"
• Datos empresa, cargo, período, funciones (3 bullets)
• Organigrama esquemático

DIAPOSITIVA 09 — CAPÍTULO 3: PROYECTO / FICHA TÉCNICA
• Encabezado rosa: "CAP.3 · DESCRIPCIÓN DEL PROYECTO"
• Nombre, tecnología, objetivo general
• OE1, OE2, OE3 con badges azules

DIAPOSITIVA 10 — CAPÍTULO 3: PROCESO POR FASES
• 4 tarjetas horizontales:
  INVESTIGACION (#E14A94) · DISEÑO (#0072B9) · CONFECCIÓN (#C47D00) · VALIDACIÓN (#004F80)

DIAPOSITIVA 11 — CAPÍTULO 4: EVALUACIÓN
• Logro: "${d.logro?.substring(0, 100) || '[Logro]'}"
• Mejora: "${d.mejora?.substring(0, 100) || '[Mejora]'}"

DIAPOSITIVA 12 — CONCLUSIONES
• Conclusión principal: "${d.conclusion?.substring(0, 120) || '[Conclusión]'}"

DIAPOSITIVA 13 — RECOMENDACIONES
• Recomendación: "${d.recomendacion?.substring(0, 100) || '[Recomendación]'}"

DIAPOSITIVA 14 — REFERENCIAS Y ANEXOS
• Referencias APA 7.ª en cursiva
• Anexos: A (Gantt), B (Presupuesto), C (Fichas técnicas), D (Patrones), E (Moodboard), F (Sketchbook)

DIAPOSITIVA 15 — CIERRE
• FONDO: degradado rosa → azul marino
• "Gracias por su atención" (grande, bold, blanco)
• ${d.autor || '[Autor]'}
• "DISEÑO DE MODAS · IDC · ${d.anio || '2026'}"

PALETA DE COLORES IDC:
Rosa:       #E14A94 | Azul marino: #004F80 | Azul medio: #0072B9
Dorado:     #F3A100 | Gris claro:  #F4F4F2 | Blanco:     #FFFFFF

TIPOGRAFÍA:
• Títulos:  Bricolage Grotesque Bold / Montserrat Bold 700
• Cuerpo:   Manrope Regular 400 / Inter Regular
• Datos:    JetBrains Mono 400 / Courier New

REGLAS DE DISEÑO:
1. Máximo 40 palabras visibles por diapositiva
2. Encabezado barra Rosa #E14A94 con número opaco y título blanco
3. Pie de página gris claro con nombre del autor y número de página
4. Tablas con encabezado #E14A94 texto blanco
5. Fuente mínima en cuerpo: 14pt
6. Espacio reservado para imágenes en diapositivas 08, 09, 10 y 11

${sep}
Generado con Generador TAP · IDC Diseño de Modas · Herramienta IA Académica`

  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `TAP_Prompt_KIMI_Canva_${(d.autor || 'TAP').split(',')[0].replace(/\s+/g, '_')}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
