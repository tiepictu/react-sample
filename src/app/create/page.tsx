"use client";

import React from 'react';
import axios from 'axios';

const CreateNoteScreen = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/notes', { title, content }).then(() => {
      alert('Note created successfully!');
    });
  };

  return (
    <div>
      <h1>Create Note</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateNoteScreen;