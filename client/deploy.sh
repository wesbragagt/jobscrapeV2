#! /bin/sh
export CI=true
export NODE_ENV=production

echo Building React app;
yarn --cwd ./client install;
echo Testing React app;
yarn --cwd ./client test;

echo building react app
yarn --cwd ./client build

echo deploying to netlify
netlify deploy