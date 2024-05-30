from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import os
import dotenv

OPENAI_MODEL = "gpt-3.5-turbo-0125"

def main():
    # Setup the LLM
    dotenv.load_dotenv()
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    openai_chat = ChatOpenAI(
        model=OPENAI_MODEL,
        api_key=OPENAI_API_KEY)
    
if __name__=="__main__":
    main()
    