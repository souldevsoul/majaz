'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import GlassCard from '@/components/majaz/GlassCard'
import VoiceVisualizer from '@/components/interview/VoiceVisualizer'

export default function InterviewPage() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const questions = isArabic ? [
    'مرحبًا بك في مجاز. أنا هنا لمساعدتك في العثور على الباقة المثالية. ما اسمك؟',
    'ما نوع المركبات التي تهتم بها؟',
    'كم عدد المركبات التي تشتريها أو تفحصها سنويًا؟',
    'هل تبحث عن فحص لمرة واحدة أم خدمة كونسيرج مستمرة؟',
    'هل تحتاج إلى البحث الدولي عن المركبات؟'
  ] : [
    'Welcome to MAJAZ. I\'m here to help match you with the perfect package. May I have your name?',
    'What type of vehicles are you interested in?',
    'How many vehicles do you purchase or inspect per year?',
    'Are you looking for one-time inspection or ongoing concierge service?',
    'Do you need international vehicle sourcing?'
  ]

  const startInterview = () => {
    setIsListening(true)
    speakQuestion(questions[0])
  }

  const speakQuestion = (text: string) => {
    setIsSpeaking(true)
    addToTranscript('AI', text)

    // Simulate speech (TODO: Integrate ElevenLabs)
    setTimeout(() => {
      setIsSpeaking(false)
    }, 3000)
  }

  const addToTranscript = (speaker: 'User' | 'AI', text: string) => {
    setTranscript(prev => [...prev, `${speaker}: ${text}`])
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      speakQuestion(questions[currentQuestion + 1])
    } else {
      // Interview complete
      window.location.href = `/${locale}/interview/result`
    }
  }

  return (
    <div className="interview-page">
      <div className="interview-container">
        {/* Header */}
        <div className="interview-header">
          <h1 className="interview-title">
            {isArabic ? 'مقابلة الذكاء الاصطناعي' : 'AI Package Advisor'}
          </h1>
          <p className="interview-subtitle">
            {isArabic
              ? 'دعنا نجد الباقة المثالية لك'
              : 'Let\'s find the perfect package for you'}
          </p>
        </div>

        {/* Main Interview Card */}
        <GlassCard className="interview-card">
          {/* Voice Visualizer */}
          <div className="visualizer-container">
            <VoiceVisualizer isActive={isListening || isSpeaking} isSpeaking={isSpeaking} />
          </div>

          {/* Microphone Button */}
          <div className="mic-container">
            {!isListening ? (
              <button onClick={startInterview} className="mic-button">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 10v1a7 7 0 0014 0v-1M12 18v4m-4 0h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{isArabic ? 'ابدأ المقابلة' : 'Start Interview'}</span>
              </button>
            ) : (
              <button onClick={() => setIsListening(false)} className="mic-button listening">
                <div className="pulse" />
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="9" y="2" width="6" height="11" rx="3"/>
                  <path d="M5 10v1a7 7 0 0014 0v-1M12 18v4m-4 0h8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{isSpeaking ? (isArabic ? 'الوكيل يتحدث...' : 'AI Speaking...') : (isArabic ? 'استمع...' : 'Listening...')}</span>
              </button>
            )}
          </div>

          {/* Progress */}
          {isListening && (
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
              <p className="progress-text">
                {isArabic ? `السؤال ${currentQuestion + 1} من ${questions.length}` : `Question ${currentQuestion + 1} of ${questions.length}`}
              </p>
            </div>
          )}

          {/* Transcript */}
          {transcript.length > 0 && (
            <div className="transcript">
              <h3>{isArabic ? 'النسخة' : 'Transcript'}</h3>
              <div className="transcript-messages">
                {transcript.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${msg.startsWith('AI') ? 'ai' : 'user'}`}
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Test Buttons (Dev Mode) */}
          {isListening && (
            <button onClick={handleNextQuestion} className="next-button">
              {isArabic ? 'السؤال التالي (اختبار)' : 'Next Question (Test)'}
            </button>
          )}
        </GlassCard>

        {/* Info Card */}
        <div className="info-text">
          <p>
            {isArabic
              ? 'سيسألك الوكيل الذكي بعض الأسئلة لفهم احتياجاتك والتوصية بالباقة المثالية'
              : 'Our AI agent will ask you a few questions to understand your needs and recommend the perfect package'}
          </p>
        </div>
      </div>

      <style jsx>{`
        .interview-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
          padding: 140px 2rem 80px;
        }

        .interview-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .interview-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .interview-title {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 200;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem 0;
        }

        .interview-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 240, 0.7);
          margin: 0;
        }

        .interview-card {
          padding: 3rem 2rem;
          text-align: center;
        }

        .visualizer-container {
          margin-bottom: 2rem;
        }

        .mic-container {
          margin: 2rem 0;
        }

        .mic-button {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          width: 180px;
          height: 180px;
          margin: 0 auto;
          cursor: pointer;
          transition: all 0.4s ease;
          color: #D4AF37;
        }

        .mic-button:hover {
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.1);
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.3);
        }

        .mic-button.listening {
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.15);
          animation: pulse-border 2s infinite;
        }

        .mic-button span {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pulse {
          position: absolute;
          inset: -10px;
          border: 2px solid #D4AF37;
          border-radius: 50%;
          animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            border-color: rgba(212, 175, 55, 0.5);
          }
          50% {
            border-color: rgba(212, 175, 55, 1);
          }
        }

        .progress-container {
          margin: 2rem 0;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(212, 175, 55, 0.2);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #D4AF37 0%, #B8941E 100%);
          transition: width 0.5s ease;
        }

        .progress-text {
          color: rgba(255, 255, 240, 0.6);
          font-size: 0.875rem;
          margin: 0;
        }

        .transcript {
          margin-top: 2rem;
          text-align: left;
        }

        .transcript h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #D4AF37;
          margin: 0 0 1rem 0;
        }

        .transcript-messages {
          max-height: 300px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .message {
          padding: 0.875rem 1rem;
          border-radius: 8px;
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .message.ai {
          background: rgba(212, 175, 55, 0.1);
          border-left: 3px solid #D4AF37;
          color: rgba(255, 255, 240, 0.9);
        }

        .message.user {
          background: rgba(255, 255, 255, 0.05);
          border-left: 3px solid rgba(255, 255, 240, 0.3);
          color: rgba(255, 255, 240, 0.8);
        }

        .next-button {
          margin-top: 1.5rem;
          padding: 0.75rem 2rem;
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 8px;
          color: #D4AF37;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .next-button:hover {
          background: rgba(212, 175, 55, 0.3);
        }

        .info-text {
          text-align: center;
          margin-top: 2rem;
        }

        .info-text p {
          color: rgba(255, 255, 240, 0.6);
          font-size: 0.9375rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .interview-title {
            font-size: 2rem;
          }

          .mic-button {
            width: 140px;
            height: 140px;
          }

          .mic-button svg {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  )
}
