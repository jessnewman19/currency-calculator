import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import CurrencyModal from "./CurrencyModal";

function CurrencyForm() {
  const [countries, setCountries] = useState([]);
  const [currencyAmount, setCurrencyAmount] = useState("");

  const [selectedFromCurrency, setSelectedFromCurrency] = useState("");
  const [currentCurrencySymbol, setCurrentCurrencySymbol] = useState("$");
  const [selectedToCurrency, setSelectedToCurrency] = useState("");

  const [currencyConversion, setCurrencyConversion] = useState({});
  const [showCurrencyModal, setCurrencyModal] = useState(false);

  // console.log(countries);
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
    const fetchCurrency = async () => {
      const response = await fetch(
        `https://api.exchangerate.host/convert?from=${selectedFromCurrency}&to=${selectedToCurrency}&amount=${currencyAmount}`
      );
      const json = await response.json();
      setCurrencyConversion(json);
      setCurrencyModal(true);
    };
    try {
      fetchCurrency();
    } catch (err) {
      console.log(err);
    }
  };

  const mapCountries = (divId) => {
    const uniqueCurrencies = {};
    countries.map((country) => {
      if (country.currencies) {
        let code = country.currencies[0].code;
        let name = country.currencies[0].name;
        uniqueCurrencies[code] = name;
      }
    });
    const objKeys = Object.keys(uniqueCurrencies);
    const options = objKeys.map((objKey) => ({
      label: `${objKey} - ${uniqueCurrencies[objKey]}`,
      value: objKey,
    }));
    return (
      <Select
        inputId={divId}
        options={options}
        onChange={(country) => handleSelectedCurrencies(country, divId)}
      />
    );
  };

  const handleSelectedCurrencies = (selectedCountry, divId) => {
    if (divId === "fromCurrency") {
      console.log(selectedCountry);
      setSelectedFromCurrency(selectedCountry.value);
      const foundCountry = countries.find((country) => {
        if (country.currencies) {
          return country.currencies[0].code === selectedCountry.value;
        }
      });
      setCurrentCurrencySymbol(foundCountry.currencies[0].symbol);
      console.log(currentCurrencySymbol);
    } else {
      setSelectedToCurrency(selectedCountry.value);
    }
  };

  const handleCurrencyAmount = (e) => {
    const regEx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    if (regEx.test(e.target.value)) {
      setCurrencyAmount(e.target.value);
    } else {
      //Handle this error
      console.log("ERROR! Not a float");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label>
        <span>
          {currentCurrencySymbol}
          <input
            id="amount"
            name="amount"
            type="text"
            placeholder="Enter amount..."
            min="0"
            maxLength="9"
            required
            value={currencyAmount}
            onChange={(e) => handleCurrencyAmount(e)}
          ></input>
        </span>

        <div>
          <label htmlFor="from">From</label>
          <div id="from-currency">{mapCountries("fromCurrency")}</div>
        </div>

        <div>
          <label htmlFor="from">To</label>
          <div id="to-currency">{mapCountries("toCurrency")}</div>
        </div>
        <button>Convert</button>
        {showCurrencyModal === false ? (
          <div></div>
        ) : (
          <CurrencyModal currencyConversion={currencyConversion} />
        )}
      </form>
    </div>
  );
}

export default CurrencyForm;
