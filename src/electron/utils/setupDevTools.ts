import * as fs from "fs";
import * as path from "path";

export const setupDevTools = (app: Electron.App, width: number): void => {
	const userDataPath = app.getPath("userData");
	const prefPath = path.join(userDataPath, "Preferences");
	const prefs = JSON.parse(fs.readFileSync(prefPath, "utf-8"));

	prefs?.electron?.devtools &&
		(prefs.electron.devtools = {
			preferences: {
				"InspectorView.splitViewState": JSON.stringify({
					vertical: { size: width },
				}),
			},
		});

	fs.writeFileSync(prefPath, JSON.stringify(prefs));
};
