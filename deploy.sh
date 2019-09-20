git checkout .
git pull
yarn
yarn run build
rm -rf /root/koa-elm/public/element
cp -r dist /root/koa-elm/public/element