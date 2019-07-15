import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import MetricContainer from './components/MetricContainer'
import GraphContainer from './components/GraphContainer'
import Quries from './store/api/index';

const store = createStore();


const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
        <Header /> 
        <MetricContainer/>
        <GraphContainer/>
        <Quries/>
        <ToastContainer />
    </Provider>
  </MuiThemeProvider>
);

export default App;
