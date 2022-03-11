import { Command } from "@tauri-apps/api/shell";


export async function runPlaywright() {
    console.log('test')
    const command = Command.sidecar('bin/review-poster');
    await command.execute();
}