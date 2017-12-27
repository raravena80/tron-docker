# tron-docker

Full runnable Dockerfile for [Tron Scheduler](https://github.com/Yelp/Tron)

## Build

```
(sudo) docker build -t tron .
```

## Run

```
(sudo) sudo docker run -d -e USER=tron -e SSH_AUTH_SOCK=$SSH_AUTH_SOCK -v /var/lib:/var/lib -v /var/log:/var/log -v /dev/log:/dev/log -P -p 8089:8089 tron:latest
```

## Notes

If you want to have the web interface expose to the outside you need to start the Docker daemon with the `--ip` option matching your interface IP address.

```
/usr/bin/dockerd -H fd:// --ip=<external-ip>
``` 
