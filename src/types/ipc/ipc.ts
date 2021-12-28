import { TrackList, TrackListParameters } from "types/spotify";
import { DownloadMapParameters, FindMapsParameters, FindMapsResponse } from "types/beatSaver";

export enum IpcChannel {
	spotifyGetTracks = "spotifyGetTracks",
	spotifyOpenAuthLink = "spotifyOpenAuthLink",

	beatSaverFindMaps = "beatSaverFindMaps",
	beatSaverDownloadMap = "beatSaverDownloadMap",

	beatSaberGetGamePath = "beatSaberGetGamePath",
	beatSaberGetLocalMaps = "beatSaberGetLocalMaps",
	beatSaberDeleteMap = "beatSaberDeleteMap",
}

export type IpcEvent = {
	[IpcChannel.spotifyGetTracks]: TrackListParameters;
	[IpcChannel.spotifyOpenAuthLink]: void;

	[IpcChannel.beatSaverFindMaps]: FindMapsParameters;
	[IpcChannel.beatSaverDownloadMap]: DownloadMapParameters;

	[IpcChannel.beatSaberGetGamePath]: void;
	[IpcChannel.beatSaberGetLocalMaps]: void;
	[IpcChannel.beatSaberDeleteMap]: string;
};

export type IpcResponse = {
	[IpcChannel.spotifyGetTracks]: TrackList;
	[IpcChannel.spotifyOpenAuthLink]: void;

	[IpcChannel.beatSaverFindMaps]: FindMapsResponse;
	[IpcChannel.beatSaverDownloadMap]: boolean;

	[IpcChannel.beatSaberGetGamePath]: string;
	[IpcChannel.beatSaberGetLocalMaps]: string[];
	[IpcChannel.beatSaberDeleteMap]: boolean;
};
