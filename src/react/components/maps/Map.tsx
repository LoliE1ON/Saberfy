import { RootState } from "store";
import { ipc } from "utils";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Doc } from "types/beatSaver";
import { IpcChannel } from "types/ipc";

import { addBeatSaberLocalMap, deleteBeatSaberLocalMap } from "store/beatSaber/actions";

import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Avatar, Box, Button, ButtonGroup, Divider, Grid, Paper, Rating, Tooltip } from "@mui/material";

export type MapProps = {
	map: Doc;
};

export function Map({ map }: MapProps) {
	const localMaps = useSelector((state: RootState) => state.beatSaber.localMaps);
	const dispatch = useDispatch();

	const importMap = (url: string, folderName: string) => {
		ipc.invoke(IpcChannel.beatSaverDownloadMap, { url, folderName }).then(isSuccess => {
			if (isSuccess) {
				dispatch(addBeatSaberLocalMap(folderName));
			}
		});
	};

	const deleteMap = (folderName: string) => {
		ipc.invoke(IpcChannel.beatSaberDeleteMap, folderName).then(isSuccess => {
			if (isSuccess) {
				dispatch(deleteBeatSaberLocalMap(folderName));
			}
		});
	};

	const ImportButton = () => {
		const mapName = `${map.id} (${map.metadata.songName} - ${map.metadata.levelAuthorName})`;
		const localMap = localMaps.find(map => {
			return map === mapName;
		});

		if (localMap) {
			return (
				<Tooltip title="Delete from BeatSaber">
					<Button variant="contained" color="error" onClick={() => deleteMap(localMap)}>
						<CloseIcon />
					</Button>
				</Tooltip>
			);
		} else {
			return (
				<Tooltip title="Import to BeatSaber">
					<Button onClick={() => importMap(map.versions[0].downloadURL, mapName)}>
						<SaveAltIcon />
					</Button>
				</Tooltip>
			);
		}
	};
	console.log(map.stats.score);
	return (
		<React.Fragment>
			<Paper sx={{ display: "flex", p: 2, gap: 2, borderRadius: 0 }} elevation={1}>
				<Box>
					<Avatar
						sx={{ width: 128, height: 128 }}
						alt={map.name}
						variant="rounded"
						src={map.versions[0].coverURL}
					/>
				</Box>
				<Box sx={{ flexGrow: 1 }}>
					{map.name}
					<Box
						component={"div"}
						sx={{
							color: "text.disabled",
							wordBreak: "break-all",
							fontSize: "smaller",
						}}>
						{map.description}
						<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
							<Rating name="read-only" defaultValue={map.stats.score * 5} precision={0.5} readOnly />
							<ThumbUpIcon color="primary" fontSize="small" /> {map.stats.upvotes.toString()}
							<ThumbDownAltIcon color="error" fontSize="small" /> {map.stats.downvotes.toString()}
						</Box>
					</Box>
				</Box>
				<ButtonGroup orientation="vertical" size={"small"}>
					<ImportButton />
					<Tooltip title="Preview map">
						<Button>
							<PlayArrowIcon />
						</Button>
					</Tooltip>
				</ButtonGroup>
			</Paper>

			<Divider />
		</React.Fragment>
	);
}
