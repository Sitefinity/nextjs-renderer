# Building & Releasing the framework
Install the modules:
``` bash
npm install
npm run build

# Increment version in package.json file
# Manual step copy package.json to dist

cd ./dist
npm pack --pack-destination ../build

```
