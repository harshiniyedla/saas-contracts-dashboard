import { useState } from "react";

export default function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);

  if (!isOpen) return null;

  const handleFiles = (event) => {
    const selected = Array.from(event.target.files).map((file) => ({
      file,
      status: "Uploading",
    }));
    setFiles((prev) => [...prev, ...selected]);

    selected.forEach((f, index) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((pf) => (pf === f ? { ...pf, status: "Success" } : pf))
        );
      }, 1000 + index * 500);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).map((file) => ({
      file,
      status: "Uploading",
    }));
    setFiles((prev) => [...prev, ...dropped]);

    dropped.forEach((f, index) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((pf) => (pf === f ? { ...pf, status: "Success" } : pf))
        );
      }, 1000 + index * 500);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Upload Files</h2>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-dashed border-2 border-gray-300 p-6 text-center rounded mb-4 cursor-pointer"
        >
          Drag & drop files here <br /> or{" "}
          <label className="text-teal-500 hover:underline cursor-pointer">
            browse
            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="hidden"
            />
          </label>
        </div>

        <ul className="space-y-2 max-h-48 overflow-y-auto mb-4">
          {files.map((f, i) => (
            <li
              key={i}
              className={`p-2 rounded border ${
                f.status === "Uploading"
                  ? "bg-yellow-100"
                  : f.status === "Success"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              {f.file.name} - {f.status}
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
