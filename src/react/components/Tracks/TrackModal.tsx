import { RootState } from "store";
import { ipc } from "utils";

import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IpcChannel } from "types/ipc";
import { Item } from "types/spotify/track";

import { setBeatSaverMaps } from "store/beatSaver/actions";

import { MapList } from "components/Maps/MapList";

import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Badge, Box, Dialog, Grid, Paper, Typography } from "@mui/material";

export type TrackModalProps = {
	handleClose: () => void;
	track: Item;
	open: boolean;
};

export function TrackModal({ handleClose, track, open }: TrackModalProps) {
	const maps = useSelector((state: RootState) => state.beatSaver.maps);
	const dispatch = useDispatch();

	useEffect(() => {
		if (track) {
			const query = `${track.track.name} - ${track.track.album.artists[0].name}`;
			ipc.invoke(IpcChannel.beatSaverFindMaps, { query }).then(({ docs }) => {
				dispatch(setBeatSaverMaps(docs));
			});
		}
	}, [track]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			scroll={"body"}
			fullWidth={true}
			maxWidth={"md"}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{ mt: 11 }}>
			{track && (
				<Box>
					<Paper sx={{ p: 2, borderRadius: 0 }} elevation={0}>
						<Grid container sx={{ color: "text.primary" }}>
							<Grid item xs={8}>
								<Typography variant="h5" component="div">
									{track.track.name}
									<Box component={"span"} sx={{ color: "text.disabled", fontSize: "smaller", ml: 1 }}>
										{track.track.album.artists.map(artist => artist.name)}
									</Box>
								</Typography>
							</Grid>
							<Grid item xs={4} sx={{ textAlign: "right" }}>
								<Badge color="primary" badgeContent={maps.length}>
									<LibraryMusicIcon />
								</Badge>
							</Grid>
						</Grid>
					</Paper>

					<MapList maps={maps} />
				</Box>
			)}
		</Dialog>
	);
}
