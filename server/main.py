from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from supabase import create_client, Client
from pydantic import BaseModel
from neo4j import GraphDatabase
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Load environment variables from .env file
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase URL and Key must be set in the environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Neo4j configuration
# NEO4J_URI = os.getenv("NEO4J_URI")
# NEO4J_USER = os.getenv("NEO4J_USER")
# NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

# driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# CORS configuration
origins = [
    "http://localhost:3000",  # Your frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    password: str
    
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": form_data.username,
            "password": form_data.password
        })
        if response.user is None:
            logger.error(f"Login failed: {response.error.message}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except Exception as e:
        logger.exception("Unexpected error during login")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": response.session.access_token, "token_type": "bearer"}

@app.post("/signup")
def signup(user: User):
    logger.info(f"Sign up attempt for user: {user.email}")
    response = supabase.auth.sign_up({
        "email": user.email,
        "password": user.password
    })
    if response.user is None:
        logger.error(f"Sign up failed for user: {user.email} with error: {response.error.message}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create user: {response.error.message}"
        )
    logger.info(f"Sign up successful for user: {user.email}")
    return {"message": "User created successfully"}

@app.get("/users/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    logger.info("Fetching user info with token")
    try:
        response = supabase.auth.get_user(token)
        if response.user is None:
            logger.error("Invalid token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except Exception as e:
        logger.exception("Unexpected error during user info retrieval")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )
    logger.info("User info retrieved successfully")
    return response.user

@app.get("/history")
def get_history(token: str = Depends(oauth2_scheme)):
    logger.info("Fetching chat history")
    try:
        response = supabase.auth.get_user(token)
        if response.user is None:
            logger.error("Invalid token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except Exception as e:
        logger.exception("Unexpected error during token validation")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = response.user.id  
        data = supabase.table("chat_history").select("*").eq("user_id", user_id).execute()    
        chat_history = data.data
        logger.info("Chat history retrieved successfully")
        if not chat_history:
            return {"message": "No chat history found for the user"}
        print(data.data)
        print(data.error)
        return chat_history
    
    except Exception as e:
        logger.exception("Unexpected error during fetching chat history")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching chat history"
        )

def process_with_langchain(file_content: str) -> str:
    # Replace this with actual LangChain processing logic
    # Here we assume it returns a string after processing
    processed_data = file_content  # This should be replaced with actual processing
    return processed_data

def store_in_neo4j(data: str):
    with driver.session() as session:
        session.run("CREATE (n:Data {content: $content})", content=data)

@app.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Read the file content
        content = await file.read()
        file_data = content.decode("utf-8")

        # Process the file with LangChain
        processed_data = process_with_langchain(file_data)

        # Store the processed data in Neo4j
        store_in_neo4j(processed_data)

        return {"status": "success"}

    except Exception as e:
        logger.exception("Unexpected error during file upload processing")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
