import { NextRequest } from 'next/server'
import { textToSpeech } from '@/lib/elevenlabs'

export async function POST(req: NextRequest) {
  try {
    const { text, voiceId } = await req.json()

    const audioStream = await textToSpeech(text, voiceId)

    // Convert stream to buffer
    const chunks: Buffer[] = []
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk))
    }
    const audioBuffer = Buffer.concat(chunks)

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Speech generation error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate speech' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
