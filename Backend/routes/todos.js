const express = require("express")
const { handleGetTodos } = require("../controllers/todos")
const router = express.Router()


router.get("/", handleGetTodos)


module.exports = router
