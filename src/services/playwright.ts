import { Command } from "@tauri-apps/api/shell";
import { cacheDir, join } from "@tauri-apps/api/path";
import { BaseDirectory, createDir, writeFile } from "@tauri-apps/api/fs";
import { Config } from "review-poster/models/config";


export async function runPlaywright(config: Config) {
    const cache = await cacheDir();
    const appFolder = await join(cache, 'review-app');
    await createDir('review-app', {dir: BaseDirectory.Cache, recursive: true});
    const filePath = await join(appFolder, 'config.json');
    await writeFile({ path: filePath, contents: JSON.stringify(config) });
    
    const command = Command.sidecar('bin/review-poster', filePath);
    command.stdout.on('data', c => console.log(c));
    command.stderr.on('data', (e) => console.error(e));
    command.on('error', (e) => console.error(e));
    command.on('close', (c) => console.log('Browser closed'));

    await command.execute();
}