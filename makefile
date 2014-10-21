test: ./test/*.js
	@node_modules/.bin/mocha -u tdd
	@make commit
run: 
	@node_modules/.bin/node-supervisor -e 'js|less'  --ignore 'node_modules' -p 2000 app.js &
install:
	@npm install
deploy: commit
	@git push openshift
# command || true will ignore command errors
commit:
	@git add .
	@git commit -am"update `date`" || true
push: commit
	@git push origin --all

.PHONY: install run
