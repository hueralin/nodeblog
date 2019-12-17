#!/bin/sh
cd /e/Myfiles/ForFuture/Blog-1/logs/
cp access.log $(date +%Y-%m-%d-%H).access.log
echo "" > access.log