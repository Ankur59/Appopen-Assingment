const express = require("express")
const { handleLogin, handleRefresh } = require("../controllers/auth")
const router = express.Router()


router.post("/login", handleLogin)

router.post("/refresh", handleRefresh)


module.exports = router
