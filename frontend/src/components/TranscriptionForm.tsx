import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface Props {
  transcription: string;
  onSave: (edited: string) => void;
}

const TranscriptionForm: React.FC<Props> = ({ transcription, onSave }) => {
  const [text, setText] = useState(transcription);

  useEffect(() => {
    setText(transcription);
  }, [transcription]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(text);
      }}
      className="flex flex-col gap-3"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
      >
        <Save className="w-5 h-5" />
        Save Note
      </button>
    </form>
  );
};

export default TranscriptionForm;
