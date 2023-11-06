import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

import os
from openai import OpenAI

import uvicorn
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Replace with your React app's URL
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


class MessageItem(BaseModel):
    role: str
    content: str


class ChatCompletionRequest(BaseModel):
    messages: list[MessageItem]

# Define the endpoint for generating completions


@app.post("/generate-text")
async def generate_text(request_body: ChatCompletionRequest):
    try:
        start_time = time.time()
        # Generate a completion using OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=request_body.messages,
            temperature=1,

        )
        response_time = time.time() - start_time
        print(
            f"Full response received {response_time:.2f} seconds after request")
        print(f"Full response received:\n{response}")
        # Return the response from OpenAI as JSON
        return response

    except Exception as e:
        print(e)
        # Handle any errors and return an HTTP 500 error response
        raise HTTPException(status_code=500, detail=str(e))


class StreamRequest(BaseModel):
    messages: list


@app.post('/stream')
async def stream(req: StreamRequest):
    return StreamingResponse(get_openai_generator(req.messages), media_type='text/event-stream')

async def get_openai_generator(messages):
    try:
        # Generate a completion stream using OpenAI API
        openai_stream = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            stream=True
        )
        for event in openai_stream:
            print(event)
            # if "content" in event["choices"][0].delta:
            #     current_response = event["choices"][0].delta.content
            #     yield "data: " + current_response + "\n\n"
    
    except Exception as e:
        print(e)
        # Handle any errors and return an HTTP 500 error response
        raise HTTPException(status_code=500, detail=str(e))
    
