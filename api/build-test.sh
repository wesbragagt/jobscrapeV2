#! /bin/sh
echo Building Serverless API;
yarn install --frozen-lockfile;
echo Testing API;
yarn test;
