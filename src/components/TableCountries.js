import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import TableSearchCountry from "./TableSearchCountry";

import Grid from "@mui/material/Grid";

// Las columnas que van a estar visibles por defecto
const VISIBLE_FIELDS = [
  "id",
  "Country",
  "TotalConfirmed",
  "TotalDeaths",
  "TotalRecovered",
];

// array con las columnas de la tabla
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Country",
    headerName: "Country",
    width: 150,
  },
  {
    field: "TotalConfirmed",
    headerName: "Total Confirmed",
    type: "number",
    width: 200,
  },
  {
    field: "TotalDeaths",
    headerName: "Total Deaths",
    type: "number",
    width: 200,
  },
  {
    field: "TotalRecovered",
    headerName: "Total Recovered",
    type: "number",
    width: 200,
  },
  {
    field: "Date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "CountryCode",
    headerName: "Country Code",
    width: 200,
  },
  {
    field: "NewConfirmed",
    headerName: "New Confirmed",
    width: 200,
  },
  {
    field: "NewDeaths",
    headerName: "New Deaths",
    width: 200,
  },
  {
    field: "NewRecovered",
    headerName: "New Recovered",
    width: 200,
  },
];

const TableCountries = (valor) => {
  const [countrySearchData, setCountrySearchData] = React.useState();

  // Las columnas que no van a estar visibles por defecto
  const ColumnsNoVisible = {
    columns: {
      columnVisibilityModel: {
        Date: false,
        CountryCode: false,
        NewConfirmed: false,
        NewDeaths: false,
        NewRecovered: false,
        TotalRecovered: false,
      },
    },
  };
  const node = valor?.data?.Countries;

  const array = node?.map((item) => {
    return {
      id: item.ID,
      Country: item.Country,
      TotalConfirmed: item.TotalConfirmed,
      TotalDeaths: item.TotalDeaths,
      TotalRecovered: item.TotalRecovered,
      Date: item.Date,
      CountryCode: item.CountryCode,
      NewConfirmed: item.NewConfirmed,
      NewDeaths: item.NewDeaths,
      NewRecovered: item.NewRecovered,
    };
  });

  const searchCountry = (country) => {
    axios
      .get(`https://api.covid19api.com/total/country/${country}`)
      .then((response) => {
        setCountrySearchData(response.data);
      })
      .catch((error) => console.log("error", error));
  };

  const handleClick = (event) => {
    searchCountry(event.row.Country);
  };

  return (
    <>
      <Grid container spacing={2} className="padding">
        <Grid item xs={12} md={6}>
          <DataGrid
            rows={array}
            columns={columns}
            visibleFields={VISIBLE_FIELDS}
            components={{ Toolbar: GridToolbar }}
            initialState={ColumnsNoVisible}
            onRowClick={handleClick}
            className="data_grid"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {countrySearchData && <TableSearchCountry data={countrySearchData} />}
        </Grid>
      </Grid>
    </>
  );
};

export default TableCountries;
