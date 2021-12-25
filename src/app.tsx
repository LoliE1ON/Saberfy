import * as React from "react";
import * as ReactDOM from "react-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Test from "./Test";
import { Auth } from "types";

const test: Auth = { client_id: "123" };

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
			<Test />
			{test.client_id}
		</ThemeProvider>
	);
}

function render() {
	ReactDOM.render(<App />, document.body);
}

render();
