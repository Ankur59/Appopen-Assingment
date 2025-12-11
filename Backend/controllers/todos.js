const fs = require("fs");
const path = require("path");


const FILE_PATH = path.join(__dirname, "..", "data", "todos.json");

const handleGetTodos = async (req, res) => {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        const todos = JSON.parse(data);

        console.log("these are todos:", todos);

        res.status(200).json(todos);
    } catch (error) {
        console.error("Error reading todos:", error);
        res.status(500).json({ error: "Failed to load todos" });
    }
};




const filePath = path.join(__dirname, "../data/todos.json");

const handleToggle = async (req, res) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const { id } = req.params;

        if (Math.random() < 0.15) {
            return res.status(500).json({ status: "failed" });
        }

        let todos = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const index = todos.findIndex((t) => t.id == id);

        if (index === -1) {
            return res.status(404).json({ status: "false" });
        }

        todos[index].completed = !todos[index].completed;

        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));

        return res.json({
            status: "true",
            message: "Todo toggled successfully",
            todo: todos[index],
        });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
};



module.exports = { handleGetTodos, handleToggle };
