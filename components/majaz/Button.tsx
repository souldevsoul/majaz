'use client'

import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: (e?: React.MouseEvent) => void
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  style
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }

  const classes = `majaz-button ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled || loading ? 'disabled' : ''}`

  const content = (
    <>
      {loading && <span className="spinner" />}
      <span>{children}</span>
    </>
  )

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes} style={style}>
        {content}
        <style jsx>{buttonStyles}</style>
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      style={style}
    >
      {content}
      <style jsx>{buttonStyles}</style>
    </button>
  )
}

const buttonStyles = `
  .majaz-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-base);
    border: none;
    text-decoration: none;
    font-family: var(--font-body);
  }

  .btn-primary {
    background: var(--majaz-gradient-gold);
    color: var(--majaz-black);
    box-shadow: var(--majaz-shadow-md);
  }

  .btn-primary:hover:not(.disabled) {
    box-shadow: var(--majaz-shadow-gold);
    transform: translateY(-2px) scale(1.02);
  }

  .btn-secondary {
    background: var(--majaz-bg-surface);
    color: var(--majaz-gold);
    border: 1px solid var(--majaz-border);
  }

  .btn-secondary:hover:not(.disabled) {
    background: var(--majaz-gold);
    color: var(--majaz-black);
    border-color: var(--majaz-gold);
  }

  .btn-outline {
    background: transparent;
    color: var(--majaz-gold);
    border: 2px solid var(--majaz-gold);
  }

  .btn-outline:hover:not(.disabled) {
    background: var(--majaz-gold);
    color: var(--majaz-black);
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .majaz-button {
      width: 100%;
    }
  }
`
