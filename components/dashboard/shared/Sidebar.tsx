"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  Newspaper,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  {
    title: "News & Events",
    href: "/news",
    icon: Newspaper,
  },
  {
    title: "Footer CTA",
    href: "/footer-cta",
    icon: Newspaper,
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 p-6">
        <h1 className="text-xl font-bold">
          Insurance Admin
        </h1>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="rounded p-1 hover:bg-slate-800 lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href ||
            pathname.startsWith(menu.href + "/");

          return (
            <Link
              key={menu.href}
              href={menu.href}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              <span>{menu.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}