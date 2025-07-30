# 🚀 Quick Setup - Sistema de Examen Virtual

## ✅ Checklist de Configuración Rápida

### 1. Google Sheets (10 minutos)
- [ ] Abrir [tu Google Sheets](https://docs.google.com/spreadsheets/d/1XCqrvg_y46-OUZSrKe-UraS1KckndqzZDtVqXFHT6W8/edit)
- [ ] Importar datos del archivo `google-sheets-template.csv`
- [ ] Agregar tus propias preguntas siguiendo el formato
- [ ] Verificar que la columna `activa` esté en TRUE para preguntas a usar

### 2. Google Apps Script (15 minutos)
- [ ] Ir a [Google Apps Script](https://script.google.com/)
- [ ] Crear nuevo proyecto
- [ ] Copiar código de `google-apps-script.js`
- [ ] Ejecutar función `crearHojaResultados()`
- [ ] Desplegar como Web App (acceso: cualquier persona)
- [ ] **Copiar URL generada** → `https://script.google.com/macros/s/.../exec`

### 3. n8n Setup (20 minutos)
- [ ] Importar `n8n-exam-workflow.json` en n8n
- [ ] Configurar credenciales:
  - [ ] Google Sheets OAuth2
  - [ ] OpenAI API Key
  - [ ] SMTP Email
- [ ] Activar workflow
- [ ] **Copiar URL del webhook** → `https://tu-n8n.app.n8n.cloud/webhook/examen`

### 4. Actualizar Formulario (5 minutos)
- [ ] Editar `index.html`:
  - [ ] Línea 10: URL del webhook de n8n
  - [ ] Línea 26: URL de Google Apps Script
- [ ] Subir a GitHub Pages o tu hosting

### 5. Pruebas (10 minutos)
- [ ] Probar Google Apps Script: ejecutar `testFunction()`
- [ ] Completar formulario con datos de prueba
- [ ] Verificar email recibido
- [ ] Revisar datos en hoja "Resultados"

## 🔧 URLs que necesitas actualizar:

```html
<!-- En index.html línea 10 -->
<form action="TU_WEBHOOK_DE_N8N_AQUÍ" method="POST">

<!-- En index.html línea 26 -->
fetch("TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUÍ")
```

## 📧 Configuración SMTP Rápida

### Gmail (Recomendado para pruebas)
- Host: `smtp.gmail.com`
- Puerto: `587`
- Usuario: tu email de Gmail
- Contraseña: App Password (no tu contraseña normal)

### SendGrid (Recomendado para producción)
- Host: `smtp.sendgrid.net`
- Puerto: `587`
- Usuario: `apikey`
- Contraseña: Tu SendGrid API Key

## 🤖 OpenAI Setup
1. Ir a [OpenAI Platform](https://platform.openai.com/)
2. Crear API Key
3. Agregar créditos a tu cuenta
4. Usar en n8n

## ⚡ Configuración Express (30 minutos total)

Si tienes prisa, usa esta configuración mínima:

1. **Google Sheets**: Usa el template CSV tal como está
2. **Apps Script**: Copia y despliega sin modificaciones  
3. **n8n**: Importa workflow y configura solo las 3 credenciales básicas
4. **Formulario**: Actualiza solo las 2 URLs
5. **Prueba**: Un examen de prueba con 2-3 preguntas

## 🎯 Resultados Esperados

Después de la configuración completa:

- ✅ Formulario web funcional con 100 preguntas
- ✅ Calificación automática con IA
- ✅ Email con resultados detallados
- ✅ Base de datos de resultados en Google Sheets
- ✅ Sistema escalable para 100+ estudiantes

## 🆘 Problemas Comunes

**Error más común**: URLs incorrectas
- Verifica que las URLs no tengan espacios
- Asegúrate de usar HTTPS
- Confirma que los servicios estén activos

**Si algo no funciona**:
1. Revisa los logs de n8n
2. Verifica las credenciales
3. Prueba cada componente por separado

---

**¡Listo en 1 hora!** ⏰

Tu sistema de examen virtual estará funcionando completamente.