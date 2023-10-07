'use client';

import { ChangeEvent, useState } from 'react';

type Props = {
  currency: any;
};

const Currency = ({ currency }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const date = new Date(currency.BYNtoPLN.rate.timestamp).toLocaleString('en-GB');
  const sumBYNtoPLN = +inputValue * currency.BYNtoPLN.rate.rate;
  const sumPLNtoBYN = +inputValue / currency.PLNtoBYN.rate.rate;
  const averageSum = (sumBYNtoPLN + sumPLNtoBYN) / 2;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <h2>Currency date from Revolut API: {date}</h2>
      <div>Currency BYN to PLN: 1 BYN = {currency.BYNtoPLN.rate.rate} PLN</div>
      <div>Currency PLN to BYN: 1 PLN = {currency.PLNtoBYN.rate.rate} BYN</div>
      <div>
        Среднее: <input type='number' value={inputValue} onChange={handleInputChange} placeholder='Enter amount in BYN' /> BYN ={' '}
        {averageSum} PLN
        {}
      </div>
      <div>
        BYN to PLN: {inputValue} BYN = {sumBYNtoPLN} PLN
      </div>
      <div>
        BYN to PLN: {inputValue} BYN = {sumPLNtoBYN} PLN
      </div>
    </>
  );
};

export { Currency };
