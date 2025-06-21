'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PromptFormData, promptSchema, promptTemplate } from '@/lib/promptTemplate'
import { generatePrompt } from '@/lib/generatePrompt'
import { generatePromptWithGroq } from '@/lib/groqApi'
import Toggle from './Toggle'
import OutputBox from './OutputBox'

interface PromptBuilderProps {
  apiKey: string
}

export default function PromptBuilder({ apiKey }: PromptBuilderProps) {  const [isLoading, setIsLoading] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      mode: 'image',
      includeAudio: false,
      theme: '',
      backgroundStyle: '',
      characterStyle: '',
      composition: '',
      userInput: '',
    },
  })

  const watchedMode = watch('mode')
  const watchedIncludeAudio = watch('includeAudio')

  const onSubmit = async (data: PromptFormData) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Generate basic prompt
      const basicPrompt = await generatePrompt(data)
      
      // Enhance with Groq API
      const enhancedPrompt = await generatePromptWithGroq(apiKey, basicPrompt)      
      setGeneratedPrompt(enhancedPrompt)
      setSuccessMessage('Prompt generated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Failed to generate prompt. Please try again.')
      console.error('Generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }
  const handleRegeneratePrompt = () => {
    handleSubmit(onSubmit)()
  }

  const handleResetForm = () => {
    setValue('mode', 'image')
    setValue('includeAudio', false)
    setValue('theme', '')
    setValue('backgroundStyle', '')
    setValue('characterStyle', '')
    setValue('composition', '')
    setValue('userInput', '')
    setGeneratedPrompt('')
    setError('')
    setSuccessMessage('')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* All-in-One Configuration Card */}        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold select-none">Configure Your Prompt</h3>
            <button
              type="button"
              onClick={handleResetForm}
              className="btn-secondary text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All
            </button>
          </div>
            {/* Mode Selection */}
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3 select-none">Generation Mode</h4>
            <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
              <button
                type="button"
                onClick={() => setValue('mode', 'image')}
                className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-all ${
                  watchedMode === 'image'
                    ? 'bg-white shadow-sm border border-gray-200 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <img src="/assets/image.svg" alt="Image" className="w-5 h-5" />
                <span className="font-medium">Image</span>
              </button>
              
              <button
                type="button"
                onClick={() => setValue('mode', 'video')}
                className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-all ${
                  watchedMode === 'video'
                    ? 'bg-white shadow-sm border border-gray-200 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <img src="/assets/video.svg" alt="Video" className="w-5 h-5" />
                <span className="font-medium">Video</span>
              </button>
            </div>            {watchedMode === 'video' && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <Toggle
                  label="Include Audio"
                  checked={watchedIncludeAudio ?? false}
                  onChange={(checked) => setValue('includeAudio', checked)}
                  iconOn="/assets/audio-on.svg"
                  iconOff="/assets/audio-mute.svg"
                />
              </div>
            )}
          </div>          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-none">
                <img src="/assets/bg-style.svg" alt="Theme" className="w-4 h-4 inline mr-2" />
                Theme
              </label>
              <select {...register('theme')} className="input-field">
                <option value="">Select theme...</option>
                {promptTemplate.themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
              {errors.theme && (
                <p className="text-red-600 text-xs mt-1">{errors.theme.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-none">
                <img src="/assets/bg-style.svg" alt="Background" className="w-4 h-4 inline mr-2" />
                Background Style
              </label>
              <select {...register('backgroundStyle')} className="input-field">
                <option value="">Select background...</option>
                {promptTemplate.backgroundStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              {errors.backgroundStyle && (
                <p className="text-red-600 text-xs mt-1">{errors.backgroundStyle.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-none">
                <img src="/assets/char-style.svg" alt="Character" className="w-4 h-4 inline mr-2" />
                Character Style
              </label>
              <select {...register('characterStyle')} className="input-field">
                <option value="">Select character style...</option>
                {promptTemplate.characterStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              {errors.characterStyle && (
                <p className="text-red-600 text-xs mt-1">{errors.characterStyle.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-none">
                Camera Composition (Optional)
              </label>
              <select {...register('composition')} className="input-field">
                <option value="">Select composition...</option>
                {promptTemplate.compositions.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>
          </div>          {/* User Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 select-none">
              Describe Your Vision (English or Bahasa Indonesia)
            </label>
            <textarea
              {...register('userInput')}
              className="input-field min-h-24"
              placeholder="Describe what you want to generate... e.g., 'perempuan berjalan di tengah hutan cyberpunk' or 'a woman walking through a cyberpunk forest'"
              rows={3}
            />
            {errors.userInput && (
              <p className="text-red-600 text-xs mt-1">{errors.userInput.message}</p>
            )}
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
              <img src="/assets/success.svg" alt="Success" className="w-5 h-5 mr-2" />
              <span className="text-green-700 text-sm">{successMessage}</span>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-center mb-4 p-3 bg-red-50 rounded-lg">
              <img src="/assets/error.svg" alt="Error" className="w-5 h-5 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Generate Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto px-8 py-3"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating Amazing Prompt...
                </>
              ) : (
                <>
                  <img src="/assets/send.svg" alt="Generate" className="w-5 h-5 mr-3" />
                  Generate Prompt
                </>
              )}
            </button>
          </div>
        </div>
      </form>      {/* Output */}
      {generatedPrompt ? (
        <OutputBox
          prompt={generatedPrompt}
          onRegenerate={handleRegeneratePrompt}
          isLoading={isLoading}
        />
      ) : (
        <div className="card text-center">
          <div className="py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 select-none">No prompt generated yet</h3>
            <p className="text-gray-500 select-none">Configure your settings above and click "Generate Prompt" to get started</p>
          </div>
        </div>
      )}
    </div>
  )
}
