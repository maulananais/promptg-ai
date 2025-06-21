'use client'

import { useState } from 'react'
import { validateGroqApiKey } from '@/lib/groqApi'

interface APITokenFormProps {
  onSubmit: (apiKey: string) => void
}

export default function APITokenForm({ onSubmit }: APITokenFormProps) {
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const isValid = await validateGroqApiKey(apiKey)
      if (isValid) {
        onSubmit(apiKey)
      } else {
        setError('Invalid API key. Please check your Groq API key and try again.')
      }
    } catch (err) {
      setError('Failed to validate API key. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m0 0a2 2 0 01-2 2m2-2V9a2 2 0 012-2m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 00-2 2m2-2a2 2 0 012-2h6a2 2 0 012 2z" />
          </svg>
        </div>        <h2 className="text-2xl font-bold text-gray-800 mb-2 select-none">
          Welcome to PromptG AI
        </h2>
        <p className="text-gray-600 text-sm select-none">
          Enter your Groq API key to access the instant prompt generator
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Groq API Key
          </label>          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={`input-field ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}`}
            placeholder="Enter your Groq API key..."
            required
          />
          {error && (
            <div className="flex items-center mt-2 text-red-600 text-sm">
              <img src="/assets/error.svg" alt="Error" className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>        <button
          type="submit"
          disabled={isLoading || !apiKey.trim()}
          className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center ${
            isLoading 
              ? 'bg-yellow-500 text-white cursor-not-allowed' 
              : apiKey.trim() 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Validating...
            </>
          ) : (
            'Start Generating Prompts'
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          How to get your Groq API Key:
        </h3>
        <ol className="text-xs text-blue-700 space-y-1">
          <li>1. Visit <a href="https://console.groq.com" className="underline" target="_blank" rel="noopener noreferrer">console.groq.com</a></li>
          <li>2. Sign up or log in to your account</li>
          <li>3. Navigate to API Keys section</li>
          <li>4. Create a new API key</li>
          <li>5. Copy and paste it here</li>
        </ol>
      </div>
    </div>
  )
}
