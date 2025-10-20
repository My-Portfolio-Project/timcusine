'use client';
import {
  ArrowLeftFromLine,
  CoffeeIcon,
  HomeIcon,
  ListOrderedIcon,
  SettingsIcon,
  Users2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();
  const { userProfile } = useUserStore();

  useEffect(() => {
    userProfile();
  }, [userProfile, user]);

  return (
    <div className="flex max-h-screen overflow-hidden bg-[#111828] text-white">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? 'w-[80px]' : 'w-[280px]'
        } flex flex-col transition-all duration-300 bg-[#111828] border-r border-[#1f2a3c] p-3`}
      >
        {/* Header with logo and toggle */}
        <div className="flex items-center justify-between w-full mb-8">
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
            onClick={() => setCollapsed(!collapsed)}
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
        <nav className="flex flex-col gap-2">
          {navData.map((item, index) => {
            const isActive = location === item.path;
            return (
              <Link
                href={item.path}
                key={index}
                className={`flex items-center gap-3 rounded-lg p-2 transition-all duration-200 ${
                  isActive ? 'bg-[#202938] text-[#5f55c3]' : 'hover:bg-[#1a2133]'
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

      {/* Main content area */}
      <div className="w-full h-screen overflow-y-auto bg-[#111828] p-5">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
