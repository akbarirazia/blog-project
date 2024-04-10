import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection.tsx"
import BlogCard from "./components/BlogCard.tsx"
import PostBlog from "./components/PostBlog.tsx"
import Footer from "./components/Footer.tsx"
import Loading from "./components/Loading.tsx"

function App() {
  const [data, setData] = useState<any>(null)
  // const [images, setImages] = useState<any>(null)
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
  }, [data])

  // console.log(images)

  const renderBlog = (data: any) => {
    return data.posts.map((blog: any, index: number) => (
      <BlogCard
        key={index}
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
      {isLoading ? (
        <Loading />
      ) : (
        <main
          className=" w-screen flex justify-center flex-wrap items-center "
          id="main"
        >
          <div className="container flex flex-wrap">
            {data && renderBlog(data)}
          </div>
        </main>
      )}
      <Footer />
    </>
  )
}

export default App
