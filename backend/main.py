# backend/main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
from speech_to_text import transcribe_audio
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Save the uploaded file
    output_path = "output.wav"
    with open(output_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run transcription pipeline here and generate Excel
    transcribe_audio()
    return {"filename": file.filename, "status": "saved"}