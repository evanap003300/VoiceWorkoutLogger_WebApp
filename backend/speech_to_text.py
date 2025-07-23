from faster_whisper import WhisperModel
import os 

def transcribe_audio(audio_file: str = "output.wav") -> None:
    """Transcribe audio file to text and save the result."""
    try:
        # Initialize the Whisper model
        model = WhisperModel("base", device="cpu")
        
        print("\nTranscribing audio with Whisper model...")
        segments, info = model.transcribe(audio_file, beam_size=5)
        
        # Collect all text
        full_text = ""
        for segment in segments:
            full_text += " " + segment.text
        
        # Save transcription to file
        base_dir = os.path.dirname(os.path.abspath(__file__))
        text_path = os.path.join(base_dir, 'data/text.txt') # ../data/text.txt
        os.makedirs(os.path.dirname(text_path), exist_ok=True)
        
        with open(text_path, "w") as f:
            f.write(full_text.strip())
        print("\nSaved transcription to output.txt")
        
    except Exception as e:
        print(f"Error during transcription: {e}")
        raise
