const express = require("express")
const { handleGetTodos, handleToggle } = require("../controllers/todos")
const router = express.Router()


router.get("/", handleGetTodos)


router.put("/:id/toggle", handleToggle)


module.exports = router
