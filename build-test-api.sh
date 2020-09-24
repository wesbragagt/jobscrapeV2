#! /bin/sh
echo Building Serverless API;
cd ./api && yarn install --frozen-lockfile;
echo Testing API;
cd ./api && yarn test;
