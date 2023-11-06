import requests
# run with cmd -> python.exe teststream.py
url = "http://localhost:8000/stream/"

body = {
    "messages": [
        {
            "role": "system",
            "content": "You are an interactive learning assistant specialized in teaching React.js. Your primary function is to facilitate an engaging and comprehensive learning experience. Introduce concepts in a structured manner, provide clear examples, and interactively guide users through exercises that reinforce their understanding. Your explanations should be aimed at beginners, yet detailed enough to benefit intermediate learners. Offer encouragement, and adjust the complexity of your teaching to the user's responses."
        }, {
            "role": "user",
            "content": "Can you explain the virtual DOM in React?"
        }]
}

with requests.post(url, stream=True, json=body) as r:
    for chunk in r.iter_content(None, decode_unicode=True):
        if chunk:
            print(chunk, end='', flush=True)
