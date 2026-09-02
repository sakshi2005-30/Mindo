
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import {
  BrainIcon,
  HomeIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkIcon,
  LogoutIcon,
} from "./icons/PlusIcon";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      path: "/dashboard",
      icon: <HomeIcon size="md" />,
      end: true,
    },
    {
      label: "YouTube",
      path: "/dashboard/youtube",
      icon: <YoutubeIcon size="md" />,
    },
    {
      label: "Twitter / X",
      path: "/dashboard/twitter",
      icon: <TwitterIcon size="md" />,
    },
    { label: "URLs", path: "/dashboard/link", icon: <LinkIcon size="md" /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col justify-between p-6 fixed left-0 top-0 z-40 select-none">
      {/* Top Section */}
      <div className="flex flex-col gap-8">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <BrainIcon size="md" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight font-serif">
            mindo
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px]  text-gray-400 tracking-wider uppercase px-2">
            NAVIGATION
          </span>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-light-blue text-blue  font-semibold shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Section: User Info & Logout */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
        {/* Username Display */}
        {user && (
          <div className="px-2 flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Signed in as
            </span>
            <span className="text-sm font-semibold text-gray-700 truncate">
              {user.username}
            </span>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
        >
          <LogoutIcon size="md" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
// import { BrainIcon, HomeIcon, LogoutIcon, TwitterIcon, YoutubeIcon } from "../icons/PlusIcon"
// export const Sidebar=()=>{
//     return (
//         <div>
//             <BrainIcon size="md"/>
//             <HomeIcon size="md"/>
//             <YoutubeIcon size="md"/>
//             <TwitterIcon size="md"/>
//             <LogoutIcon size="md"/>
//         </div>
//     )
// }
