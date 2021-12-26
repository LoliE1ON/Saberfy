import * as path from "path";

export const registerAppProtocol = (app: Electron.App): void => {
	if (process.defaultApp) {
		if (process.argv.length >= 2) {
			app.setAsDefaultProtocolClient("saberfy", process.execPath, [
				path.resolve(process.argv[1]),
			]);
		}
	} else {
		app.setAsDefaultProtocolClient("saberfy");
	}
};
