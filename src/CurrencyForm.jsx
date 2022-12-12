import { useState } from "react";

function CurrencyForm() {

  const handleSubmit = (e) => { 
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" type="text" placeholder="Enter amount" value="" min="0" maxLength="9" required></input>

        <label htmlFor="from">From</label>
        <select id="from" name="from">
          <option value="insert value here"></option>
        </select>

        <label htmlFor="to">To</label>
        <select id="to" name="to">
          <option value="insert value here"></option>
        </select>
        <button>Convert</button>
      </form>
    </div>
  );
}

export default CurrencyForm;
