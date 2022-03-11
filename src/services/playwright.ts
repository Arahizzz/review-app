import { Command } from "@tauri-apps/api/shell";
import { fs } from "@tauri-apps/api";
import { cacheDir, join } from "@tauri-apps/api/path";
import { createDir, writeFile } from "@tauri-apps/api/fs";


export async function runPlaywright() {
    const cache = await cacheDir();
    const filePath = await join(cache, 'review-app', 'config.json');
    await writeFile({ path: filePath, contents: 
        '{"coords": {"lat": 55.7581388,"long": 37.667507,"zoom": 12},"searchQuery": "Рестораны","reviews": ["Нет войне","Митинг 14:00"]}' });
    
    const command = Command.sidecar('bin/review-poster', filePath);
    command.stdout.on('data', c => console.log(c));
    command.stderr.on('data', (e) => console.log(e));
    command.on('error', (e) => console.log(e));
    command.on('close', (c) => console.log('Browser closed'));

    await command.execute();
}