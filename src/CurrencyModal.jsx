import React from "react";
import PropTypes from "prop-types";

function CurrencyModal({ currencyConversion }) {
  console.log(currencyConversion);
  return <div>Hey!!!</div>;
}

CurrencyModal.propTypes = {
  currencyConversion: PropTypes.object,
};
export default CurrencyModal;
