"use client";

import { Menu, Search, UserCircle } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      {/* Left */}
      <div className=" text-black flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 rounded-lg border py-2 pl-10 pr-4 outline-none transition focus:border-blue-500 md:w-72 lg:w-96"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <UserCircle
          size={38}
          className="text-gray-600"
        />

        <div className="hidden sm:block">
          <h3 className="font-semibold text-gray-800">
            Admin
          </h3>

          <p className="text-sm text-gray-500">
            admin@gmail.com
          </p>
        </div>
      </div>
    </header>
  );
}