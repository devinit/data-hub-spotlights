#!/bin/bash
mkdir -p ~/spotlights
cd ~/spotlights || exit

rm -rf build.zip build

wget https://github.com/devinit/data-hub-spotlights/releases/download/$1/build.zip

echo 'finished downloading tag: $tag'

unzip build.zip

cd build || exit

docker build -t di-spotlights .

docker stop di-spotlights-latest

docker rm di-spotlights-latest

docker run -it -d -p 80:3000 --name di-spotlights-latest -e CMS_URL="$2" di-spotlights