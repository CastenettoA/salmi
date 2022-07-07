echo "*** automatic git push, build and deploy to ca.com ***"
echo "*** GIT PUSH ***"
git add .
git commit -m 'automatic deploy baby' #todo: add a commit message
git push

echo "*** BUILD DIST ***"
npm run build

echo "*** MOVE DIST /salmi ***"
rm -rf ../castenettoa.com/src/app/salmi
cp -r ./dist/app/salmi ../castenettoa.com/src/app/

echo "*** PUSH ca.com ***"
git -C ../castenettoa.com add .
git -C ../castenettoa.com commit -m 'automatic deploy from app 'salmi' baby' #todo: add a commit message
git -C ../castenettoa.com push

echo "*** WELL DONE *** "

#HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
# ./myscript myargument
# myargument becomes $1 inside myscript.