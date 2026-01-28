import { useEffect, useState } from "react";
import { apiKey } from "./common/constants";
import { Box } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';

const WeatherByCity = ({ query }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === "404") {
          setError(data.message);
          setWeather(null);
        } else {
          setWeather(data);
          setError(null);
        }
      })
      .catch(error => setError(error.message));
  }, [query]);


  return (
    <>
      <h1>
        Stan Forecast
        <WbSunnyIcon fontSize="Large"/>
      </h1>

      {error && error}

      {weather && (
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "space-evenly"}}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center"}}>
            <h2>Today</h2>
            <h3>{weather.name}</h3>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <h3>{weather.weather[0].description}</h3>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>{weather.main.temp} °C</span>
              <DeviceThermostatIcon/>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>{weather.wind.speed} m/s</span>
              <AirIcon />
            </Box>
          </Box>
          <Box>
            <iframe
              width="550"
              height="400"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${weather.coord.lon}%2C${weather.coord.lat}%2C${weather.coord.lon}%2C${weather.coord.lat}&layer=mapnik&marker=${weather.coord.lat}%2C${weather.coord.lon}`}
            ></iframe>
          </Box>

        </Box>

      )}
    </>
  )
}

export default WeatherByCity;