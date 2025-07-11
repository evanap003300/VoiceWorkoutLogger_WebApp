import sounddevice as sd
import numpy as np
import scipy.io.wavfile as wav
import threading
import queue
import sys

def record_audio(filename="output.wav", samplerate=44100):
    """Record audio from microphone and save to WAV file."""
    # Initialize recording queue and event
    q = queue.Queue()
    recording = threading.Event()
    recording.set()  # Start in recording state

    # Callback function to handle audio input
    def callback(indata, frames, time, status):
        if status:
            print(status)
        if recording.is_set():
            q.put(indata.copy())

    # Start the recording stream
    try:
        with sd.InputStream(samplerate=samplerate, channels=1, callback=callback):
            print("Recording started...")
            
            # Wait for Enter key to stop recording
            input()
            recording.clear()
            
            # Collect all recorded chunks
            chunks = []
            while not q.empty():
                chunks.append(q.get())

        # Convert to numpy array and save
        audio_data = np.concatenate(chunks, axis=0)
        wav.write(filename, samplerate, audio_data)
        print(f"\nRecording saved to {filename}")

    except Exception as e:
        print(f"\nError during recording: {e}")
        sys.exit(1)

# Example usage:
# record_audio(filename="output.wav", samplerate=44100)
