import React from "react"

interface BlogCard {
  title: string
}

const BlogCard = () => {
  return (
    <div className="w-full md:w-1/2 px-2 pb-12">
      <div className="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth">
        <a href="#" className="no-underline hover:no-underline">
          <img
            src="https://source.unsplash.com/DEa8_vxKlEo/400x200"
            className="h-48 w-full rounded-t shadow"
            alt="Blog Image"
          />
          <div className="p-6 h-auto md:h-48">
            <p className="text-gray-600 text-xs md:text-sm">FOREST</p>
            <div className="font-bold text-xl text-gray-900">
              What is life but a teardrop in the eye of infinity?
            </div>
            <p className="text-gray-800 font-serif text-base mb-5">
              Mollis pretium integer eros et dui orci, lectus nec elit sagittis
              neque. Dignissim ac nullam semper aliquet volutpat, ut
              scelerisque.
            </p>
          </div>
          <div className="flex items-center justify-between inset-x-0 bottom-0 p-6">
            <img
              className="w-8 h-8 rounded-full mr-4"
              src="http://i.pravatar.cc/300"
              alt="Avatar of Author"
            />
            <p className="text-gray-600 text-xs md:text-sm">7 MIN READ</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default BlogCard
