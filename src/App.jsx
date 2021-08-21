import React, { useEffect, useState } from "react";
import { Card, CardContent } from "semantic-ui-react";

export const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => getCountries(), []);

  async function getCountries() {
    const countryURL = "https://docs.openaq.org/v2/countries";

    const response = await fetch(countryURL);
    const data = await response.json();
    setCountries(data.results);
  }

  return (
    <>
      {countries.map((country) => (
        <Card key={country.code}>
          <CardContent>{country.name}</CardContent>
        </Card>
      ))}
    </>
  );
};
