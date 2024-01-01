import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material"
import useAxios from "../hooks/useAxios"

const SelectCyto = (props) => {
  const { value, setValue, label } = props;
  const [data, loaded, error] = useAxios("http://praveenspk.tech:3000/api/cryptos/getAllCryptos");

  if(loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60}/>
      </Grid>
    )
  }
  if(error) {
    return "Something went wrong!"
  }


  const dataCountries = data.map(item => {
    return `${item.symbol} - ${item.name}`
  });

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  )
}

export default SelectCyto;