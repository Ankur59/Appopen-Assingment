const authRouter = require("./routes/auth")
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser");
const todoRouter = require("./routes/todos")


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json())

app.use("/auth", authRouter)

app.use("/todos", todoRouter)
app.listen(8000, () => console.log("Server started...."))

