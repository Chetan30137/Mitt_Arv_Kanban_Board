import React, { useState } from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import "./KanbanBoard.css"; // Ensure this contains your existing custom styles

// Kanban Column Component
const KanbanColumn = ({ status, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
  });

  const getColumnColor = () => {
    switch (status) {
      case "To Do":
        return "#FFEB3B";
      case "In Progress":
        return "#2196F3";
      case "Peer Review":
        return "#FFC107";
      case "Done":
        return "#4CAF50";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <div
      ref={drop}
      className={`kanban-column ${status === "Done" ? "expandable-column" : ""}`}
      style={{ backgroundColor: getColumnColor() }}
    >
      <div className="column-header">
        <h3>{status}</h3>
      </div>
      <div className="column-content">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

// Kanban Board Component
const KanbanBoard = ({ tasks, moveTask, addTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle modal inputs and actions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      addTask({ ...newTask, status: "To Do" });
      setNewTask({ title: "", description: "" });
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setNewTask({ title: "", description: "" });
    setShowModal(false);
  };

  // Define column statuses
  const columns = ["To Do", "In Progress", "Peer Review", "Done"];

  return (
    <div className="kanban-container">
      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Modal for Adding Task */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Task</h2>
            <div className="input-field">
              <label>Task Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={handleInputChange}
                className="task-input"
              />
            </div>
            <div className="input-field">
              <label>Task Description:</label>
              <textarea
                name="description"
                placeholder="Enter task description"
                value={newTask.description}
                onChange={handleInputChange}
                className="task-input"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleAddTask} className="add-btn">
                Add Task
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Columns */}
      <div className="board-content">
        <div className="columns">
          {columns.map((status) => {
            const tasksInStatus = filteredTasks.filter((task) => task.status === status);
            return (
              <KanbanColumn
                key={status}
                status={status}
                tasks={tasksInStatus}
                moveTask={moveTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
