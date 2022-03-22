#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR=$SCRIPT_DIR/..

cd $ROOT_DIR
npm i

cd $ROOT_DIR/review-poster 
npx tsc
npx pkg $ROOT_DIR/review-poster -o $ROOT_DIR/src-tauri/bin/review-poster  

cd $ROOT_DIR 
node $SCRIPT_DIR/move-binary.mjs