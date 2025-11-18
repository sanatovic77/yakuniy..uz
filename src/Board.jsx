import React from "react";
import Column from "./Column";

// 🔥 Doska — 3 ta ustunni chiqarib beradi
export default function Board({ columns, addTask, editTask, deleteTask, moveTask }) {
  return (
    <div className="board">
      {Object.values(columns).map((col) => (
        <Column
          key={col.id}
          column={col}
          addTask={addTask}
          editTask={editTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
}