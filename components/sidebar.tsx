"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Bot } from "lucide-react"

type NavItem = "dashboard" | "patients" | "assistant"

interface SidebarProps {
  activeItem: NavItem
  onItemChange: (item: NavItem) => void
}

export function Sidebar({ activeItem, onItemChange }: SidebarProps) {
  const navItems = [
    { id: "dashboard" as NavItem, label: "Dashboard", icon: LayoutDashboard },
    { id: "patients" as NavItem, label: "Patients", icon: Users },
    { id: "assistant" as NavItem, label: "AI Assistant", icon: Bot },
  ]

  return (
   <aside className="flex h-full w-full md:w-64 flex-col bg-sidebar border-b md:border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">M</span>
        </div>
        <div>
          <h1 className="text-base font-semibold text-sidebar-foreground">MedClinic</h1>
          <p className="text-xs text-muted-foreground">Healthcare System</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemChange(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              activeItem === item.id
                ? "bg-sidebar-accent text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <span className="text-sm font-medium text-primary">DR</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Dr. Noor Khan</p>
            <p className="text-xs text-muted-foreground truncate">General Physician</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
