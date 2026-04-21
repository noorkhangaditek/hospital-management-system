"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

const allPatients = [
 
  { id: "101", name: "Ali Khan", age: 35, disease: "Fever", lastVisit: "2024-01-15", status: "Pending" },
  { id: "102", name: "Sara Ahmed", age: 28, disease: "Cough", lastVisit: "2024-01-14", status: "Treated" },
  { id: "103", name: "Hassan Ali", age: 42, disease: "Headache", lastVisit: "2024-01-13", status: "Pending" },
  { id: "104", name: "Fatima Noor", age: 31, disease: "Flu", lastVisit: "2024-01-12", status: "Treated" },
  { id: "105", name: "Ahmed Raza", age: 55, disease: "Back Pain", lastVisit: "2024-01-11", status: "Pending" },
  { id: "106", name: "Ayesha Malik", age: 24, disease: "Allergy", lastVisit: "2024-01-10", status: "Treated" },
  { id: "107", name: "Zubair Shaikh", age: 39, disease: "Diabetes", lastVisit: "2024-04-01", status: "Pending" },
  { id: "108", name: "Mariam Jameel", age: 45, disease: "Hypertension", lastVisit: "2024-04-02", status: "Treated" },
  { id: "109", name: "Bilal Siddiqui", age: 30, disease: "Stomach Ache", lastVisit: "2024-04-03", status: "Pending" },
  { id: "110", name: "Sana Javed", age: 22, disease: "Skin Rash", lastVisit: "2024-04-04", status: "Treated" },
  { id: "111", name: "Kamran Akmal", age: 33, disease: "Viral Fever", lastVisit: "2024-04-05", status: "Pending" },
  { id: "112", name: "Nida Dar", age: 29, disease: "Anemia", lastVisit: "2024-04-05", status: "Treated" },
  { id: "113", name: "Babar Azam", age: 28, disease: "Muscle Strain", lastVisit: "2024-04-06", status: "Pending" },
  { id: "114", name: "Shaheen Shah", age: 23, disease: "Knee Injury", lastVisit: "2024-04-06", status: "Treated" },
  { id: "115", name: "Rizwan Ahmed", age: 31, disease: "Dehydration", lastVisit: "2024-04-07", status: "Pending" },
  { id: "116", name: "Shadab Khan", age: 25, disease: "Eye Infection", lastVisit: "2024-04-07", status: "Treated" },
  { id: "117", name: "Fakhar Zaman", age: 34, disease: "Shoulder Pain", lastVisit: "2024-04-08", status: "Pending" },
  { id: "118", name: "Iftikhar Ahmed", age: 33, disease: "Blood Pressure", lastVisit: "2024-04-08", status: "Treated" },
  { id: "119", name: "Imad Wasim", age: 35, disease: "Asthma", lastVisit: "2024-04-09", status: "Pending" },
  { id: "120", name: "Haris Rauf", age: 30, disease: "Fast Heartbeat", lastVisit: "2024-04-09", status: "Treated" },
  { id: "121", name: "Saim Ayub", age: 21, disease: "Wrist Pain", lastVisit: "2024-04-10", status: "Pending" },
  { id: "122", name: "Azam Khan", age: 25, disease: "Diet Issues", lastVisit: "2024-04-10", status: "Treated" },
  { id: "123", name: "Naseem Shah", age: 20, disease: "Back Injury", lastVisit: "2024-04-11", status: "Pending" },
  { id: "124", name: "Abbas Afridi", age: 22, disease: "Common Cold", lastVisit: "2024-04-11", status: "Treated" },
  { id: "125", name: "Usama Mir", age: 28, disease: "Sprain", lastVisit: "2024-04-12", status: "Pending" },
  { id: "126", name: "Zaman Khan", age: 22, disease: "Shoulder Stiffness", lastVisit: "2024-04-12", status: "Treated" },
  { id: "127", name: "Mohammad Amir", age: 32, disease: "Leg Cramp", lastVisit: "2024-04-13", status: "Pending" },
  { id: "128", name: "Wahab Riaz", age: 38, disease: "Migraine", lastVisit: "2024-04-13", status: "Treated" },
  { id: "129", name: "Shoaib Malik", age: 42, disease: "Joint Pain", lastVisit: "2024-04-14", status: "Pending" },
  { id: "130", name: "Sania Mirza", age: 37, disease: "Foot Injury", lastVisit: "2024-04-14", status: "Treated" },
  { id: "131", name: "Wasim Akram", age: 57, disease: "Checkup", lastVisit: "2024-04-15", status: "Pending" },
  { id: "132", name: "Waqar Younis", age: 52, disease: "Ear Ache", lastVisit: "2024-04-15", status: "Treated" },
  { id: "133", name: "Inzamam Ul Haq", age: 54, disease: "Knee Surgery", lastVisit: "2024-04-16", status: "Pending" },
  { id: "134", name: "Misbah Ul Haq", age: 49, disease: "General Fatigue", lastVisit: "2024-04-16", status: "Treated" },
  { id: "135", name: "Younis Khan", age: 46, disease: "Neck Pain", lastVisit: "2024-04-17", status: "Pending" },
  { id: "136", name: "Shahid Afridi", age: 44, disease: "Leg Injury", lastVisit: "2024-04-17", status: "Treated" },
  { id: "137", name: "Saeed Ajmal", age: 46, disease: "Vision Problem", lastVisit: "2024-04-18", status: "Pending" },
  { id: "138", name: "Abdul Razzaq", age: 44, disease: "Elbow Pain", lastVisit: "2024-04-18", status: "Treated" },
  { id: "139", name: "Shoaib Akhtar", age: 48, disease: "Fast Pulse", lastVisit: "2024-04-19", status: "Pending" },
  { id: "140", name: "Saqlain Mushtaq", age: 47, disease: "Finger Sprain", lastVisit: "2024-04-19", status: "Treated" },
  { id: "141", name: "Sarfaraz Ahmed", age: 36, disease: "Sore Throat", lastVisit: "2024-04-20", status: "Pending" },
  { id: "142", name: "Fawad Alam", age: 38, disease: "Vitamin D", lastVisit: "2024-04-20", status: "Treated" },
  { id: "143", name: "Azhar Ali", age: 39, disease: "Chest Congestion", lastVisit: "2024-04-21", status: "Pending" },
  { id: "144", name: "Asad Shafiq", age: 38, disease: "Mouth Ulcer", lastVisit: "2024-04-21", status: "Treated" },
  { id: "145", name: "Yasir Shah", age: 37, disease: "Thumb Injury", lastVisit: "2024-04-22", status: "Pending" },
  { id: "146", name: "Shan Masood", age: 34, disease: "Sinus", lastVisit: "2024-04-22", status: "Treated" },
  { id: "147", name: "Mohammad Hafeez", age: 43, disease: "Common Cold", lastVisit: "2024-04-23", status: "Pending" },
  { id: "148", name: "Kamran Ghulam", age: 28, disease: "Acidity", lastVisit: "2024-04-23", status: "Treated" },
  { id: "149", name: "Umar Akmal", age: 33, disease: "Dental Pain", lastVisit: "2024-04-24", status: "Pending" },
  { id: "150", name: "Usman Ghani", age: 60, disease: "Joint Pain", lastVisit: "2024-04-24", status: "Treated" }
];

export function PatientsView() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = allPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Patients</h2>
        <p className="text-muted-foreground">Manage and view patient records</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Age</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Disease</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Visit</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-4 text-sm text-muted-foreground">{patient.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                          <span className="text-xs font-medium text-primary">
                            {patient.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-card-foreground">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-card-foreground">{patient.age}</td>
                    <td className="px-4 py-4 text-sm text-card-foreground">{patient.disease}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{patient.lastVisit}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          patient.status === "Treated"
                            ? "bg-primary/20 text-primary"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
