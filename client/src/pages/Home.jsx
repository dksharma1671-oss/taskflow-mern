import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Manage Your Tasks with <span className="text-primary-600">TaskFlow</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
        A simple, fast and responsive full-stack task management app built with the MERN stack.
        Organize your work, track progress and stay productive.
      </p>
      <div className="flex justify-center gap-4">
        {user ? (
          <Link to="/dashboard" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium">
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium">
              Get Started
            </Link>
            <Link to="/login" className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
