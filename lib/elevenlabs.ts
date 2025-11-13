import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

export const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

export async function textToSpeech(text: string, voiceId: string = 'pNInz6obpgDQGcFmaJgB') {
  // Default voice: Adam (professional British accent)
  // Alternative: 'EXAVITQu4vr4xnSDxMaL' for Bella (professional American female)

  try {
    const audio = await elevenlabs.textToSpeech.convert(voiceId, {
      text,
      modelId: 'eleven_multilingual_v2',
    })

    return audio
  } catch (error) {
    console.error('ElevenLabs TTS error:', error)
    throw error
  }
}

export async function streamTextToSpeech(text: string, voiceId: string = 'pNInz6obpgDQGcFmaJgB') {
  try {
    const audioStream = await elevenlabs.textToSpeech.convert(voiceId, {
      text,
      modelId: 'eleven_multilingual_v2',
      outputFormat: 'mp3_44100_128',
    })

    return audioStream
  } catch (error) {
    console.error('ElevenLabs streaming TTS error:', error)
    throw error
  }
}
