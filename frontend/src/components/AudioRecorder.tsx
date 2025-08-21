import React, { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onAudioRecorded: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<Props> = ({ onAudioRecorded }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => chunks.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        onAudioRecorded(blob);
        chunks.current = [];
      };
      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);
    } catch (err) {
      toast.error("Please allow microphone access to record audio.");
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex justify-center">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition ${
            recording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {recording ? (
            <Square className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          className="w-full mt-3 rounded-lg border border-gray-200"
        />
      )}
    </div>
  );
};

export default AudioRecorder;
