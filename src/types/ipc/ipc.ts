import { TrackList, TrackListParameters } from "types/spotify";
import { DownloadMapParameters, FindMapsParameters, FindMapsResponse } from "types/beatSaver";

export enum IpcChannel {
	spotifyAuth = "spotifyAuth",
	spotifyGetTracks = "spotifyGetTracks",
	spotifyOpenAuthLink = "spotifyOpenAuthLink",

	beatSaverFindMaps = "beatSaverFindMaps",
	beatSaverDownloadMap = "beatSaverDownloadMap",

	beatSaberGetGamePath = "beatSaberGetGamePath",
	beatSaberGetLocalMaps = "beatSaberGetLocalMaps",
	beatSaberDeleteMap = "beatSaberDeleteMap",
}

export type IpcEvent = {
	[IpcChannel.spotifyAuth]: boolean;
	[IpcChannel.spotifyGetTracks]: TrackListParameters;
	[IpcChannel.spotifyOpenAuthLink]: null;

	[IpcChannel.beatSaverFindMaps]: FindMapsParameters;
	[IpcChannel.beatSaverDownloadMap]: DownloadMapParameters;

	[IpcChannel.beatSaberGetGamePath]: null;
	[IpcChannel.beatSaberGetLocalMaps]: null;
	[IpcChannel.beatSaberDeleteMap]: string;
};

export type IpcResponse = {
	[IpcChannel.spotifyAuth]: void;
	[IpcChannel.spotifyGetTracks]: TrackList;
	[IpcChannel.spotifyOpenAuthLink]: void;

	[IpcChannel.beatSaverFindMaps]: FindMapsResponse;
	[IpcChannel.beatSaverDownloadMap]: boolean;

	[IpcChannel.beatSaberGetGamePath]: string;
	[IpcChannel.beatSaberGetLocalMaps]: string[];
	[IpcChannel.beatSaberDeleteMap]: boolean;
};
