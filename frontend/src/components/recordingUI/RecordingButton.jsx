import { useState } from "react";

export default function RecordingButton() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <button
      onClick={() => setIsRecording(!isRecording)}
      className={`
        relative
        w-40 h-40
        rounded-full border-2 border-[#733AEE]
        hover:cursor-pointer
        hover:animate-pulse
        transition-all duration-300
        shadow-[0_0_10px_#733AEE]
        ${isRecording ? "shadow-[0_0_25px_#733AEE]" : ""}
      `}
    >
      {isRecording && (
        <span
          className="absolute inset-0 rounded-full bg-[#733AEE] opacity-20 animate-ping pointer-events-none"
        />
      )}
    </button>
  );
}