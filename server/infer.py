from model import ArticleLLM
from graph_db import neo4j_delete_all, neo4j_add_query, neo4j_num_element
import dotenv
import os

# parameters and constants
dotenv.load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_MODEL = "gpt-3.5-turbo-0125"
TEMPERATURE = 0

URI = os.getenv('NEO4J_URI')
AUTH = (os.getenv('NEO4J_USER'), os.getenv('NEO4J_PASSWORD'))

def get_llm_config():
    return (OPENAI_MODEL, OPENAI_API_KEY, TEMPERATURE)

def get_neo4j_config():
    return (URI, AUTH)

def run(article, index=0):
    # parsing input
    llm_config = get_llm_config()
    model = ArticleLLM(*llm_config)
    response = model.inference(article)
    print(response)

    # adding query to neo4j
    neo4j_config = get_neo4j_config()
    print(neo4j_config)
    neo4j_add_query(*neo4j_config, response)
    print(f"Added query_{index} to Neo4j")
    return