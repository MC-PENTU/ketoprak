FROM python:3.9-slim

WORKDIR /server

COPY ../requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY ./server /server

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
