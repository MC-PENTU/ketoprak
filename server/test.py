import os
import dotenv

# Check if the .env file exists
dotenv.load_dotenv()
print(os.getenv('OPENAI_API_KEY'))
