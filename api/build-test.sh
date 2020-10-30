#! /bin/sh
echo Installing dependencies...
yarn --cwd ./api install
echo Testing API
yarn --cwd ./api test

echo Building and Deploying
yarn serverless deploy | 
