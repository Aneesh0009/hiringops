import { NavLink } from "react-router-dom";

const NavItem = ({ label, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md transition-all duration-200
         ${
           isActive
             ? "bg-blue-600 text-white"
             : "text-gray-300 hover:bg-gray-700 hover:text-white"
         }`
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;