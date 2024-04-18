import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"

import Navbar from "./components/Navbar"
import BlogList from "./components/BlogList"
import ViewBlog from "./components/ViewBlog"
// import EditRoute from "./components/EditRoute";
// import BlogListRoute from "./components/BlogListRoute";

function App() {
  return (
    <>
      <Navbar />

      <Router>
        <Routes>
          <Route path="/" element={<BlogList />} />
          {/* {/* <Route path="/edit" element={EditRoute} /> */}
          <Route path="/view/:id" element={<ViewBlog />} />
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default App
