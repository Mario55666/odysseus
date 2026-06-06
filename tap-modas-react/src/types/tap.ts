export interface TapData {
  autor: string
  dni: string
  titulo: string
  asesor: string
  anio: string
  semestre: string
  linea: string
  dedicatoria: string
  agradecimiento: string
  empresa: string
  cargo: string
  periodo: string
  resumen: string
  introduccion: string
  proyecto: string
  tecnologia: string
  marco: string
  obj_general: string
  oe1: string
  oe2: string
  oe3: string
  funciones: string
  proceso: string
  logro: string
  mejora: string
  conclusion: string
  recomendacion: string
  referencias: string
  imgs: {
    portada?: string
    resumen?: string
    proyecto?: string
    resultado?: string
    contexto?: string
    proceso?: string
  }
}

export const EMPTY_TAP: TapData = {
  autor:'', dni:'', titulo:'', asesor:'', anio:'2026', semestre:'2026-I',
  linea:'Moda sostenible y reciclaje textil',
  dedicatoria:'', agradecimiento:'', empresa:'', cargo:'', periodo:'',
  resumen:'', introduccion:'', proyecto:'', tecnologia:'', marco:'',
  obj_general:'', oe1:'', oe2:'', oe3:'', funciones:'', proceso:'',
  logro:'', mejora:'', conclusion:'', recomendacion:'', referencias:'',
  imgs:{}
}

export const DEMO_DATA: TapData = {
  autor:'Quispe Flores, María Fernanda',
  dni:'47382916',
  titulo:'Diseño de colección cápsula sostenible mediante técnicas de upcycling para el mercado juvenil limeño, 2025',
  asesor:'Mg. Carmen Salazar Vásquez',
  anio:'2026',
  semestre:'2026-I',
  linea:'Moda sostenible y reciclaje textil',
  dedicatoria:'A mis padres, Rosa y Carlos, quienes con su esfuerzo y dedicación me permitieron alcanzar esta meta profesional. Su ejemplo de perseverancia guía cada paso de mi carrera en el diseño de modas.',
  agradecimiento:'A la institución IDC por la formación integral recibida. A mi asesora Mg. Carmen Salazar Vásquez por su orientación metodológica. A Tierra Textil S.A.C. por facilitar el espacio y los recursos para el desarrollo de la colección «Terra».',
  empresa:'Tierra Textil S.A.C.',
  cargo:'Diseñadora de Modas Junior',
  periodo:'Enero 2024 – Diciembre 2025',
  resumen:'La presente experiencia profesional se desarrolló en el sector de la moda sostenible peruana, donde se diseñó y ejecutó una colección cápsula de ocho prendas utilizando técnicas de upcycling y materiales de bajo impacto ambiental. Los objetivos planteados se cumplieron al 95%, logrando validación ante jurado especializado con 92% de aceptación del público objetivo.',
  introduccion:'El presente informe contextualiza la experiencia laboral desarrollada en el sector de la moda sostenible peruana, enmarcada en la Economía Naranja y el creciente interés del mercado nacional por productos textiles de bajo impacto ambiental.',
  proyecto:'Colección cápsula «Terra» — 8 prendas upcycled con algodón nativo peruano',
  tecnologia:'CLO3D, Patronaje zero-waste, Serigrafía con tintas ecológicas, Adobe Creative Suite',
  marco:'Economía circular en la moda (Fletcher, 2022) y principios del slow fashion (Pookulangara & Shephard, 2023)',
  obj_general:'Diseñar una colección cápsula de ocho prendas sostenibles para el segmento juvenil femenino (18–30 años) utilizando técnicas de upcycling y materiales certificados, en Lima, durante el año 2025.',
  oe1:'Investigar las tendencias de moda sostenible, el comportamiento del consumidor y los proveedores de materiales ecoamigables en el mercado peruano.',
  oe2:'Diseñar y confeccionar la colección cápsula aplicando técnicas de upcycling, patronaje zero-waste y uso de fibras naturales certificadas GOTS.',
  oe3:'Presentar y validar la colección ante jurado especializado y potenciales consumidores del segmento objetivo mediante encuesta de percepción.',
  funciones:'Diseño de colecciones temporada: investigación de tendencias, elaboración de moodboards, bocetado de figurines, selección de materiales y paleta de color. Patronaje y confección de prototipos. Seguimiento de producción con proveedores textiles.',
  proceso:'Fase 1 — Investigación: análisis de tendencias sostenibles, benchmarking de marcas y estudio de mercado juvenil limeño. Fase 2 — Diseño: moodboard, figurines, paleta cromática y selección de materiales GOTS. Fase 3 — Confección: patronaje zero-waste, corte y ensamble de 8 prendas. Fase 4 — Validación: jurado especializado y encuesta de percepción a 50 consumidores.',
  logro:'Colección de 8 prendas presentada ante jurado con 92% de aceptación y seleccionada para exhibición en la Semana de la Moda Sostenible Lima 2025.',
  mejora:'Reducción de merma textil en 35% mediante patronaje zero-waste; ciclo de diseño reducido en 2 semanas al incorporar CLO3D al flujo de trabajo.',
  conclusion:'La aplicación de técnicas de upcycling en el contexto de la industria de la moda peruana demuestra viabilidad técnica y comercial, con alta aceptación del mercado objetivo y potencial de escalamiento para marcas independientes del sector.',
  recomendacion:'Se recomienda que las marcas peruanas de moda incorporen al menos 20% de materiales reciclados o certificados en sus colecciones para 2027, como estrategia de posicionamiento sostenible ante consumidores conscientes y mercados de exportación exigentes.',
  referencias:'Fletcher, K. (2022). Fashion & Sustainability. Laurence King.\nPookulangara, S. & Shephard, A. (2023). Slow fashion movement. Journal of Retailing and Consumer Services, 30(4), 200–210.\nTextile Exchange. (2023). Preferred Fiber & Materials Report 2023. https://textileexchange.org\nMinisterio de la Producción. (2024). Industria textil y confecciones: diagnóstico sectorial. PRODUCE.\nOpenAI. (2025). ChatGPT GPT-4o [Herramienta de IA generativa]. https://chat.openai.com',
  imgs:{}
}
