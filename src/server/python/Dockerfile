FROM python:3.10-alpine

EXPOSE 8000

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "app:app", "--host", "0.0.0.0"]
