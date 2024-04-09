import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import placeholder from "../../public/placeholder-image.png"
import EditModal from "./EditModal"
import Modal from "./Modal"

interface BlogCardProps {
  title: string
  content: string
  imageUrl: string
  tag: string
  min: string
  id: number
}

const baseUrl = "http://localhost:3000/uploads"

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  imageUrl,
  min,
  tag,
  id,
}) => {
  const [image, setImage] = useState(placeholder)
  const [showMenu, setShowMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${baseUrl}/${imageUrl}`)
        if (!response.ok) {
          throw new Error("Failed to fetch image")
        }
        const blob = await response.blob()
        const imgUrl = URL.createObjectURL(blob)
        setImage(imgUrl)
      } catch (error) {
        console.error("Error fetching image:", error)
      }
    }

    fetchImage()

    // Clean up the URL object to prevent memory leaks
    return () => {
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [imageUrl])

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  const handleClose = () => {
    if (showMenu) {
      setShowMenu(false)
    }
    if (showModal) {
      setShowModal(false)
    }
  }

  const handleViewClick = () => {
    setShowModal(true)
  }
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {showModal && (
        <Modal
          title={title}
          content={content}
          image={image}
          tag={tag}
          min={min}
          isClose={() => {
            setShowModal(false)
          }}
        />
      )}

      {showEditModal && (
        <EditModal
          title={title}
          content={content}
          image={image}
          tag={tag}
          min={min}
          id={id}
          isClose={() => {
            setShowEditModal(false)
          }}
        />
      )}
      <div className="lg:w-1/3 w-full px-2 pb-12" onClick={handleClose}>
        <div className="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth">
          <div className="cursor-pointer">
            <img
              src={image}
              className="h-48 w-full rounded-t shadow"
              alt="Blog Image"
            />
            <div className="p-6 h-auto md:h-48">
              <p className="text-gray-600 text-xs md:text-sm">{tag}</p>
              <div className="font-bold text-xl text-gray-900">{title}</div>
              <p className="text-gray-800 font-serif text-base mb-5">
                {content}
              </p>
            </div>
            {showMenu && (
              <div className="absolute right-0 bottom-0 bg-white border rounded shadow-md mt-2 mr-2">
                <ul className="divide-y divide-gray-200">
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowEditModal(true)}
                  >
                    Edit
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleViewClick}
                  >
                    View
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between inset-x-0 bottom-0 p-6">
            <p className="text-gray-600 text-xs md:text-sm">{min}</p>
            <svg
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 100 125"
              xmlSpace="preserve"
              width="30px"
              height="30px"
              className="cursor-pointer"
              onClick={handleMenuToggle}
            >
              <switch>
                <foreignObject
                  requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
                  x="0"
                  y="0"
                  width="0.2"
                  height="0.2"
                />
                <g>
                  <path d="M50,95C25.2,95,5,74.8,5,50C5,25.2,25.2,5,50,5s45,20.2,45,45C95,74.8,74.8,95,50,95z M50,13c-20.4,0-37,16.6-37,37    c0,20.4,16.6,37,37,37s37-16.6,37-37C87,29.6,70.4,13,50,13z M72,58c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S76.4,58,72,58z M50,58    c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S54.4,58,50,58z M50,50L50,50L50,50z M28,58c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8    S32.4,58,28,58z" />
                </g>
              </switch>{" "}
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogCard
