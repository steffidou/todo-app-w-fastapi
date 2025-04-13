import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskInput, setTaskInput] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const API_URL = "https://todo-app-w-fastapi.onrender.com/todos/";

  // Fetch tasks from backend on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = {
        title: taskInput,
        completed: false,
      };
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then((createdTask) => {
          setTasks([...tasks, createdTask]);
          setTaskInput("");
        })
        .catch((err) => console.error("Error adding task:", err));
    }
  };

  const toggleTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    fetch(`${API_URL}${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(tasks.map((t) => (t.id === taskId ? data : t)));
      })
      .catch((err) => console.error("Error toggling task:", err));
  };

  const deleteTask = (taskId) => {
    fetch(`${API_URL}${taskId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  const enableEditing = (taskId, title) => {
    setEditingId(taskId);
    setEditText(title);
  };

  const saveEdit = (taskId) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (!updatedTask) return;

    const updatedData = { ...updatedTask, title: editText };

    fetch(`${API_URL}${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(tasks.map((task) => (task.id === taskId ? data : task)));
        setEditingId(null);
      })
      .catch((err) => console.error("Error saving edit:", err));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <>
      <h1 className="app-title">React TODO App</h1>
      <div className="app-container">
        <h2 className="todo-heading">To-Do List</h2>

        <div className="dark-mode-wrapper">
          <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button onClick={addTask} className="add-btn">
            Add Task
          </button>
        </div>

        <div className="filter-buttons">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            All ({tasks.length})
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
            Completed ({tasks.filter((task) => task.completed).length})
          </button>
          <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
            Pending ({tasks.filter((task) => !task.completed).length})
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {editingId === task.id ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className={task.completed ? "completed" : ""}>{task.title}</span>
              )}

              <div className="task-actions">
                {editingId === task.id ? (
                  <button onClick={() => saveEdit(task.id)} className="save-btn">
                    💾
                  </button>
                ) : (
                  !task.completed && (
                    <button onClick={() => enableEditing(task.id, task.title)} className="edit-btn">
                      ✏️
                    </button>
                  )
                )}
                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
