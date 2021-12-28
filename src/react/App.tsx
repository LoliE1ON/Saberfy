import * as React from "react";
import * as ReactDOM from "react-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import TrackList from "pages/TrackList";
import Navigation from "components/Navigation";

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
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route path="/" element={<TrackList />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

ReactDOM.render(<App />, document.body.querySelector("#app"));
