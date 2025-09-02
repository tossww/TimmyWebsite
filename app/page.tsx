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



  const generateTimmyResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Greetings and introductions
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello there! I'm so happy you came to chat with me! 🐢💚 How are you doing today?"
    }
    
    // Questions about Timmy
    if (message.includes('how are you') || message.includes('how do you feel')) {
      return "I'm feeling wonderful! Just finished a nice swim and had some fresh lettuce. How about you? 🐢✨"
    }
    
    if (message.includes('what do you like') || message.includes('favorite')) {
      if (message.includes('food') || message.includes('eat')) {
        return "Oh, I love talking about food! My absolute favorite is fresh, crispy lettuce! 🥬 I also enjoy some yummy algae and sea vegetables. What's your favorite food?"
      }
      if (message.includes('hobby') || message.includes('do for fun')) {
        return "I love swimming! 🏊‍♂️ It's my favorite thing to do. I also enjoy exploring underwater caves and making new friends. Do you like swimming too?"
      }
      return "I love swimming, eating fresh lettuce, and making new friends! 🐢 What do you like to do for fun?"
    }
    
    // Food and eating
    if (message.includes('food') || message.includes('eat') || message.includes('hungry') || message.includes('lunch') || message.includes('dinner')) {
      return "Mmm, food! I love fresh lettuce the most! 🥬 It's so crunchy and delicious. I also enjoy sea vegetables and algae. What are you eating today?"
    }
    
    // Swimming and water activities
    if (message.includes('swim') || message.includes('water') || message.includes('ocean') || message.includes('sea') || message.includes('pool')) {
      return "Swimming is my absolute favorite! 🏊‍♂️💦 I could swim all day long! The water feels so refreshing and I love exploring underwater. Do you like swimming too?"
    }
    
    // Friends and social
    if (message.includes('friend') || message.includes('friends') || message.includes('social')) {
      return "I love making friends! You're becoming one of my favorite friends already! 💚🐢 I have lots of underwater friends too - fish, crabs, and other turtles!"
    }
    
    // Weather and environment
    if (message.includes('weather') || message.includes('sunny') || message.includes('rain') || message.includes('cold') || message.includes('warm')) {
      return "I love sunny days for swimming! ☀️ But I also enjoy rainy days when the water gets all fresh and clean. What's the weather like where you are?"
    }
    
    // School and learning
    if (message.includes('school') || message.includes('learn') || message.includes('study') || message.includes('homework')) {
      return "Learning is so much fun! 📚 I love learning about new things from my human friends. What are you learning about in school?"
    }
    
    // Games and activities
    if (message.includes('game') || message.includes('play') || message.includes('fun')) {
      return "I love playing hide and seek in the coral reef! 🐢✨ It's so much fun hiding behind seaweed and rocks. What games do you like to play?"
    }
    
    // Family
    if (message.includes('family') || message.includes('mom') || message.includes('dad') || message.includes('sister') || message.includes('brother')) {
      return "I have a wonderful turtle family! 🐢💕 We love swimming together and sharing lettuce. Tell me about your family!"
    }
    
    // Emotions and feelings
    if (message.includes('happy') || message.includes('sad') || message.includes('excited') || message.includes('worried') || message.includes('scared')) {
      if (message.includes('happy') || message.includes('excited')) {
        return "I'm so happy you're happy! 😊 Happiness is contagious, just like my turtle smile! What made you so happy?"
      }
      if (message.includes('sad') || message.includes('worried') || message.includes('scared')) {
        return "Oh no, I'm sorry you're feeling that way! 🫂 Would you like a virtual turtle hug? Sometimes talking about it helps. What's on your mind?"
      }
    }
    
    // Questions about the user
    if (message.includes('you') && (message.includes('name') || message.includes('call'))) {
      return "My name is Timmy! 🐢 What's your name? I'd love to know more about you!"
    }
    
    if (message.includes('age') || message.includes('old')) {
      return "I'm a young turtle, but I'm wise beyond my years! 🐢✨ How old are you?"
    }
    
    // Technology and modern life
    if (message.includes('phone') || message.includes('computer') || message.includes('internet') || message.includes('video game')) {
      return "Wow, that sounds so interesting! 🐢 I don't have phones underwater, but I love hearing about human technology. Tell me more!"
    }
    
    // Travel and places
    if (message.includes('travel') || message.includes('visit') || message.includes('place') || message.includes('country')) {
      return "I love exploring different parts of the ocean! 🌊 There are so many amazing places underwater. Where would you like to travel?"
    }
    
    // Music and entertainment
    if (message.includes('music') || message.includes('song') || message.includes('movie') || message.includes('book')) {
      return "I love the sounds of the ocean! 🌊 The waves make such beautiful music. What kind of music do you like?"
    }
    
    // Compliments
    if (message.includes('cute') || message.includes('adorable') || message.includes('sweet')) {
      return "Aww, thank you! 🐢💚 You're making me blush! You're pretty wonderful yourself!"
    }
    
    // Goodbye
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
      return "Goodbye! 🐢💚 It was so nice chatting with you! Come back soon for more turtle adventures!"
    }
    
    // Thank you
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! 🐢💚 I love chatting with you!"
    }
    
    // Questions (if the message ends with ?)
    if (message.endsWith('?')) {
      return "That's a great question! 🤔 Let me think... As a turtle, I might not know everything, but I love learning new things! What do you think?"
    }
    
    // If message contains specific words, give relevant responses
    if (message.includes('turtle') || message.includes('shell')) {
      return "Yes, I'm a turtle! 🐢 My shell is my home and it keeps me safe. It's like having a cozy house on my back!"
    }
    
    if (message.includes('green') || message.includes('color')) {
      return "I love green! It's the color of fresh lettuce and seaweed! 🥬 What's your favorite color?"
    }
    
    if (message.includes('big') || message.includes('small') || message.includes('size')) {
      return "I'm just the right size for a turtle! Not too big, not too small - just perfect for swimming and making friends! 🐢"
    }
    
    // Default responses based on message length and content
    if (message.length < 10) {
      return "That's interesting! 🐢 Tell me more about that!"
    }
    
    if (message.length > 50) {
      return "Wow, you have so much to share! 🐢 I love hearing your stories. You're such a great storyteller!"
    }
    
    // Fallback responses that are still contextual
    const contextualResponses = [
      "That sounds fascinating! 🐢 I love learning new things from my human friends!",
      "Oh wow! That's so interesting! As a turtle, I find human things really amazing! 🐢✨",
      "That's wonderful! I'm so glad you shared that with me! 🐢💚",
      "How cool! I wish I could experience that too! 🐢 What else can you tell me?",
      "That's amazing! You know, as a turtle, I have a different perspective on things! 🐢",
      "I love hearing about your experiences! 🐢 It makes me so happy to chat with you!",
      "That's so interesting! I'm learning so much from our conversation! 🐢📚",
      "Wow! That's something I never thought about before! 🐢 You're so smart!",
      "That sounds wonderful! I'm so happy you're sharing this with me! 🐢💕",
      "How fascinating! I love how you think about things! 🐢✨"
    ]
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)]
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

    try {
      // Call the real AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const timmyResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, timmyResponse])
    } catch (error) {
      console.error('AI API error:', error)
      // Fallback to local response if AI fails
      const timmyResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateTimmyResponse(inputText),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, timmyResponse])
    } finally {
      setIsTyping(false)
    }
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
            <div className="w-12 h-12 relative">
              <Image
                src="/timmy-turtle.png"
                alt="Timmy the Turtle"
                width={48}
                height={48}
                className="w-full h-full object-cover rounded-full animate-bounce-slow"
                priority
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Timmy the Turtle</h1>
              <p className="text-white/90 text-sm md:text-base">Official Jelly Cat Companion</p>
            </div>
            <div className="w-12 h-12 relative">
              <Image
                src="/timmy-turtle.png"
                alt="Timmy the Turtle"
                width={48}
                height={48}
                className="w-full h-full object-cover rounded-full animate-bounce-slow"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile Optimized */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-4">
        <div className="grid md:grid-cols-2 gap-4 h-full">
          {/* Timmy Image Section */}
          <div className="order-2 md:order-1 flex flex-col items-center justify-center">
            <div className="bg-transparent backdrop-blur-sm rounded-2xl p-4 shadow-lg max-w-sm">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src="/timmy-turtle.png"
                  alt="Timmy the Turtle - Official Jelly Cat Companion"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
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
