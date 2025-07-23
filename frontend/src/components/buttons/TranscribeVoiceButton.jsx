import { useRef, useState } from 'react';
import DownloadModal from "../recordingUI/DownloadModal";
import SkeletonModal from "../recordingUI/SkeletonModal";

export default function VoiceTranscriptionButton() {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
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
        setUploading(true); // Show Skeleton Modal
        const response = await fetch('https://voiceworkoutlogger-webapp.onrender.com/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'latest_workout_log.xlsx';
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          // setDownloadReady(true); // Trigger DownloadModal
        }
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setUploading(false); // Hide Skeleton Modal
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
    window.open('https://voiceworkoutlogger-webapp.onrender.com/download', '_blank');
  };

  return (
    <div className="flex flex-col items-center m-4 space-y-4">
      {/* ✅ Record Button */}
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`
          relative
          w-40 h-40
          rounded-full border-2 border-[#733AEE]
          hover:cursor-pointer
          hover:animate-pulse
          transition-all duration-300
          shadow-[0_0_10px_#733AEE]
          ${recording ? "shadow-[0_0_25px_#733AEE]" : ""}
        `}
      >
        {recording && (
          <span
            className="absolute inset-0 rounded-full bg-[#733AEE] opacity-20 animate-ping pointer-events-none"
          />
        )}
      </button>

      <span className="font-medium sm:text-md text-gray-600 mt-2">
        {recording ? "Recording..." : "Click to Record"}
      </span>

      {/* Show SkeletonModal when uploading */}
      {uploading && <SkeletonModal />}

      {/* Show DownloadModal when ready */}
      {downloadReady && (
        <DownloadModal
          onClose={() => setDownloadReady(false)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}