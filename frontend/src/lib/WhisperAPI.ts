// Utility to send audio to OpenAI Whisper API
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');

  const response = await fetch('https://transcription-izyn.onrender.com/transcribe', {
    method: 'POST',
    body: formData
  });

  console.log('Transcription response:', response);

  if (!response.ok) throw new Error('Transcription failed');
  const data = await response.json();
  return data.text;
}
