/**
 * Google Apps Script para servir preguntas del examen
 * Este script debe desplegarse en Google Apps Script y conectarse a tu Google Sheets
 */

function doGet() {
  try {
    // ID de tu Google Sheets (extraído del URL que proporcionaste)
    const SHEET_ID = '1XCqrvg_y46-OUZSrKe-UraS1KckndqzZDtVqXFHT6W8';
    
    // Abrir el spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName('Hoja 1'); // Ajusta el nombre si es diferente
    
    // Obtener todos los datos
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    // Convertir a objetos JSON
    const preguntas = rows.map(row => {
      const pregunta = {};
      headers.forEach((header, index) => {
        pregunta[header] = row[index];
      });
      return pregunta;
    });
    
    // Filtrar solo preguntas activas y mezclar aleatoriamente
    const preguntasActivas = preguntas.filter(p => p.activa === true || p.activa === 'TRUE' || p.activa === 1);
    
    // Separar preguntas múltiples y abiertas
    const preguntasMultiples = preguntasActivas.filter(p => p.tipo === 'multiple');
    const preguntasAbiertas = preguntasActivas.filter(p => p.tipo === 'abierta');
    
    // Seleccionar 50 de cada tipo aleatoriamente
    const multiplesSeleccionadas = seleccionarAleatoriamente(preguntasMultiples, 50);
    const abiertasSeleccionadas = seleccionarAleatoriamente(preguntasAbiertas, 50);
    
    // Combinar y mezclar
    const preguntasFinales = [...multiplesSeleccionadas, ...abiertasSeleccionadas];
    mezclarArray(preguntasFinales);
    
    // Reasignar IDs secuenciales para el examen
    preguntasFinales.forEach((pregunta, index) => {
      pregunta.id = index + 1;
    });
    
    // Configurar respuesta CORS
    const output = ContentService.createTextOutput(JSON.stringify(preguntasFinales));
    output.setMimeType(ContentService.MimeType.JSON);
    
    return output;
    
  } catch (error) {
    console.error('Error en doGet:', error);
    const errorResponse = {
      error: 'Error al cargar preguntas',
      message: error.toString()
    };
    
    const output = ContentService.createTextOutput(JSON.stringify(errorResponse));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  }
}

/**
 * Función para seleccionar elementos aleatoriamente de un array
 */
function seleccionarAleatoriamente(array, cantidad) {
  const shuffled = [...array];
  mezclarArray(shuffled);
  return shuffled.slice(0, Math.min(cantidad, shuffled.length));
}

/**
 * Función para mezclar un array (Fisher-Yates shuffle)
 */
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Función de prueba para verificar que todo funciona
 */
function testFunction() {
  const result = doGet();
  console.log(result.getContent());
}

/**
 * Función para crear la hoja de resultados si no existe
 */
function crearHojaResultados() {
  try {
    const SHEET_ID = '1XCqrvg_y46-OUZSrKe-UraS1KckndqzZDtVqXFHT6W8';
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Verificar si la hoja "Resultados" ya existe
    let hojaResultados = spreadsheet.getSheetByName('Resultados');
    
    if (!hojaResultados) {
      // Crear la hoja de resultados
      hojaResultados = spreadsheet.insertSheet('Resultados');
      
      // Agregar encabezados
      const encabezados = [
        'Nombre',
        'Email', 
        'Nota',
        'Porcentaje',
        'Puntaje Total',
        'Puntaje Máximo',
        'Múltiples Correctas',
        'Puntaje Abiertas',
        'Fecha Evaluación'
      ];
      
      hojaResultados.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);
      
      // Formatear encabezados
      const headerRange = hojaResultados.getRange(1, 1, 1, encabezados.length);
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      
      console.log('Hoja de Resultados creada exitosamente');
    } else {
      console.log('La hoja de Resultados ya existe');
    }
    
  } catch (error) {
    console.error('Error creando hoja de resultados:', error);
  }
}