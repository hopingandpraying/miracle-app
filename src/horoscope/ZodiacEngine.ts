/**
 * ZodiacEngine — generates daily horoscopes, compatibility reports,
 * birth chart interpretations, and planetary transit forecasts.
 * All powered by deterministic randomness and vibes.
 */

type ZodiacSign = 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'
type Planet = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto'
type House = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Aspect = 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile'

interface ZodiacProfile {
  sign: ZodiacSign
  element: 'fire' | 'earth' | 'air' | 'water'
  modality: 'cardinal' | 'fixed' | 'mutable'
  rulingPlanet: Planet
  symbol: string
  emoji: string
  dateRange: string
  traits: string[]
  strengths: string[]
  weaknesses: string[]
  luckyNumbers: number[]
  luckyColor: string
  compatibleSigns: ZodiacSign[]
  challengingSigns: ZodiacSign[]
}

interface DailyHoroscope {
  sign: ZodiacSign
  date: string
  overall: string
  love: string
  career: string
  health: string
  ratings: { love: number; career: number; health: number; luck: number; mood: number }
  luckyNumber: number
  luckyColor: string
  advice: string
  avoidToday: string
  cosmicTip: string
}

interface CompatibilityReport {
  sign1: ZodiacSign
  sign2: ZodiacSign
  overallScore: number
  loveScore: number
  friendshipScore: number
  workScore: number
  communicationScore: number
  trustScore: number
  strengths: string[]
  challenges: string[]
  advice: string
  famousPairs: string[]
  verdict: string
}

interface BirthChart {
  sunSign: ZodiacSign
  moonSign: ZodiacSign
  risingSign: ZodiacSign
  mercurySign: ZodiacSign
  venusSign: ZodiacSign
  marsSign: ZodiacSign
  placements: { planet: Planet; sign: ZodiacSign; house: House; retrograde: boolean }[]
  dominantElement: 'fire' | 'earth' | 'air' | 'water'
  dominantModality: 'cardinal' | 'fixed' | 'mutable'
  aspects: { planet1: Planet; planet2: Planet; aspect: Aspect; orb: number; influence: string }[]
  interpretation: string
  lifeTheme: string
  karmaLessons: string[]
}

interface Transit {
  planet: Planet
  fromSign: ZodiacSign
  toSign: ZodiacSign
  date: string
  duration: string
  influence: string
  affectedSigns: ZodiacSign[]
  intensity: 'subtle' | 'moderate' | 'significant' | 'life_changing'
}

const ZODIAC_PROFILES: Record<ZodiacSign, ZodiacProfile> = {
  aries: { sign: 'aries', element: 'fire', modality: 'cardinal', rulingPlanet: 'mars', symbol: 'Ram', emoji: '♈', dateRange: 'Mar 21 - Apr 19', traits: ['Bold', 'Ambitious', 'Energetic', 'Impulsive'], strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic'], weaknesses: ['Impatient', 'Moody', 'Short-tempered', 'Aggressive'], luckyNumbers: [1, 8, 17], luckyColor: 'Red', compatibleSigns: ['leo', 'sagittarius', 'gemini', 'aquarius'], challengingSigns: ['cancer', 'capricorn'] },
  taurus: { sign: 'taurus', element: 'earth', modality: 'fixed', rulingPlanet: 'venus', symbol: 'Bull', emoji: '♉', dateRange: 'Apr 20 - May 20', traits: ['Reliable', 'Patient', 'Practical', 'Stubborn'], strengths: ['Reliable', 'Patient', 'Devoted', 'Responsible'], weaknesses: ['Stubborn', 'Possessive', 'Uncompromising'], luckyNumbers: [2, 6, 9], luckyColor: 'Green', compatibleSigns: ['virgo', 'capricorn', 'cancer', 'pisces'], challengingSigns: ['leo', 'aquarius'] },
  gemini: { sign: 'gemini', element: 'air', modality: 'mutable', rulingPlanet: 'mercury', symbol: 'Twins', emoji: '♊', dateRange: 'May 21 - Jun 20', traits: ['Adaptable', 'Curious', 'Witty', 'Restless'], strengths: ['Gentle', 'Affectionate', 'Curious', 'Quick learner'], weaknesses: ['Nervous', 'Inconsistent', 'Indecisive'], luckyNumbers: [5, 7, 14], luckyColor: 'Yellow', compatibleSigns: ['libra', 'aquarius', 'aries', 'leo'], challengingSigns: ['virgo', 'pisces'] },
  cancer: { sign: 'cancer', element: 'water', modality: 'cardinal', rulingPlanet: 'moon', symbol: 'Crab', emoji: '♋', dateRange: 'Jun 21 - Jul 22', traits: ['Nurturing', 'Intuitive', 'Emotional', 'Protective'], strengths: ['Tenacious', 'Loyal', 'Emotional', 'Sympathetic'], weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative'], luckyNumbers: [2, 3, 15], luckyColor: 'Silver', compatibleSigns: ['scorpio', 'pisces', 'taurus', 'virgo'], challengingSigns: ['aries', 'libra'] },
  leo: { sign: 'leo', element: 'fire', modality: 'fixed', rulingPlanet: 'sun', symbol: 'Lion', emoji: '♌', dateRange: 'Jul 23 - Aug 22', traits: ['Dramatic', 'Generous', 'Confident', 'Proud'], strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted'], weaknesses: ['Arrogant', 'Stubborn', 'Self-centered', 'Lazy'], luckyNumbers: [1, 3, 10], luckyColor: 'Gold', compatibleSigns: ['aries', 'sagittarius', 'gemini', 'libra'], challengingSigns: ['taurus', 'scorpio'] },
  virgo: { sign: 'virgo', element: 'earth', modality: 'mutable', rulingPlanet: 'mercury', symbol: 'Maiden', emoji: '♍', dateRange: 'Aug 23 - Sep 22', traits: ['Analytical', 'Practical', 'Perfectionist', 'Helpful'], strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking'], weaknesses: ['Shyness', 'Worry', 'Overly critical', 'All work and no play'], luckyNumbers: [5, 14, 23], luckyColor: 'Navy Blue', compatibleSigns: ['taurus', 'capricorn', 'cancer', 'scorpio'], challengingSigns: ['gemini', 'sagittarius'] },
  libra: { sign: 'libra', element: 'air', modality: 'cardinal', rulingPlanet: 'venus', symbol: 'Scales', emoji: '♎', dateRange: 'Sep 23 - Oct 22', traits: ['Diplomatic', 'Graceful', 'Fair-minded', 'Indecisive'], strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded'], weaknesses: ['Indecisive', 'Avoids confrontation', 'Carries grudges'], luckyNumbers: [4, 6, 13], luckyColor: 'Pink', compatibleSigns: ['gemini', 'aquarius', 'leo', 'sagittarius'], challengingSigns: ['cancer', 'capricorn'] },
  scorpio: { sign: 'scorpio', element: 'water', modality: 'fixed', rulingPlanet: 'pluto', symbol: 'Scorpion', emoji: '♏', dateRange: 'Oct 23 - Nov 21', traits: ['Intense', 'Passionate', 'Mysterious', 'Resourceful'], strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn'], weaknesses: ['Distrusting', 'Jealous', 'Secretive', 'Violent'], luckyNumbers: [8, 11, 18], luckyColor: 'Crimson', compatibleSigns: ['cancer', 'pisces', 'virgo', 'capricorn'], challengingSigns: ['leo', 'aquarius'] },
  sagittarius: { sign: 'sagittarius', element: 'fire', modality: 'mutable', rulingPlanet: 'jupiter', symbol: 'Archer', emoji: '♐', dateRange: 'Nov 22 - Dec 21', traits: ['Adventurous', 'Optimistic', 'Free-spirited', 'Blunt'], strengths: ['Generous', 'Idealistic', 'Great sense of humor'], weaknesses: ['Promises more than can deliver', 'Impatient', 'Tactless'], luckyNumbers: [3, 7, 9], luckyColor: 'Purple', compatibleSigns: ['aries', 'leo', 'libra', 'aquarius'], challengingSigns: ['virgo', 'pisces'] },
  capricorn: { sign: 'capricorn', element: 'earth', modality: 'cardinal', rulingPlanet: 'saturn', symbol: 'Goat', emoji: '♑', dateRange: 'Dec 22 - Jan 19', traits: ['Ambitious', 'Disciplined', 'Responsible', 'Reserved'], strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'], weaknesses: ['Know-it-all', 'Unforgiving', 'Condescending', 'Pessimistic'], luckyNumbers: [4, 8, 13], luckyColor: 'Brown', compatibleSigns: ['taurus', 'virgo', 'scorpio', 'pisces'], challengingSigns: ['aries', 'libra'] },
  aquarius: { sign: 'aquarius', element: 'air', modality: 'fixed', rulingPlanet: 'uranus', symbol: 'Water Bearer', emoji: '♒', dateRange: 'Jan 20 - Feb 18', traits: ['Innovative', 'Independent', 'Humanitarian', 'Detached'], strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'], weaknesses: ['Runs from emotional expression', 'Temperamental', 'Uncompromising'], luckyNumbers: [4, 7, 11], luckyColor: 'Electric Blue', compatibleSigns: ['gemini', 'libra', 'aries', 'sagittarius'], challengingSigns: ['taurus', 'scorpio'] },
  pisces: { sign: 'pisces', element: 'water', modality: 'mutable', rulingPlanet: 'neptune', symbol: 'Fish', emoji: '♓', dateRange: 'Feb 19 - Mar 20', traits: ['Intuitive', 'Compassionate', 'Dreamy', 'Escapist'], strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise'], weaknesses: ['Fearful', 'Overly trusting', 'Sad', 'Desire to escape reality'], luckyNumbers: [3, 9, 12], luckyColor: 'Sea Green', compatibleSigns: ['cancer', 'scorpio', 'taurus', 'capricorn'], challengingSigns: ['gemini', 'sagittarius'] },
}

const HOROSCOPE_TEMPLATES = {
  overall: [
    'The stars are aligned for {topic} today. Trust the process and let the universe guide your {trait}.',
    'A cosmic shift is happening in your {house} house. This is a time for {action} and embracing your inner {trait}.',
    'Today the moon whispers secrets about {topic}. Listen carefully — your {trait} will be your greatest asset.',
    '{planet} is sending powerful energy your way. Channel it toward {action} and watch miracles unfold.',
    'The cosmos suggests you focus on {topic} today. Your natural {trait} will open unexpected doors.',
  ],
  love: [
    'Venus smiles on your love life today. {action} and let your heart lead the way.',
    'Your {trait} is magnetic right now. Someone may notice what you\'ve been too modest to show.',
    'A conversation about {topic} could deepen a connection. Be vulnerable — it\'s a superpower.',
    'The stars say: stop overthinking that text message. Just send it. The universe already replied yes.',
  ],
  career: [
    'Jupiter blesses your professional ambitions. A bold move involving {topic} could pay off.',
    'Your {trait} catches the attention of someone important. Don\'t downplay your contributions.',
    'Mercury supports clear thinking about {topic}. Present your ideas — the timing is cosmically perfect.',
    'That idea you\'ve been sitting on? The stars say ship it. Perfection is the enemy of manifestation.',
  ],
}

export class ZodiacEngine {
  getProfile(sign: ZodiacSign): ZodiacProfile {
    return ZODIAC_PROFILES[sign]
  }

  getAllProfiles(): ZodiacProfile[] {
    return Object.values(ZODIAC_PROFILES)
  }

  getDailyHoroscope(sign: ZodiacSign, date?: string): DailyHoroscope {
    const profile = ZODIAC_PROFILES[sign]
    const dateStr = date ?? new Date().toISOString().split('T')[0]
    const seed = this.hashDateSign(dateStr, sign)

    const topics = ['creativity', 'relationships', 'finances', 'personal growth', 'adventure', 'self-care', 'learning']
    const actions = ['taking initiative', 'being patient', 'connecting with others', 'setting boundaries', 'taking risks', 'resting']

    const topic = topics[seed % topics.length]
    const action = actions[(seed * 3) % actions.length]
    const trait = profile.traits[seed % profile.traits.length].toLowerCase()

    const fillTemplate = (templates: string[]) => {
      const template = templates[seed % templates.length]
      return template
        .replace('{topic}', topic)
        .replace('{action}', action)
        .replace('{trait}', trait)
        .replace('{planet}', profile.rulingPlanet.charAt(0).toUpperCase() + profile.rulingPlanet.slice(1))
        .replace('{house}', String(((seed % 12) + 1)))
    }

    return {
      sign,
      date: dateStr,
      overall: fillTemplate(HOROSCOPE_TEMPLATES.overall),
      love: fillTemplate(HOROSCOPE_TEMPLATES.love),
      career: fillTemplate(HOROSCOPE_TEMPLATES.career),
      health: `Your ${profile.element} energy needs balancing. ${seed % 2 === 0 ? 'Drink more water and rest.' : 'Move your body and breathe deeply.'}`,
      ratings: {
        love: 1 + (seed % 5),
        career: 1 + ((seed * 7) % 5),
        health: 1 + ((seed * 13) % 5),
        luck: 1 + ((seed * 17) % 5),
        mood: 1 + ((seed * 23) % 5),
      },
      luckyNumber: profile.luckyNumbers[seed % profile.luckyNumbers.length],
      luckyColor: profile.luckyColor,
      advice: `Let your ${trait} nature guide you. The universe rewards authenticity.`,
      avoidToday: seed % 3 === 0 ? 'Avoid making big financial decisions' : seed % 3 === 1 ? 'Avoid confrontations before noon' : 'Avoid checking your ex\'s social media',
      cosmicTip: `Your ruling planet ${profile.rulingPlanet} is in a ${seed % 2 === 0 ? 'favorable' : 'challenging'} position. ${seed % 2 === 0 ? 'Lean in.' : 'Proceed with grace.'}`,
    }
  }

  getCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): CompatibilityReport {
    const p1 = ZODIAC_PROFILES[sign1]
    const p2 = ZODIAC_PROFILES[sign2]

    let baseScore = 50
    if (p1.compatibleSigns.includes(sign2)) baseScore += 25
    if (p2.compatibleSigns.includes(sign1)) baseScore += 10
    if (p1.challengingSigns.includes(sign2)) baseScore -= 15
    if (p1.element === p2.element) baseScore += 10
    if (p1.modality === p2.modality) baseScore -= 5 // Same modality = power struggles

    const overallScore = Math.min(98, Math.max(15, baseScore))
    const jitter = (n: number) => Math.min(100, Math.max(10, n + Math.floor(Math.random() * 20 - 10)))

    const strengths: string[] = []
    const challenges: string[] = []

    if (p1.element === p2.element) strengths.push(`Shared ${p1.element} element creates natural understanding`)
    if (p1.compatibleSigns.includes(sign2)) strengths.push('Traditionally compatible — the stars approve')
    if (p1.element === 'fire' && p2.element === 'air') strengths.push('Fire + Air = explosive chemistry')
    if (p1.element === 'earth' && p2.element === 'water') strengths.push('Earth + Water = nurturing growth')

    if (p1.challengingSigns.includes(sign2)) challenges.push('Square aspect — friction that can spark growth or fires')
    if (p1.modality === p2.modality) challenges.push(`Both ${p1.modality} — power struggles over who leads`)
    if (p1.element === 'fire' && p2.element === 'water') challenges.push('Fire + Water = steam (passionate but volatile)')

    const verdicts = [
      overallScore > 80 ? 'Written in the stars. The universe ships this.' : null,
      overallScore > 60 ? 'Promising with effort. The cosmos gives a cautious thumbs up.' : null,
      overallScore > 40 ? 'Challenging but transformative. Growth comes from friction.' : null,
      overallScore <= 40 ? 'The stars suggest... proceeding with caution. And a therapist.' : null,
    ].filter(Boolean)[0] ?? 'The universe is undecided. Try again after Mercury retrograde.'

    return {
      sign1, sign2, overallScore,
      loveScore: jitter(overallScore),
      friendshipScore: jitter(overallScore + 5),
      workScore: jitter(overallScore - 5),
      communicationScore: jitter(overallScore),
      trustScore: jitter(overallScore - 3),
      strengths, challenges,
      advice: `${p1.emoji} and ${p2.emoji}: Focus on your shared values and give each other space to be different.`,
      famousPairs: [],
      verdict: verdicts,
    }
  }

  generateBirthChart(params: { birthDate: string; birthTime: string; birthPlace: string }): BirthChart {
    const date = new Date(params.birthDate)
    const month = date.getMonth()
    const day = date.getDate()
    const sunSign = this.getSignFromDate(month, day)
    const seed = date.getTime()

    const signs = Object.keys(ZODIAC_PROFILES) as ZodiacSign[]
    const moonSign = signs[(seed * 7) % 12]
    const risingSign = signs[(seed * 13) % 12]

    const placements: BirthChart['placements'] = [
      { planet: 'sun', sign: sunSign, house: ((seed % 12) + 1) as House, retrograde: false },
      { planet: 'moon', sign: moonSign, house: (((seed * 3) % 12) + 1) as House, retrograde: false },
      { planet: 'mercury', sign: signs[(seed * 5) % 12], house: (((seed * 5) % 12) + 1) as House, retrograde: seed % 4 === 0 },
      { planet: 'venus', sign: signs[(seed * 11) % 12], house: (((seed * 7) % 12) + 1) as House, retrograde: seed % 8 === 0 },
      { planet: 'mars', sign: signs[(seed * 17) % 12], house: (((seed * 11) % 12) + 1) as House, retrograde: seed % 6 === 0 },
      { planet: 'jupiter', sign: signs[(seed * 23) % 12], house: (((seed * 13) % 12) + 1) as House, retrograde: seed % 3 === 0 },
      { planet: 'saturn', sign: signs[(seed * 29) % 12], house: (((seed * 17) % 12) + 1) as House, retrograde: seed % 3 === 0 },
      { planet: 'uranus', sign: signs[(seed * 31) % 12], house: (((seed * 19) % 12) + 1) as House, retrograde: seed % 2 === 0 },
      { planet: 'neptune', sign: signs[(seed * 37) % 12], house: (((seed * 23) % 12) + 1) as House, retrograde: seed % 2 === 0 },
      { planet: 'pluto', sign: signs[(seed * 41) % 12], house: (((seed * 29) % 12) + 1) as House, retrograde: seed % 2 === 0 },
    ]

    const elements = placements.map((p) => ZODIAC_PROFILES[p.sign].element)
    const elementCounts: Record<string, number> = {}
    elements.forEach((e) => { elementCounts[e] = (elementCounts[e] || 0) + 1 })
    const dominantElement = Object.entries(elementCounts).sort(([, a], [, b]) => b - a)[0][0] as BirthChart['dominantElement']

    const modalities = placements.map((p) => ZODIAC_PROFILES[p.sign].modality)
    const modalityCounts: Record<string, number> = {}
    modalities.forEach((m) => { modalityCounts[m] = (modalityCounts[m] || 0) + 1 })
    const dominantModality = Object.entries(modalityCounts).sort(([, a], [, b]) => b - a)[0][0] as BirthChart['dominantModality']

    return {
      sunSign, moonSign, risingSign,
      mercurySign: placements[2].sign,
      venusSign: placements[3].sign,
      marsSign: placements[4].sign,
      placements, dominantElement, dominantModality,
      aspects: [
        { planet1: 'sun', planet2: 'moon', aspect: 'trine', orb: 3.2, influence: 'Emotional harmony with core identity' },
        { planet1: 'venus', planet2: 'mars', aspect: 'conjunction', orb: 1.5, influence: 'Passionate and magnetic personality' },
        { planet1: 'saturn', planet2: 'jupiter', aspect: 'square', orb: 4.1, influence: 'Tension between expansion and discipline' },
      ],
      interpretation: `With your Sun in ${sunSign}, Moon in ${moonSign}, and ${risingSign} rising, you present as a ${ZODIAC_PROFILES[risingSign].traits[0].toLowerCase()} individual whose emotional core runs ${ZODIAC_PROFILES[moonSign].traits[0].toLowerCase()}. Your dominant ${dominantElement} element and ${dominantModality} modality suggest you approach life with ${dominantElement === 'fire' ? 'passion and initiative' : dominantElement === 'earth' ? 'practicality and determination' : dominantElement === 'air' ? 'curiosity and communication' : 'intuition and emotional depth'}.`,
      lifeTheme: `Balancing your ${ZODIAC_PROFILES[sunSign].traits[0].toLowerCase()} nature with your ${ZODIAC_PROFILES[moonSign].traits[0].toLowerCase()} emotional needs.`,
      karmaLessons: [
        `Learn to integrate your ${dominantElement} dominance with the elements you lack.`,
        `Your ${dominantModality} nature means learning when to ${dominantModality === 'cardinal' ? 'follow instead of lead' : dominantModality === 'fixed' ? 'adapt instead of resist' : 'commit instead of explore'}.`,
        `With ${placements.filter((p) => p.retrograde).length} retrograde planets, past-life themes around communication and inner work are significant.`,
      ],
    }
  }

  private getSignFromDate(month: number, day: number): ZodiacSign {
    const cutoffs: [number, number, ZodiacSign][] = [
      [0, 20, 'capricorn'], [1, 19, 'aquarius'], [2, 20, 'pisces'], [3, 20, 'aries'],
      [4, 21, 'taurus'], [5, 21, 'gemini'], [6, 22, 'cancer'], [7, 23, 'leo'],
      [8, 23, 'virgo'], [9, 23, 'libra'], [10, 22, 'scorpio'], [11, 22, 'sagittarius'],
    ]
    for (let i = cutoffs.length - 1; i >= 0; i--) {
      if (month > cutoffs[i][0] || (month === cutoffs[i][0] && day > cutoffs[i][1])) {
        const signs: ZodiacSign[] = ['aquarius', 'pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn']
        return signs[i % 12]
      }
    }
    return 'capricorn'
  }

  private hashDateSign(date: string, sign: ZodiacSign): number {
    let hash = 0
    const str = date + sign
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
    }
    return Math.abs(hash)
  }
}
