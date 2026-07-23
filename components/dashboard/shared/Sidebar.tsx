"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,

  Settings,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hero",
    href: "/hero",
    icon: Users,
  },
  {
    title: "Category",
    href: "/category",
    icon: FileText,
  },
  {
    title: "Insurance Banner",
    href: "/insurance-banner",
    icon: ClipboardList,
  },
  {
    title: "Partners",
    href: "/partners",
    icon: ClipboardList,
  },
  {
    title: "Working Process",
    href: "/working-process",
    icon: ClipboardList,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 text-white bg-slate-900 ">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">Insurance Admin</h1>
      </div>

      <nav className="p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                pathname === menu.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {menu.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}