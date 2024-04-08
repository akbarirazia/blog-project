const express = require("express")
const data = require("../public/data.json")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/") // Ensure the uploads folder exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

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

router.get("/:id/image", (req, res, next) => {
  const { id } = req.params
  const blog = data.posts.find((blog) => parseInt(blog.id) === parseInt(id))
  if (!blog) {
    return res.status(404).json({ message: "Blog post not found" })
  }
  const imagePath = path.join(__dirname, "../", blog.imageUrl)
  res.sendFile(imagePath)
})

router.post("/", upload.single("imageUrl"), (req, res, next) => {
  const blog = req.body
  blog.imageUrl = req.file.path
  data.posts.push(blog)
  res.json(blog)
})

router.put("/:id", upload.single("imageUrl"), (req, res, next) => {
  const updatedBlog = req.body
  const { id } = req.params
  const index = data.posts.findIndex(
    (blog) => parseInt(blog.id) === parseInt(id)
  )
  if (index !== -1) {
    // If there's a file upload, update the imageUrl property
    if (req.file) {
      updatedBlog.imageUrl = req.file.path
    }

    data.posts[index] = { ...data.posts[index], ...updatedBlog }
    res.json(data.posts[index]) // Send the updated blog post in the response
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
