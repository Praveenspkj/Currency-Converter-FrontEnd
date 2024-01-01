import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './components/InputAmout'
import SelectCountry from './components/SelectCountry'
import SelectCyto from './components/SelectCyto'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'

function App() {
  const {
    fromCryptoCurrency,
    setFromCryptoCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCryptoCurrency.split(" ")[0];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if(firstAmount) {
     axios.post("http://praveenspk.tech:3000/api/cryptos/convertCurrency",{
      sourceCrypto:codeFromCurrency, 
      amount:firstAmount, 
      targetCurrency:codeToCurrency
     })
        .then(response => setResultCurrency(response.data.convertedAmount))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCryptoCurrency, toCurrency])

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10%",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem"}}>Currency Converter</Typography>
      <Grid container spacing={2}>
        <InputAmout />
        <SelectCyto value={fromCryptoCurrency} setValue={setFromCryptoCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCryptoCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency} {toCurrency}</Typography>
        </Box>
      ) : ""}

    </Container>
  )
}

export default App
