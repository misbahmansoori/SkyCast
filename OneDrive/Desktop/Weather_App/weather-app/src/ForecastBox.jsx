import "./ForecastBox.css";

export default function ForecastBox({ forecastData }) {
  const getDay = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Pick only 1 entry per day — typically the one at 12:00:00
  const dailyData = forecastData.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const getWeatherIcon = (main) => {
    const icons = {
      Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
      Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
      Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
      Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
      Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
      Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
      Haze: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
      Smoke: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
      Default: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    };

    return icons[main] || icons["Default"];
  };

  return (
    <div className="forecast-scroll">
      <h3>Next 5 Days Forecast</h3>
      <div className="forecast-scroll-container">
        {dailyData.slice(0, 5).map((day, index) => (
          <div className="forecast-card" key={index}>
            <p>{getDay(day.dt)}</p>
            <img src={getWeatherIcon(day.weather[0].main)} alt="weather icon" />

            <p>{day.weather[0].main}</p>
            <p>Min: {day.main.temp_min}&deg;C</p>
            <p>Max: {day.main.temp_max}&deg;C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
