export async function validateGroqApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    
    return response.ok
  } catch (error) {
    console.error('API key validation error:', error)
    return false
  }
}

export async function generatePromptWithGroq(
  apiKey: string, 
  prompt: string
): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a professional prompt engineer specialized in creating high-quality, detailed prompts for AI image and video generation. Enhance the given prompt while maintaining its core intent, making it more descriptive and technically precise for optimal AI generation results.'
          },
          {
            role: 'user',
            content: `Please enhance this prompt for AI image/video generation: "${prompt}"`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || prompt
  } catch (error) {
    console.error('Groq API call error:', error)
    throw error
  }
}
