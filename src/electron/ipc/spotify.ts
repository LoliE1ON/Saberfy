import { shell } from "electron";
import { ipc } from "electron/utils";
import { IpcChannel } from "types/ipc";
import { Spotify, spotifyApi } from "electron/spotify";

ipc.handle(IpcChannel.spotifyGetTracks, async (event, args) => {
	return await spotifyApi.getTracks(args);
});

ipc.handle(IpcChannel.spotifyOpenAuthLink, async () => {
	shell.openExternal(Spotify.getAuthUrl()).catch(console.error);
});
