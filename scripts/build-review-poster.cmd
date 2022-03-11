@echo off

SET SCRIPT_DIR=%~dp0
SET ROOT_DIR=%SCRIPT_DIR%\..

cd %ROOT_DIR%\review-poster && npm i
tsc --project %ROOT_DIR%\review-poster
pkg %ROOT_DIR%\review-poster -o %ROOT_DIR%\src-tauri\bin\review-poster
cd %ROOT_DIR% && node %SCRIPT_DIR%\move-binary.mjs