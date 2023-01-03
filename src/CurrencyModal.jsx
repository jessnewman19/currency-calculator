import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

function CurrencyModal({ currencyConversion }) {
  const { info, query, result } = currencyConversion;
  return (
    <ModalDiv>
      <span>Conversion rate: {info.rate}</span>
      <span>
        {Math.round(query.amount * 100) / 100} {query.from} =
        {Math.round(result * 100) / 100} {query.to}
      </span>
    </ModalDiv>
  );
}

CurrencyModal.propTypes = {
  currencyConversion: PropTypes.object,
};

export default CurrencyModal;
