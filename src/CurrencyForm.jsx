import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import CurrencyModal from "./CurrencyModal";

function CurrencyForm() {
  const [countries, setCountries] = useState([]);
  const [currencyAmount, setCurrencyAmount] = useState("1.00");

  const [selectedFromCurrency, setSelectedFromCurrency] = useState("");
  const [selectedToCurrency, setSelectedToCurrency] = useState("");

  const [currencyConversion, setCurrencyConversion] = useState({});
  const [showCurrencyModal, setCurrencyModal] = useState(false);

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
    // console.log(objKeys);
    const options = objKeys.map((objKey) => ({
      label: `${objKey} - ${uniqueCurrencies[objKey]}`,
      value: objKey,
    }));
    return (
      <Select
        inputId={divId}
        options={options}
        onChange={(country) =>
          divId === "fromCurrency"
            ? setSelectedFromCurrency(country.value)
            : setSelectedToCurrency(country.value)
        }
      />
    );
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
