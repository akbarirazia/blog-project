import axios from "axios"
import React, { useState } from "react"
import ReactDOM from "react-dom"

interface ModalProps {
  id: number
  title: string
  content: string
  image: string
  tag: string
  min: string
  isClose: () => void
}

const EditModal: React.FC<ModalProps> = ({
  id,
  title,
  content,
  image,
  min,
  tag,
  isClose,
}) => {
  const [editedTitle, setEditedTitle] = useState(title || "")
  const [editedContent, setEditedContent] = useState(content || "")
  const [editedTag, setEditedTag] = useState(tag || "")
  const [editedMin, setEditedMin] = useState(min || "")
  const [editedImage, setEditedImage] = useState<File | null>(null)

  const handleConfirm = async () => {
    console.log(editedImage)

    try {
      const formData = new FormData()
      formData.append("title", editedTitle)
      formData.append("content", editedContent)
      formData.append("tag", editedTag)
      formData.append("min", editedMin)
      if (editedImage) {
        formData.append("imageUrl", editedImage) // Append the file to FormData
      }
      console.log(formData)

      const response = await axios.put(
        "http://localhost:3000/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      isClose()
    } catch (error) {
      console.error("Error updating blog post:", error)
    }
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditedImage(e.target.files[0]) // Store the file object
      // console.log(e.target.files[0])
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70"></div>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 lg:min-h-1/2 bg-white rounded text-black p-2 pb-8 w-3/4 ">
        <button
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 float-end"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <br />
        <div className="max-w-sm w-full lg:max-w-full ">
          <img src={image} alt={title} className="rounded" />
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />

          <div className="border-r border-b border-l bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <input
                className="text-gray-900 font-bold text-xl mb-2"
                placeholder="Title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />

              <input
                className="text-gray-700 text-base"
                placeholder="Content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <input
                  className="text-gray-900 leading-none"
                  placeholder="Tag"
                  value={editedTag}
                  onChange={(e) => setEditedTag(e.target.value)}
                />
                <input
                  className="text-gray-600"
                  placeholder="Min"
                  value={editedMin}
                  onChange={(e) => setEditedMin(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}

export default EditModal
