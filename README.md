# 🛡️ KETOPRAK (Knowledge Extraction and Threat Operations Platform for Real-time Analysis and Knowledge) 🛡️

## 🚀 LifeHack 2024 🚀

## Problem Statement

Reports and articles on terrorism usually contain a lot of text, which are unstructured and difficult to resolve across reports in an automated fashion. The project aims to design and implement an LLM that can extract entities from these reports into a knowledge graph and answer questions based on the generated knowledge graph.

## Overview

KETOPRAK is a platform designed to enhance internal security by leveraging advanced technologies to analyze and extract knowledge from unstructured text, particularly related to terrorism. The system converts reports and articles into a structured knowledge graph, enabling efficient querying and analysis through a chatbot interface.

## Project Setup

### System Architecture

![System Architecture](https://raw.githubusercontent.com/MC-PENTU/ketoprak/d17ff4d400cbe5aa7e6a791469958c108da2825e/telegram-cloud-photo-size-5-6251500787284950665-x.jpg)
### Frontend

1. Navigate to the frontend directory.
2. Install dependencies and run the development server:
```
npm install
npm run dev
```

### Backend

#### Prerequisites

- Install conda
- Docker installed

#### Steps

1. Create a new conda environment with Python 3.11:
```
conda create --name <venv_name> -c conda-forge python=3.11
```
2. Restart your terminal and activate the new environment:
```
conda activate <venv_name>
```
3. Install the required Python packages:
```
pip install -r requirements.txt
```
4. Initialize the Graph Database:
```
docker run \\
   -p7474:7474 \\
   -p7687:7687 \\
   -d \\
   -e NEO4J_AUTH=neo4j/secretgraph \\
   -e NEO4J_apoc_export_file_enabled=true \\
   -e NEO4J_apoc_import_file_enabled=true \\
   -e NEO4J_apoc_import_file_use__neo4j__config=true \\
   -e NEO4JLABS_PLUGINS=["apoc"] \\
   neo4j:latest
```
5. Run the FastAPI server:
```
uvicorn main:app --reload
```
### Note for Developers

- Install the Python dependencies every time you pull from GitHub:
```
pip install -r requirements.txt
```
- To build and run the project using Docker Compose:
```
docker-compose up --build
```
## Tech Stack

- 🖥️ Frontend: Next.js
- 🖥️ Backend: FastAPI
- 🛢️ Database: Supabase (for storing prompts and responses), Neo4j (for querying knowledge graph)
- 🧠 LLM Integration: LangChain

## Team Members

- Edmerson Low Soon Xiang (Year 3, NTU)
- Kevin Jonathan Kusnomo (Year 2, NTU)
- Bryan Noel Salindeho (Year 3, NTU)
- Francis Nathan Wijaya (Year 3, NTU)

## Project Components

### SATE (Security Analysis and Threat Evaluation)

A subsystem designed for the analysis and evaluation of security threats.

### KETOPRAK

A subsystem focusing on the extraction and operationalization of knowledge in real-time, particularly from reports related to terrorism.

## Directory Structure

### Client
```
client/
├── ketoprak-client/
│   ├── .next/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── home/
│   │   │   ├── input-data/
│   │   │   ├── login/
│   │   │   └── page.js
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── auth.js
│   │   │   └── Chatbot.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── components.json
│   ├── Dockerfile
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package-lock.json
│   └── package.json
```
### Server
```
server/
├── __pycache__/
├── .env
├── .gitignore
├── articles_parser.py
├── articles.txt
├── Dockerfile
├── graph_db.py
├── infer.py
├── main.py
├── model.ipynb
├── model.py
├── README.md
├── test.py
├── test.txt
├── .env.example
├── docker-compose.yml
├── README.md
├── requirements.txt
└── test.txt
```
