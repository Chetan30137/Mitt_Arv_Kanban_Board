import React, { useState } from 'react';
import KanbanBoard from './Components/KanbanBoard';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Task 1 description", status: "To Do" },
    { id: 2, title: "Task 2", description: "Task 2 description", status: "In Progress" },
    { id: 3, title: "Task 3", description: "Task 3 description", status: "Peer Review" },
    { id: 4, title: "Task 4", description: "Task 4 description", status: "Done" },
  ]);

  const moveTask = (taskId, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
  };

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      addTask(newTask);
      setShowModal(false);
      setNewTask({ title: '', description: '', status: 'To Do' });
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewTask({ title: '', description: '', status: 'To Do' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="container">
      <h1 className="kanban-title">Mitt Arv Task Board</h1>
      {/* <input
        type="text"
        className="search-bar"
        placeholder="Search tasks..."
      /> */}
      <KanbanBoard tasks={tasks} moveTask={moveTask} addTask={addTask} />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Task</h3>
            <div className="input-field">
              <input
                type="text"
                name="title"
                className="task-input"
                placeholder="Task Title"
                value={newTask.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <textarea
                name="description"
                className="task-input"
                placeholder="Task Description"
                value={newTask.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleAddTask} className="add-btn">Add Task</button>
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="add-task-container">
        <button onClick={() => setShowModal(true)} className="add-btn">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default App;