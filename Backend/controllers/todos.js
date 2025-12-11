const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../data/todos.json");

const handleGetTodos = async (req, res) => {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        const todos = JSON.parse(data);
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error reading todos:", error);
        res.status(500).json({ error: "Failed to load todos" });
    }
};

module.exports = { handleGetTodos };
