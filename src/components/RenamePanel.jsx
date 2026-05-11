import React, { useEffect, useState } from 'react';

export default function RenamePanel({ image, onRename }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (image) {
      const base = image.name.replace(image.ext, '');
      setName(base);
    }
  }, [image]);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    await onRename(name.trim());
  };

  return (
    <div className="bg-zinc-900 p-4 border-t border-zinc-700 flex gap-3 items-center">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white font-semibold"
      >
        Save & Next
      </button>
    </div>
  );
}