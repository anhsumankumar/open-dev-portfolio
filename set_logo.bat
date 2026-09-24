@echo off
setlocal
set /p userLogo="Enter the text for your Navbar Logo (e.g. AK): "
if "%userLogo%"=="" set userLogo=AK

node update_logo.cjs "%userLogo%"

echo.
echo Navbar Logo successfully updated to "%userLogo%"!
echo Press any key to exit...
pause > nul
