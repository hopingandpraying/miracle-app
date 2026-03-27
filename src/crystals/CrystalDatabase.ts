/**
 * CrystalDatabase — comprehensive crystal healing reference
 * with compatibility matching, chakra alignment, and collection management.
 */

export type Chakra = 'root' | 'sacral' | 'solar_plexus' | 'heart' | 'throat' | 'third_eye' | 'crown'
export type Element = 'earth' | 'water' | 'fire' | 'air' | 'spirit'
export type ZodiacSign = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'
export type MoonPhase = 'new_moon' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full_moon' | 'waning_gibbous' | 'third_quarter' | 'waning_crescent'

export interface Crystal {
  id: string
  name: string
  color: string
  hexColor: string
  chakras: Chakra[]
  elements: Element[]
  zodiacSigns: ZodiacSign[]
  hardness: number
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythical'
  properties: string[]
  healingProperties: string[]
  emotionalProperties: string[]
  spiritualProperties: string[]
  bestMoonPhase: MoonPhase
  cleanseMethods: string[]
  chargeMethods: string[]
  pairsWellWith: string[]
  conflictsWith: string[]
  affirmation: string
  origin: string[]
  priceRange: { min: number; max: number; unit: string }
  careInstructions: string
  funFact: string
}

export interface CrystalCollection {
  id: string
  name: string
  crystals: { crystalId: string; acquiredDate: string; notes: string; cleansedDate: string | null }[]
  totalValue: number
  chakraCoverage: Record<Chakra, number>
  elementBalance: Record<Element, number>
  overallVibeScore: number
}

export interface CrystalRecommendation {
  crystal: Crystal
  matchScore: number
  reasons: string[]
  urgency: 'nice_to_have' | 'recommended' | 'strongly_recommended' | 'your_soul_needs_this'
}

const CRYSTALS: Crystal[] = [
  {
    id: 'amethyst', name: 'Amethyst', color: 'Purple', hexColor: '#9b59b6',
    chakras: ['third_eye', 'crown'], elements: ['air', 'water'], zodiacSigns: ['pisces', 'virgo', 'aquarius'],
    hardness: 7, rarity: 'common',
    properties: ['Protection', 'Intuition', 'Calm', 'Clarity'],
    healingProperties: ['Relieves stress', 'Promotes restful sleep', 'Eases headaches'],
    emotionalProperties: ['Calms anxiety', 'Enhances emotional stability', 'Promotes self-awareness'],
    spiritualProperties: ['Opens third eye', 'Enhances meditation', 'Connects to higher self'],
    bestMoonPhase: 'full_moon', cleanseMethods: ['Moonlight', 'Sage smoke', 'Sound'],
    chargeMethods: ['Full moon', 'Amethyst cluster', 'Selenite plate'],
    pairsWellWith: ['clear_quartz', 'rose_quartz', 'citrine'],
    conflictsWith: ['carnelian'],
    affirmation: 'I trust my intuition and embrace peace.',
    origin: ['Brazil', 'Uruguay', 'Zambia'], priceRange: { min: 5, max: 50, unit: 'USD' },
    careInstructions: 'Avoid prolonged sunlight — color may fade. Cleanse monthly under full moon.',
    funFact: 'Ancient Greeks believed amethyst prevented intoxication. The name literally means "not drunk."',
  },
  {
    id: 'rose_quartz', name: 'Rose Quartz', color: 'Pink', hexColor: '#f8a5c2',
    chakras: ['heart'], elements: ['water', 'earth'], zodiacSigns: ['taurus', 'libra'],
    hardness: 7, rarity: 'common',
    properties: ['Love', 'Compassion', 'Healing', 'Forgiveness'],
    healingProperties: ['Supports heart health', 'Improves circulation', 'Aids skin clarity'],
    emotionalProperties: ['Attracts love', 'Heals heartbreak', 'Promotes self-love'],
    spiritualProperties: ['Opens heart chakra', 'Enhances empathy', 'Attracts soulmate energy'],
    bestMoonPhase: 'waxing_crescent', cleanseMethods: ['Running water', 'Rose petals', 'Sound'],
    chargeMethods: ['Moonlight', 'Rose water bath', 'Selenite'],
    pairsWellWith: ['amethyst', 'clear_quartz', 'green_aventurine'],
    conflictsWith: ['obsidian'],
    affirmation: 'I am worthy of love and I radiate compassion.',
    origin: ['Madagascar', 'Brazil', 'South Dakota'], priceRange: { min: 3, max: 40, unit: 'USD' },
    careInstructions: 'Gentle stone but avoid extreme heat. Cleanse with rose water for extra love energy.',
    funFact: 'Cleopatra reportedly bathed in rose quartz-infused water to maintain her youthful complexion.',
  },
  {
    id: 'citrine', name: 'Citrine', color: 'Yellow', hexColor: '#f9ca24',
    chakras: ['solar_plexus', 'sacral'], elements: ['fire'], zodiacSigns: ['aries', 'gemini', 'leo'],
    hardness: 7, rarity: 'uncommon',
    properties: ['Abundance', 'Joy', 'Confidence', 'Manifestation'],
    healingProperties: ['Boosts metabolism', 'Supports digestion', 'Increases energy'],
    emotionalProperties: ['Combats depression', 'Increases motivation', 'Attracts prosperity'],
    spiritualProperties: ['Amplifies manifestation', 'Activates personal power', 'Clears negative energy'],
    bestMoonPhase: 'waxing_gibbous', cleanseMethods: ['Sunlight', 'Sound', 'Sage'],
    chargeMethods: ['Morning sunlight', 'Clear quartz cluster'],
    pairsWellWith: ['amethyst', 'clear_quartz', 'pyrite'],
    conflictsWith: ['blue_lace_agate'],
    affirmation: 'I attract abundance and radiate confidence.',
    origin: ['Brazil', 'Spain', 'Russia'], priceRange: { min: 10, max: 80, unit: 'USD' },
    careInstructions: 'One of the few crystals that doesn\'t need regular cleansing — it transmutes negative energy on its own.',
    funFact: 'Known as the "merchant\'s stone" — shopkeepers used to keep citrine in their cash registers.',
  },
  {
    id: 'clear_quartz', name: 'Clear Quartz', color: 'Clear', hexColor: '#dfe6e9',
    chakras: ['crown'], elements: ['spirit'], zodiacSigns: ['aries', 'leo'],
    hardness: 7, rarity: 'common',
    properties: ['Amplification', 'Clarity', 'Healing', 'Programming'],
    healingProperties: ['Master healer', 'Amplifies other crystals', 'Balances energy'],
    emotionalProperties: ['Enhances clarity', 'Amplifies intentions', 'Promotes focus'],
    spiritualProperties: ['Connects to all chakras', 'Programmable for any intention', 'Raises vibration'],
    bestMoonPhase: 'full_moon', cleanseMethods: ['Running water', 'Sunlight', 'Moonlight', 'Sound', 'Sage', 'Salt'],
    chargeMethods: ['Any method works', 'Sunlight', 'Moonlight'],
    pairsWellWith: ['amethyst', 'rose_quartz', 'citrine', 'obsidian', 'green_aventurine'],
    conflictsWith: [],
    affirmation: 'I am a channel of pure light and clarity.',
    origin: ['Brazil', 'Madagascar', 'Arkansas'], priceRange: { min: 2, max: 100, unit: 'USD' },
    careInstructions: 'Extremely versatile. Cleanse and reprogram regularly as it absorbs all energy around it.',
    funFact: 'Clear quartz is used in modern technology — your watch, phone, and computer all contain quartz oscillators.',
  },
  {
    id: 'obsidian', name: 'Black Obsidian', color: 'Black', hexColor: '#2d3436',
    chakras: ['root'], elements: ['earth', 'fire'], zodiacSigns: ['scorpio', 'sagittarius'],
    hardness: 5.5, rarity: 'common',
    properties: ['Protection', 'Grounding', 'Truth', 'Shadow work'],
    healingProperties: ['Detoxification', 'Pain relief', 'Improves circulation'],
    emotionalProperties: ['Reveals hidden truths', 'Protects against negativity', 'Aids in releasing trauma'],
    spiritualProperties: ['Powerful protection stone', 'Facilitates shadow work', 'Grounds spiritual energy'],
    bestMoonPhase: 'new_moon', cleanseMethods: ['Running water', 'Sage', 'Burial in earth'],
    chargeMethods: ['New moon', 'Earth burial overnight'],
    pairsWellWith: ['clear_quartz', 'amethyst', 'labradorite'],
    conflictsWith: ['rose_quartz', 'citrine'],
    affirmation: 'I am protected and I face my truth with courage.',
    origin: ['Mexico', 'Iceland', 'Italy'], priceRange: { min: 5, max: 60, unit: 'USD' },
    careInstructions: 'Handle with intention — this is an intense stone. Not recommended for beginners without guidance.',
    funFact: 'Obsidian is volcanic glass formed when lava cools rapidly. Ancient surgeons used obsidian blades — sharper than steel.',
  },
  {
    id: 'green_aventurine', name: 'Green Aventurine', color: 'Green', hexColor: '#55efc4',
    chakras: ['heart'], elements: ['earth', 'water'], zodiacSigns: ['aries', 'virgo'],
    hardness: 6.5, rarity: 'common',
    properties: ['Luck', 'Prosperity', 'Growth', 'Optimism'],
    healingProperties: ['Supports heart health', 'Reduces inflammation', 'Boosts immune system'],
    emotionalProperties: ['Attracts luck', 'Promotes optimism', 'Eases anxiety'],
    spiritualProperties: ['Opens heart to opportunity', 'Attracts abundance', 'Encourages growth'],
    bestMoonPhase: 'waxing_crescent', cleanseMethods: ['Running water', 'Sage', 'Sound'],
    chargeMethods: ['Sunlight', 'Moonlight', 'Earth'],
    pairsWellWith: ['rose_quartz', 'citrine', 'clear_quartz'],
    conflictsWith: [],
    affirmation: 'I am open to abundance and new opportunities flow to me.',
    origin: ['India', 'Brazil', 'China'], priceRange: { min: 3, max: 30, unit: 'USD' },
    careInstructions: 'Hardy stone, easy to care for. Keep in your wallet or near your front door for luck.',
    funFact: 'Known as the "gambler\'s stone" — some people bring it to casinos. Results not guaranteed.',
  },
]

export class CrystalDatabase {
  private crystals: Map<string, Crystal> = new Map()
  private collections: Map<string, CrystalCollection> = new Map()

  constructor() {
    CRYSTALS.forEach((c) => this.crystals.set(c.id, c))
  }

  getAllCrystals(): Crystal[] {
    return Array.from(this.crystals.values())
  }

  getCrystal(id: string): Crystal | undefined {
    return this.crystals.get(id)
  }

  searchCrystals(query: {
    chakra?: Chakra
    element?: Element
    zodiac?: ZodiacSign
    property?: string
    maxPrice?: number
    rarity?: Crystal['rarity']
  }): Crystal[] {
    return this.getAllCrystals().filter((c) => {
      if (query.chakra && !c.chakras.includes(query.chakra)) return false
      if (query.element && !c.elements.includes(query.element)) return false
      if (query.zodiac && !c.zodiacSigns.includes(query.zodiac)) return false
      if (query.property && !c.properties.some((p) => p.toLowerCase().includes(query.property!.toLowerCase()))) return false
      if (query.maxPrice && c.priceRange.min > query.maxPrice) return false
      if (query.rarity && c.rarity !== query.rarity) return false
      return true
    })
  }

  getRecommendations(params: {
    zodiac: ZodiacSign
    intention: string
    currentMood: string
    missingChakras: Chakra[]
    budget: number
  }): CrystalRecommendation[] {
    return this.getAllCrystals()
      .map((crystal) => {
        let score = 0
        const reasons: string[] = []

        if (crystal.zodiacSigns.includes(params.zodiac)) {
          score += 30
          reasons.push(`Aligned with your ${params.zodiac} energy`)
        }

        const intentionMatch = crystal.properties.some((p) => p.toLowerCase().includes(params.intention.toLowerCase()))
        if (intentionMatch) {
          score += 25
          reasons.push(`Matches your intention: ${params.intention}`)
        }

        const chakraOverlap = crystal.chakras.filter((c) => params.missingChakras.includes(c))
        if (chakraOverlap.length > 0) {
          score += chakraOverlap.length * 20
          reasons.push(`Fills ${chakraOverlap.join(', ')} chakra gap${chakraOverlap.length > 1 ? 's' : ''}`)
        }

        if (crystal.priceRange.min <= params.budget) {
          score += 10
          reasons.push('Within budget')
        }

        let urgency: CrystalRecommendation['urgency']
        if (score >= 70) urgency = 'your_soul_needs_this'
        else if (score >= 50) urgency = 'strongly_recommended'
        else if (score >= 30) urgency = 'recommended'
        else urgency = 'nice_to_have'

        return { crystal, matchScore: score, reasons, urgency }
      })
      .filter((r) => r.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  createCollection(name: string): CrystalCollection {
    const id = `col-${Date.now()}`
    const collection: CrystalCollection = {
      id, name, crystals: [], totalValue: 0,
      chakraCoverage: { root: 0, sacral: 0, solar_plexus: 0, heart: 0, throat: 0, third_eye: 0, crown: 0 },
      elementBalance: { earth: 0, water: 0, fire: 0, air: 0, spirit: 0 },
      overallVibeScore: 0,
    }
    this.collections.set(id, collection)
    return collection
  }

  addToCollection(collectionId: string, crystalId: string, notes: string = ''): CrystalCollection {
    const collection = this.collections.get(collectionId)
    if (!collection) throw new Error('Collection not found')
    const crystal = this.crystals.get(crystalId)
    if (!crystal) throw new Error('Crystal not found')

    collection.crystals.push({ crystalId, acquiredDate: new Date().toISOString(), notes, cleansedDate: null })
    collection.totalValue += crystal.priceRange.min
    crystal.chakras.forEach((c) => { collection.chakraCoverage[c] += 1 })
    crystal.elements.forEach((e) => { collection.elementBalance[e] += 1 })
    collection.overallVibeScore = this.calculateVibeScore(collection)

    return collection
  }

  getCollectionAnalysis(collectionId: string): {
    strengths: string[]
    gaps: string[]
    recommendations: string[]
    vibeScore: number
    chakraBalance: string
    elementHarmony: string
  } {
    const collection = this.collections.get(collectionId)
    if (!collection) throw new Error('Collection not found')

    const strengths: string[] = []
    const gaps: string[] = []
    const recommendations: string[] = []

    const coveredChakras = Object.entries(collection.chakraCoverage).filter(([, v]) => v > 0).map(([k]) => k)
    const missingChakras = Object.entries(collection.chakraCoverage).filter(([, v]) => v === 0).map(([k]) => k)

    if (coveredChakras.length >= 5) strengths.push('Excellent chakra coverage')
    if (missingChakras.length > 0) {
      gaps.push(`Missing chakra coverage: ${missingChakras.join(', ')}`)
      recommendations.push(`Add a crystal for your ${missingChakras[0]} chakra`)
    }

    const elements = Object.entries(collection.elementBalance)
    const dominantElement = elements.sort(([, a], [, b]) => b - a)[0]
    const missingElements = elements.filter(([, v]) => v === 0).map(([k]) => k)

    if (missingElements.length === 0) strengths.push('All elements represented')
    if (missingElements.length > 0) gaps.push(`Missing elements: ${missingElements.join(', ')}`)

    const vibeScore = collection.overallVibeScore
    const chakraBalance = missingChakras.length === 0 ? 'Fully aligned' : `${coveredChakras.length}/7 aligned`
    const elementHarmony = missingElements.length === 0 ? 'Harmonious' : `${5 - missingElements.length}/5 balanced`

    return { strengths, gaps, recommendations, vibeScore, chakraBalance, elementHarmony }
  }

  private calculateVibeScore(collection: CrystalCollection): number {
    const chakraScore = Object.values(collection.chakraCoverage).filter((v) => v > 0).length / 7 * 50
    const elementScore = Object.values(collection.elementBalance).filter((v) => v > 0).length / 5 * 30
    const sizeScore = Math.min(20, collection.crystals.length * 4)
    return Math.round(chakraScore + elementScore + sizeScore)
  }
}
