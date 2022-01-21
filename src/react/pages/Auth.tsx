import { RootState } from "store";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IpcChannel } from "types/ipc";

import { ipc } from "electron/utils";

import { setSpotifyAuth } from "store/spotify/actions";

import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export function Auth() {
	const isAuth = useSelector((state: RootState) => state.spotify.isAuth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		isAuth && navigate("/app");
	}, [isAuth]);

	const openAuthLink = async () => {
		await ipc.invoke(IpcChannel.spotifyOpenAuthLink, null);
	};

	return (
		<div>
			<Typography variant="h2" component="div" sx={{ marginTop: 10 }} align={"center"}>
				<QueueMusicIcon fontSize={"large"} /> Saberfy
			</Typography>
			<Container component={"div"} maxWidth="sm" sx={{ marginTop: 30 }}>
				<Typography component={"div"} align={"center"}>
					<p>
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
