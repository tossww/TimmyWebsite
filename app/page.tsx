'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, Heart, Shell } from 'lucide-react'
import Image from 'next/image'

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-green-100 to-blue-50">
      {/* Compact Header */}
      <header className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="text-3xl animate-bounce-slow">🐢</div>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Timmy the Turtle</h1>
              <p className="text-white/90 text-sm md:text-base">Official Jelly Cat Companion</p>
            </div>
            <div className="text-3xl animate-bounce-slow">🐢</div>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile Optimized */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-4">
        <div className="grid md:grid-cols-2 gap-4 h-full">
          {/* Timmy Image Section */}
          <div className="order-2 md:order-1 flex flex-col items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-sm">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <div className="w-full h-full bg-gradient-to-br from-green-200 to-blue-200 rounded-full flex items-center justify-center text-6xl">
                  🐢
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Official
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Timmy Turtle "Skating"</h2>
                <p className="text-gray-600 text-sm mb-3">From Jelly Cat Collection</p>
                <div className="flex justify-center space-x-2 text-sm text-gray-500">
                  <span>🥬 Loves lettuce</span>
                  <span>🌊 Loves swimming</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="order-1 md:order-2 flex flex-col h-[500px] md:h-[600px]">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col h-full">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 chat-scrollbar">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                          message.isUser
                            ? 'bg-ocean-blue text-white rounded-br-md'
                            : 'bg-turtle-green text-white rounded-bl-md'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-2xl rounded-bl-md">
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
              <div className="border-t border-gray-200 p-3">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Chat with Timmy..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-turtle-green focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-500 text-sm"
                      rows={1}
                      style={{ minHeight: '40px', maxHeight: '100px' }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-turtle-green hover:bg-turtle-dark disabled:bg-gray-300 text-white px-4 py-2 rounded-xl transition-colors duration-200 flex items-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact About Section */}
        <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <h2 className="text-lg font-bold text-turtle-dark mb-3 flex items-center">
            <Shell className="mr-2" size={20} />
            About Timmy
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Heart className="text-red-500" size={14} />
              <span className="text-gray-700">Official Jelly Cat</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="text-blue-500" size={14} />
              <span className="text-gray-700">Friendly & Chatty</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">🌊</span>
              <span className="text-gray-700">Loves Swimming</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🥬</span>
              <span className="text-gray-700">Loves Lettuce</span>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="bg-gradient-to-r from-green-400 to-blue-500 mt-4">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-white">
          <p className="font-semibold text-sm">Timmy the Turtle - Official Jelly Cat Character</p>
          <div className="mt-2">
            <a 
              href="https://www.jellycat.com/us/timmy-turtle-1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors duration-200"
            >
              Visit Jelly Cat
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
