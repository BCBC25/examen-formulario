# Sistema de Examen Virtual con IA - Guía de Configuración

Este sistema automatiza completamente la calificación de exámenes con 50 preguntas múltiples y 50 preguntas abiertas, utilizando inteligencia artificial para evaluar las respuestas abiertas y enviando los resultados por correo electrónico.

## 🏗️ Arquitectura del Sistema

```
Formulario Web → Google Apps Script → n8n Workflow → OpenAI → Email + Google Sheets
```

1. **Formulario Web**: Recolecta respuestas de estudiantes
2. **Google Apps Script**: Sirve preguntas desde Google Sheets
3. **n8n Workflow**: Procesa respuestas y coordina la calificación
4. **OpenAI**: Califica preguntas abiertas con IA
5. **Resultados**: Envía email y guarda en Google Sheets

## 📋 Requisitos Previos

- [ ] Cuenta de n8n Cloud o instancia self-hosted
- [ ] Cuenta de Google (Google Sheets + Google Apps Script)
- [ ] API Key de OpenAI (GPT-4 recomendado)
- [ ] Servidor SMTP para envío de emails
- [ ] Hosting web para el formulario (GitHub Pages funciona)

## 🚀 Configuración Paso a Paso

### 1. Configurar Google Sheets

#### 1.1 Estructura de la Base de Datos

Tu Google Sheets debe tener las siguientes columnas en la "Hoja 1":

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| `id` | ID único de la pregunta | 1, 2, 3... |
| `pregunta` | Texto de la pregunta | "¿Cuál es la capital de Francia?" |
| `tipo` | Tipo de pregunta | "multiple" o "abierta" |
| `opcionA` | Opción A (solo múltiples) | "París" |
| `opcionB` | Opción B (solo múltiples) | "Londres" |
| `opcionC` | Opción C (solo múltiples) | "Madrid" |
| `opcionD` | Opción D (solo múltiples) | "Roma" |
| `respuestaCorrecta` | Respuesta correcta | "A" o texto completo |
| `criteriosEvaluacion` | Criterios para IA (abiertas) | "Debe mencionar X, Y, Z" |
| `puntos` | Puntos que vale la pregunta | 1, 2, 3... |
| `activa` | Si está activa | TRUE/FALSE |

#### 1.2 Ejemplo de Datos

```
id | pregunta | tipo | opcionA | opcionB | opcionC | opcionD | respuestaCorrecta | criteriosEvaluacion | puntos | activa
1 | ¿Capital de Francia? | multiple | París | Londres | Madrid | Roma | A | | 1 | TRUE
2 | Explica la fotosíntesis | abierta | | | | | Proceso donde las plantas convierten luz solar en energía... | Debe mencionar: luz solar, clorofila, CO2, O2 | 2 | TRUE
```

### 2. Configurar Google Apps Script

#### 2.1 Crear el Script

1. Ve a [Google Apps Script](https://script.google.com/)
2. Crea un nuevo proyecto
3. Copia el contenido de `google-apps-script.js`
4. Guarda el proyecto con un nombre descriptivo

#### 2.2 Desplegar como Web App

1. En Apps Script, ve a **Desplegar** > **Nueva implementación**
2. Selecciona tipo: **Aplicación web**
3. Configuración:
   - **Ejecutar como**: Tu cuenta
   - **Acceso**: Cualquier persona
4. Copia la URL generada (necesaria para el formulario)

#### 2.3 Crear Hoja de Resultados

Ejecuta la función `crearHojaResultados()` en Apps Script para crear automáticamente la hoja donde se guardarán los resultados.

### 3. Configurar n8n

#### 3.1 Importar el Workflow

1. En n8n, ve a **Workflows** > **Import from File**
2. Sube el archivo `n8n-exam-workflow.json`
3. El workflow se importará con todos los nodos configurados

#### 3.2 Configurar Credenciales

**Google Sheets OAuth2:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o usa uno existente
3. Habilita Google Sheets API
4. Crea credenciales OAuth2
5. En n8n: **Credentials** > **Add** > **Google Sheets OAuth2 API**

**OpenAI API:**
1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Genera una API Key
3. En n8n: **Credentials** > **Add** > **OpenAI API**

**SMTP Email:**
1. Configura tu servidor SMTP (Gmail, SendGrid, etc.)
2. En n8n: **Credentials** > **Add** > **SMTP**

#### 3.3 Configurar Nodos

**Webhook:**
- Activar el workflow
- Copiar la URL del webhook (necesaria para el formulario)

**Google Sheets - Preguntas:**
- Verificar que el `documentId` coincida con tu Google Sheets
- Ajustar `sheetName` si es diferente a "Hoja 1"

**OpenAI:**
- Verificar que usa GPT-4 para mejores resultados
- Ajustar `temperature` si necesitas más/menos creatividad

**Email:**
- Configurar `fromEmail` con tu dirección institucional
- Personalizar el template HTML si es necesario

### 4. Actualizar el Formulario Web

#### 4.1 Actualizar URLs

En tu `index.html`, actualiza estas URLs:

```javascript
// URL del Google Apps Script (línea 26)
fetch("TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUÍ")

// URL del webhook de n8n (línea 10)
<form action="TU_URL_DE_WEBHOOK_N8N_AQUÍ" method="POST">
```

#### 4.2 Desplegar el Formulario

Sube tu formulario actualizado a tu hosting (GitHub Pages, Netlify, etc.)

## 🧪 Pruebas del Sistema

### 1. Probar Google Apps Script

```javascript
// En Apps Script, ejecuta:
testFunction();
// Verifica que retorne las preguntas correctamente
```

### 2. Probar n8n Workflow

1. Activa el workflow en n8n
2. Envía una prueba POST al webhook con datos de ejemplo
3. Verifica que todos los nodos se ejecuten correctamente

### 3. Prueba Completa

1. Completa el formulario web con datos de prueba
2. Verifica que llegue el email con los resultados
3. Revisa que los datos se guarden en Google Sheets

## ⚙️ Configuraciones Avanzadas

### Personalizar Criterios de IA

En el nodo "IA - Calificar Abiertas", puedes ajustar el prompt del sistema:

```javascript
// Ejemplo de prompt más específico para matemáticas:
"Eres un profesor de matemáticas experto. Evalúa las respuestas considerando:
1. Procedimiento correcto (40%)
2. Resultado final (40%) 
3. Claridad en la explicación (20%)"
```

### Configurar Escalas de Calificación

En el nodo "Calcular Nota Final", ajusta la escala:

```javascript
// Para escala 0-100:
const nota = Math.round(porcentaje);

// Para escala 0-20:
const nota = Math.round(porcentaje / 5);
```

### Personalizar Email Template

El template HTML en el nodo de email es completamente personalizable. Puedes:
- Cambiar colores y estilos
- Agregar logo institucional
- Modificar el formato de presentación de resultados

## 🔧 Solución de Problemas

### Error: "No se pueden cargar preguntas"

1. Verifica que el Google Apps Script esté desplegado correctamente
2. Confirma que la URL en el formulario sea correcta
3. Revisa los permisos del Google Sheets

### Error: "Webhook no responde"

1. Verifica que el workflow esté activo en n8n
2. Confirma que la URL del webhook sea correcta
3. Revisa los logs de n8n para errores específicos

### Error: "IA no califica correctamente"

1. Verifica que la API Key de OpenAI sea válida
2. Confirma que tienes créditos suficientes en OpenAI
3. Revisa que el modelo sea GPT-4 (mejor para calificación)

### Error: "Email no se envía"

1. Verifica las credenciales SMTP
2. Confirma que el servidor SMTP permita el envío
3. Revisa los filtros de spam del destinatario

## 📊 Monitoreo y Analytics

### Logs en n8n

Revisa regularmente los logs de ejecución en n8n:
- **Settings** > **Log Level**: DEBUG para más detalles
- **Executions**: Historial de todas las ejecuciones

### Métricas en Google Sheets

La hoja "Resultados" te permite analizar:
- Promedio de calificaciones
- Distribución de notas
- Preguntas más difíciles
- Tiempo de respuesta del sistema

## 🔒 Seguridad y Privacidad

### Protección de Datos

- Las respuestas se procesan y eliminan de n8n después del procesamiento
- Solo se almacenan resultados finales en Google Sheets
- Los emails contienen solo información necesaria

### Acceso Controlado

- Google Sheets: Solo editores autorizados
- n8n: Acceso solo para administradores
- Webhook: Solo acepta POST requests con estructura específica

## 📞 Soporte

Para problemas técnicos:

1. **Google Apps Script**: [Documentación oficial](https://developers.google.com/apps-script)
2. **n8n**: [Documentación](https://docs.n8n.io/) y [Comunidad](https://community.n8n.io/)
3. **OpenAI**: [Documentación API](https://platform.openai.com/docs)

## 🎯 Próximos Pasos

Una vez configurado el sistema básico, puedes considerar:

- [ ] Implementar autenticación de estudiantes
- [ ] Agregar límite de tiempo al examen
- [ ] Crear dashboard de estadísticas en tiempo real
- [ ] Implementar backup automático de respuestas
- [ ] Agregar notificaciones para profesores

---

**¡Tu sistema de examen virtual con IA está listo!** 🚀

Para 100 estudiantes, el sistema procesará automáticamente todas las respuestas, calificará con IA las preguntas abiertas, y enviará los resultados por email en minutos.