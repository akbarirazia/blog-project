import React, { useState } from "react"

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false)

  const toggleSearch = () => {
    setSearchVisible(!searchVisible)
  }

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Logo, Home, About, GitHub */}
        <div className="flex items-center">
          {/* Logo */}
          <a href="#" className="text-white text-2xl font-bold mr-6">
            Logo
          </a>
          {/* Home */}
          <a href="#" className="text-white mr-4 hover:text-gray-400">
            Home
          </a>
          {/* About */}
          <a href="#" className="text-white mr-4 hover:text-gray-400">
            About
          </a>
          {/* GitHub */}
          <a href="#" className="text-white hover:text-gray-400">
            Github
          </a>
        </div>
        {/* Right side - Search */}
        <div className="flex items-center">
          {/* Search icon */}

          {/* Search input (hidden by default) */}
          <input
            type="text"
            className={`${
              searchVisible ? "block" : "hidden"
            } bg-gray-700 px-3 py-1 text-white rounded-md ml-2 focus:outline-none focus:bg-gray-600 transition duration-300`}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={toggleSearch}
            fill="white"
          >
            <path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z" />
          </svg>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
