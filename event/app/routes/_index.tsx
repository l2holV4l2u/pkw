import { Link } from "@remix-run/react";
import FeatureCard from "./components/featurecard";
import Navbar from "./components/navbar";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    title: "Custom Registration",
    description:
      "Create tailored forms and collect participant details with ease.",
    icon: "📝",
  },
  {
    title: "Automated Notifications",
    description:
      "Send updates, reminders, and results directly to participants.",
    icon: "📧",
  },
  {
    title: "Payment Integration",
    description: "Securely collect payments through multiple gateways.",
    icon: "💳",
  },
  {
    title: "Data Analytics",
    description: "Visualize participant data and export reports effortlessly.",
    icon: "📊",
  },
  {
    title: "Multi-Event Management",
    description: "Manage multiple events and participants in one dashboard.",
    icon: "🎉",
  },
  {
    title: "Mobile-Friendly Design",
    description: "Access and manage events seamlessly on any device.",
    icon: "📱",
  },
];

export default function Index() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar />
      {/* Hero Section */}
      <header className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-extrabold text-6xl">
            Streamline Your Competition/Events
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Simplify registration, manage participants, and automate event
            logistics all in one place.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-200"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div></div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose [Your App Name]?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold">
            Ready to Simplify Your School's Events?
          </h3>
          <p className="mt-4">
            Sign up today and experience the difference with [Your App Name].
          </p>
          <div className="mt-6">
            <Link
              to="/signup"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-200"
            >
              Start Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} [Your App Name]. All rights reserved.
          </p>
          <div className="mt-4">
            <Link to="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
