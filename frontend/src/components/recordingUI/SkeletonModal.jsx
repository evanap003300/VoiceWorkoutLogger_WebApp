export default function SkeletonModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl flex items-center space-x-4">
        <div className="w-6 h-6 bg-gray-300 rounded-full animate-ping" />
        <span className="text-gray-700">Processing...</span>
      </div>
    </div>
  );
}