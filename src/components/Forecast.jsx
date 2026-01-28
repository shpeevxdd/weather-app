import { useEffect, useState } from "react";
import { apiKey } from "./common/constants";
import { Box } from "@mui/material";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const Forecast = ({ query }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (!query) return;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`)
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

  const filtered = [];

  if(weather){
    for(let i = 0; i < weather.list.length; i++) {
      const item = weather.list[i];

      if(filtered.length === 5) break;

      if(item.dt_txt.includes("12:00:00")) {
        filtered.push(item);
      }
    }
  }

  return (
    <>
      {error && error}
      <Box sx={{display: "flex", gap: 3, justifyContent: "space-evenly", flexWrap: "wrap", border: "1px solid white", background: "lightblue", marginTop: "25px"}}>
        {filtered.map((item, index) => (
          <Box key={index}>
            <p>{new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}</p>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
              <p>
                {item.main.temp} °C
              </p>
              <DeviceThermostatIcon/>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
              <p>{item.weather[0].description}</p>
            </div>
          </Box>
        ))}
      </Box>
    </>
  )

}

export default Forecast