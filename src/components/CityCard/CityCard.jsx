import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Input,
  Segment,
} from "semantic-ui-react";
import { MeasureCard } from "../MeasureCard/MeasureCard";

export const CityCard = ({ countryList, id }) => {
  const [i, setI] = useState(0);
  const [cities, setCities] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [measurements, setMeasurements] = useState();

  console.log(id);

  async function getCities(code) {
    const citiesURL = `https://docs.openaq.org/v2/cities?limit=10000&sort=asc&country=${code}&order_by=city`;

    console.log(citiesURL);

    const response = await fetch(citiesURL);
    const data = await response.json();
    setCities([...data.results]);

    setI(i + 1);

    // console.log(data.results);
  }

  async function getMeasurements(country, city) {
    const measurementsURL = `https://docs.openaq.org/v2/measurements?date_from=2000-01-01&date_to=2021-08-22&limit=50&sort=desc&radius=1000&sort=desc&radius=1000&country=${country}&city=${city}&order_by=datetime`;

    const response = await fetch(measurementsURL);
    const data = await response.json();
    await setMeasurements(data.results);
  }

  const countryHandler = (event) => {
    let doesExist = false;
    const countryInput = event.target.value;
    const countryFilter = countryList.filter(
      (country) => country.name === countryInput
    );
    if (countryFilter.length === 1) {
      doesExist =
        countryInput.toLowerCase() === countryFilter[0].name.toLowerCase();
    }
    if (doesExist) {
      const varCountryCode = countryList.filter(
        (country) => country.name === countryInput
      )[0].code;
      console.log(
        `Country Set to: ${countryInput}\nCountry Code: ${varCountryCode}`
      );
      setCountryCode(varCountryCode);
      getCities(varCountryCode);
    }
  };

  const cityHandler = (event) => {
    let doesExist = false;
    const cityInput = event.target.value;
    const cityFilter = cities.filter((city) => city.city === cityInput);
    if (cityFilter.length === 1) {
      doesExist = cityInput.toLowerCase() === cityFilter[0].city.toLowerCase();
    }
    if (doesExist) {
      console.log(`City Selected: ${cityInput}`);
      setSelectedCity(cityInput);
      getMeasurements(countryCode, cityInput);
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader>
          {/* Country Dropdown */}
          <Input
            size="large"
            list={"countries" + id}
            placeholder="Choose a Country"
            onChange={countryHandler}
          />
          <datalist id={"countries" + id}>
            {countryList.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </datalist>
          {/* City Dropdown */}
          {countryCode.length === 2 && (
            <>
              <Divider />
              <Input
                size="large"
                list={"cities" + id}
                placeholder="Choose a City"
                onChange={cityHandler}
              />
              <datalist id={"cities" + id}>
                {cities.map((city) => (
                  <option
                    key={city.city + city.country + city.count}
                    value={city.city}
                  >
                    {city.city}
                  </option>
                ))}
              </datalist>
            </>
          )}
          {selectedCity.length > 0 && (
            <>
              <Divider />
              {measurements !== undefined ? (
                <MeasureCard measurements={measurements} />
              ) : (
                <Segment color="red">Measurements Not Found</Segment>
              )}
            </>
          )}
        </CardHeader>
      </CardContent>
    </Card>
  );
};
