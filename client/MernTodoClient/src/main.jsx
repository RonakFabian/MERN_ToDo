import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ef39fe",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#54b3fd",
    },
    text: {
      secondary: "rgba(255,255,255,0.7)",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>
);
