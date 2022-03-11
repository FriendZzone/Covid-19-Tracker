import {
  FormControl,
  InputLabel,
  makeStyles,
  NativeSelect,
} from "@material-ui/core";
import React from "react";
import "./style.scss";
CountrySelector.propTypes = {};
const useStyle = makeStyles((theme) => ({
  formControl: {
    marginBottom: `${theme.spacing(3)}px `,
  },
  h3: {
    textAlign: `left`,
  },
}));
function CountrySelector({ value, handleOnChange, countries }) {
  const styles = useStyle();
  return (
    <>
      <h3 className={styles.h3}>Lựa chọn Quốc gia</h3>
      <FormControl className={styles.formControl}>
        <InputLabel htmlFor="country-selector" shrink>
          Quốc Gia
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={handleOnChange}
          inputProps={{
            name: "country",
            id: "country-selector",
          }}
        >
          {countries.map((country, index) => {
            return (
              <option key={index} value={country.ISO2.toLowerCase()}>
                {country.Country}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </>
  );
}

export default CountrySelector;
