import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection.tsx"
import BlogCard from "./components/BlogCard.tsx"

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err))
  }, [data])

  return (
    <>
      <Navbar />
      <HeroSection />
      <main className="container">
        <BlogCard />
      </main>

      {/* <div className="container mx-auto "> {JSON.stringify(data)}</div> */}
    </>
  )
}

export default App
