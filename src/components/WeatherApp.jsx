import { useState } from "react";
import { TextField } from "@mui/material";
import WeatherByCity from "./WeatherByCity";

const WeatherApp = () => {
  const [search, setSearch] = useState("London");
  const [query, setQuery] = useState("London");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleQueryKey = (e) => {
    if (search && e.key === "Enter") {
      setQuery(search);
    }
  };

  return (
    <>
      <TextField
        value={search}
        onChange={handleSearchInput}
        onKeyDown={handleQueryKey}
        label="Enter City"
        variant="outlined"
      />

      <WeatherByCity query={query} />
    </>
  );
};

export default WeatherApp;
