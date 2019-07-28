cd env2/lib/python3.6/site-packages
zip -r9 ${OLDPWD}/lambda.zip .
cd $OLDPWD
zip -g lambda.zip *.py
aws lambda update-function-code --function-name yuuvis2019 --zip-file fileb://lambda.zip
