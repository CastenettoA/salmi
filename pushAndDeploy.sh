echo "*** automatic git push, build and deploy to ca.com ***"
echo "*** GIT ***"
git add .
git commit -m 'automatic deploy baby'
git push

echo "*** git ok, now BUILD ***"
npm run build
rm -rf ../castenettoa.com/src/app/salmi
cp ./dist/app/salmi ../castenettoa.com/src/app/