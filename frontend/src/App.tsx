import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection.tsx"
import BlogCard from "./components/BlogCard.tsx"
import PostBlog from "./components/PostBlog.tsx"

function App() {
  const [data, setData] = useState<any>(null)
  // const [images, setImages] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [data])

  // console.log(images)

  const renderBlog = (data: any) => {
    return data.posts.map((blog: any) => (
      <BlogCard
        key={blog.id}
        title={blog.title}
        content={blog.content}
        imageUrl={blog.imageUrl}
        min={blog.min}
        tag={blog.tag}
        id={blog.id}
      />
    ))
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      <PostBlog />
      <main className=" w-screen flex justify-center flex-wrap items-center ">
        <div className="container flex flex-wrap">
          {data && renderBlog(data)}
        </div>
      </main>
    </>
  )
}

export default App
