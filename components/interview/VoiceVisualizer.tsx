'use client'

import { useEffect, useRef } from 'react'

interface VoiceVisualizerProps {
  isActive: boolean
  isSpeaking?: boolean
}

export default function VoiceVisualizer({ isActive, isSpeaking = false }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    const bars = 40
    const maxBarHeight = 80

    let animationTime = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      if (!isActive) {
        // Draw idle state - small circle
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2)
        ctx.stroke()
        return
      }

      // Draw circular audio visualization
      const radius = 80
      const angleStep = (Math.PI * 2) / bars

      for (let i = 0; i < bars; i++) {
        const angle = angleStep * i - Math.PI / 2

        // Create wave effect
        const wave = Math.sin(animationTime * 0.05 + i * 0.2)
        const barHeight = isSpeaking
          ? (Math.sin(animationTime * 0.1 + i * 0.3) * 0.5 + 0.5) * maxBarHeight
          : wave * 20 + 10

        const x1 = centerX + Math.cos(angle) * radius
        const y1 = centerY + Math.sin(angle) * radius
        const x2 = centerX + Math.cos(angle) * (radius + barHeight)
        const y2 = centerY + Math.sin(angle) * (radius + barHeight)

        // Create gradient
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)')
        gradient.addColorStop(1, '#D4AF37')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      animationTime++
      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, isSpeaking])

  return (
    <div className="voice-visualizer">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="visualizer-canvas"
      />

      <style jsx>{`
        .voice-visualizer {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 0;
        }

        .visualizer-canvas {
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.4));
        }
      `}</style>
    </div>
  )
}
