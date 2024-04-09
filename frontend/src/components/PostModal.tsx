import axios from "axios"
import React, { useState } from "react"
import ReactDOM from "react-dom"

interface PostModalProps {
  closeModal: () => void
}

const PostModal: React.FC<PostModalProps> = ({ closeModal }) => {
  const [image, setImage] = useState<File | null>(null)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 100)
    // Prepare the form data
    const formData = new FormData()
    formData.append("id", `${id}`)
    formData.append("title", e.target.title.value)
    formData.append("content", e.target.content.value)
    formData.append("tag", e.target.tag.value)
    formData.append("min", e.target.min.value)
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
    } catch (error) {
      console.error("Error posting data:", error)
    }
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]) // Store the file object
      // console.log(e.target.files[0])
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70"></div>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 lg:min-h-1/2 bg-white rounded text-black p-2 pb-8 w-3/4 ">
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 float-end"
          >
            Post Blog
          </button>
          <br />
          <div className="max-w-sm w-full lg:max-w-full ">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
            />

            <div className="border-r border-b border-l bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <input
                  type="text"
                  name="title"
                  className="text-gray-900 font-bold text-xl mb-2"
                  placeholder="Title"
                />

                <input
                  type="text"
                  name="content"
                  className="text-gray-700 text-base"
                  placeholder="Content"
                />
              </div>
              <div className="flex items-center">
                <div className="text-sm">
                  <input
                    type="text"
                    name="tag"
                    className="text-gray-900 leading-none"
                    placeholder="Tag"
                  />
                  <input
                    type="text"
                    name="min"
                    className="text-gray-600"
                    placeholder="Min"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  )
}

export default PostModal
