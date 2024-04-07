const express = require("express")
const data = require("../public/data.json")

const router = express.Router()

router.get("/", (req, res, next) => {
  res.json(data)
})

module.exports = router
