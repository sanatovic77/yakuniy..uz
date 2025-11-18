import React, { useState } from "react";
import TaskCard from "./TaskCard";

// 🔥 Ustun komponenti
export default function Column({ column, addTask, editTask, deleteTask, moveTask }) {
  const [text, setText] = useState(""); // Yangi task uchun input matni

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()} // Drag qilganda ruxsat berish
      onDrop={(e) => {
        const taskData = JSON.parse(e.dataTransfer.getData("task"));
        moveTask(taskData.from, column.id, taskData.task);
      }}
    >
      <h2>{column.title}</h2>

      {/* ➕ Yangi task qo'shish */}
      <div className="addBox">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yangi vazifa..."
          onKeyPress={(e) => {
            // Enter bosilganda ham task qo'shish
            if (e.key === 'Enter' && text.trim()) {
              addTask(column.id, text);
              setText("");
            }
          }}
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            addTask(column.id, text);
            setText("");
          }}
        >
          ➕ Qo'shish
        </button>
      </div>

      {/* 📝 Tasklarni chiqarish */}
      {column.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          columnId={column.id}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}