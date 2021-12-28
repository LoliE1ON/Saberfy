import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { IpcChannel } from "types/ipc";
import { ipc } from "electron/utils";
import { setSpotifyAuth } from "store/spotify/actions";

export function Auth() {
	const isAuth = useSelector((state: RootState) => state.spotify.isAuth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		ipc.on(IpcChannel.spotifyAuth, async (evt, isAuth) => {
			dispatch(setSpotifyAuth(isAuth));
		});
	}, []);

	useEffect(() => {
		isAuth && navigate("/app");
	}, [isAuth]);

	const openAuthLink = async () => {
		await ipc.invoke(IpcChannel.spotifyOpenAuthLink, null);
	};

	return (
		<div>
			<Container component={"div"} maxWidth="sm" sx={{ marginTop: 45 }}>
				<Typography component={"div"} align={"center"}>
					<p>
						{" "}
						Login to {""}
						<Typography component={"span"} sx={{ color: "success.main" }} align={"center"}>
							Spotify
						</Typography>
					</p>
					<Button variant="outlined" onClick={openAuthLink}>
						Login
					</Button>
				</Typography>
			</Container>
		</div>
	);
}
