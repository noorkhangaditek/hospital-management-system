"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Activity, TrendingUp } from "lucide-react"

export function DashboardView() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      change: "+12%",
      icon: Users,
      gradient: "from-primary to-chart-2",
    },
    {
      title: "Appointments Today",
      value: "48",
      change: "+8%",
      icon: Calendar,
      gradient: "from-chart-2 to-chart-4",
    },
    {
      title: "Active Cases",
      value: "156",
      change: "-3%",
      icon: Activity,
      gradient: "from-chart-4 to-accent",
    },
    {
      title: "Recovery Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
      gradient: "from-accent to-chart-5",
    },
  ]

  const recentPatients = [
    { id: "101", name: "Ali Khan", disease: "Fever", status: "Pending" },
    { id: "102", name: "Sara Ahmed", disease: "Cough", status: "Treated" },
    { id: "103", name: "Hassan Ali", disease: "Headache", status: "Pending" },
    { id: "104", name: "Fatima Noor", disease: "Flu", status: "Treated" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome back, Dr. Rahman</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient} shadow-sm`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
              <p className={`text-sm mt-1 ${stat.change.startsWith("+") ? "text-accent" : "text-destructive"}`}>
                {stat.change} <span className="text-muted-foreground font-normal">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b border-border">
          <CardTitle className="font-serif text-xl text-card-foreground">Recent Patients</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between rounded-xl bg-secondary/30 p-4 transition-all hover:bg-secondary/50 hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 shadow-sm">
                    <span className="text-sm font-bold text-white">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{patient.disease}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      patient.status === "Treated"
                        ? "bg-accent/20 text-accent"
                        : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
