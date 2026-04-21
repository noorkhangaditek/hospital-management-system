"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardView } from "@/components/dashboard-view"
import { PatientsView } from "@/components/patients-view"
import { AIAssistantView } from "@/components/ai-assistant-view"

type NavItem = "dashboard" | "patients" | "assistant"

export default function MedicalDashboard() {
  const [activeItem, setActiveItem] = useState<NavItem>("dashboard")

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard": return <DashboardView />
      case "patients": return <PatientsView />
      case "assistant": return <AIAssistantView />
      default: return <DashboardView />
    }
  }

  return (
    // 'flex-col' mobile ke liye aur 'md:flex-row' laptop ke liye
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      
      {/* Sidebar Section: Mobile par width full hogi, laptop par fixed 64 */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-card">
        <Sidebar activeItem={activeItem} onItemChange={setActiveItem} />
      </aside>

      {/* Main Content Section: Mobile par ye sidebar ke niche aayega */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}