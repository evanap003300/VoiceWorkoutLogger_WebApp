import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function DownloadModal({ onClose, onDownload }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold hover:cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Download Ready</h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6">
          Your file has been successfully transcribed. Click below to download it.
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            onDownload();
            onClose();
          }}
          className="w-full bg-[#733AEE] hover:bg-[#BCB0FF] text-white font-semibold py-2 rounded-2xl transition hover:cursor-pointer"
        >
          Download File
        </button>
      </div>
    </div>
  );
}