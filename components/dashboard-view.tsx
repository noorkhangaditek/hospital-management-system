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
    },
    {
      title: "Appointments Today",
      value: "48",
      change: "+8%",
      icon: Calendar,
    },
    {
      title: "Active Cases",
      value: "156",
      change: "-3%",
      icon: Activity,
    },
    {
      title: "Recovery Rate",
      value: "94%",
      change: "+2%",
      icon: TrendingUp,
    },
  ]

  const recentPatients = [
    { id: "101", name: "Ali Khan", disease: "Fever", status: "Pending" },
    { id: "102", name: "Sara Ahmed", disease: "Cough", status: "Treated" },
    { id: "103", name: "Hassan Ali", disease: "Headache", status: "Pending" },
    { id: "104", name: "Fatima Noor", disease: "Flu", status: "Treated" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, Dr. Noor Khan</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-sm font-medium text-primary">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-card-foreground">{patient.disease}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      patient.status === "Treated"
                        ? "bg-primary/20 text-primary"
                        : "bg-yellow-500/20 text-yellow-500"
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
