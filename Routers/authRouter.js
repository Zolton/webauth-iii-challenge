const router = require("express").Router()
const bcrypt = require("bcrypt")

// Base URL - /api/restricted

router.get("/", (req, res)=>{
    res.status(200).json({Hello: "from authRouter"})
})

module.exports = router