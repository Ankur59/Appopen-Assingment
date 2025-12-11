import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await axios.get("http://localhost:8000/todos");
        console.log("here", res);
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
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      setChecking(true);
      const response = await axios.put(
        `http://localhost:8000/todos/${id}/toggle`
      );
      console.log("this is response", response);
    } catch (error) {
      console.log("Failed to toggle:", error.response.data.status);
      if (error.response.data.status === "failed") {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
        toast.error("Unable to update todo");
      }
    } finally {
      setChecking(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-2">
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className="p-2 border rounded flex items-center justify-between"
        >
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.title}
          </span>

          <button
            disabled={checking}
            onClick={() => toggleTodo(todo.id)}
            className={`
    px-3 py-1 rounded text-white
    ${
      checking
        ? "bg-gray-400 cursor-not-allowed opacity-60"
        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
    }
  `}
          >
            {todo.completed ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
