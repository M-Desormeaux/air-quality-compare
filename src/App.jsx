import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardGroup,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import { CityCard } from "./CityCard/CityCard";

export const App = () => {
  const [countries, setCountries] = useState([0]);

  useEffect(() => getCountries(), []);

  async function getCountries() {
    const countryURL = "https://docs.openaq.org/v2/countries";

    const response = await fetch(countryURL);
    const data = await response.json();
    setCountries(data.results);
  }

  return (
    <Segment padded="very" vertical>
      {countries[0] !== 0 ? (
        <CardGroup centered>
          <CityCard key={"one"} countryList={countries} />
          <CityCard key={"two"} countryList={countries} />
        </CardGroup>
      ) : (
        <CardGroup centered>
          <Card>
            <CardContent>
              <Segment padded="very" vertical>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              </Segment>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Segment padded="very" vertical>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              </Segment>
            </CardContent>
          </Card>
        </CardGroup>
      )}
    </Segment>
  );
};
