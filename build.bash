# npm ci
# npm run build

cd ./src/nextjs-framework
rm -rf ./dist
tsc
cp ./package.json ./dist/package.json
cd ./dist
npm pack

cd ../../../

rm -rf starter
git clone https://github.com/Gebov/nextjs-renderer-starter.git starter
cp -R -v ./src/app/* ./starter/src/app/*

declare -a filestocopy=(".env.development" ".env.production" "server.js" "package.json" "next.config.js" "next-env.d.ts" "tsconfig.json")

## now loop through the above array
for i in "${filestocopy[@]}"
do
   # or do whatever with individual element of the array
   cp -v ./$i ./starter/$i
done

cd ./starter
npm install ../src/nextjs-framework/dist
npm run build
# copy files
# src/app, env.development, env.production, server.js, package.json, next.config.js, next-env.d.ts, tsconfig.json
