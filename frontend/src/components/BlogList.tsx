import { useEffect, useState } from "react"
import Loading from "./Loading"
import PostBlog from "./PostBlog"
import BlogCard from "./BlogCard"
import HeroSection from "./HeroSection"
import { motion } from "framer-motion"

function BlogList() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()
        setData(data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const renderBlog = (data: any) => {
    return data.posts.map((blog: any, index: number) => (
      <motion.div
        initial={{ opacity: 0, x: 0, y: index * 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: index + 1 }}
        className="container flex flex-wrap lg:w-1/3 w-full gap-2"
      >
        <BlogCard
          key={index}
          title={blog.title}
          content={blog.content}
          imageUrl={blog.imageUrl}
          min={blog.min}
          tag={blog.tag}
          id={blog.id}
        />
      </motion.div>
    ))
  }

  return (
    <div>
      <HeroSection />
      <PostBlog />
      <div className="min-h-screen">
        {isLoading ? (
          <Loading />
        ) : (
          <main
            className="w-screen flex justify-center flex-wrap items-center "
            id="main"
          >
            <div className="container flex flex-wrap">
              {data && renderBlog(data)}
            </div>
          </main>
        )}
      </div>
    </div>
  )
}

export default BlogList
