# Server Side

## Project Setup
Use the test.py to test whether the virtual environment

Initialize DB

``` bash
docker run \
   -p7474:7474 \
   -p7687:7687 \
   -d \
   -e NEO4J_AUTH=neo4j/secretgraph \
   neo4j:latest
```

## Tech Stack

