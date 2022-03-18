import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function FormSymptom() {
  const [checked, setChecked] = React.useState([false, false, false, false]);
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [date, setDate] = useState();
  const [temperature, setTemperature] = useState();
  const [parcialData, setParcialData] = useState();
  const [allData, setAllData] = useState([]);
  const [active, setActive] = useState(false);
  const [iteral, setIteral] = useState(0);
  const handleSubmit = (e) => {
    setParcialData([name, lastName, date, temperature, checked]);
  };
  useEffect(() => {
    const array = parcialData;
    /* dentro de este if hay un pequeño bug en cuanto a como mostrar los usuarios que se van registrando, se asignan
    de a 5 por el tamaño del array y el mapeo, por cuestion de tiempo no lo alcance a culminar */
    if (array !== undefined) {
      const tempo = array.map((item) => ({
        id: iteral,
        Name: array[0],
        LastName: array[1],
        Date: array[2],
        Temperature: array[3],
        Checked: array[4],
      }));
      setAllData(tempo);

      setIteral(iteral + 1);
      if (array.length > 1) {
        setActive(true);
      }
    }
  }, [parcialData]);

  const handleChange1 = (event) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };
  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };
  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };
  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };
  const handleChange5 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };
  const children = (
    <Box sx={{ flexDirection: "column" }}>
      <FormControlLabel
        label="Fever"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Cough"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Tiredness"
        control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
      />
      <FormControlLabel
        label="Loss of taste or smell"
        control={<Checkbox checked={checked[3]} onChange={handleChange5} />}
      />
    </Box>
  );
  // Las columnas que van a estar visibles por defecto
  const VISIBLE_FIELDS = [
    "id",
    "Name",
    "LastName",
    "Date",
    "Temperature",
    "Checked",
  ];
  // array con las columnas de la tabla
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "LastName",
      headerName: "Last Name",
      type: "number",
      width: 200,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "Temperature",
      headerName: "Temperature",
      type: "number",
      width: 200,
    },
    {
      field: "Checked",
      headerName: "Checked",
      width: 200,
    },
  ];

  return (
    <>
      <form>
        <Grid container spacing={2} className="padding">
          <Grid item xs={12} md={6} className="input_align_end">
            <TextField
              id="name"
              name="name"
              label="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </Grid>
          <Grid item xs={12} md={6} className="input_align_center">
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
              className="input"
            />
          </Grid>
          <Grid item xs={12} md={6} className="input_align_end">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Birthday"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField className="input" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} className="input_align_center">
            <TextField
              id="temperature"
              name="temperature"
              label="Temperature"
              value={temperature}
              required
              onChange={(e) => setTemperature(e.target.value)}
              className="input"
            />
          </Grid>
          <Grid item xs={12} className="checkbox">
            <FormControlLabel
              label="All the symptoms"
              control={
                <Checkbox
                  checked={checked[0] && checked[1] && checked[2] && checked[3]}
                  onChange={handleChange1}
                />
              }
            />
          </Grid>
          <Grid item xs={12} className="checkbox">
            {children}
          </Grid>
          <Grid item xs={12} className="checkbox">
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
            >
              SEND
            </Button>
          </Grid>
        </Grid>
      </form>
      {active && (
        <Grid container>
          <Grid item xs={12}>
            <DataGrid
              rows={allData}
              columns={columns}
              visibleFields={VISIBLE_FIELDS}
              components={{ Toolbar: GridToolbar }}
              className="data_grid"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default FormSymptom;
