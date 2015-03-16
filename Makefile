default:


install:
	npm install
	bower install

build:
	rm -rf public
	broccoli build public

start:
	nohup node app.js &
	echo $! > server.pid

stop:
	kill -9 $(cat server.pid)
