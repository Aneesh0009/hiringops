import { useSelector } from "react-redux";
import { sidebarMenus } from "../navigation/SidebarMenu";
import NavItem from "../navigation/NavItem";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const role = user?.role || "candidate";

  const menuItems = sidebarMenus[role];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">
        HiringOps
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            label={item.label}
            path={item.path}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;