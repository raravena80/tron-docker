# This is about half the size of the Ubuntu image
FROM alpine:latest

RUN     apk add --no-cache ca-certificates

RUN set -x \
	&& apk add --no-cache \
		python python-dev py2-pip \
		curl g++ libressl-dev \
		libffi-dev openssh yaml-dev \
	&& adduser -D -g "" tron \
	&& pip install --upgrade pip \
	&& pip install wheel \
	&& pip install tron \
        && echo "Build finished."


ADD cs /usr/local/lib/python2.7/dist-packages/tronweb/js/cs

# This in case you want logs and/or config in the container
# Not recommended
RUN mkdir -p /var/log/tron
RUN mkdir -p /var/lib/tron
VOLUME /var/log
VOLUME /var/lib
# Logging
VOLUME /dev/log

EXPOSE 8089
USER tron
WORKDIR /home/tron

ENTRYPOINT ["trond", "--nodaemon", "-H", "0.0.0.0"]
