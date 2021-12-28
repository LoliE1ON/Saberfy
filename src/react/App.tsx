import React from "react";
import ReactDOM from "react-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "store";
import { Auth } from "pages/Auth";
import "@fontsource/roboto/400.css";
import { Tracks } from "pages/Tracks";

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
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
