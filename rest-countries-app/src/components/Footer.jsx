import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe, FaHeart } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Top section with logo and nav links */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              
              <span className="text-xl font-bold text-gray-800">🌍 Country Explorer</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
                Home
              </Link>
              <Link to="/favorites" className="text-gray-600 hover:text-blue-600 transition duration-300">
                Favorites
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition duration-300">
                About
              </Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300">
                Contact
              </a>
            </nav>
          </div>
          
          {/* Middle section with description */}
          <div className="border-t border-b border-gray-200 py-8 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 mb-4">
                Explore countries around the world, learn about their cultures, capitals, 
                populations, and more. Save your favorite countries and create your own
                journey of discovery.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="#" 
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-500 hover:text-blue-600 transition duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-500 hover:text-blue-800 transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom section with copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Country Explorer. All rights reserved.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
}