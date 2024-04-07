const express = require("express")
const data = require("../public/data.json")

const router = express.Router()

router.get("/", (req, res, next) => {
  res.json(data)
  res.status(200)
})
router.get("/:id", (req, res, next) => {
  const { id } = req.params
  const blog = data.posts.find((blog) => parseInt(blog.id) == parseInt(id))
  res.json(blog)
})

router.post("/", (req, res, next) => {
  const blog = req.body
  data.posts.push(blog)
  res.json(blog)
})

router.put("/:id", (req, res, next) => {
  const updatedBlog = req.body
  const { id } = req.params
  const index = data.posts.findIndex(
    (blog) => parseInt(blog.id) == parseInt(id)
  )
  if (index !== -1) {
    data.posts[index] = { ...data.posts[index], ...updatedBlog }
    res.json(data.posts[index])
  } else {
    res.status(404).json({ message: "Blog post not found" })
  }
})

router.delete("/:id", (req, res, next) => {
  const { id } = req.params
  const index = data.posts.findIndex(
    (blog) => parseInt(blog.id) === parseInt(id)
  )

  data.posts.splice(index, 1)
  if (index !== -1) {
    data.posts.splice(index, 1)
  } else {
    res.status(404).send("No such blog was found")
  }
})

module.exports = router
