'use client';

import { ChangeEvent, useState } from 'react';

type Props = {
  currency: any;
};

const Currency = ({ currency }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const BYNvalue = Number(inputValue.replace(',', '.')) || 0;
  const date = new Date(currency.BYNtoPLN.rate.timestamp).toLocaleString('en-GB');
  const sumBYNtoPLN = +inputValue * currency.BYNtoPLN.rate.rate;
  const sumPLNtoBYN = +inputValue / currency.PLNtoBYN.rate.rate;
  const averageSum = ((sumBYNtoPLN + sumPLNtoBYN) / 2).toFixed(4);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
      <input
        type='number'
        inputMode='decimal'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter amount in BYN'
      />
      <div className='bold'>
        Average: {BYNvalue} BYN = {averageSum} PLN
      </div>
      <div>
        BYN to PLN: {BYNvalue} BYN = {sumBYNtoPLN} PLN
      </div>
      <div>
        BYN to PLN: {BYNvalue} BYN = {sumPLNtoBYN} PLN
      </div>
    </>
  );
};

export { Currency };
