# backend/main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
from speech_to_text import transcribe_audio
from build_json import build_json
from export_to_excel import export_workout_to_excel
from fastapi.responses import FileResponse
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "voice-workout-logger-web-app.vercel.app",
        "https://voiceworkoutlogger-webapp.onrender.com",
        '*' # Remove this later
    ],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "OK"}


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

    # Path to the generated Excel file
    excel_path = os.path.join("output", "latest_workout_log.xlsx")  # Adjust if yours differs

    # Return it as a downloadable file
    return FileResponse(
        excel_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="latest_workout_log.xlsx"
    )

'''
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        output_path = "output.wav"
        with open(output_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        transcribe_audio()
        build_json()
        export_workout_to_excel()

        excel_path = os.path.join("output", "latest_workout_log.xlsx")
        return FileResponse(
            excel_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename="latest_workout_log.xlsx"
        )
    except Exception as e:
        return {"error": str(e)}
'''

@app.post("/test-cors")
async def test_cors():
    return {"message": "POST works and CORS works!"}
    
@app.get("/download")
def download_excel():
    file_path = os.path.join(os.path.dirname(__file__), 'output', 'latest_workout_log.xlsx')
    return FileResponse(
        path=file_path,
        filename="workout_log.xlsx",
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )