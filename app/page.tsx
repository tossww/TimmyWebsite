'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, Heart, Shell } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Timmy the turtle! 🐢 I love swimming, eating lettuce, and making new friends. What would you like to chat about?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const timmyResponses = [
    "That's so interesting! As a turtle, I love hearing about new things! 🐢",
    "Oh wow! I wish I could do that too. I'm pretty good at swimming though! 🏊‍♂️",
    "That reminds me of when I was exploring the coral reef! The colors were amazing! 🌊",
    "You know what? I think we could be great friends! I love making new friends! 💚",
    "That sounds wonderful! I love learning new things from my human friends! 📚",
    "Oh my shell! That's fascinating! I could listen to you talk all day! 🐚",
    "You're so kind! I feel like we're really connecting here! 💕",
    "That's amazing! I wish I could share some of my turtle adventures with you! 🐢✨",
    "I love how you think! You remind me of my best friend, a wise old sea turtle! 🐢💭",
    "That's so cool! I'm learning so much from our conversation! 🌟"
  ]

  const generateTimmyResponse = (userMessage: string): string => {
    // Simple response logic - in a real app, you'd integrate with an AI service
    const randomResponse = timmyResponses[Math.floor(Math.random() * timmyResponses.length)]
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      return "Hello there! I'm so happy you came to chat with me! 🐢💚"
    }
    if (userMessage.toLowerCase().includes('food') || userMessage.toLowerCase().includes('eat')) {
      return "Oh, I love talking about food! My favorite is fresh lettuce and some yummy algae! 🥬🌿"
    }
    if (userMessage.toLowerCase().includes('swim') || userMessage.toLowerCase().includes('water')) {
      return "Swimming is my absolute favorite! I could swim all day long! The water feels so refreshing! 🏊‍♂️💦"
    }
    if (userMessage.toLowerCase().includes('friend') || userMessage.toLowerCase().includes('friends')) {
      return "I love making friends! You're becoming one of my favorite friends already! 💚🐢"
    }
    
    return randomResponse
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate Timmy typing
    setTimeout(() => {
      const timmyResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateTimmyResponse(inputText),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, timmyResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-4xl animate-bounce-slow">🐢</div>
            <div>
              <h1 className="text-3xl font-bold text-turtle-dark">Timmy the Turtle</h1>
              <p className="text-gray-600">Your friendly Jelly Cat companion</p>
            </div>
            <div className="text-4xl animate-bounce-slow">🐢</div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 chat-scrollbar">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-ocean-blue text-white rounded-br-md'
                        : 'bg-turtle-green text-white rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-700 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message to Timmy..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-turtle-green focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-500"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-turtle-green hover:bg-turtle-dark disabled:bg-gray-300 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-turtle-dark mb-4 flex items-center">
            <Shell className="mr-2" />
            Fun Facts About Timmy
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-start space-x-2">
              <Heart className="text-red-500 mt-1 flex-shrink-0" size={16} />
              <p>Timmy loves making new friends and learning about different cultures!</p>
            </div>
            <div className="flex items-start space-x-2">
              <MessageCircle className="text-blue-500 mt-1 flex-shrink-0" size={16} />
              <p>He's a great listener and always has encouraging words to share!</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="text-green-500 mt-1 flex-shrink-0">🌊</div>
              <p>Timmy's favorite hobby is swimming and exploring underwater caves!</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="text-yellow-500 mt-1 flex-shrink-0">🥬</div>
              <p>He enjoys healthy snacks like fresh lettuce and sea vegetables!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Made with 💚 for Timmy the Turtle from Jelly Cat</p>
          <p className="text-sm mt-2">Ready to deploy on Vercel! 🚀</p>
        </div>
      </footer>
    </div>
  )
}
