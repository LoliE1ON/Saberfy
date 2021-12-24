export class Spotify {
    public static readonly token: string = null;

    public static getAuthUrl(): string {
        const parameters = {
            response_type: "token",
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: "",
            state: "",
            redirect_uri: "spoti-saber://auth/",
        };

        const url = new URL("https://accounts.spotify.com/authorize");
        url.search = new URLSearchParams(parameters).toString();

        return url.toString();
    }
}
