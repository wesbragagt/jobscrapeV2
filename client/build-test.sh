#! /bin/sh
echo Building React app;
yarn --cwd ./client install;
echo Testing React app;
yarn --cwd ./client test;