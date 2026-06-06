import type { TapData } from '@/types/tap'

export function exportWord(d: TapData): void {
  const br = '<div style="page-break-before:always"></div>'
  const inst = 'INSTITUTO DE EDUCACIÓN SUPERIOR PÚBLICO "DISEÑO Y COMUNICACIÓN" (IDC)'

  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<meta name=ProgId content=Word.Document/>
<meta name=Generator content="Microsoft Word 15"/>
<style>
  @page Section1 {
    size: 21cm 29.7cm;
    margin: 2.54cm 3cm 2.54cm 4cm;
    mso-header-margin: 1.25cm;
    mso-footer-margin: 1.25cm;
  }
  div.Section1 { page: Section1; }
  body { font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.5; }
  h1 { font-family: "Times New Roman", serif; font-size: 14pt; font-weight: bold; text-align: center; margin-top: 36pt; margin-bottom: 12pt; text-transform: uppercase; }
  h2 { font-family: "Times New Roman", serif; font-size: 12pt; font-weight: bold; margin-top: 24pt; margin-bottom: 12pt; text-transform: uppercase; text-align: center; }
  h3 { font-family: "Times New Roman", serif; font-size: 12pt; font-weight: bold; margin-top: 18pt; margin-bottom: 6pt; }
  p { font-family: "Times New Roman", serif; font-size: 12pt; text-align: justify; margin: 0 0 12pt 0; line-height: 1.5; }
  p.center { text-align: center; }
  p.italic { font-style: italic; }
  p.indent { margin-left: 1.25cm; }
  table { border-collapse: collapse; width: 100%; margin: 12pt 0; font-size: 11pt; }
  td, th { border: 1px solid #000000; padding: 6pt 8pt; vertical-align: top; }
  th { background-color: #E14A94; color: #ffffff; font-weight: bold; text-align: center; }
  .firma-box { border-top: 1px solid #000; width: 200px; margin: 40pt auto 0; text-align: center; padding-top: 4pt; }
</style>
</head>
<body>
<div class="Section1">

<p class="center" style="margin-top:0"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI2UxNGE5NCIvPjxwb2x5Z29uIHBvaW50cz0iMjAsOSAyOCwxNiAyNiwzMSAxNCwzMSAxMiwxNiIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxNyIgeT0iNiIgd2lkdGg9IjYiIGhlaWdodD0iNSIgcng9IjIuNSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=" width="60" height="60" alt="IDC"/></p>
<p class="center" style="font-size:11pt; text-transform:uppercase; font-weight:bold">${inst}</p>
<p class="center" style="font-size:11pt">Programa de Estudios: Diseño de Modas</p>
<h1 style="margin-top:60pt">${d.titulo || '[TÍTULO DEL TRABAJO DE APLICACIÓN PROFESIONAL]'}</h1>
<p class="center" style="margin-top:36pt">INFORME DE TRABAJO DE APLICACIÓN PROFESIONAL<br/>Para optar el Título Profesional Técnico en Diseño de Modas</p>
<p class="center" style="margin-top:48pt"><strong>AUTOR(A):</strong><br/>${d.autor || '[Apellidos y nombres]'}</p>
${d.asesor ? `<p class="center" style="margin-top:12pt"><strong>ASESOR(A):</strong><br/>${d.asesor}</p>` : ''}
<p class="center" style="margin-top:60pt">Lima, Perú<br/>${d.anio || '2026'}</p>

${br}

<h2>DEDICATORIA</h2>
<p class="center italic" style="margin-top:80pt; max-width:400px; margin-left:auto; margin-right:auto">${d.dedicatoria || '[Texto de dedicatoria]'}</p>
<div class="firma-box"><p style="font-size:11pt; margin:0">${d.autor || '[Autor(a)]'}</p></div>

${br}

<h2>AGRADECIMIENTO</h2>
<p style="margin-top:24pt">${d.agradecimiento || '[Reconocimiento a IDC, asesor(a), empresa]'}</p>

${br}

<h2>ÍNDICE DE CONTENIDO</h2>
<table style="border:none">
  ${[['Dedicatoria','ii'],['Agradecimiento','iii'],['Índice de Contenido','iv'],['Resumen Ejecutivo','1'],['Introducción','2'],['CAPÍTULO I: Marco Teórico y Antecedentes','3'],['CAPÍTULO II: Contexto Laboral','4'],['CAPÍTULO III: Descripción de la Actividad Profesional','5'],['CAPÍTULO IV: Evaluación y Plan de Mejora','6'],['Conclusiones','7'],['Recomendaciones','8'],['Referencias Bibliográficas','9'],['Anexos','10']].map(([t,p])=>`<tr><td style="border:none;padding:3pt 0">${t}</td><td style="border:none;text-align:right;padding:3pt 0">${p}</td></tr>`).join('')}
</table>

${br}

<h2>RESUMEN EJECUTIVO</h2>
<table>
  <tr><th colspan="2" style="text-align:left">Datos de la Experiencia Profesional</th></tr>
  <tr><td style="width:35%;font-weight:bold">Empresa / Marca / Taller</td><td>${d.empresa || '—'}</td></tr>
  <tr><td style="font-weight:bold">Cargo desempeñado</td><td>${d.cargo || '—'}</td></tr>
  <tr><td style="font-weight:bold">Período laboral</td><td>${d.periodo || '—'}</td></tr>
  <tr><td style="font-weight:bold">Línea de investigación</td><td>${d.linea || '—'}</td></tr>
  <tr><td style="font-weight:bold">Tecnología / técnica empleada</td><td>${d.tecnologia || '—'}</td></tr>
  <tr><td style="font-weight:bold">Proyecto / colección desarrollada</td><td>${d.proyecto || '—'}</td></tr>
</table>
<p>${d.resumen || '[Síntesis de la experiencia profesional]'}</p>

${br}

<h2>INTRODUCCIÓN</h2>
<p>${d.introduccion || '[Contexto profesional y sector moda]'}</p>
<p>El presente informe escrito constituye el <strong>Examen Escrito (30%)</strong> del Trabajo de Aplicación Profesional (TAP). La <strong>Sustentación y Exposición con Demostración frente al Jurado Calificador</strong> constituye el Examen Oral (70%).</p>

${br}

<h2>CAPÍTULO I: MARCO TEÓRICO Y ANTECEDENTES</h2>
<h3>1.1 Antecedentes</h3>
<p>[Investigaciones previas relacionadas con el tema — citar en APA 7.ª]</p>
<h3>1.2 Bases Teóricas</h3>
<p>${d.marco || '[Paradigmas de autores de los últimos 5 años — APA 7.ª]'}</p>
<h3>1.3 Línea de Investigación</h3>
<p>El presente Trabajo de Aplicación Profesional se enmarca en la línea de investigación: <strong>${d.linea || '[Línea]'}</strong>.</p>

${br}

<h2>CAPÍTULO II: CONTEXTO LABORAL</h2>
<h3>2.1 Datos de la Organización</h3>
<table>
  <tr><td style="width:35%;font-weight:bold">Razón social</td><td>${d.empresa || '—'}</td></tr>
  <tr><td style="font-weight:bold">Sector</td><td>Diseño de Modas / Industria Textil</td></tr>
  <tr><td style="font-weight:bold">Cargo del egresado</td><td>${d.cargo || '—'}</td></tr>
  <tr><td style="font-weight:bold">Período de labores</td><td>${d.periodo || '—'}</td></tr>
</table>
<h3>2.2 Funciones Realizadas</h3>
<p>${d.funciones || '[Funciones desempeñadas]'}</p>
<h3>2.3 Organigrama de la Organización</h3>
<p>[Insertar organigrama]</p>

${br}

<h2>CAPÍTULO III: DESCRIPCIÓN DE LA ACTIVIDAD PROFESIONAL</h2>
<h3>3.1 Nombre del Proyecto / Colección</h3>
<p>${d.proyecto || '[Nombre del proyecto]'}</p>
<h3>3.2 Tecnología y Técnica Empleada</h3>
<p>${d.tecnologia || '[Herramientas y técnicas]'}</p>
<h3>3.3 Objetivo General</h3>
<p>${d.obj_general || '[Objetivo general]'}</p>
<h3>3.4 Objetivos Específicos</h3>
${[d.oe1,d.oe2,d.oe3].filter(Boolean).map((oe,i)=>`<p class="indent"><strong>OE${i+1}:</strong> ${oe}</p>`).join('\n')||'<p class="indent">[OE1, OE2, OE3]</p>'}
<h3>3.5 Descripción del Proceso por Fases</h3>
<p>${d.proceso || '[Fases del proceso]'}</p>
<h3>3.6 Ficha Técnica del Proyecto</h3>
<table>
  <tr><th colspan="2">Ficha Técnica</th></tr>
  <tr><td style="font-weight:bold">Nombre del proyecto</td><td>${d.proyecto || '—'}</td></tr>
  <tr><td style="font-weight:bold">Empresa / Marca</td><td>${d.empresa || '—'}</td></tr>
  <tr><td style="font-weight:bold">Período de ejecución</td><td>${d.periodo || '—'}</td></tr>
  <tr><td style="font-weight:bold">Tecnología empleada</td><td>${d.tecnologia || '—'}</td></tr>
  <tr><td style="font-weight:bold">Objetivo general</td><td>${d.obj_general || '—'}</td></tr>
</table>

${br}

<h2>CAPÍTULO IV: EVALUACIÓN Y PLAN DE MEJORA</h2>
<h3>4.1 Resultados Obtenidos / Logro Principal</h3>
<p>${d.logro || '[Logro con datos cuantificables]'}</p>
<h3>4.2 Mejora Implementada</h3>
<p>${d.mejora || '[Mejora al proceso o producto]'}</p>
<h3>4.3 Evidencias del Trabajo Profesional</h3>
<p>Se adjuntan como evidencias digitales del Trabajo de Aplicación Profesional los siguientes documentos en los Anexos:</p>
<p class="indent">a) Fashion sketchbooks y figurines de diseño</p>
<p class="indent">b) Fichas técnicas de prenda (mínimo 3)</p>
<p class="indent">c) Patrones técnicos y moldes</p>
<p class="indent">d) Presentación multimedia de la colección / proyecto</p>
<p class="indent">e) Lookbook fotográfico o material editorial</p>

${br}

<h2>CONCLUSIONES</h2>
<p>${d.conclusion || '[Conclusión principal]'}</p>
<p>[Conclusión 2 — contexto laboral]</p>
<p>[Conclusión 3 — tecnología empleada]</p>

${br}

<h2>RECOMENDACIONES</h2>
<p>${d.recomendacion || '[Recomendación principal]'}</p>
<p>[Recomendación 2 — futuros profesionales]</p>
<p>[Recomendación 3 — programa de estudios]</p>

${br}

<h2>REFERENCIAS BIBLIOGRÁFICAS</h2>
<p style="font-size:11pt;line-height:2;margin-left:0.5cm;text-indent:-0.5cm">
  ${(d.referencias||'Fletcher, K. (2022). <em>Fashion &amp; Sustainability</em>. Laurence King.').replace(/\n/g,'</p><p style="font-size:11pt;line-height:2;margin-left:0.5cm;text-indent:-0.5cm">')}
</p>

${br}

<h2>ANEXOS</h2>
<h3>Anexo A: Diagrama de Gantt</h3>
<p>[Insertar diagrama de Gantt]</p>
<h3>Anexo B: Presupuesto Desagregado</h3>
<p>[Insertar tabla de costos]</p>
<h3>Anexo C: Fichas Técnicas de Prenda</h3>
<p>[Insertar mínimo 3 fichas técnicas]</p>
<h3>Anexo D: Patrones Técnicos y Moldes</h3>
<p>[Fotografías o escaneos de patrones]</p>
<h3>Anexo E: Brief Creativo y Moodboard</h3>
<p>[Brief con concepto, paleta de color y referencias visuales]</p>
<h3>Anexo F: Fashion Sketchbook y Figurines</h3>
<p>[Bocetos y figurines de la colección]</p>

</div>
</body>
</html>`

  const blob = new Blob(['﻿' + html], { type: 'application/msword;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `TAP_DisenioModas_${(d.autor || 'Informe').split(',')[0].replace(/\s+/g, '_')}_${d.anio || '2026'}.doc`
  a.click()
  URL.revokeObjectURL(url)
}
