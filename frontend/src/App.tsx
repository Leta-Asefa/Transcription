import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mic,
  FileText,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import ClientList from "./components/ClientList";
import AudioRecorder from "./components/AudioRecorder";
import TranscriptionForm from "./components/TranscriptionForm";
import { transcribeAudio } from "./components/WhisperAPI";
import { saveNote, loadNote } from "./components/NotesStorage";
import { Toaster, toast } from "sonner";

export default function App() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    if (selectedClientId) {
      setTranscription(loadNote(selectedClientId));
      setNoteSaved(false);
      setAudioBlob(null);
    }
  }, [selectedClientId]);

  const handleAudioRecorded = async (blob: Blob) => {
    setAudioBlob(blob);
    setLoading(true);
    setTranscription("");
    setNoteSaved(false);
    try {
      const text = await transcribeAudio(blob);
      // Only append backend transcription
      if (selectedClientId) {
        saveNote(selectedClientId, text, { append: true });
        setTranscription(loadNote(selectedClientId));
      }
    } catch {
      setTranscription("⚠️ Transcription failed.");
    }
    setLoading(false);
  };

  const handleSaveNote = (edited: string) => {
    if (selectedClientId) {
      // Manual edit: overwrite
      saveNote(selectedClientId, edited);
      setNoteSaved(true);
      toast.success("Note saved successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster />
      {/* Header */}
      <header className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-white drop-shadow" />
            <h1 className="text-2xl font-bold text-white tracking-wide">DocNotes</h1>
          </div>
          <nav className="flex gap-6 items-center">
            <span className="text-white/80 text-sm font-medium">AI-powered client transcription notes</span>
            {/* Add more nav links or icons here if needed */}
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col md:flex-row flex-1 w-full max-w-6xl mx-auto gap-6 py-6 px-4">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 w-full md:w-1/3"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-700">Clients</h2>
          </div>
          <ClientList
            selectedClientId={selectedClientId}
            onSelect={setSelectedClientId}
          />
        </motion.aside>

        {/* Main Panel */}
        <motion.main
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex-1 flex flex-col"
        >
          {!selectedClientId ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-2">
              <Mic className="w-10 h-10 text-gray-300" />
              <p className="text-sm md:text-base">
                Select a client to start recording notes.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Title */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                  Record & Transcribe
                </h2>
                {noteSaved && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 text-blue-600 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Saved
                  </motion.span>
                )}
              </div>

              {/* Recorder */}
              <AudioRecorder onAudioRecorded={handleAudioRecorded} />

              {/* Loading Indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-indigo-600 text-sm animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Transcribing audio...
                </div>
              )}

              {/* Transcription */}
              <motion.div
                key={selectedClientId + (transcription ? "note" : "empty")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {transcription ? (
                  <TranscriptionForm
                    transcription={transcription}
                    onSave={handleSaveNote}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400 py-8">
                    <FileText className="w-8 h-8" />
                    <span className="text-base">No note yet</span>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
}
