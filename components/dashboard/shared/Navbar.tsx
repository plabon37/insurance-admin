"use client";

import { Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center text-black justify-between border-b bg-white px-6">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <UserCircle size={36} />

        <div>
          <h3 className="font-semibold">Admin</h3>
          <p className="text-sm text-gray-500">
            admin@gmail.com
          </p>
        </div>
      </div>
    </header>
  );
}