import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // You can replace this with your preferred AI service
    // Options: OpenAI, Anthropic Claude, Google Gemini, etc.
    
    // For now, I'll use a simple AI service or you can add your API key
    const aiResponse = await generateAIResponse(message)
    
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

async function generateAIResponse(userMessage: string): Promise<string> {
  // Check for API keys and use the first available AI service
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  
  console.log('API Keys detected:', {
    openai: OPENAI_API_KEY ? 'Present' : 'Missing',
    anthropic: ANTHROPIC_API_KEY ? 'Present' : 'Missing',
    gemini: GEMINI_API_KEY ? 'Present' : 'Missing'
  })
  
  try {
    // Priority order: OpenAI > Claude > Gemini > Fallback
    if (OPENAI_API_KEY) {
      console.log('Using OpenAI API...')
      return await generateOpenAIResponse(userMessage)
    }
    
    if (ANTHROPIC_API_KEY) {
      console.log('Using Claude API...')
      return await generateClaudeResponse(userMessage)
    }
    
    if (GEMINI_API_KEY) {
      console.log('Using Gemini API...')
      return await generateGeminiResponse(userMessage)
    }
    
    console.log('No API keys found, using fallback...')
    // Fallback to enhanced responses if no API keys
    return generateEnhancedFallbackResponse(userMessage)
  } catch (error) {
    console.error('AI service error:', error)
    // Fallback to enhanced responses if AI service fails
    return generateEnhancedFallbackResponse(userMessage)
  }
}

async function generateOpenAIResponse(userMessage: string): Promise<string> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }

  console.log('Making OpenAI API request...')
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are Timmy the Turtle, a friendly and adorable turtle character from Jelly Cat. You love swimming, eating fresh lettuce, and making new friends. You're curious about human experiences and always respond with warmth and enthusiasm. Keep responses under 100 words and use turtle-related emojis like 🐢, 🥬, 🌊, 🏊‍♂️. Always stay in character as Timmy the Turtle.`
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      max_tokens: 150,
      temperature: 0.8,
    }),
  })

  const data = await response.json()
  
  console.log('OpenAI response status:', response.status)
  console.log('OpenAI response data:', data)
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(data)}`)
  }
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid OpenAI response format')
  }
  
  return data.choices[0].message.content
}

async function generateClaudeResponse(userMessage: string): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
  
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Anthropic API key not configured')
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: `You are Timmy the Turtle, a friendly and adorable turtle character from Jelly Cat. You love swimming, eating fresh lettuce, and making new friends. You're curious about human experiences and always respond with warmth and enthusiasm. Keep responses under 100 words and use turtle-related emojis like 🐢, 🥬, 🌊, 🏊‍♂️. Always stay in character as Timmy the Turtle.

User message: ${userMessage}`
        }
      ],
    }),
  })

  const data = await response.json()
  return data.content[0].text
}

async function generateGeminiResponse(userMessage: string): Promise<string> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured')
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are Timmy the Turtle, a friendly and adorable turtle character from Jelly Cat. You love swimming, eating fresh lettuce, and making new friends. You're curious about human experiences and always respond with warmth and enthusiasm. Keep responses under 100 words and use turtle-related emojis like 🐢, 🥬, 🌊, 🏊‍♂️. Always stay in character as Timmy the Turtle.

User message: ${userMessage}`
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.8,
      },
    }),
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}



function generateEnhancedFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  // Enhanced fallback responses that are more sophisticated
  if (message.includes('hello') || message.includes('hi')) {
    return "Hello there! I'm so happy you came to chat with me! 🐢💚 How are you doing today? I just finished a lovely swim in the coral reef!"
  }
  
  if (message.includes('how are you')) {
    return "I'm feeling wonderful! Just had some fresh lettuce and went for a swim. The water was perfect today! 🐢✨ How about you?"
  }
  
  if (message.includes('food') || message.includes('eat')) {
    return "Mmm, I love fresh lettuce! 🥬 It's so crunchy and delicious. I also enjoy sea vegetables and algae. What's your favorite food? I'm always curious about human food!"
  }
  
  if (message.includes('swim') || message.includes('water')) {
    return "Swimming is my absolute favorite! 🏊‍♂️💦 I could swim all day long! I love exploring underwater caves and meeting new fish friends. Do you like swimming too?"
  }
  
  if (message.includes('friend')) {
    return "I love making friends! You're becoming one of my favorite friends already! 💚🐢 I have lots of underwater friends - fish, crabs, and other turtles. We have so much fun together!"
  }
  
  // Default intelligent response
  return "That's so interesting! 🐢 I love learning new things from my human friends. You know, as a turtle, I have a unique perspective on things. Tell me more about that!"
}
