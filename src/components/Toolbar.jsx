import React from 'react';

export default function Toolbar({
  onOpenFolder,
  onSelectOutputFolder,
  current,
  total,
  outputFolder
}) {
  return (
    <div className="bg-zinc-900 border-b border-zinc-700 p-4 flex items-center justify-between">
      <div className="flex gap-3">
        <button
          onClick={onOpenFolder}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Open Images Folder
        </button>

        <button
          onClick={onSelectOutputFolder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Select Output Folder
        </button>
      </div>

      <div className="text-white text-sm">
        {outputFolder
          ? `Saving To: ${outputFolder}`
          : 'No Output Folder Selected'}
      </div>

      <div className="text-white font-medium">
        {current} / {total}
      </div>
    </div>
  );
}