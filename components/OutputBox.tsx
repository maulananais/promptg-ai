'use client'

import { useState } from 'react'

interface OutputBoxProps {
  prompt: string
  onRegenerate: () => void
  isLoading: boolean
}

export default function OutputBox({ prompt, onRegenerate, isLoading }: OutputBoxProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 select-none">Generated Prompt</h3>
        <div className="flex items-center space-x-2">
          <img src="/assets/success.svg" alt="Success" className="w-5 h-5" />
          <span className="text-sm text-green-600 font-medium select-none">Generated Successfully</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {prompt}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 btn-secondary"
        >
          <img src="/assets/copy.svg" alt="Copy" className="w-4 h-4" />
          <span>{copySuccess ? 'Copied!' : 'Copy Prompt'}</span>
        </button>

        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Regenerating...</span>
            </>
          ) : (
            <>
              <img src="/assets/generate-again.svg" alt="Regenerate" className="w-4 h-4" />
              <span>Generate Again</span>
            </>
          )}
        </button>
      </div>

      {copySuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          Prompt copied to clipboard!
        </div>
      )}
    </div>
  )
}
