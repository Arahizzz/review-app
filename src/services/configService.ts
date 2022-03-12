import { open as openDialog, save as saveDialog } from "@tauri-apps/api/dialog";
import { readTextFile, writeFile } from "@tauri-apps/api/fs";
import { Config } from "review-poster/models/config";

export async function loadConfig() {
    const path = await openDialog({
        filters: [{ extensions: ['json'], name: 'JSON Config file' }],
        multiple: false,
        title: 'Load Config File'
    }) as string;
    if (!path) return null;
    const file = await readTextFile(path);
    return JSON.parse(file) as Config;
}

export async function saveConfig(config: Config) {
    const path = await saveDialog({
        filters: [{ extensions: ['json'], name: 'JSON Config file' }],
        title: 'Save Config File'
    });
    if (path)
        await writeFile({ path, contents: JSON.stringify(config) });
}