import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"

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

      <div className="container mx-auto "> {JSON.stringify(data)}</div>
    </>
  )
}

export default App
