import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

interface PostModalProps {
  closeModal: () => void
}

const PostModal: React.FC<PostModalProps> = ({ closeModal }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    const body = document.getElementsByTagName("html")[0] as HTMLElement
    body.style.overflow = "hidden"
  }, [])
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 1000)
    // Prepare the form data
    const formData = new FormData()
    formData.append("id", `${id}`)
    formData.append("title", e.target.title.value || "title")
    formData.append(
      "content",
      e.target.content.value ||
        "Generic content, lorem ipsum dolor sit amet con etiam null tempor"
    )
    formData.append("tag", e.target.tag.value || "Tag")
    formData.append("min", e.target.min.value || "7 MIN")
    formData.append("imageUrl", e.target.image.files[0])

    console.log(e.target.image.files[0])
    try {
      const response = await axios.post("http://localhost:3000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Response:", response)
      console.log("Data:", response.data)
      closeModal()
      window.location.reload()
    } catch (error) {
      console.error("Error posting data:", error)
    }
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      // Read the file and set the image preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return <></>
}

export default PostModal
