import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Input } from "semantic-ui-react";

export const CityCard = ({ countryList }) => {
  const [cities, setCities] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  useEffect(getCities, []);

  async function getCities() {
    const citiesURL = "https://docs.openaq.org/v2/cities";

    const response = await fetch(citiesURL);
    const data = await response.json();
    setCities(data.results);
  }

  const countryHandler = (event) => {
    let doesExist = false;
    const input = event.target.value;
    const countryFilter = countryList.filter(
      (country) => country.name === input
    );
    if (countryFilter.length === 1) {
      doesExist = input === countryFilter[0].name;
    }
    if (doesExist) {
      const varCountryCode = countryList.filter(
        (country) => country.name === input
      )[0].code;
      console.log(`Country Set to: ${input}\nCountry Code: ${varCountryCode}`);
      setCountryCode(varCountryCode);
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader>
          {/* Country Dropdown */}
          <Input
            size="large"
            list="countries"
            placeholder="Choose a Country"
            onChange={countryHandler}
          />
          <datalist id="countries">
            {countryList.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </datalist>
          {/* City Dropdown */}
        </CardHeader>
      </CardContent>
    </Card>
  );
};
