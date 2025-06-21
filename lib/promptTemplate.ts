import { z } from 'zod'

export const promptSchema = z.object({
  mode: z.enum(['image', 'video']),
  includeAudio: z.boolean().optional(),
  theme: z.string().min(1, 'Theme is required'),
  backgroundStyle: z.string().min(1, 'Background style is required'),
  characterStyle: z.string().min(1, 'Character style is required'),
  composition: z.string().optional(),
  userInput: z.string().min(1, 'User input is required'),
})

export type PromptFormData = z.infer<typeof promptSchema>

export interface PromptTemplate {
  themes: string[]
  backgroundStyles: string[]
  characterStyles: string[]
  compositions: string[]
}

export const promptTemplate: PromptTemplate = {
  themes: [
    'Cyberpunk',
    'Fantasy',
    'Sci-Fi',
    'Modern',
    'Vintage',
    'Minimalist',
    'Dark',
    'Bright',
    'Cinematic',
    'Artistic',
    'Dreamy',
    'Horror',
    'Steampunk',
    'Noir',
    'Futuristic'
  ],
  backgroundStyles: [
    'Rainy neon-lit city street',
    'Mystical enchanted forest',
    'Futuristic spaceship interior',
    'Modern office building',
    'Vintage coffee shop',
    'Minimalist white room',
    'Dark alley',
    'Bright sunny park',
    'Movie set',
    'Art gallery',
    'Digital void',
    'Cityscape',
    'Nature landscape',
    'Underground tunnel',
    'Rooftop terrace'
  ],
  characterStyles: [
    '3D realistic',
    '2D anime',
    'Photorealistic',
    'Cartoon',
    'Oil painting',
    'Watercolor',
    'Sketch',
    'Pixel art',
    'Digital art',
    'Renaissance style',
    'Claymation',
    'Manga style',
    'Comic book style',
    'Impressionist',
    'Pop art'
  ],
  compositions: [
    'Wide angle',
    'Close-up',
    'Medium shot',
    'Bird\'s eye view',
    'Low angle',
    'High angle',
    'Portrait',
    'Landscape',
    'Macro',
    'Panoramic',
    'Drone shot',
    'Overhead',
    'Dutch angle',
    'Extreme close-up',
    'Establishing shot'
  ]
}
