'use client';
import {
  ArrowLeftFromLine,
  CoffeeIcon,
  HomeIcon,
  ListOrderedIcon,
  LogOut,
  SettingsIcon,
  Users2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';

const navData = [
  {
    path: '/dashboard',
    display: 'Dashboard',
    icon: <HomeIcon size={18} />,
  },
  {
    path: '/dashboard/orders',
    display: 'Orders',
    icon: <ListOrderedIcon size={18} />,
  },
  {
    path: '/dashboard/dishes',
    display: 'Dishes',
    icon: <CoffeeIcon size={18} />,
  },
  {
    path: '/dashboard/clients',
    display: 'Clients',
    icon: <Users2Icon size={18} />,
  },
  {
    path: '/dashboard/settings',
    display: 'Settings',
    icon: <SettingsIcon size={18} />,
  },
];

const Sidebar = ({ children }: any) => {
  const location = usePathname();
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const { user,setUser } = useAuthStore();
  const { userProfile } = useUserStore();

  const [monitor, setMonitor] = useState(false)


  useEffect(() => {
    userProfile();
  }, [userProfile, user]);

  
const handleLogout = () => {
  localStorage.removeItem("token")
 setUser(null)
  router.push("/auth")

}

const hnadleToggleMenu = () => {
setCollapsed(!collapsed)
setMonitor(!monitor)
}

return (
  <div className="flex h-screen overflow-hidden bg-[#111828] text-white relative">


    {/* Sidebar */}
    <div
      className={` top-0 left-0 h-full z-50 py-5 gap-5
        ${monitor ? 'flex' : ' fixed md:static '}
        ${collapsed ? 'w-[40px] md:w-[80px]' : 'w-[200px] lg:w-[220px]'}
        flex flex-col justify-between transition-all duration-300 bg-[#111828] border-r
         border-[#1f2a3c] p-1 md:p-3
        ${collapsed ? '' : 'shadow-lg'}
      `}
    >
      
      <div className='flex flex-col gap-10'>

    

      {/* Header with logo and toggle */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full mb-8">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <img
              src="/landing-page/tims_logo.png"
              alt="logo"
              className="h-10 w-auto"
            />
          </Link>
        )}
        <button
          onClick={() => hnadleToggleMenu()}
          className="p-2 hover:bg-[#202938] rounded-lg transition"
        >
          <ArrowLeftFromLine
            size={22}
            color="white"
            className={`transform transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {navData.map((item, index) => {
          const isActive = location === item.path;
          return (
            <Link
              href={item.path}
              key={index}
              className={`flex items-center gap-3 rounded-lg p-2 transition-all duration-200 ${
                isActive
                  ? 'bg-[#202938] text-[#5f55c3]'
                  : 'hover:bg-[#1a2133]'
              }`}
            >
              <span
                className={`${
                  isActive ? 'text-[#5f55c3]' : 'text-white'
                } flex items-center justify-center`}
              >
                {item.icon}
              </span>

              {!collapsed && (
                <span
                  className={`text-sm font-medium ${
                    isActive ? 'text-[#5f55c3]' : 'text-white'
                  }`}
                >
                  {item.display}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

        </div>



   {/* logout button & user */}
<div className="border-t border-gray-800 w-full pt-4">
  {collapsed ? (

    <div className="flex flex-col items-center gap-4">
      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#6159e7]">
        <h1 className="text-white font-semibold text-lg uppercase">
          {user?.fullName
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2) ?? ""}
        </h1>
      </div>

      <button onClick={handleLogout}
       className="bg-red-700 p-2 rounded-lg cursor-pointer">
        <LogOut color="white" size={20} />
      </button>
    </div>
  ) : (

    <div className="flex flex-col gap-3">

{user &&     <div className="flex items-center gap-2">

        <div className="rounded-full w-12  h-12 flex items-center justify-center bg-[#6159e7]">
          <h1 className="text-white font-semibold text-lg uppercase">
            {user?.fullName
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2) ?? ""}
          </h1>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-white text-sm font-medium">
            {user?.fullName ?? ""}
          </h1>
          <h1 className="text-gray-400 text-xs">{user?.email ?? ""}</h1>
        </div>
      </div> 
}

      <button  onClick={handleLogout}
       className="bg-red-700 flex items-center justify-center
        gap-2 px-4 py-2 rounded-lg cursor-pointer">
        <LogOut color="white" size={18} />
        <h1 className="text-white text-sm">Logout</h1>
      </button>
    </div>
  )}
</div>


    </div>

    {/* Dark overlay on small screen */}
    {!collapsed && (
      <div
        onClick={() => setCollapsed(true)}
        className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
      ></div>
    )}


 {/* Main content area */}
<div
  className={`
    flex-1 h-screen overflow-y-auto bg-[#111828] md:py-5 md:px-5 py-3  relative
    transition-all duration-300
    ${collapsed ? 'ml-0' : 'pl-15'}
  `}
>
  {children}
</div>


  </div>
);

};

export default Sidebar;
