@echo off
setlocal enabledelayedexpansion
call %~dp0.heroku-cli\bin\heroku %*
