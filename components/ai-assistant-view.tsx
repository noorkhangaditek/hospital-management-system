"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

const patientDatabase: Record<string, { name: string; disease: string; status: string }> = {
  "101": { name: "Ali Khan", disease: "Fever", status: "Pending" },
  "102": { name: "Sara Ahmed", disease: "Cough", status: "Treated" },
  "103": { name: "Hassan Ali", disease: "Headache", status: "Pending" },
  "104": { name: "Fatima Noor", disease: "Flu", status: "Treated" },
  "105": { name: "Ahmed Raza", disease: "Back Pain", status: "Pending" },
  "106": { name: "Ayesha Malik", disease: "Allergy", status: "Treated" },
  "107": { name: "Zubair Shaikh", disease: "Diabetes", status: "Pending" },
  "108": { name: "Mariam Jameel", disease: "Hypertension", status: "Treated" },
  "109": { name: "Bilal Siddiqui", disease: "Stomach Ache", status: "Pending" },
  "110": { name: "Sana Javed", disease: "Skin Rash", status: "Treated" },
  "111": { name: "Kamran Akmal", disease: "Viral Fever", status: "Pending" },
  "112": { name: "Nida Dar", disease: "Anemia", status: "Treated" },
  "113": { name: "Babar Azam", disease: "Muscle Strain", status: "Pending" },
  "114": { name: "Shaheen Shah", disease: "Knee Injury", status: "Treated" },
  "115": { name: "Rizwan Ahmed", disease: "Dehydration", status: "Pending" },
  "116": { name: "Shadab Khan", disease: "Eye Infection", status: "Treated" },
  "117": { name: "Fakhar Zaman", disease: "Shoulder Pain", status: "Pending" },
  "118": { name: "Iftikhar Ahmed", disease: "Blood Pressure", status: "Treated" },
  "119": { name: "Imad Wasim", disease: "Asthma", status: "Pending" },
  "120": { name: "Haris Rauf", disease: "Fast Heartbeat", status: "Treated" },
  "121": { name: "Saim Ayub", disease: "Wrist Pain", status: "Pending" },
  "122": { name: "Azam Khan", disease: "Diet Issues", status: "Treated" },
  "123": { name: "Naseem Shah", disease: "Back Injury", status: "Pending" },
  "124": { name: "Abbas Afridi", disease: "Common Cold", status: "Treated" },
  "125": { name: "Usama Mir", disease: "Sprain", status: "Pending" },
  "126": { name: "Zaman Khan", disease: "Shoulder Stiffness", status: "Treated" },
  "127": { name: "Mohammad Amir", disease: "Leg Cramp", status: "Pending" },
  "128": { name: "Wahab Riaz", disease: "Migraine", status: "Treated" },
  "129": { name: "Shoaib Malik", disease: "Joint Pain", status: "Pending" },
  "130": { name: "Sania Mirza", disease: "Foot Injury", status: "Treated" },
  "131": { name: "Wasim Akram", disease: "Checkup", status: "Pending" },
  "132": { name: "Waqar Younis", disease: "Ear Ache", status: "Treated" },
  "133": { name: "Inzamam Ul Haq", disease: "Knee Surgery", status: "Pending" },
  "134": { name: "Misbah Ul Haq", disease: "General Fatigue", status: "Treated" },
  "135": { name: "Younis Khan", disease: "Neck Pain", status: "Pending" },
  "136": { name: "Shahid Afridi", disease: "Leg Injury", status: "Treated" },
 "137": { name: "Saeed Ajmal", disease: "Vision Problem", status: "Pending" },
  "138": { name: "Abdul Razzaq", disease: "Elbow Pain", status: "Treated" },
  "139": { name: "Shoaib Akhtar", disease: "Fast Pulse", status: "Pending" },
  "140": { name: "Saqlain Mushtaq", disease: "Finger Sprain", status: "Treated" },
  "141": { name: "Sarfaraz Ahmed", disease: "Sore Throat", status: "Pending" },
  "142": { name: "Fawad Alam", disease: "Vitamin D", status: "Treated" },
  "143": { name: "Azhar Ali", disease: "Chest Congestion", status: "Pending" },
  "144": { name: "Asad Shafiq", disease: "Mouth Ulcer", status: "Treated" },
  "145": { name: "Yasir Shah", disease: "Thumb Injury", status: "Pending" },
  "146": { name: "Shan Masood", disease: "Sinus", status: "Treated" },
  "147": { name: "Mohammad Hafeez", disease: "Common Cold", status: "Pending" },
  "148": { name: "Kamran Ghulam", disease: "Acidity", status: "Treated" },
  "149": { name: "Umar Akmal", disease: "Dental Pain", status: "Pending" },
  "150": { name: "Usman Ghani", disease: "Joint Pain", status: "Treated" }
};

export function AIAssistantView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your medical assistant. Type a patient ID (e.g., 101 or 102) to look up patient information.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Process the input and generate response
    setTimeout(() => {
      let responseContent: string

      const trimmedInput = inputValue.trim()
      
      if (patientDatabase[trimmedInput]) {
        const patient = patientDatabase[trimmedInput]
        responseContent = `Patient: ${patient.name} | Disease: ${patient.disease} | Status: ${patient.status}`
      } else if (/^\d+$/.test(trimmedInput)) {
        responseContent = `No patient found with ID: ${trimmedInput}. Please try another ID.`
      } else {
        responseContent = `I can help you look up patient information. Please enter a valid patient ID (e.g., 101 or 102).`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 500)

    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full flex-col space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">AI Assistant</h2>
        <p className="text-muted-foreground">Ask about patient information using their ID</p>
      </div>

      <Card className="flex flex-1 flex-col bg-card border-border overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            Medical Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.sender === "user" ? "bg-primary" : "bg-primary/20"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <Input
                placeholder="Enter patient ID (e.g., 101, 102)..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Try entering: 101 or 102
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
