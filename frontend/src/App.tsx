import { useEffect, useState } from "react"

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
      <p>data from the backend</p>
      <div> {JSON.stringify(data)}</div>
    </>
  )
}

export default App
