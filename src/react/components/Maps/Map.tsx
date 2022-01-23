import { RootState } from "store";
import { ipc } from "utils";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Doc } from "types/beatSaver";
import { IpcChannel } from "types/ipc";

import { addBeatSaberLocalMap, deleteBeatSaberLocalMap } from "store/beatSaber/actions";

import { validateFolderName } from "utils/validateFolderName";

import { Preview } from "components/Maps/Preview";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Button, ButtonGroup, Dialog, Divider, Paper, Rating, Tooltip } from "@mui/material";

export type MapProps = {
	map: Doc;
};

export function Map({ map }: MapProps) {
	const localMaps = useSelector((state: RootState) => state.beatSaber.localMaps);
	const [open, setOpen] = React.useState(false);
	const [isImporting, setIsImporting] = React.useState(false);
	const dispatch = useDispatch();

	const importMap = (url: string, folderName: string) => {
		setIsImporting(true);
		ipc.invoke(IpcChannel.beatSaverDownloadMap, { url, folderName }).then(isSuccess => {
			if (isSuccess) {
				dispatch(addBeatSaberLocalMap(folderName));
			}

			setIsImporting(false);
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
		const mapName = validateFolderName(`${map.id} (${map.metadata.songName} - ${map.metadata.levelAuthorName})`);
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
					<LoadingButton
						loading={isImporting}
						onClick={() => importMap(map.versions[0].downloadURL, mapName)}>
						<SaveAltIcon />
					</LoadingButton>
				</Tooltip>
			);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
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
					<Box sx={{ display: "flex" }}>
						<Box sx={{ flexGrow: 1 }}>{map.name}</Box>
						<Box sx={{ display: "flex" }}>
							<AccessTimeIcon sx={{ mr: 1 }} fontSize="small" />
							{Math.floor((map.metadata.duration / 60) << 0)}:{Math.floor(map.metadata.duration % 60)}
						</Box>
					</Box>

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
						<Button variant="text" onClick={handleClickOpen}>
							<PlayArrowIcon />
						</Button>
					</Tooltip>
				</ButtonGroup>
			</Paper>

			<Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose}>
				<Preview id={map.id} />
			</Dialog>

			<Divider />
		</React.Fragment>
	);
}
