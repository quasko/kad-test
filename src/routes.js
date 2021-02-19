export const getWeatherByCityUrl = (city) =>
  `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5ed25e7da27cb984770d7ae938a8566d`;

export const getWeatherByCordsUrl = (lat, lon) =>
  `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5ed25e7da27cb984770d7ae938a8566d`;
