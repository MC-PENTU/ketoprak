from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import os
import dotenv

dotenv.load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_MODEL = "gpt-3.5-turbo-0125"
TEMPERATURE = 0

def main():
    # Setup the LLM
    llm = ChatOpenAI(
        model=OPENAI_MODEL,
        temperature=TEMPERATURE,
        api_key=OPENAI_API_KEY)
    
    messages=[
        ("system", "Hello you are a 50 years old dad, and so you are an expert in a dad jokes!"),
        ("human", "Give me a hilarious dad joke!"),
    ]
        
    response = llm.invoke(messages)
    print(f"Response: {response.content} \n")
    print(f"Using {response.response_metadata['token_usage']['total_tokens']} tokens for this prompt.")

if __name__=="__main__":
    main()
    