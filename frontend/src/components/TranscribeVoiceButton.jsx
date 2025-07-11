import { ReactMediaRecorder } from "react-media-recorder";
import { useState } from "react";

export default function AudioRecorder() {
  const [status, setStatus] = useState("idle");
  const [transcription, setTranscription] = useState(null);

  const uploadToBackend = async (blobUrl) => {
    setStatus("uploading");

    const blob = await fetch(blobUrl).then((r) => r.blob());
    const file = new File([blob], "recording.webm", { type: blob.type });

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setTranscription(data.text || data.error || "No result");
    setStatus("done");
  };

  return (
    <ReactMediaRecorder
      audio
      onStop={uploadToBackend}
      render={({ startRecording, stopRecording }) => (
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setStatus("recording");
                startRecording();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Start Recording
            </button>
            <button
              onClick={() => {
                stopRecording();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Stop Recording
            </button>
          </div>

          {status === "uploading" && <p className="mt-4">Processing...</p>}

          {status === "done" && (
            <div className="mt-4 bg-gray-100 p-4 rounded w-full max-w-xl text-left">
              <strong>Transcription Result:</strong>
              <pre>{transcription}</pre>
            </div>
          )}
        </div>
      )}
    />
  );
}