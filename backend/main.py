# backend/main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
from speech_to_text import transcribe_audio
from build_json import build_json
from export_to_excel import export_workout_to_excel
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
    build_json()
    export_workout_to_excel()
    return {"filename": file.filename, "status": "saved"}