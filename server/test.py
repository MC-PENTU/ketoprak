import os
import dotenv


if __name__=="__main__":
    # Check if the .env file exists
    dotenv.load_dotenv()
    print("Your OpenAI API Key: ", os.getenv('OPENAI_API_KEY'))