default:
	# Commands:
	#     - install
	#     - build
	#     - start
	#     - stop

install:
	@npm install
	@bower --allow-root install

build:
	@rm -rf public
	@broccoli build public

sync:
	@node sync.js

start:
	@nohup node app.js & \
	echo $$! | tee server.pid

PID = $(shell cat server.pid)
stop: server.pid
	@kill -9 $(PID)
