FROM python:3.10

EXPOSE 80

WORKDIR /app

COPY . /app

RUN pip install poetry
RUN poetry install

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
