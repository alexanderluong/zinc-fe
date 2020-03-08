import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import "./index.css";
import { Router } from "./scenes";

import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";

const store = configureStore();

export let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#70acb1",
      main: "#446baa",
      dark: "#59606d",
      contrastText: "#fff"
    },
    secondary: {
      main: "#f15690"
    }
  },
  typography: {
    fontFamily: '"Tajawal", sans-serif'
  }
});
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
