import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";

function CurrencyForm() {
  const [countries, setCountries] = useState([]);
  const [currencyAmount, setCurrencyAmount] = useState("$1.00");

  //Populate countries on first load
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const json = await response.json();
      setCountries(json);
    };
    try {
      fetchData();
    } catch (err) {
      //implement error handling
      console.log(err);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const mapCountries = () => {
    const uniqueCurrencies = {};
    countries.map((country) => {
      if (country.currencies) {
        let code = country.currencies[0].code;
        let name = country.currencies[0].name;
        uniqueCurrencies[code] = name;
      }
    });
    const objKeys = Object.keys(uniqueCurrencies);
    // console.log(objKeys);
    const options = objKeys.map((objKey) => ({
      label: `${objKey} - ${uniqueCurrencies[objKey]}`,
      value: objKey,
    }));
    return <Select options={options} />;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="text"
          placeholder="Enter amount"
          min="0"
          maxLength="9"
          required
          value={currencyAmount}
          onChange={(e) => setCurrencyAmount(e.target.value)}
        ></input>

        <div>
          <label htmlFor="from">From</label>
          <div>{mapCountries()}</div>
        </div>

        <div>
          <label htmlFor="from">To</label>
          <div>{mapCountries()}</div>
        </div>
        <button>Convert</button>
      </form>
    </div>
  );
}

export default CurrencyForm;
