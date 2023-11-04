from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class ChatCompletionRequest(BaseModel):
    messages: list[dict]


@app.get("/")
async def root():
    return {"message": "Hello World"}

# Define the endpoint for generating completions
@app.post("/generate-text")
async def generate_text(request_body: ChatCompletionRequest):
    try:
        # response = {"prompt": request.prompt}
        # Generate a completion using OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=request_body.messages
        )
        
        # Return the response from OpenAI as JSON
        return response
    
    except Exception as e:
        print(e)
        # Handle any errors and return an HTTP 500 error response
        raise HTTPException(status_code=500, detail=str(e))