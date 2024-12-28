import logo from "../utils/school-logo.png";

export default function Navbar() {
  return (
    <div className="bg-white shadow-md mb-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <img src={logo} alt="School Logo" className="h-12 w-8 object-cover" />
          <span className="text-xl font-bold text-gray-800">PKW Counselor</span>
        </div>
        <nav className="flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
            Dashboard
          </a>
          <a href="/settings" className="text-gray-600 hover:text-gray-800">
            Settings
          </a>
          <a href="/profile" className="text-gray-600 hover:text-gray-800">
            Profile
          </a>
        </nav>
      </div>
    </div>
  );
}
