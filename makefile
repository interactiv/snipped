test: 
	@NODE_ENV=testing jasmine-node test --verbose --captureExceptions &
run: 
	@node_modules/.bin/node-supervisor -e 'js|less'  --ignore 'node_modules' -p 2000 app.js &
install:
	@npm install
deploy: commit
	@git push heroku
# command || true will ignore command errors
commit:
	@git add .
	@git commit -am"update `date`" || true
push: commit
	@git push origin --all

.PHONY: run test
