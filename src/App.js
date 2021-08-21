import React, { useEffect, useState } from "react";

export const App = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => getCountries(), []);

  async function getCountries() {
    const countryURL = "https://docs.openaq.org/v2/countries";

    const response = await fetch(countryURL);
    const data = await response.json();
    setCountries(data.results);
  }

  console.log(countries);

  return (
    <div>
      {countries.map((country) => (
        <p>{country.name}</p>
      ))}
    </div>
  );
};
