#! /bin/sh
echo Building Serverless API;
cd ./api && yarn install --frozen-lockfile;
echo Testing API;
yarn test;
