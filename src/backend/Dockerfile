FROM ubuntu:20.04

MAINTAINER Debdut Goswami

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev libmysqlclient-dev netcat \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip \
  && mkdir /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY requirements.txt .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "lenzo.asgi:application"]
