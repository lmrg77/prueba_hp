import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const TableSearchCountry = (data) => {
  // Las columnas que van a estar visibles por defecto
  const VISIBLE_FIELDS = ["id", "Country", "Confirmed", "Deaths", "Date"];
  // array con las columnas de la tabla
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Country",
      headerName: "Country",
      width: 150,
    },
    {
      field: "Confirmed",
      headerName: "Total Confirmed",
      type: "number",
      width: 200,
    },
    {
      field: "Deaths",
      headerName: "Total Deaths",
      type: "number",
      width: 200,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "Active",
      headerName: "Active",
      width: 200,
    },
    {
      field: "City",
      headerName: "City",
      width: 200,
    },
    {
      field: "CityCode",
      headerName: "CityCode",
      width: 200,
    },
    {
      field: "CountryCode",
      headerName: "CountryCode",
      width: 200,
    },
    {
      field: "Lat",
      headerName: "Lat",
      width: 200,
    },
    {
      field: "Lon",
      headerName: "Lon",
      width: 200,
    },
    {
      field: "Province",
      headerName: "Province",
      width: 200,
    },
    {
      field: "Recovered",
      headerName: "Recovered",
      width: 200,
    },
  ];

  const [newArray, setNewArray] = useState();

  useEffect(() => {
    let i = 1;
    const arraydos = data?.data.map((item) => {
      return {
        id: i++,
        Active: item.Active,
        City: item.City || "None",
        CityCode: item.CityCode || "None",
        Confirmed: item.Confirmed,
        Country: item.Country,
        CountryCode: item.CountryCode || "None",
        Date: item.Date,
        Deaths: item.Deaths,
        Lat: item.Lat,
        Lon: item.Lon,
        Province: item.Province || "None",
        Recovered: item.Recovered,
      };
    });
    setNewArray(arraydos);
  }, [data]);
  // Las columnas que no van a estar visibles por defecto
  const ColumnsNoVisible = {
    columns: {
      columnVisibilityModel: {
        Active: false,
        City: false,
        CityCode: false,
        CountryCode: false,
        Lat: false,
        Lon: false,
        Province: false,
        Recovered: false,
      },
    },
  };

  return (
    <DataGrid
      rows={newArray}
      columns={columns}
      visibleFields={VISIBLE_FIELDS}
      components={{ Toolbar: GridToolbar }}
      initialState={ColumnsNoVisible}
      className="data_grid"
    />
  );
};

export default TableSearchCountry;
