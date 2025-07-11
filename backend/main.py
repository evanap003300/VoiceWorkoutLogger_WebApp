from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from voice_to_wav import record_audio
from speech_to_text import transcribe_audio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def main():
    return {"message": "Hello World"}

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/transcribe")
def transcribe_voice():
    try:
        record_audio()  
        transcribe_audio()
        return {"message": "Transcription complete"}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    main()
