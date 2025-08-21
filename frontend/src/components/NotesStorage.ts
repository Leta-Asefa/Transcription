// Utility for saving/loading notes per client
// Save note: if 'note' is a backend transcription, concatenate; if manual edit, overwrite
export function saveNote(clientId: string, note: string, options?: { append?: boolean }) {
  if (options?.append) {
    const prev = localStorage.getItem(`note_${clientId}`) || '';
    const newNote = prev ? prev + '\n' + note : note;
    localStorage.setItem(`note_${clientId}`, newNote);
  } else {
    localStorage.setItem(`note_${clientId}`, note);
  }
}

export function loadNote(clientId: string): string {
  return localStorage.getItem(`note_${clientId}`) || '';
}
