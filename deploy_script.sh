#!/usr/bin/env bash
## gets run on host server
# Instantly exists our script whenever an error occurs
set -e

# Where to deploy our site on our server
cd ../build.zip
unzip -o build.zip
cd build || exit

# Build the docker image
if [ ! "$(docker ps -q -f name=datahub-spotlights)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=datahub-spotlights)" ]; then
        # cleanup
        docker stop datahub-spotlights
        docker rm datahub-spotlights
        docker rmi datahub-spotlights-image
    fi
    # run container
    docker-compose build
    docker-compose up -d
fi
#docker run -d -p 3000:3000 --name datahub-spotlights -e ASSETS_SOURCE_URL="$ASSETS_SOURCE_URL" datahub-spotlights-image:latest
# clean up scripts


cd ~
rm -rf deploy_spotlights
