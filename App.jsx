import React, { useState, useEffect } from "react";
import Board from "./Board";
import "./App.css"; // ⬅️ CSS faylni import qilish MUHIM!

// 🔹 Default ma'lumotlar - Dastur birinchi marta ishga tushganda
const defaultData = {
  columns: {
    todo: { id: "todo", title: "📋 Vazifalar", tasks: [] },
    doing: { id: "doing", title: "⚙️ Bajarilmoqda", tasks: [] },
    done: { id: "done", title: "✅ Bajarildi", tasks: [] }
  }
};

export default function App() {
  // 🔹 STATE - Barcha Kanban ma'lumotlarini saqlaydi
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("samir-kanban-data");
      return saved ? JSON.parse(saved) : defaultData;
    } catch (error) {
      console.error("Ma'lumot yuklashda xatolik:", error);
      return defaultData;
    }
  });

  // 🔹 DATA O'ZGARGANDA LOCALSTORAGE'GA SAQLASH
  useEffect(() => {
    try {
      localStorage.setItem("samir-kanban-data", JSON.stringify(data));
    } catch (error) {
      console.error("Ma'lumot saqlashda xatolik:", error);
    }
  }, [data]);

  // ➕ VAZIFA QO'SHISH FUNKSIYASI
  const addTask = (columnId, text) => {
    const newTask = {
      id: Date.now(), // Unique ID yaratish
      text
    };
    const updated = { ...data };
    updated.columns[columnId].tasks.push(newTask);
    setData(updated);
  };

  // ✏️ VAZIFANI TAHRIRLASH FUNKSIYASI
  const editTask = (columnId, taskId, newText) => {
    const updated = { ...data };
    const tasks = updated.columns[columnId].tasks;
    const task = tasks.find((t) => t.id === taskId);
    if (task) task.text = newText;
    setData(updated);
  };

  // ❌ VAZIFANI O'CHIRISH FUNKSIYASI
  const deleteTask = (columnId, taskId) => {
    const updated = { ...data };
    updated.columns[columnId].tasks = updated.columns[columnId].tasks.filter(
      (t) => t.id !== taskId
    );
    setData(updated);
  };

  // 🔄 VAZIFANI USTUNDAN USTUNGA KO'CHIRISH FUNKSIYASI
  const moveTask = (from, to, task) => {
    if (from === to) return; // Agar bir xil ustunda bo'lsa - hech narsa qilmaymiz
    const updated = { ...data };
    updated.columns[from].tasks = updated.columns[from].tasks.filter(
      (t) => t.id !== task.id
    );
    updated.columns[to].tasks.push(task);
    setData(updated);
  };

  // 🎨 JSX QAYTARISH
  return (
    <div className="app-container">
      <h1 className="title">🎯 Samir Kanban Doskasi</h1>

      <Board
        columns={data.columns}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
        moveTask={moveTask}
      />

      <div className="footer">
        <p>💡 Maslahat: Vazifalarni sudrab boshqa ustunga o'tkazing!</p>
      </div>
    </div>
  );
}