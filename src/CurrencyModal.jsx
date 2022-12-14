import React from "react";
import PropTypes from "prop-types";

function CurrencyModal({ currencyConversion }) {
  const { info, query, result } = currencyConversion;
  return (
    <div>
      <span>Conversion rate: {info.rate}</span>
      <br></br>
      <span>
        {query.amount} {query.from} = {result} {query.to}
      </span>
    </div>
  );
}

CurrencyModal.propTypes = {
  currencyConversion: PropTypes.object,
};

export default CurrencyModal;
