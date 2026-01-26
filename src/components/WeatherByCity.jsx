import { useEffect, useState } from "react";
import { apiKey } from "./common/constants";
import { TextField } from "@mui/material";

const WeatherByCity = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("London");
  const [query, setQuery] = useState("London");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleQueryKey = (e) => {
    if (search && e.key === "Enter") {
      setQuery(search)
    } 
  }

  useEffect(() => {
    if(!query) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if(data.cod === "404") {
        setError(data.message)
        setWeather(null)
      } else {
        setWeather(data)
        setError(null)
      }
    })
    .catch(error => setError(error.message))
  }, [query])


  return (
    <>
      <TextField onChange={handleSearchInput} onKeyDown={handleQueryKey} value={search} id="outlined-basic" label="Enter City" variant="outlined" />
      {error && error}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.main.temp} C</p>
          <p>{weather.wind.speed} speed</p>
        </div>
      )}
    </>
  )
}

export default WeatherByCity;