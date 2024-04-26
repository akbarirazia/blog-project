import { Link } from "react-router-dom"

function PostBlog() {
  return (
    <div className="m-10 container mx-auto my-0">
      <br />

      <div className="mx-auto my-0">
        <h1 className="text-3xl font-bold text-center text-blue-500">
          Painful Funny Blogs
        </h1>
        <br />
        <p className="text-md  lg:w-2/3 text-center mx-auto my-0">
          Hey! How did you like the dazzling, stunning Hero Section? Were you
          expecting to see some beautifully rendered funny blogs? Well lets say
          my muscles are made for backend or for nothing :'( How do you like my
          seamless transition from beauty to... eh, brother? ehh, what is that
          brother?
          <br />
          <br />
          <span className="text-blue-500">
            #UIFail #BeautifulHeroConfusedBlogs
          </span>
        </p>
      </div>
      <div className="text-center">
        <Link to="/post">
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              // setShowModal(true)
            }}
          >
            Post a Blog
          </button>
        </Link>
      </div>

      <br />
    </div>
  )
}

export default PostBlog
