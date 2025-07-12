import React, { useRef, useState } from 'react';

export default function VoiceTranscriptionButton() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

      // Send to backend
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      try {
        await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });
      } catch (err) {
        // Optionally handle error
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <button onClick={recording ? stopRecording : startRecording} className="my-button-class">
      {recording ? 'Stop Recording' : 'Start Recording'}
    </button>
  );
}