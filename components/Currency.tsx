'use client';

import { ChangeEvent, FC, useState } from 'react';

type Props = {
  currency: any;
};

type CurrencyState = {
  inputBYNValue: string;
  inputPLNValue: string;
};

const Currency: FC<Props> = ({ currency }) => {
  const [currencyState, setCurrencyState] = useState<CurrencyState>({
    inputBYNValue: '',
    inputPLNValue: '',
  });
  const date = new Date(currency.BYNtoPLN.rate.timestamp).toLocaleString('en-GB');

  const formatInputValue = (inputValue: string) => {
    return inputValue
      .replace(/[^0-9.,]/g, '')
      .replace(',', '.')
      .replace(/(\.[^.]*)\./g, '$1');
  };

  const calculateSum = (value: number, rate: number) => {
    return (value * rate).toFixed(2);
  };

  const BYNvalue = isNaN(Number(currencyState.inputBYNValue)) ? 0 : Number(currencyState.inputBYNValue).toFixed(2);
  const sumBYNtoPLN = calculateSum(+BYNvalue, currency.BYNtoPLN.rate.rate);
  const sumPLNtoBYN = calculateSum(+BYNvalue, 1 / currency.PLNtoBYN.rate.rate);
  const averageSum = ((Number(sumBYNtoPLN) + Number(sumPLNtoBYN)) / 2).toFixed(2);

  const handleInputChange = (currencyType: 'inputBYNValue' | 'inputPLNValue') => (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = formatInputValue(e.target.value);

    const decimalIndex = inputValue.indexOf('.');
    if (decimalIndex !== -1) {
      const decimalPart = inputValue.substring(decimalIndex + 1, decimalIndex + 3);
      inputValue = inputValue.substring(0, decimalIndex + 1) + decimalPart;
    }

    setCurrencyState((prevState) => ({
      ...prevState,
      [currencyType]: inputValue,
    }));
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
      <input
        inputMode='decimal'
        value={currencyState.inputBYNValue}
        onChange={handleInputChange('inputBYNValue')}
        placeholder='BYN'
      />
      <input
        inputMode='decimal'
        value={currencyState.inputPLNValue}
        onChange={handleInputChange('inputPLNValue')}
        placeholder='PLN (Temporarily disabled)'
        disabled
      />
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
