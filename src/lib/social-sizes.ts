export interface SocialSize {
  id: string
  name: string
  width: number | null
  height: number | null
}

export const socialSizes: SocialSize[] = [
  { id: 'original', name: 'Original', width: null, height: null },
  { id: 'twitter-post', name: 'Twitter Post', width: 1200, height: 675 },
  { id: 'twitter-header', name: 'Twitter Header', width: 1500, height: 500 },
  { id: 'linkedin-post', name: 'LinkedIn Post', width: 1200, height: 627 },
  { id: 'instagram-post', name: 'Instagram Post', width: 1080, height: 1080 },
  { id: 'instagram-story', name: 'Instagram Story', width: 1080, height: 1920 },
  { id: 'product-hunt', name: 'Product Hunt', width: 1270, height: 760 },
  { id: 'og-image', name: 'Open Graph', width: 1200, height: 630 },
]

export const scaleOptions = [
  { id: '1x', label: '1x', value: 1 },
  { id: '2x', label: '2x', value: 2 },
  { id: '3x', label: '3x', value: 3 },
]
