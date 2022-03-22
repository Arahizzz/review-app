$ROOT_DIR="$PSScriptRoot\.."

Set-Location $ROOT_DIR
npm i

Set-Location "$ROOT_DIR\review-poster" 
npx tsc
npx pkg "$ROOT_DIR\review-poster"  -o "$ROOT_DIR\src-tauri\bin\review-poster"

Set-Location $ROOT_DIR 
node "$PSScriptRoot\move-binary.mjs"