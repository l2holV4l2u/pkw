import { useState } from "react";
import { Link } from "@remix-run/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const link = ["Home", "Features", "Pricing", "Contact"];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-white">
          Zentry
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          {link.map((item) => (
            <Link
              to="/"
              className="text-text-primary font-semibold hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA Button (Sign In / Sign Up) */}
        <div className="hidden md:flex">
          <Link
            to="/login"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover transition duration-300"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            className="text-primary focus:outline-none"
            aria-label="Toggle mobile menu"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white p-4">
          {link.map((item) => (
            <Link to="/" className="text-text-primary hover:text-primary">
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
