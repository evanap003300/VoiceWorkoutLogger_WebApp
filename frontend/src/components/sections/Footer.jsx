import { Linkedin, Instagram, Github } from 'lucide-react'; // Importing icons from lucide-react

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 rounded-lg shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          {/* Copyright text */}
          <p className="text-gray-600 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} Built by Evan Phillips
          </p>
  
          {/* Social media icons */}
          <div className="flex space-x-6">
            {/* Instagram Icon */}
            <a href="https://www.instagram.com/evan.phil_/" className="text-gray-500 hover:text-pink-600 transition-colors duration-200" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            {/* GitHub Icon */}
            <a href="https://github.com/evanap003300" className="text-gray-500 hover:text-purple-600 transition-colors duration-200" aria-label="GitHub">
              <Github size={20} />
            </a>
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/in/evan-phillips111" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    )
}