// src/components/trash-point/ImageUpload.jsx
import React from 'react';

export default function ImageUpload({ onFile }) {
  return <input type="file" accept="image/*" onChange={e => onFile(e.target.files[0])} />;
}

