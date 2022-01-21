import { store } from "store";

import "@fontsource/roboto/400.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";

import { Auth } from "pages/Auth";
import { Tracks } from "pages/Tracks";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					primary: {
						main: "#1DB954",
					},
					secondary: {
						main: "#039be5",
					},
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Auth />} />
						<Route path="/app" element={<Tracks />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

ReactDOM.render(<App />, document.body.querySelector("#app"));
