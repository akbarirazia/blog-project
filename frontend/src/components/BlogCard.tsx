import React, { useEffect, useState } from "react"
import placeholder from "../../public/placeholder-image.png"

interface BlogCardProps {
  title: string
  content: string
  imageUrl: string
  tag: string
  min: string
}

const baseUrl = "http://localhost:3000/uploads"

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  imageUrl,
  min,
  tag,
}) => {
  const [image, setImage] = useState(placeholder)

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

  return (
    <div className="lg:w-1/3 w-full px-2 pb-12">
      <div className="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth">
        <a className="no-underline hover:no-underline">
          <img
            src={image}
            className="h-48 w-full rounded-t shadow"
            alt="Blog Image"
          />
          <div className="p-6 h-auto md:h-48">
            <p className="text-gray-600 text-xs md:text-sm">{tag}</p>
            <div className="font-bold text-xl text-gray-900">{title}</div>
            <p className="text-gray-800 font-serif text-base mb-5">{content}</p>
          </div>
          <div className="flex items-center justify-between inset-x-0 bottom-0 p-6">
            <img
              className="w-8 h-8 rounded-full mr-4"
              src="http://i.pravatar.cc/300"
              alt="Avatar of Author"
            />
            <p className="text-gray-600 text-xs md:text-sm">{min}</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default BlogCard
