FROM python:3.9-bullseye
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /asgi
WORKDIR /asgi
COPY req.txt .
RUN pip3 install -r req.txt


COPY . /asgi

CMD python -m gunicorn config.asgi:application -k uvicorn.workers.UvicornWorker -b 0.0.0.0:3001

