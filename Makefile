default:


install:
	npm install
	bower install

build:
	rm -rf public
	broccoli build public
