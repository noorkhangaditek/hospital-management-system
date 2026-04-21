"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardView } from "@/components/dashboard-view"
import { PatientsView } from "@/components/patients-view"
import  AIAssistantView  from "@/components/ai-assistant-view"
import { Menu, X } from "lucide-react" // Icons ke liye

type NavItem = "dashboard" | "patients" | "assistant"

export default function MedicalDashboard() {
  const [activeItem, setActiveItem] = useState<NavItem>("dashboard")
  const [isSidebarOpen, setSidebarOpen] = useState(false) // Sidebar state

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard": return <DashboardView />
      case "patients": return <PatientsView />
      case "assistant": return <AIAssistantView />
      default: return <DashboardView />
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      
      {/* Mobile Overlay: Jab sidebar khula ho to background ko dhakne ke liye */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar: Mobile par 'fixed' aur Laptop par 'static' */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar activeItem={activeItem} onItemChange={(item) => {
          setActiveItem(item as NavItem);
          setSidebarOpen(false); // Mobile par click ke baad band ho jaye
        }} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header: Ismein 3 line wala button hoga */}
        <header className="flex items-center p-4 border-b border-border bg-card md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-accent rounded-md">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-bold">MedClinic</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}