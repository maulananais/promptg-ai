'use client'

import { useState, useEffect } from 'react'
import APITokenForm from '@/components/APITokenForm'
import PromptBuilder from '@/components/PromptBuilder'

export default function HomePage() {
  const [apiKey, setApiKey] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('groq_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
      setIsAuthenticated(true)
    }
  }, [])

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    setIsAuthenticated(true)
    localStorage.setItem('groq_api_key', key)
  }

  const handleLogout = () => {
    setApiKey('')
    setIsAuthenticated(false)
    localStorage.removeItem('groq_api_key')
  }

  return (
    <div className="max-w-6xl mx-auto">
      {!isAuthenticated ? (
        <div className="animate-fade-in">
          <APITokenForm onSubmit={handleApiKeySubmit} />
        </div>
      ) : (
        <div className="animate-slide-up">
          <div className="flex justify-between items-center mb-6">            <h2 className="text-2xl font-semibold text-gray-800 select-none">
              Instant Prompt Generator
            </h2>
            <button
              onClick={handleLogout}
              className="btn-secondary text-sm"
            >
              Change API Key
            </button>
          </div>
          <PromptBuilder apiKey={apiKey} />
        </div>
      )}
    </div>
  )
}
