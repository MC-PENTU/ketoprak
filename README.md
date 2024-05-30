# KETOPRAK (Knowledge Extraction and Threat Operations Platform for Real-time Analysis and Knowledge)

KETOPRAK is a ...

## Project Setup

### Prerequisites
- Install conda

### Steps
```bash
# Create a new conda environment with python 3.11
conda create --name <venv_name> -c conda-forge python=3.11
```

Restart your terminal then  continue with the steps

```bash
# Activate your new conda environment
conda activate <name>

# Install requirements
pip install -r requirements.txt
```

### Note for Developers

Since this project is currently not dockerized, please install the python dependencies everytime you pull from github

```bash
pip install -r requirements.txt 
```
