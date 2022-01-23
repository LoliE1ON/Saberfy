export function validateFolderName(string: string): string {
	return string.replace(/[\\/:"*?<>|]/g, "");
}
