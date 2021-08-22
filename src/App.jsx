import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardGroup,
  Input,
  Segment,
} from "semantic-ui-react";
import { CityCard } from "./components/CityCard/CityCard";

export const App = () => {
  const [countries, setCountries] = useState([0]);

  useEffect(() => getCountries(), []);

  async function getCountries() {
    const countryURL = "https://docs.openaq.org/v2/countries";

    const response = await fetch(countryURL);
    const data = await response.json();
    const dataFilter = data.results.filter((point) => point.cities > 0);
    setCountries(dataFilter);
  }

  return (
    <Segment padded="very" vertical>
      {countries[0] !== 0 ? (
        <CardGroup centered>
          <CityCard key={43} id={3} countryList={countries} />
          <CityCard key={31} id={5} countryList={countries} />
        </CardGroup>
      ) : (
        <CardGroup centered>
          <Card>
            <CardContent>
              <Input loading size="large" placeholder="Loading Countries..." />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Input loading size="large" placeholder="Loading Countries..." />
            </CardContent>
          </Card>
        </CardGroup>
      )}
    </Segment>
  );
};
