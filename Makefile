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

clean:
	@rm -rf public
	@rm -rf tmp

sync:
	@node sync.js

start:
	@rm -f nohup.out
	@nohup node app.js & \
	echo $$! | tee server.pid

PID = $(shell cat server.pid)
stop: server.pid
	@kill -9 $(PID)
	@rm -f server.pid
