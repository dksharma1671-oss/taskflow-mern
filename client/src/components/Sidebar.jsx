import { NavLink } from "react-router-dom";
import { FiGrid, FiPlusCircle, FiUser } from "react-icons/fi";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
      isActive
        ? "bg-primary-600 text-white"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <aside className="w-full md:w-56 shrink-0 mb-4 md:mb-0">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 flex md:flex-col gap-2 overflow-x-auto">
        <NavLink to="/dashboard" className={linkClass} end>
          <FiGrid /> Dashboard
        </NavLink>
        <NavLink to="/tasks/create" className={linkClass}>
          <FiPlusCircle /> Add Task
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          <FiUser /> Profile
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
