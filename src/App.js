import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  // State to store all notes
  const [note, setNote] = useState([]);

  // Load notes from localStorage when app starts
  useEffect(() => {
    const savedNote = localStorage.getItem('keepNote');
    if (savedNote) {
      setNote(JSON.parse(savedNote));
    }
  }, []); // Runs once when component mounts

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('keepNote', JSON.stringify(note));
  }, [note]);

  // Function to add a new note
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(), // Simple unique ID using timestamp
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date().toISOString(),
    };
    setNote([newNote, ...note]); // Add new note to the beginning
  };

  // Function to update an existing note
  const updateNote = (id, updatedNote) => {
    setNote(note.map((note) => (note.id === id ? updatedNote : note)));
  };

  // Function to delete a note
  const deleteNote = (id) => {
    setNote(note.filter((note) => note.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <NoteForm addNote={addNote} />
        <NoteList note={note} updateNote={updateNote} deleteNote={deleteNote} />
      </main>
    </div>
  );
}

export default App;
