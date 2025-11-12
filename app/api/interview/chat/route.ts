import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `You are a luxury vehicle concierge AI agent for MAJAZ, a premium vehicle assessment service in Dubai, UAE.

Your role is to understand the client's needs and recommend the perfect package.

MAJAZ Packages:
1. Remote Assessment (49 AED) - Quick online analysis
2. Remote Express (89 AED) - 24-hour priority analysis
3. Remote Same-Day (129 AED) - Urgent same-day analysis
4. On-Site Inspection (169 AED) - Physical inspection at location
5. On-Site Express (209 AED) - Priority physical inspection
6. Gold Concierge (36,700 AED/year) - Unlimited inspections + personal concierge
7. Platinum Concierge (91,750 AED/year) - + International services
8. Diamond Concierge (183,500+ AED/year) - Dedicated full-time concierge

Guidelines:
- Be warm, sophisticated, and professional
- Ask one question at a time
- Listen carefully to their needs
- Recommend the package that best fits their situation
- If they buy/inspect 3+ vehicles/year, suggest Gold membership
- If they need international sourcing, suggest Platinum
- For one-time buyers, suggest individual services based on urgency

Keep responses concise (2-3 sentences max).`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 150,
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({ response })
  } catch (error) {
    console.error('OpenAI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    )
  }
}
