import React, { useState } from 'react';

const AddTaskModal = ({ onAddTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onAddTask({ title, description, status: 'To Do' });
    onClose();
  };

  return (
    <div className="modal">
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Task</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddTaskModal;
