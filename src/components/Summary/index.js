import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import HighMaps from "../Charts/HighMap";
import LineChart from "../Charts/LineChart";

Summary.propTypes = {};

function Summary({ report, countryID }) {
  console.log(countryID);
  const [mapData, setMapData] = useState({});
  useEffect(() => {
    if (countryID) {
      console.log(countryID);
      const data = import(
        `@highcharts/map-collection/countries/${countryID}/${countryID}-all.geo.json`
      );
      data.then((res) => {
        setMapData(res);
      });
      data.catch((err) => console.log({ err }));
    }
  }, [countryID]);
  return (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        <LineChart data={report} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <HighMaps mapData={mapData} />
      </Grid>
    </Grid>
  );
}

export default Summary;
