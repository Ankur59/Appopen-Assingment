import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  // Load todos once
  useEffect(() => {
    axios
      .get("http://localhost:8000/todos")
      .then((res) => setTodos(res.data))
      .catch(() => setError("Failed to load todos"));
  }, []);

  const toggleTodo = async (id) => {
    const prevTodos = [...todos];

    setTodos((todos) =>
      todos.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await axios.put(`http://localhost:8000/todos/${id}/toggle`);
    } catch (err) {
      setTodos(prevTodos);

      setError("Toggle failed. Rolled back.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {error}
        </div>
      )}

      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex items-center gap-3 p-2 border-b border-gray-200"
        >
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600"
            checked={todo.completed}
            onChange={() => toggleTodo(todo._id)}
          />

          <span
            className={`text-gray-800 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </span>
        </div>
      ))}
    </div>
  );
}
