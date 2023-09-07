import { RootState, store } from "store";
import { ipc } from "utils";

import "@fontsource/roboto/400.css";
import "App.css";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";

import { IpcChannel } from "types/ipc";

import { setBeatSaberLocalMaps } from "store/beatSaber/actions";
import { setSpotifyAuth } from "store/spotify/actions";

import { Auth } from "pages/Auth";
import { LocalMaps } from "pages/LocalMaps";
import { Settings } from "pages/Settings";
import { Tracks } from "pages/Tracks";

import { Navigation } from "components/Navigation";

import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Search} from "pages/Search";

function Header() {
	const onClose = () => ipc.invoke(IpcChannel.clientClose, null);
	const onMinimize = () => ipc.invoke(IpcChannel.clientMinimize, null);

	return (
		<AppBar position="static" color="primary" enableColorOnDark>
			<Toolbar
				sx={{ height: "var(--header-height)", minHeight: "auto", padding: "0 !important" }}
				variant="dense">
				<Typography sx={{ p: 1, fontWeight: "600" }} variant="subtitle1" component="div">
					Saberfy
				</Typography>
				<div className="app-header-hack" />
				<Button sx={{ minWidth: "35px" }} onClick={onMinimize} size="small" color="inherit">
					<MinimizeIcon />
				</Button>
				<Button sx={{ minWidth: "35px" }} onClick={onClose} size="small" color="inherit">
					<CloseIcon />
				</Button>
			</Toolbar>
		</AppBar>
	);
}

function AppWrapper({ children }: { children: React.ReactNode }) {
	const isAuth = useSelector((state: RootState) => state.spotify.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		ipc.invoke(IpcChannel.clientReady, null).catch(console.error);

		ipc.on(IpcChannel.spotifyAuth, async (evt, isAuth) => {
			dispatch(setSpotifyAuth(isAuth));
		});

		ipc.invoke(IpcChannel.beatSaberGetLocalMaps, null).then(result => {
			dispatch(setBeatSaberLocalMaps(result));
		});
	}, []);

	return (
		<div style={{ height: "100vh" }}>
			<Header />
			{isAuth && <Navigation />}
			{children}
		</div>
	);
}

function AppBody({ children }: { children: React.ReactNode }) {
	return <div style={{ height: "calc(100vh - 56px - var(--header-height))", overflowX: "auto" }}>{children}</div>;
}

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
				<BrowserRouter>
					<CssBaseline />
					<AppWrapper>
						<AppBody>
							<Routes>
								<Route path="/" element={<Auth />} />
								<Route path="/app" element={<Tracks />} />
								<Route path="/search" element={<Search />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/local-maps" element={<LocalMaps />} />
							</Routes>
						</AppBody>
					</AppWrapper>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

ReactDOM.render(<App />, document.body.querySelector("#app"));
