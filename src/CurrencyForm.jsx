import React from "react";
import { useState, useEffect } from "react";

function CurrencyForm() {
  const [countries, setCountries] = useState([]);
  const [currencyAmount, setCurrencyAmount] = useState("$1.00");
  const [query, setQuery] = useState("");

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

  const filteredCountries = !query
    ? countries
    : countries.filter((country) => {
        if (country.currencies) {
          return (
            country.currencies[0].code.includes(query) ||
            country.currencies[0].name.includes(query)
          );
        }
      });

  const mapCountries = () => {
    const uniqueCurrencies = {};
    filteredCountries.map((country) => {
      if (country.currencies) {
        let code = country.currencies[0].code;
        let name = country.currencies[0].name;
        uniqueCurrencies[code] = name;
      }
    });
    const objKeys = Object.keys(uniqueCurrencies);
    return objKeys.map((objKey) => {
      return (
        <li key={objKey}>
          {objKey} - {uniqueCurrencies[objKey]}
        </li>
      );
    });
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
          <div>
            <input
              id="from"
              type="text"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <ul role="listbox">{mapCountries()}</ul>
          </div>
        </div>

        <div>
          <label htmlFor="from">To</label>
          <div>
            <input
              id="to"
              type="text"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <ul role="listbox">{mapCountries()}</ul>
          </div>
        </div>

        {/* <label htmlFor="to">To</label>
        <select id="to" name="to">
          {countries.map((country) => {
            if (country.currencies) {
              return (
                <option key={country.name}>
                  {country.currencies[0].code} - {country.currencies[0].name}
                </option>
              );
            }
          })}
        </select> */}
        <button>Convert</button>
      </form>
    </div>
  );
}

export default CurrencyForm;
