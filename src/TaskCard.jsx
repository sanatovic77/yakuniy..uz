import React from "react";

// 🔥 Vazifa kartochkasi
export default function TaskCard({ task, columnId, editTask, deleteTask }) {
  return (
    <div
      className="task"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "task",
          JSON.stringify({ from: columnId, task })
        );
      }}
    >
      <p>{task.text}</p>

      <div className="taskBtns">
        {/* ✏️ Tahrirlash */}
        <button
          className="edit-btn"
          onClick={() => {
            const newText = prompt("Yangi matn:", task.text);
            if (newText) editTask(columnId, task.id, newText);
          }}
        >
          ✏️ Edit
        </button>

        {/* ❌ O'chirish */}
        <button
          className="delete-btn"
          onClick={() => deleteTask(columnId, task.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}