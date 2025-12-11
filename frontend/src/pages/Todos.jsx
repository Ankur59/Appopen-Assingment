import React, { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await axios.get("http://localhost:8000/todos");
        setTodos(res.data);
      } catch (err) {
        console.log("Error fetching todos:", err);
      }
      setLoading(false);
    }

    fetchTodos();
  }, []);

  async function toggleTodo(id) {
    try {
      const res = await axios.put(`http://localhost:8000/todos/${id}/toggle`);

      setTodos((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, completed: res.data.completed } : t
        )
      );
    } catch (error) {
      console.log("Failed to toggle:", error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="p-2 border rounded flex items-center justify-between"
        >
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.title}
          </span>

          <button
            onClick={() => toggleTodo(todo._id)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            {todo.completed ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
