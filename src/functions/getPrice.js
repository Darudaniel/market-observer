export const getPrice = async (stock) => {
  try {
    // Realizar la solicitud a la API usando fetch
    const respuesta = await fetch('https://finnhub.io/api/v1/quote?symbol=AAPL&token=clhqgq1r01qh8ugithpgclhqgq1r01qh8ugithq0');
    // Verificar si la solicitud fue exitosa (código de estado 200)
    if (respuesta.ok) {
      // Convertir la respuesta a formato JSON
      const datosJson = await respuesta.json();
      // Extraer el precio de la accion
      const stockPrice = datosJson.c
      
      // Retornar datos
      return stockPrice;
    } else {
      // Manejar errores si la solicitud no fue exitosa
      console.error('Error al obtener datos de la API');
    }
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error('Error de red:', error);
  }
}