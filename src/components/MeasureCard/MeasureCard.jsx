import React from "react";
import { Segment } from "semantic-ui-react";

export const MeasureCard = ({ measurements }) => {
  const bc = measurements.filter((x) => x.parameter === "bc")[0];
  const ch4 = measurements.filter((x) => x.parameter === "ch4")[0];
  const co = measurements.filter((x) => x.parameter === "co")[0];
  const co2 = measurements.filter((x) => x.parameter === "co2")[0];
  const no = measurements.filter((x) => x.parameter === "no")[0];
  const nox = measurements.filter((x) => x.parameter === "nox")[0];
  const no2 = measurements.filter((x) => x.parameter === "no2")[0];
  const o3 = measurements.filter((x) => x.parameter === "o3")[0];
  const pm1 = measurements.filter((x) => x.parameter === "pm1")[0];
  const pm25 = measurements.filter((x) => x.parameter === "pm25")[0];
  const pm10 = measurements.filter((x) => x.parameter === "pm10")[0];
  const so2 = measurements.filter((x) => x.parameter === "so2")[0];

  const measureArray = [
    bc,
    ch4,
    co,
    co2,
    no,
    nox,
    no2,
    o3,
    pm1,
    pm25,
    pm10,
    so2,
  ];

  const filteredArray = measureArray.filter((index) => index !== undefined);

  return (
    <Segment color="brown">
      Pollutants:
      <br />
      {filteredArray.map((x) => (
        <Segment vertical key={JSON.stringify(x)}>
          <h4>{x.parameter}</h4>
          <p>{`${x.value} ${x.unit}`}</p>
        </Segment>
      ))}
    </Segment>
  );
};
