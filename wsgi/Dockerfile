FROM python:3.9-bullseye
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /wsgi
WORKDIR /wsgi
COPY req.txt .
RUN pip3 install -r req.txt


COPY . /wsgi

CMD gunicorn cats.wsgi:application --bind 0.0.0.0:3002