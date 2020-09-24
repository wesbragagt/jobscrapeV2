#! /bin/sh
echo Building Serverless API;
yarn --cwd ./api install;
echo Testing API;
yarn --cwd ./api test --detectOpenHandles;
