#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR=$SCRIPT_DIR/..

cd $ROOT_DIR/review-poster && npm i
cd $ROOT_DIR && npm run tsc-review-poster
pkg $ROOT_DIR/review-poster -o $ROOT_DIR/src-tauri/bin/review-poster    
cd $ROOT_DIR && node $SCRIPT_DIR/move-binary.mjs