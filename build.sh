#!/bin/bash
rm -rf build.zip build

yarn install
yarn build

echo "build complete... bundling"

mkdir build && mv .next build/ && mv public build/ && mv dist/* build/ && mv package.json build/ && mv yarn.lock build/ && mv Dockerfile build/

zip -q -r build.zip build

echo "bundling complete... returning repo to original state"

git reset .
git checkout .

rm -rf build

echo "DONE!"