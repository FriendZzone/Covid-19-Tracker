import "@fontsource/montserrat";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import "./App.css";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

const useStyle = makeStyles((theme) => ({
  typoGraphy: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textAlign: "right",
  },
}));
moment.locale("vi");

function App() {
  const styles = useStyle();
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);
  useEffect(() => {
    getCountries().then((data) => {
      const countries = sortBy(data.data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
    });
  }, []);
  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };
  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(Slug)
        .then((res) => {
          res.data.pop();
          setReport(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedCountryId, countries]);
  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography
        className={styles.typoGraphy}
        variant="h3"
        component="h3"
        gutterBottom
      >
        Số liệu Covid-19
      </Typography>
      <Typography className={styles.typoGraphy} gutterBottom>
        {moment().format("lll")}
      </Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} countryID={selectedCountryId} />
    </Container>
  );
}

export default App;
