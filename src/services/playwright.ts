import { Command } from "@tauri-apps/api/shell";
import { cacheDir, join } from "@tauri-apps/api/path";
import { writeFile } from "@tauri-apps/api/fs";
import { Config } from "review-poster/models/config";


export async function runPlaywright(config: Config) {
    const cache = await cacheDir();
    const filePath = await join(cache, 'review-app', 'config.json');
    await writeFile({ path: filePath, contents: JSON.stringify(config) });
    
    const command = Command.sidecar('bin/review-poster', filePath);
    command.stdout.on('data', c => console.log(c));
    command.stderr.on('data', (e) => console.log(e));
    command.on('error', (e) => console.log(e));
    command.on('close', (c) => console.log('Browser closed'));

    await command.execute();
}