from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your React app's URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

# Define the endpoint for generating completions
@app.post("/generate-text")
async def generate_text(prompt: str, max_tokens: int = 50):
    try:
        # Generate a completion using OpenAI API
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",
            prompt=prompt,
            max_tokens=max_tokens,
        )
        
        # Return the response from OpenAI as JSON
        return response
    
    except Exception as e:
        # Handle any errors and return an HTTP 500 error response
        raise HTTPException(status_code=500, detail=str(e))