import React, { useRef, useState } from 'react';

export default function VoiceTranscriptionButton() {
  const [recording, setRecording] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
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

      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');

      try {
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setDownloadReady(true);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleDownload = () => {
    window.open('http://localhost:8000/download', '_blank');
  };

  return (
    <div className="flex flex-col items-center m-4 space-y-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className="bg-gray-800 text-green-500 hover:text-white border border-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {downloadReady && (
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download Excel File
        </button>
      )}
    </div>
  );
}