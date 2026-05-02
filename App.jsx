import { useState, useMemo } from "react";

const ROLES = {
  javi: { label: "Javi", color: "#B91C1C", bg: "#FEE2E2" },
  pm: { label: "Project Manager", color: "#7C3AED", bg: "#EDE9FE" },
  av: { label: "Asistente Virtual", color: "#059669", bg: "#D1FAE5" },
  trafficker: { label: "Trafficker (Juan)", color: "#D97706", bg: "#FEF3C7" },
  tecnico: { label: "Técnico (Nico)", color: "#2563EB", bg: "#DBEAFE" },
  dircom: { label: "Dir. Comercial", color: "#DC2626", bg: "#FEE2E2" },
  copy: { label: "Copywriter Jr.", color: "#0891B2", bg: "#CFFAFE" },
  experta: { label: "Experta", color: "#7C3AED", bg: "#F3E8FF" },
  laura: { label: "Laura", color: "#059669", bg: "#D1FAE5" },
};

const SCENARIOS = [
  { id: 0, name: "Actual", desc: "Javi hace casi todo. Nico (técnico), Laura (asistente), Juan (trafficker) y Elisabeth (experta) cubren sus áreas." },
  { id: 1, name: "Conservador", desc: "Se incorporan un Project Manager y un Asistente Virtual. El técnico y el trafficker asumen más carga." },
  { id: 2, name: "Moderado", desc: "Además se incorpora un Director Comercial que asume toda la gestión de ventas y equipo de closers." },
  { id: 3, name: "Agresivo", desc: "Además se incorpora un Copywriter Jr. que redacta los copys no estratégicos, Javi solo revisa y ajusta." },
];

const BLOCKS = [
  {
    name: "INVESTIGACIÓN Y ESTRATEGIA",
    tasks: [
      { id: "1", name: "Recopilación docs experto", subs: [
        { id: "1.1", name: "Solicitar materiales del curso a la experta", s: ["javi","pm","pm","pm"] },
        { id: "1.2", name: "Revisar que esté todo completo", s: ["javi","pm","pm","pm"] },
        { id: "1.3", name: "Crear carpeta en Drive con estructura", s: ["javi","av","av","av"] },
        { id: "1.4", name: "Clasificar materiales por tipo", s: ["javi","av","av","av"] },
      ]},
      { id: "2", name: "Estudio del avatar", subs: [
        { id: "2.1", name: "Investigar público objetivo (dolores, deseos, objeciones)", s: ["javi","javi","javi","javi"] },
        { id: "2.2", name: "Analizar testimonios de lanzamientos anteriores", s: ["javi","av","av","av"] },
        { id: "2.3", name: "Redactar documento de avatar completo", s: ["javi","javi","javi","javi"] },
        { id: "2.4", name: "Validar avatar con la experta", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "3", name: "Naming y Promesas", subs: [
        { id: "3.1", name: "Generar opciones de nombre para taller y formación", s: ["javi","javi","javi","javi"] },
        { id: "3.2", name: "Definir promesa principal y secundarias", s: ["javi","javi","javi","javi"] },
        { id: "3.3", name: "Validar naming y promesas con la experta", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "4", name: "Definir oferta", subs: [
        { id: "4.1", name: "Estructurar producto (módulos, duración, formato)", s: ["javi","javi","javi","javi"] },
        { id: "4.2", name: "Definir bonus y su relación con objeciones", s: ["javi","javi","javi","javi"] },
        { id: "4.3", name: "Definir precios y opciones de pago", s: ["javi","javi","javi","javi"] },
        { id: "4.4", name: "Definir order bump, upsell y downsell", s: ["javi","javi","javi","javi"] },
        { id: "4.5", name: "Definir garantías", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "5", name: "Documento Maestro", subs: [
        { id: "5.1", name: "Crear documento con todos los datos del lanzamiento", s: ["javi","pm","pm","pm"] },
        { id: "5.2", name: "Incluir fechas, enlaces, nombres, promesas", s: ["javi","pm","pm","pm"] },
        { id: "5.3", name: "Mantenerlo actualizado durante el lanzamiento", s: ["javi","av","av","av"] },
      ]},
      { id: "6", name: "Creación de Drive del lanzamiento", subs: [
        { id: "6.1", name: "Crear estructura de carpetas en Google Drive", s: ["javi","av","av","av"] },
        { id: "6.2", name: "Organizar subcarpetas por área", s: ["javi","av","av","av"] },
        { id: "6.3", name: "Compartir accesos al equipo", s: ["javi","av","av","av"] },
      ]},
      { id: "7", name: "Cuadro de mandos (Torre de Control)", subs: [
        { id: "7.1", name: "Montar hoja de seguimiento general", s: ["javi","javi","javi","javi"] },
        { id: "7.2", name: "Configurar fórmulas y métricas iniciales", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "7.3", name: "Configurar plantilla de captación", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "7.4", name: "Preparar brújula de vuelo (retrospectiva)", s: ["javi","pm","pm","pm"] },
      ]},
    ]
  },
  {
    name: "COPYS Y CONTENIDO ESCRITO",
    tasks: [
      { id: "8", name: "Copys Landing captación y gracias", subs: [
        { id: "8.1", name: "Redactar headline y subheadline de landing", s: ["javi","javi","javi","javi"] },
        { id: "8.2", name: "Redactar bullet points y CTA", s: ["javi","javi","javi","copy"] },
        { id: "8.3", name: "Redactar variante para tráfico orgánico", s: ["javi","javi","javi","copy"] },
        { id: "8.4", name: "Redactar variante para tráfico de pago", s: ["javi","javi","javi","copy"] },
        { id: "8.5", name: "Redactar copy de landing de gracias", s: ["javi","javi","javi","copy"] },
        { id: "8.6", name: "Entregar a Nico para maquetación", s: ["javi","pm","pm","pm"] },
      ]},
      { id: "9", name: "Copy creativos captación", subs: [
        { id: "9.1", name: "Escribir guiones para anuncios de vídeo (hasta 40)", s: ["javi","javi","javi","copy"] },
        { id: "9.2", name: "Escribir textos para anuncios de imagen (hasta 10)", s: ["javi","javi","javi","copy"] },
        { id: "9.3", name: "Entregar briefing creativo a Laura", s: ["javi","pm","pm","pm"] },
      ]},
      { id: "10", name: "Copy creativos calentamiento/hype", subs: [
        { id: "10.1", name: "Escribir guiones para anuncios de vídeo calentamiento", s: ["javi","javi","javi","copy"] },
        { id: "10.2", name: "Escribir textos para anuncios de imagen hype", s: ["javi","javi","javi","copy"] },
        { id: "10.3", name: "Entregar briefing creativo a Laura", s: ["javi","pm","pm","pm"] },
      ]},
      { id: "11", name: "Copy creativos retargeting y ventas", subs: [
        { id: "11.1", name: "Escribir textos para anuncios inscripciones abiertas", s: ["javi","javi","javi","copy"] },
        { id: "11.2", name: "Escribir textos de objeciones, testimonios, último día", s: ["javi","javi","javi","copy"] },
        { id: "11.3", name: "Entregar briefing creativo a Laura", s: ["javi","pm","pm","pm"] },
      ]},
      { id: "12", name: "Copys Email calentamiento y masterclass", subs: [
        { id: "12.1", name: "Redactar secuencia de emails de calentamiento", s: ["javi","javi","javi","copy"] },
        { id: "12.2", name: "Redactar emails de recordatorio de masterclass", s: ["javi","javi","javi","copy"] },
        { id: "12.3", name: "Redactar emails de recordatorio de directos", s: ["javi","javi","javi","copy"] },
      ]},
      { id: "13", name: "Copys Email ventas", subs: [
        { id: "13.1", name: "Redactar secuencia de emails de ventas", s: ["javi","javi","javi","javi"] },
        { id: "13.2", name: "Redactar email de bonus acción rápida", s: ["javi","javi","javi","copy"] },
        { id: "13.3", name: "Redactar email de objeciones", s: ["javi","javi","javi","copy"] },
        { id: "13.4", name: "Redactar email de testimonios", s: ["javi","javi","javi","copy"] },
        { id: "13.5", name: "Redactar email de cierre de carrito", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "14", name: "Copys WhatsApp", subs: [
        { id: "14.1", name: "Redactar mensaje de bienvenida a la comunidad", s: ["javi","javi","javi","copy"] },
        { id: "14.2", name: "Redactar secuencia de mensajes de calentamiento", s: ["javi","javi","javi","copy"] },
        { id: "14.3", name: "Redactar mensajes de recordatorio", s: ["javi","javi","javi","copy"] },
        { id: "14.4", name: "Redactar mensajes de apertura de carrito", s: ["javi","javi","javi","copy"] },
        { id: "14.5", name: "Redactar mensajes de cierre de carrito", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "15", name: "Copy Landing de Replay", subs: [
        { id: "15.1", name: "Redactar copy completo de la página de replay", s: ["javi","javi","javi","copy"] },
      ]},
      { id: "16", name: "Copy Landing Agendar Entrevista", subs: [
        { id: "16.1", name: "Redactar copy de la página para agendar entrevista", s: ["javi","javi","javi","copy"] },
      ]},
      { id: "17", name: "Copy Landing de Ventas", subs: [
        { id: "17.1", name: "Redactar headline y promesa principal", s: ["javi","javi","javi","javi"] },
        { id: "17.2", name: "Redactar sección de dolor/problema", s: ["javi","javi","javi","copy"] },
        { id: "17.3", name: "Redactar sección de solución/transformación", s: ["javi","javi","javi","copy"] },
        { id: "17.4", name: "Redactar descripción de módulos y contenido", s: ["javi","javi","javi","copy"] },
        { id: "17.5", name: "Redactar sección de bonus", s: ["javi","javi","javi","copy"] },
        { id: "17.6", name: "Redactar sección de testimonios", s: ["javi","javi","javi","copy"] },
        { id: "17.7", name: "Redactar FAQs", s: ["javi","javi","javi","copy"] },
        { id: "17.8", name: "Redactar sección de precio y CTAs", s: ["javi","javi","javi","javi"] },
        { id: "17.9", name: "Entregar a Nico para maquetación", s: ["javi","pm","pm","pm"] },
      ]},
    ]
  },
  {
    name: "RECOPILACIÓN DE MATERIALES",
    tasks: [
      { id: "18", name: "Recopilación fotos de la experta", subs: [
        { id: "18.1", name: "Solicitar fotos profesionales a la experta", s: ["javi","av","av","av"] },
        { id: "18.2", name: "Seleccionar y organizar por uso", s: ["javi","av","av","av"] },
        { id: "18.3", name: "Entregar a Laura para edición", s: ["javi","av","av","av"] },
      ]},
      { id: "19", name: "Recopilación testimonios", subs: [
        { id: "19.1", name: "Solicitar testimonios de alumnos anteriores", s: ["javi","av","av","av"] },
        { id: "19.2", name: "Seleccionar los más potentes por tipo", s: ["javi","javi","javi","javi"] },
        { id: "19.3", name: "Transcribir o editar los que sean en vídeo", s: ["javi","av","av","av"] },
        { id: "19.4", name: "Organizar en carpeta de Drive", s: ["javi","av","av","av"] },
      ]},
      { id: "20", name: "Recopilación fotos y descripciones de otros profesores", subs: [
        { id: "20.1", name: "Solicitar bios y fotos a los profesores invitados", s: ["laura","av","av","av"] },
        { id: "20.2", name: "Revisar y organizar el material recibido", s: ["laura","av","av","av"] },
        { id: "20.3", name: "Entregar para diseño", s: ["laura","av","av","av"] },
      ]},
    ]
  },
  {
    name: "CONFIGURACIÓN TÉCNICA",
    tasks: [
      { id: "21", name: "Revisión y aprobación de landings", subs: [
        { id: "21.1", name: "Revisar maquetación de landing de captación", s: ["javi","javi","javi","javi"] },
        { id: "21.2", name: "Revisar landing de gracias", s: ["javi","pm","pm","pm"] },
        { id: "21.3", name: "Revisar landing de replay", s: ["javi","pm","pm","pm"] },
        { id: "21.4", name: "Revisar landing de agendar entrevista", s: ["javi","pm","pm","pm"] },
        { id: "21.5", name: "Revisar landing de ventas", s: ["javi","javi","javi","javi"] },
        { id: "21.6", name: "Aprobar todas antes de publicar", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "22", name: "Test A/B", subs: [
        { id: "22.1", name: "Definir qué variantes se testean", s: ["javi","javi","javi","javi"] },
        { id: "22.2", name: "Revisar resultados", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "22.3", name: "Decidir variante ganadora", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "23", name: "Configuración herramienta WhatsApp", subs: [
        { id: "23.1", name: "Investigar opciones de herramienta", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "23.2", name: "Contratar la herramienta", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "23.3", name: "Configurar flujos de mensajes automatizados", s: ["laura","tecnico","tecnico","tecnico"] },
      ]},
      { id: "24", name: "Validación de Hotmart", subs: [
        { id: "24.1", name: "Validar configuración del producto", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "24.2", name: "Revisar enlaces y precios correctos", s: ["javi","pm","pm","pm"] },
        { id: "24.3", name: "Verificar enlaces de pago por país/cuota", s: ["javi","av","av","av"] },
      ]},
      { id: "25", name: "Validación de Streamyard", subs: [
        { id: "25.1", name: "Verificar que Streamyard esté configurado", s: ["tecnico","tecnico","tecnico","tecnico"] },
        { id: "25.2", name: "Hacer prueba técnica antes del directo", s: ["tecnico","tecnico","tecnico","tecnico"] },
      ]},
      { id: "26", name: "Validación de Calendly", subs: [
        { id: "26.1", name: "Revisar disponibilidad y configuración", s: ["tecnico","tecnico","tecnico","tecnico"] },
        { id: "26.2", name: "Verificar que el enlace funcione desde la landing", s: ["tecnico","tecnico","tecnico","tecnico"] },
      ]},
    ]
  },
  {
    name: "TRÁFICO Y AUDIENCIAS",
    tasks: [
      { id: "27", name: "Directrices de segmentación", subs: [
        { id: "27.1", name: "Dar directrices de audiencias", s: ["javi","javi","javi","javi"] },
        { id: "27.2", name: "Definir estructura de campañas por fase", s: ["javi","trafficker","trafficker","trafficker"] },
        { id: "27.3", name: "Aprobar plan de inversión", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "28", name: "Supervisión de tráfico de pago", subs: [
        { id: "28.1", name: "Revisar métricas diarias (CPL, leads, gasto)", s: ["javi","trafficker","trafficker","trafficker"] },
        { id: "28.2", name: "Decidir ajustes de inversión o creativos", s: ["javi","javi","javi","javi"] },
        { id: "28.3", name: "Coordinar cambios en campañas", s: ["javi","trafficker","trafficker","trafficker"] },
      ]},
      { id: "29", name: "Tracking diario de métricas", subs: [
        { id: "29.1", name: "Revisar cuadro de mandos cada día", s: ["javi","pm","pm","pm"] },
        { id: "29.2", name: "Actualizar plantilla de captación", s: ["tecnico","tecnico","tecnico","tecnico"] },
        { id: "29.3", name: "Reportar al equipo el estado del lanzamiento", s: ["javi","pm","pm","pm"] },
      ]},
    ]
  },
  {
    name: "EVENTO Y CONTENIDO EN VIVO",
    tasks: [
      { id: "30", name: "Definir directos de calentamiento", subs: [
        { id: "30.1", name: "Planificar los 3 directos con la experta", s: ["javi","javi","javi","javi"] },
        { id: "30.2", name: "Preparar guiones o esquemas", s: ["javi","javi","javi","javi"] },
        { id: "30.3", name: "Definir los CTAs de cada directo", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "31", name: "Preparación de la masterclass", subs: [
        { id: "31.1", name: "Coordinar con la experta el contenido", s: ["javi","javi","javi","javi"] },
        { id: "31.2", name: "Definir estructura (contenido + oferta + cierre)", s: ["javi","javi","javi","javi"] },
        { id: "31.3", name: "Preparar diapositivas o materiales de apoyo", s: ["javi","av","av","av"] },
      ]},
      { id: "32", name: "Repesca", subs: [
        { id: "32.1", name: "Identificar leads anteriores que no compraron", s: ["javi","av","av","av"] },
        { id: "32.2", name: "Coordinar con la experta mensajes personalizados", s: ["javi","javi","javi","javi"] },
        { id: "32.3", name: "Ejecutar campaña de repesca", s: ["javi","pm","pm","pm"] },
      ]},
      { id: "33", name: "Supervisión de Manychat", subs: [
        { id: "33.1", name: "Revisar flujos automatizados", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "33.2", name: "Validar mensajes antes de activar", s: ["javi","pm","pm","pm"] },
      ]},
      { id: "34", name: "Creación grupo de alumnos de WhatsApp", subs: [
        { id: "34.1", name: "Crear el grupo", s: ["javi","av","av","av"] },
        { id: "34.2", name: "Configurar las reglas", s: ["javi","av","av","av"] },
        { id: "34.3", name: "Preparar mensaje de bienvenida", s: ["javi","av","av","av"] },
      ]},
    ]
  },
  {
    name: "DISEÑO Y EDICIÓN",
    tasks: [
      { id: "35", name: "Briefing y aprobación de creativos", subs: [
        { id: "35.1", name: "Dar briefing creativo a Laura", s: ["javi","javi","javi","javi"] },
        { id: "35.2", name: "Revisar diseños/vídeos de captación", s: ["javi","pm","pm","pm"] },
        { id: "35.3", name: "Revisar diseños de calentamiento/hype", s: ["javi","pm","pm","pm"] },
        { id: "35.4", name: "Revisar diseños de ventas", s: ["javi","javi","javi","javi"] },
        { id: "35.5", name: "Aprobar creativos finales", s: ["javi","javi","javi","javi"] },
      ]},
      { id: "36", name: "Supervisión de contenido orgánico", subs: [
        { id: "36.1", name: "Dar directrices de temas a la experta", s: ["javi","javi","javi","javi"] },
        { id: "36.2", name: "Revisar contenidos antes de publicar", s: ["javi","pm","pm","pm"] },
      ]},
    ]
  },
  {
    name: "VENTAS Y EQUIPO COMERCIAL",
    tasks: [
      { id: "37", name: "Definir estrategia comercial", subs: [
        { id: "37.1", name: "Decidir modelo de venta", s: ["javi","javi","javi","javi"] },
        { id: "37.2", name: "Definir script de ventas", s: ["javi","javi","dircom","dircom"] },
        { id: "37.3", name: "Establecer criterios de cualificación de leads", s: ["javi","javi","dircom","dircom"] },
      ]},
      { id: "38", name: "Contratación del equipo de closers", subs: [
        { id: "38.1", name: "Publicar oferta o contactar closers freelance", s: ["javi","javi","dircom","dircom"] },
        { id: "38.2", name: "Hacer entrevistas de selección", s: ["javi","javi","dircom","dircom"] },
        { id: "38.3", name: "Negociar condiciones y comisiones", s: ["javi","javi","dircom","dircom"] },
        { id: "38.4", name: "Firmar acuerdos", s: ["javi","javi","dircom","dircom"] },
      ]},
      { id: "39", name: "Entrenamiento del equipo comercial", subs: [
        { id: "39.1", name: "Preparar material de formación", s: ["javi","javi","dircom","dircom"] },
        { id: "39.2", name: "Dar sesión de training", s: ["javi","javi","dircom","dircom"] },
        { id: "39.3", name: "Hacer role-plays de práctica", s: ["javi","javi","dircom","dircom"] },
        { id: "39.4", name: "Resolver dudas antes del inicio", s: ["javi","javi","dircom","dircom"] },
      ]},
      { id: "40", name: "Preparar sistema de asignación de llamadas", subs: [
        { id: "40.1", name: "Configurar Calendly con slots de cada closer", s: ["tecnico","tecnico","tecnico","tecnico"] },
        { id: "40.2", name: "Crear sistema de reparto de leads", s: ["javi","javi","dircom","dircom"] },
        { id: "40.3", name: "Vincular con la landing de agendar entrevista", s: ["tecnico","tecnico","tecnico","tecnico"] },
      ]},
      { id: "41", name: "Gestión diaria del calendario de llamadas", subs: [
        { id: "41.1", name: "Revisar que los slots estén cubiertos", s: ["javi","javi","dircom","dircom"] },
        { id: "41.2", name: "Reasignar llamadas si un closer no puede", s: ["javi","javi","dircom","dircom"] },
        { id: "41.3", name: "Gestionar cancelaciones y reagendamientos", s: ["javi","av","dircom","dircom"] },
      ]},
      { id: "42", name: "Supervisión de llamadas", subs: [
        { id: "42.1", name: "Escuchar grabaciones de llamadas", s: ["javi","javi","dircom","dircom"] },
        { id: "42.2", name: "Dar feedback individual a cada closer", s: ["javi","javi","dircom","dircom"] },
        { id: "42.3", name: "Detectar patrones de objeciones no resueltas", s: ["javi","javi","dircom","dircom"] },
        { id: "42.4", name: "Ajustar script si es necesario", s: ["javi","javi","dircom","dircom"] },
      ]},
      { id: "43", name: "Seguimiento de ventas y pipeline", subs: [
        { id: "43.1", name: "Actualizar CRM o hoja de seguimiento", s: ["javi","av","dircom","dircom"] },
        { id: "43.2", name: "Reportar métricas diarias", s: ["javi","pm","dircom","dircom"] },
        { id: "43.3", name: "Compartir reporte con el equipo", s: ["javi","pm","dircom","dircom"] },
      ]},
      { id: "44", name: "Seguimiento post-llamada", subs: [
        { id: "44.1", name: "Enviar mensajes de seguimiento a leads que no cerraron", s: ["javi","javi","dircom","dircom"] },
        { id: "44.2", name: "Coordinar con closers los re-follows", s: ["javi","javi","dircom","dircom"] },
        { id: "44.3", name: "Gestionar los 'lo estoy pensando'", s: ["javi","javi","dircom","dircom"] },
      ]},
      { id: "45", name: "Javi como closer", subs: [
        { id: "45.1", name: "Realizar llamadas de venta directas", s: ["javi","javi","dircom","dircom"] },
        { id: "45.2", name: "Atender leads de alto valor o casos difíciles", s: ["javi","javi","javi","javi"] },
        { id: "45.3", name: "Cerrar ventas que los closers no consiguen", s: ["javi","javi","dircom","dircom"] },
      ]},
      { id: "46", name: "Gestión de cobros y fraccionamientos", subs: [
        { id: "46.1", name: "Resolver incidencias de pago", s: ["javi","av","dircom","dircom"] },
        { id: "46.2", name: "Coordinar con Nico enlaces de pago especiales", s: ["javi","tecnico","tecnico","tecnico"] },
        { id: "46.3", name: "Seguimiento de impagos", s: ["javi","av","dircom","dircom"] },
      ]},
      { id: "47", name: "Cierre de carrito y últimas acciones", subs: [
        { id: "47.1", name: "Llamadas de último día a leads calientes", s: ["javi","javi","dircom","dircom"] },
        { id: "47.2", name: "Mensajes de urgencia personalizados", s: ["javi","javi","dircom","dircom"] },
        { id: "47.3", name: "Coordinar el cierre real con el equipo", s: ["javi","pm","dircom","dircom"] },
      ]},
    ]
  },
];

function Badge({ role }) {
  const r = ROLES[role];
  if (!r) return null;
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: 600,
      color: r.color,
      background: r.bg,
      border: `1px solid ${r.color}20`,
      whiteSpace: "nowrap",
    }}>
      {r.label}
    </span>
  );
}

function computeStats(scenarioIdx) {
  const counts = {};
  let total = 0;
  BLOCKS.forEach(b => b.tasks.forEach(t => t.subs.forEach(sub => {
    const role = sub.s[scenarioIdx];
    counts[role] = (counts[role] || 0) + 1;
    total++;
  })));
  return { counts, total };
}

export default function App() {
  const [scenario, setScenario] = useState(0);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [compareMode, setCompareMode] = useState(false);
  const [compareWith, setCompareWith] = useState(0);

  const stats = useMemo(() => computeStats(scenario), [scenario]);
  const compareStats = useMemo(() => compareMode ? computeStats(compareWith) : null, [compareMode, compareWith]);

  const toggleBlock = (idx) => {
    setExpandedBlocks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const expandAll = () => {
    const all = {};
    BLOCKS.forEach((_, i) => all[i] = true);
    setExpandedBlocks(all);
  };

  const collapseAll = () => setExpandedBlocks({});

  const javiCount = stats.counts["javi"] || 0;
  const javiPct = Math.round((javiCount / stats.total) * 100);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: 900, margin: "0 auto", padding: "16px", color: "#1a1a2e" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1B3A5C", margin: 0, letterSpacing: "-0.5px" }}>
          PROPUESTA DE DELEGACIÓN
        </h1>
        <p style={{ fontSize: 13, color: "#666", margin: "4px 0 0" }}>Modelo ORIGEN — 4 escenarios de equipo</p>
      </div>

      {/* Scenario selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenario(s.id)}
            style={{
              flex: 1,
              minWidth: 100,
              padding: "10px 8px",
              border: scenario === s.id ? "2px solid #1B3A5C" : "1px solid #ddd",
              borderRadius: 8,
              background: scenario === s.id ? "#1B3A5C" : "#fff",
              color: scenario === s.id ? "#fff" : "#333",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: scenario === s.id ? 700 : 500,
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: 10, opacity: 0.7 }}>Escenario {s.id}</div>
            <div>{s.name}</div>
          </button>
        ))}
      </div>

      {/* Description */}
      <div style={{ background: "#f0f4f8", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#444", borderLeft: "4px solid #2E75B6" }}>
        {SCENARIOS[scenario].desc}
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 120, background: javiPct > 70 ? "#FEE2E2" : javiPct > 40 ? "#FEF3C7" : "#D1FAE5", borderRadius: 8, padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: javiPct > 70 ? "#B91C1C" : javiPct > 40 ? "#92400E" : "#065F46" }}>{javiPct}%</div>
          <div style={{ fontSize: 11, color: "#666" }}>Carga de Javi</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#444" }}>{javiCount} de {stats.total} subtareas</div>
        </div>
        {Object.entries(stats.counts).filter(([k]) => k !== "javi").sort((a,b) => b[1] - a[1]).map(([role, count]) => (
          <div key={role} style={{ flex: 1, minWidth: 90, background: ROLES[role]?.bg || "#f5f5f5", borderRadius: 8, padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: ROLES[role]?.color || "#333" }}>{count}</div>
            <div style={{ fontSize: 10, color: "#666" }}>{ROLES[role]?.label || role}</div>
          </div>
        ))}
      </div>

      {/* Compare toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <label style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={compareMode} onChange={e => setCompareMode(e.target.checked)} />
          Comparar con otro escenario
        </label>
        {compareMode && (
          <select value={compareWith} onChange={e => setCompareWith(Number(e.target.value))} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}>
            {SCENARIOS.filter(s => s.id !== scenario).map(s => (
              <option key={s.id} value={s.id}>Escenario {s.id}: {s.name}</option>
            ))}
          </select>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={expandAll} style={{ fontSize: 11, padding: "4px 10px", border: "1px solid #ccc", borderRadius: 4, background: "#fff", cursor: "pointer" }}>Expandir todo</button>
          <button onClick={collapseAll} style={{ fontSize: 11, padding: "4px 10px", border: "1px solid #ccc", borderRadius: 4, background: "#fff", cursor: "pointer" }}>Colapsar</button>
        </div>
      </div>

      {/* Task blocks */}
      {BLOCKS.map((block, bi) => {
        const isExpanded = expandedBlocks[bi];
        const blockJavi = block.tasks.reduce((sum, t) => sum + t.subs.filter(s => s.s[scenario] === "javi").length, 0);
        const blockTotal = block.tasks.reduce((sum, t) => sum + t.subs.length, 0);
        return (
          <div key={bi} style={{ marginBottom: 8, border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
            <div
              onClick={() => toggleBlock(bi)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
                background: "#1B3A5C", color: "#fff", cursor: "pointer", userSelect: "none",
              }}
            >
              <span style={{ fontSize: 11, opacity: 0.6, transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
              <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{block.name}</span>
              <span style={{ fontSize: 11, background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 4 }}>
                Javi: {blockJavi}/{blockTotal}
              </span>
            </div>
            {isExpanded && (
              <div style={{ background: "#fff" }}>
                {block.tasks.map(task => (
                  <div key={task.id}>
                    <div style={{ display: "flex", alignItems: "center", padding: "8px 14px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                      <span style={{ width: 36, fontSize: 12, fontWeight: 700, color: "#2E75B6" }}>{task.id}</span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{task.name}</span>
                    </div>
                    {task.subs.map(sub => {
                      const currentRole = sub.s[scenario];
                      const changed = compareMode && sub.s[compareWith] !== currentRole;
                      return (
                        <div
                          key={sub.id}
                          style={{
                            display: "flex", alignItems: "center", padding: "6px 14px 6px 28px",
                            borderBottom: "1px solid #f0f0f0",
                            background: changed ? "#FFFBEB" : "transparent",
                          }}
                        >
                          <span style={{ width: 40, fontSize: 11, color: "#999" }}>{sub.id}</span>
                          <span style={{ flex: 1, fontSize: 12, color: "#444" }}>{sub.name}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 150, justifyContent: "flex-end" }}>
                            {compareMode && changed && (
                              <>
                                <Badge role={sub.s[compareWith]} />
                                <span style={{ fontSize: 12, color: "#999" }}>→</span>
                              </>
                            )}
                            <Badge role={currentRole} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer legend */}
      <div style={{ marginTop: 20, padding: "14px 16px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#1B3A5C", marginBottom: 8 }}>Perfiles del equipo</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(ROLES).map(([key, r]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Badge role={key} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
