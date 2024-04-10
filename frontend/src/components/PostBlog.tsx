import React, { useState } from "react"
import PostModal from "./PostModal"

function PostBlog() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="m-10">
      {showModal && <PostModal closeModal={() => setShowModal(false)} />}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full my-0 mx-auto block p-5"
        onClick={() => {
          setShowModal(true)
        }}
      >
        Post a Blog
      </button>
    </div>
  )
}

export default PostBlog
