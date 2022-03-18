import React from "react";
import SideMenu from "./components/SideMenu";
import axios from "axios";
import Title from "./components/Title";
import TableCountries from "./components/TableCountries";
import Button from "@mui/material/Button";
import FormSymptom from "./components/FormSymptom";
import Grid from "@mui/material/Grid";

export default class App extends React.Component {
  state = {
    data: [],
    isLoading: false,
    errorMsg: "",
    visibilityForm: false,
  };
  /* mediante axios consultamos la api */
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("https://api.covid19api.com/summary")
      .then((response) => {
        this.setState({ data: response.data, errorMsg: "" });
      })
      .catch((error) =>
        this.setState({
          errorMsg: "Error while loading data. Try again later.",
        })
      )
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    const { data, isLoading, errorMsg, visibilityForm } = this.state;

    return (
      <div className="main-section">
        <Grid container>
          <Grid item xs={12}>
            <SideMenu />
          </Grid>
          <Grid item xs={12}>
            <Title />
          </Grid>
          <Grid item xs={12} className="padding">
            <Button
              variant="contained"
              onClick={() =>
                this.setState({ visibilityForm: !this.state.visibilityForm })
              }
              color="secondary"
            >
              {(!visibilityForm && "New Form") || "View Table"}
            </Button>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {/* condicionamos que se muestre o el formulario o la tabla segun el estado visibilityForm */}
              {(visibilityForm && <FormSymptom />) || (
                <div>
                  {(isLoading && <p className="loading">Loading</p>) || (
                    <TableCountries data={data} />
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      </div>
    );
  }
}
