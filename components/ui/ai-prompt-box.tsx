"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface PromptInputBoxProps {
  onSubmit: (message: string) => void
  isLoading?: boolean
}

export function PromptInputBox({ onSubmit, isLoading }: PromptInputBoxProps) {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    if (!value.trim()) return
    onSubmit(value)
    setValue("")
  }

  return (
    <div className="flex gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
        className="resize-none"
        rows={2}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
      />
      <Button onClick={handleSubmit} disabled={isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}