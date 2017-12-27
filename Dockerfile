FROM ubuntu:16.04

RUN apt-get update > /dev/null && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      curl \
      net-tools \
      telnet \
      python \
      python-dev \
      python-setuptools \
      python-pip \
      libffi-dev \
      libssl-dev  \
      ssh \
      g++ \
      libyaml-dev && \
      adduser --disabled-password --gecos "" tron && \
      pip install --upgrade pip && \
      pip install wheel && \
      pip install tron

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
