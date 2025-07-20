import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function SkeletonModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-600 rounded-full p-3">
            <CheckCircleIcon className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Transcribing Audio</h2>

        {/* Description */}
        <p className="text-sm text-white mb-6">
          Your file has been successfully transcribed. Click below to download it.
        </p>

        {/* Action Button */}
        <button
          className="w-full bg-gray-600 text-gray-600 font-semibold py-2 rounded-2xl transition"
        >
          Download File
        </button>
      </div>
    </div>
  );
}