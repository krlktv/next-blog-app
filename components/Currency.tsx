'use client';

import { ChangeEvent, useState } from 'react';

type Props = {
  currency: any;
};

const Currency = ({ currency }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const inputSum = Number(inputValue);
  const BYNvalue = isNaN(inputSum) ? 0 : inputSum;
  const date = new Date(currency.BYNtoPLN.rate.timestamp).toLocaleString('en-GB');
  const sumBYNtoPLN = BYNvalue * currency.BYNtoPLN.rate.rate;
  const sumPLNtoBYN = BYNvalue / currency.PLNtoBYN.rate.rate;
  const averageSum = ((sumBYNtoPLN + sumPLNtoBYN) / 2).toFixed(4);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value
      .replace(/[^0-9.,]/g, '')
      .replace(',', '.')
      .replace(/(\.[^.]*)\./g, '$1');

    const decimalIndex = inputValue.indexOf('.');
    if (decimalIndex !== -1) {
      const decimalPart = inputValue.substring(decimalIndex + 1, decimalIndex + 3);
      inputValue = inputValue.substring(0, decimalIndex + 1) + decimalPart;
    }

    setInputValue(inputValue);
  };

  return (
    <>
      <h3>Currency date from Revolut API: {date}</h3>
      <div>Currency BYN to PLN:</div>
      <div>1 BYN = {currency.BYNtoPLN.rate.rate} PLN</div>
      <hr />
      <div>Currency PLN to BYN:</div>
      <div>1 PLN = {currency.PLNtoBYN.rate.rate} BYN</div>
      <hr />
      <div>Enter amount in BYN:</div>
      <input inputMode='decimal' value={inputValue} onChange={handleInputChange} placeholder='Enter amount in BYN' />
      <div>Average:</div>
      <div className='bold'>
        {BYNvalue} BYN = {averageSum} PLN
      </div>
      <div>BYN to PLN:</div>
      <div>
        {BYNvalue} BYN = {sumBYNtoPLN} PLN
      </div>
      <br />
      <div>PLN to BYN:</div>
      <div>
        {BYNvalue} BYN = {sumPLNtoBYN} PLN
      </div>
    </>
  );
};

export { Currency };
