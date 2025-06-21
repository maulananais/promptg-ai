import { PromptFormData } from './promptTemplate'

export async function translateIfNeeded(text: string): Promise<string> {
  // Simple heuristic to detect Indonesian text
  const indonesianWords = ['yang', 'dan', 'dengan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dalam', 'adalah', 'akan', 'telah', 'sudah', 'bisa', 'dapat', 'harus', 'seperti', 'juga', 'tidak', 'ada', 'saya', 'kamu', 'dia', 'mereka', 'kami', 'kita']
  
  const words = text.toLowerCase().split(/\s+/)
  const indonesianWordCount = words.filter(word => indonesianWords.indexOf(word) !== -1).length
  const indonesianRatio = indonesianWordCount / words.length
  
  // If more than 20% of words are common Indonesian words, assume it's Indonesian
  if (indonesianRatio > 0.2) {
    // In a real implementation, you might want to use a translation API
    // For now, we'll return the original text with a note
    return text + ' (Indonesian detected - manual translation may be needed)'
  }
  
  return text
}

export async function generatePrompt(data: PromptFormData): Promise<string> {
  const translatedInput = await translateIfNeeded(data.userInput)
  
  const basePrompt = data.mode === 'video' 
    ? 'A cinematic video of' 
    : 'A high-quality image of'
  
  const audioNote = data.mode === 'video' && data.includeAudio 
    ? 'with immersive audio' 
    : data.mode === 'video' && !data.includeAudio 
    ? 'without audio' 
    : ''
  
  const composition = data.composition ? `${data.composition} composition,` : ''
  
  const prompt = `${basePrompt} ${translatedInput}, ${data.characterStyle} style, set in ${data.backgroundStyle}. ${composition} ${data.theme} theme, professional quality, highly detailed ${audioNote}`.trim()
  
  return prompt
}
