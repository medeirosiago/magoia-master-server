import formatTimestamp from "./formatTimestamp";

// Função para converter a string do sensor.time ("YYYY-MM-DD, HH:mm")
// em um objeto Date (supondo que esse horário esteja em tempo local)
const parseClockTime = (clockStr) => {
  // Transforma "2025-02-02, 17:07" em "2025-02-02T17:07:00"
  const isoStr = clockStr.replace(", ", "T") + ":00";
  return new Date(isoStr);
};

/**
 * weatherConfigs recebe um objeto com:
 * - attributes: contendo os dados do weatherEntity (por exemplo, temperature, sun_next_rising, sun_next_setting, etc.)
 * - dateTime: string do sensor.time, por exemplo, "2025-02-02, 17:07"
 *
 * Retorna um objeto com configurações importantes,
 * incluindo a temperatura, se está de dia ("sun") ou de noite ("moon"),
 * a previsão de hoje e outros dados relevantes.
 */
export const weatherConfigs = ({ attributes, dateTime, forecast }) => {
  // Converte o sensor.time para Date
  const currentTime = parseClockTime(dateTime);

  // Converte os horários de nascer e pôr do sol fornecidos (estão em ISO com timezone)
  const nextSunrise = new Date(attributes.sun_next_rising);
  const nextSunset = new Date(attributes.sun_next_setting);

  // Para determinar se está de dia ou de noite, precisamos saber o nascer e o pôr do sol de "hoje".
  // Como os atributos sempre trazem o "próximo" evento:
  // - Se o próximo nascer do sol tiver a mesma data de currentTime, usamos-o; 
  // - Caso contrário, assumimos que o nascer de hoje ocorreu 1 dia antes.
  let todaySunrise;
  if (currentTime.toDateString() === nextSunrise.toDateString()) {
    todaySunrise = nextSunrise;
  } else {
    todaySunrise = new Date(nextSunrise);
    todaySunrise.setDate(todaySunrise.getDate() - 1);
  }

  // Para o pôr do sol, fazemos o mesmo procedimento:
  let todaySunset;
  if (currentTime.toDateString() === nextSunset.toDateString()) {
    todaySunset = nextSunset;
  } else {
    todaySunset = new Date(nextSunset);
    todaySunset.setDate(todaySunset.getDate() - 1);
  }

  // Comparamos currentTime com os horários de nascer e pôr para definir se está "sun" (dia) ou "moon" (noite)
  const astro =
    currentTime >= todaySunrise && currentTime < todaySunset ? "sun" : "moon";

  // Exemplo de cálculo: definindo se o céu está muito nublado (threshold de 70% de cobertura)
  const isCloudy = attributes.cloudcover_percentage >= 70;

  // Retornamos um objeto com os dados que julgamos importantes.
  return {
    temperature: attributes.temperature, // mesmo valor do weatherEntity
    astro, // "sun" ou "moon" calculado com base no horário atual
    todayCastDesc: attributes.deepsky_forecast_today_desc, // descrição da previsão de hoje
    humidity: attributes.humidity,
    windSpeed: attributes.wind_speed,
    cloudCover: attributes.cloudcover_percentage,
    isCloudy, // booleano para indicar se está muito nublado
    // Também formatamos os horários usando nossa função auxiliar:
    nextSunrise: formatTimestamp(attributes.sun_next_rising),
    nextSunset: formatTimestamp(attributes.sun_next_setting),
		forecast,
    // Você pode adicionar outros dados importantes conforme a necessidade
  };
};