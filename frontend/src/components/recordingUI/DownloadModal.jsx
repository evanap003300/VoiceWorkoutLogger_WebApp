export default function DownloadModal({ onDownload }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center space-y-4">
        <h2 className="text-xl font-semibold">Your file is ready!</h2>
        <button
          onClick={onDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download Excel File
        </button>
      </div>
    </div>
  );
}