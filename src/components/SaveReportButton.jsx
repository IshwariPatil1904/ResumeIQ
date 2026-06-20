import React, { useState } from 'react';
import { Bookmark, Check } from 'lucide-react';

export default function SaveReportButton({
  onSave,
  fileName,
  score,
}) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      className={`button ${saved ? 'button-success' : 'button-secondary'} hover-scale`}
      aria-label="Save analysis to local storage"
    >
      {saved ? <Check size={16} className="button-icon" /> : <Bookmark size={16} className="button-icon" />}
      {saved ? 'Saved!' : 'Save Analysis'}
    </button>
  );
}
