export class Spotify {
	public static accessToken: string = null;

	public static getAuthUrl(): string {
		const parameters = {
			response_type: "token",
			client_id: process.env.SPOTIFY_CLIENT_ID,
			scope: "user-library-read",
			state: "",
			redirect_uri: "saberfy://auth/",
		};

		const url = new URL("https://accounts.spotify.com/authorize");
		url.search = new URLSearchParams(parameters).toString();

		return url.toString();
	}

	public static handleAuth(commandLine: string[]): boolean {
		const urlParams = commandLine.pop();
		const params = new URLSearchParams(urlParams);
		if (params.has("saberfy://auth/#access_token")) {
			Spotify.accessToken = params.get("saberfy://auth/#access_token");
			return true;
		}

		return false;
	}
}
