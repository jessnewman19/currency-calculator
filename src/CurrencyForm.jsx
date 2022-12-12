import React from "react";
import { useState, useEffect } from "react";

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
      console.log(err);
    }
  }, []);

  console.log(countries);

  const handleSubmit = (e) => {
    e.preventDefault();
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

        <label htmlFor="from">From</label>
        <select id="from" name="from">
          {countries.map((country) => {
            if (country.currencies) {
              return (
                <option key={country.name}>
                  {country.currencies[0].code} - {country.currencies[0].name}
                </option>
              );
            }
          })}
        </select>

        <label htmlFor="to">To</label>
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
        </select>
        <button>Convert</button>
      </form>
    </div>
  );
}

export default CurrencyForm;
