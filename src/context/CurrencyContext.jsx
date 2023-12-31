import { createContext, useState } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [fromCryptoCurrency, setFromCryptoCurrency] = useState("BTC - Bitcoin");
  const [toCurrency, setToCurrency] = useState("🇺🇸 USD - United States");
  const [firstAmount, setFirstAmount] = useState("");

  const value = {
    fromCryptoCurrency,
    setFromCryptoCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount,

  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
