import { Currency } from '@/components/Currency';

async function getCurrency(from: string, to: string) {
  const response = await fetch(
    `https://www.revolut.com/api/exchange/quote?amount=50000&country=PL&isRecipientAmount=false&fromCurrency=${from}&toCurrency=${to}`,
    {
      headers: {
        'accept-language': 'en',
      },
      next: {
        revalidate: 60,
      },
    }
  );
  return response.json();
}

export default async function Home() {
  const currencyBYNtoPLN = await getCurrency('BYN', 'PLN');
  const currencyPLNtoBYN = await getCurrency('PLN', 'BYN');
  const currency = { BYNtoPLN: currencyBYNtoPLN, PLNtoBYN: currencyPLNtoBYN };

  return (
    <>
      <h1>Revolut Converter</h1>
      <Currency currency={currency} />
    </>
  );
}
