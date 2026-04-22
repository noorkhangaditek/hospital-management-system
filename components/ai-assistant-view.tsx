"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, Loader2 } from "lucide-react"
import { PromptInputBox } from "@/components/ui/ai-prompt-box"

export function AIAssistantView() {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! I'm your medical assistant. You can ask me about patient information by ID (try 101 or 102), or ask general medical clinic questions.",
          },
        ],
      },
    ],
    onError: (err) => {
      console.error("[v0] Chat error:", err)
    },
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string) => {
    if (!message.trim() || isLoading) return
    sendMessage({ text: message })
  }

  const getMessageText = (message: typeof messages[0]): string => {
    if (!message.parts || !Array.isArray(message.parts)) return ""
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <div className="flex h-full flex-col space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground">AI Assistant</h2>
        <p className="text-muted-foreground mt-1">Ask about patient information or general clinic queries</p>
      </div>

      <Card className="flex flex-1 flex-col border-0 shadow-md overflow-hidden">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-chart-2/10">
          <CardTitle className="flex items-center gap-3 text-card-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 shadow-md">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-serif text-lg">Medical Assistant</span>
              {isLoading && (
                <span className="ml-3 inline-flex items-center gap-2 text-sm font-normal text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Thinking...
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
                <strong>Error:</strong> {error.message || "Something went wrong. Please try again."}
              </div>
            )}
            {messages.map((message) => {
              const messageText = getMessageText(message)
              if (!messageText) return null

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${
                      message.role === "user" 
                        ? "bg-gradient-to-br from-primary to-chart-2" 
                        : "bg-secondary ring-2 ring-primary/20"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-chart-2 text-white"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{messageText}</p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border bg-muted/20 p-5">
            <PromptInputBox
              onSend={handleSendMessage}
              isLoading={isLoading}
              placeholder="Ask about a patient (e.g., 101) or clinic questions..."
            />
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Try: &quot;101&quot;, &quot;102&quot;, or ask general questions
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
