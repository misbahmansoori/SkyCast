import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import ForecastBox from "./ForecastBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const getWeatherInfo = async (query) => {
    try {
      const API_KEY = "056d94f3cc8b5f80b4e79ee295cc015c";
      let url = "";

      if (typeof query === "string") {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
      } else {
        const { lat, lon } = query;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      }

      const response = await fetch(url);
      const jsonResponse = await response.json();

      if (!jsonResponse.coord) {
        throw new Error("No coordinates found.");
      }

      const { lat, lon } = jsonResponse.coord;

      const result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
        lat,
        lon,
      };

      setWeatherInfo(result);

      // Forecast data
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastJson = await forecastResponse.json();

      setForecastData(forecastJson.list);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch weather info. Try a valid city.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherInfo({ lat: latitude, lon: longitude });
        },
        () => {
          console.warn("Location access denied. Falling back to Delhi.");
          getWeatherInfo("Delhi");
        }
      );
    } else {
      getWeatherInfo("Delhi");
    }
  }, []);

  const handleSearch = (city) => {
    getWeatherInfo(city);
  };

  return (
    <>
      <h2 className="title">SkyCast</h2>
      <p className="subtitle">Your Personal Weather Companion</p>
      <SearchBox handleSearch={handleSearch} />
      {weatherInfo && <InfoBox info={weatherInfo} />}
      {forecastData.length > 0 && <ForecastBox forecastData={forecastData} />}
    </>
  );
}
