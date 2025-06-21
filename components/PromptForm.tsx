'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PromptFormData, promptSchema, promptTemplate } from '@/lib/promptTemplate'
import { generatePrompt } from '@/lib/generatePrompt'
import { generatePromptWithGroq } from '@/lib/groqApi'
import Toggle from './Toggle'
import OutputBox from './OutputBox'

interface PromptFormProps {
  apiKey: string
}

export default function PromptForm({ apiKey }: PromptFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [error, setError] = useState('')

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

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="space-y-6">
      {/* Step Progress */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Mode Selection */}
        {currentStep === 1 && (
          <div className="card animate-slide-up">
            <h3 className="text-xl font-semibold mb-4">Select Generation Mode</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setValue('mode', 'image')}
                className={`p-6 border-2 rounded-lg flex flex-col items-center space-y-3 transition-all ${
                  watchedMode === 'image'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src="/assets/image.svg" alt="Image" className="w-12 h-12" />
                <span className="font-medium">Image Mode</span>
              </button>
              
              <button
                type="button"
                onClick={() => setValue('mode', 'video')}
                className={`p-6 border-2 rounded-lg flex flex-col items-center space-y-3 transition-all ${
                  watchedMode === 'video'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src="/assets/video.svg" alt="Video" className="w-12 h-12" />
                <span className="font-medium">Video Mode</span>
              </button>
            </div>            {watchedMode === 'video' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <Toggle
                  label="Include Audio"
                  checked={watchedIncludeAudio ?? false}
                  onChange={(checked) => setValue('includeAudio', checked)}
                  iconOn="/assets/audio-on.svg"
                  iconOff="/assets/audio-mute.svg"
                />
              </div>
            )}

            {errors.mode && (
              <p className="text-red-600 text-sm mt-2">{errors.mode.message}</p>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={nextStep}
                disabled={!watchedMode}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Prompt Metadata */}
        {currentStep === 2 && (
          <div className="card animate-slide-up">
            <h3 className="text-xl font-semibold mb-4">Configure Your Prompt</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-600 text-sm mt-1">{errors.theme.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-600 text-sm mt-1">{errors.backgroundStyle.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className="text-red-600 text-sm mt-1">{errors.characterStyle.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Composition (Optional)
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
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: User Input */}
        {currentStep === 3 && (
          <div className="card animate-slide-up">
            <h3 className="text-xl font-semibold mb-4">Describe Your Vision</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Input (English or Bahasa Indonesia)
              </label>
              <textarea
                {...register('userInput')}
                className="input-field min-h-32"
                placeholder="Describe what you want to generate... e.g., 'perempuan berjalan di tengah hutan cyberpunk' or 'a woman walking through a cyberpunk forest'"
                rows={4}
              />
              {errors.userInput && (
                <p className="text-red-600 text-sm mt-1">{errors.userInput.message}</p>
              )}
            </div>

            {error && (
              <div className="flex items-center mt-4 p-3 bg-red-50 rounded-lg">
                <img src="/assets/error.svg" alt="Error" className="w-5 h-5 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <img src="/assets/send.svg" alt="Generate" className="w-4 h-4 mr-2" />
                    Generate Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Output */}
      {generatedPrompt && (
        <OutputBox
          prompt={generatedPrompt}
          onRegenerate={handleRegeneratePrompt}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
