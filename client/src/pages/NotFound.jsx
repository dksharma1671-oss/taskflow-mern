import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-medium">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
