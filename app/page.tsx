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
      case "dashboard":
        return <DashboardView />
      case "patients":
        return <PatientsView />
      case "assistant":
        return <AIAssistantView />
      default:
        return <DashboardView />
    }
  }

  
    return (
  <div className="flex flex-col md:flex-row h-screen bg-background overflow-hidden">
    <Sidebar activeItem={activeItem} onItemChange={setActiveItem} />
    <main className="flex-1 overflow-auto">
      {renderContent()}
    </main>
  </div>
)

  
}
