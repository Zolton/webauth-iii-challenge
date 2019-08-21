const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("./routerFunctions")

// Base URL - /api/restricted

// router.get("/", (req, res)=>{
//     res.status(200).json({Hello: "from authRouter"})
// })

router.get("/", (req, res)=>{
User.getAll()
.then(post=>{
res.status(200).json(post)
})
.catch(error=>{
res.status(500).json({Error: 'Server status: 500'})
})
}
)


module.exports = router