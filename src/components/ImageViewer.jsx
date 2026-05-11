import React from 'react';
export default function ImageViewer({ image }) {

    if (!image) {
      return (
        <div className="flex items-center justify-center h-full text-white text-xl bg-black">
          No Image Selected
        </div>
      );
    }
  
    return (
      <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
        <img
          src={`file://${image.path}`}
          alt={image.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }