import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import CurrencyModal from "./CurrencyModal";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #ffa500;
  color: #ffa500;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
  height: 38px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  border-style: solid;
  border-radius: 10px;
  border-color: hsl(0, 0%, 80%);
  border-width: 1px;
`;

const Form = styled.form`
  display: flex;
`;

const InputDiv = styled.div`
  display: flex;
`;

const Label = styled.label`
  padding-right: 10px;
  padding-top: 5px;
  font-size: large;
`;

const AmountInput = styled.input`
  padding-left: 35px;
  border-style: solid;
  border-radius: 10px;
  border-color: hsl(0, 0%, 80%);
  border-width: 1px;
  min-height: 30px;
  margin-right: 10px;
`;

const AmountDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AmountSpan = styled.span`
  position: absolute;
  left: 2px;
  padding-top: 5px;
  font-size: large;
  color: darkorange;
`;

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: red;
  font-weight: bolder;
  font-size: 11px;
`;

function CurrencyForm() {
  const [countries, setCountries] = useState([]);
  const [currencyAmount, setCurrencyAmount] = useState("");

  const [selectedFromCurrency, setSelectedFromCurrency] = useState("");
  const [currentCurrencySymbol, setCurrentCurrencySymbol] = useState("$");
  const [selectedToCurrency, setSelectedToCurrency] = useState("");

  const [currencyConversion, setCurrencyConversion] = useState({});
  const [showCurrencyModal, setCurrencyModal] = useState(false);

  const [inputError, setInputError] = useState("");
  const [noCurrencyError, setNoCurrencyError] = useState("");

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
    if (selectedFromCurrency && selectedToCurrency) {
      try {
        fetchCurrency();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      setNoCurrencyError("*Please select a 'From' and 'To' currency.");
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
        options={options}
        onChange={(country) => handleSelectedCurrencies(country, divId)}
      />
    );
  };

  const handleSelectedCurrencies = (selectedCountry, divId) => {
    if (divId === "fromCurrency") {
      setSelectedFromCurrency(selectedCountry.value);
      const foundCountry = countries.find((country) => {
        if (country.currencies) {
          return country.currencies[0].code === selectedCountry.value;
        }
      });
      setCurrentCurrencySymbol(foundCountry.currencies[0].symbol);
    } else {
      setSelectedToCurrency(selectedCountry.value);
    }
  };

  const handleCurrencyAmount = (e) => {
    const regEx = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    if (regEx.test(e.target.value) || e.target.value === "") {
      setInputError("");
      setCurrencyAmount(e.target.value);
    } else {
      setInputError("*Please enter number between 1 & 9");
    }
  };

  const handleClick = () => {
    //need to change the state of the actual react-select input
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor="amount">Amount</Label>
          <AmountDiv>
            <AmountInput
              id="amount"
              name="amount"
              type="text"
              placeholder="Enter amount..."
              min="0"
              maxLength="9"
              required
              value={currencyAmount}
              onChange={(e) => handleCurrencyAmount(e)}
            ></AmountInput>
            <AmountSpan>{currentCurrencySymbol}</AmountSpan>
            {inputError ? <ErrorDiv>{inputError}</ErrorDiv> : <div></div>}
          </AmountDiv>
        </InputDiv>

        <InputDiv>
          <Label htmlFor="from">From</Label>
          <div id="from-currency">{mapCountries("fromCurrency")}</div>
        </InputDiv>

        <Button onClick={handleClick}>SWAP</Button>

        <InputDiv>
          <Label htmlFor="from">To</Label>
          <div id="to-currency">
            {mapCountries("toCurrency")}
            {noCurrencyError ? (
              <ErrorDiv>{noCurrencyError}</ErrorDiv>
            ) : (
              <div></div>
            )}
          </div>
        </InputDiv>

        <Button>Convert</Button>
      </Form>
      <div className="break"></div>
      {showCurrencyModal === false ? (
        <div></div>
      ) : (
        <CurrencyModal currencyConversion={currencyConversion} />
      )}
    </FormWrapper>
  );
}

export default CurrencyForm;
