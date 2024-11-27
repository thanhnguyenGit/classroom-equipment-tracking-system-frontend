#!/usr/bin/env bash

. /etc/os-release


check_docker_for_unix() {
if ! command -v docker &> /dev/null; then
	echo "Docker is not installed. Tai docker chua thang ngu?."
	exit 1
else 
	echo "Docker is installed."
fi

if curl -s --unix-socket /var/run/docker.sock http/_ping 2>&1 >/dev/null; then
	echo "Docker is not running. Bat docker len thang ngu"
	exit 1
else 
	echo "Docker daemon is running"
fi
echo "Docker is installed on this UNIX-base machine"
}

check_docker_for_window() {
if ! command -v docker &> /dev/null; then
	echo "Docker is not installed. Tai docker chua thang ngu?."
	exit 1
fi 

if ! docker info &> /dev/null; then
	echo "Docker is not runnig. Bat docker len thang ngu"
	exit 1
fi
echo "Docker is installed on this Windows base machine"
}

docker_build_and_run() {
echo "Docker building the image... <3"
sudo docker build -t app-fe:dev .

echo "Running the docker container..>:)"
sudo docker run -p 5173:5173 app-fe:dev

echo "Cleaning up dangdling images..:0"
sudo docker image prune -f
}
# TODO: add check of WSL and MacOS later
case $NAME in 
	Ubuntu) 
	echo "this is machine run Ubuntu!"
	check_docker_for_unix	
	;;
	*) echo "this is unknown distribution."
	;;
esac

docker_build_and_run


