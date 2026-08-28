/**
 * KarmaEngine — A spiritual accounting system for tracking good and bad vibes.
 *
 * Implements double-entry karma bookkeeping, reincarnation cycles,
 * dharma-based task prioritization, and cosmic credit scoring.
 */

export type KarmaCategory =
  | 'generosity'
  | 'compassion'
  | 'patience'
  | 'honesty'
  | 'discipline'
  | 'wisdom'
  | 'courage'
  | 'gratitude'
  | 'selflessness'
  | 'mindfulness'

export type KarmaPolarity = 'positive' | 'negative' | 'neutral'

export type CosmicCreditTier =
  | 'enlightened'
  | 'transcendent'
  | 'awakened'
  | 'seeking'
  | 'wandering'
  | 'lost'
  | 'in_collections'

export interface KarmaTransaction {
  id: string
  timestamp: string
  description: string
  category: KarmaCategory
  polarity: KarmaPolarity
  amount: number
  multiplier: number
  effectiveAmount: number
  source: 'user_action' | 'cosmic_event' | 'retrograde' | 'eclipse' | 'alignment' | 'system'
  balanceAfter: number
  metadata: Record<string, unknown>
}

export interface KarmaAccount {
  id: string
  name: string
  currentBalance: number
  lifetimeEarned: number
  lifetimeSpent: number
  tier: CosmicCreditTier
  creditScore: number
  categoryBreakdown: Record<KarmaCategory, { earned: number; spent: number; net: number }>
  streaks: KarmaStreak[]
  transactions: KarmaTransaction[]
  reincarnationCount: number
  currentLife: LifeRecord
  pastLives: LifeRecord[]
  dharmaAlignment: number
  cosmicDebt: number
  blessingMultiplier: number
  curseResistance: number
}

export interface KarmaStreak {
  category: KarmaCategory
  currentDays: number
  longestDays: number
  startDate: string
  isActive: boolean
}

export interface LifeRecord {
  id: string
  lifeNumber: number
  startDate: string
  endDate: string | null
  startingBalance: number
  endingBalance: number | null
  lessonLearned: string
  dominantCategory: KarmaCategory
  achievements: string[]
}

export interface DharmaTask {
  id: string
  title: string
  description: string
  category: KarmaCategory
  karmaReward: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'enlightened'
  timeEstimate: string
  prerequisites: string[]
  isDaily: boolean
  completedToday: boolean
  totalCompletions: number
}

export interface CosmicEvent {
  id: string
  name: string
  type: 'retrograde' | 'eclipse' | 'alignment' | 'solstice' | 'equinox' | 'full_moon' | 'new_moon' | 'meteor_shower'
  startDate: string
  endDate: string
  karmaMultiplier: number
  affectedCategories: KarmaCategory[]
  description: string
  isActive: boolean
}

export interface KarmaLeaderboard {
  entries: LeaderboardEntry[]
  lastUpdated: string
  currentSeason: string
}

export interface LeaderboardEntry {
  rank: number
  accountId: string
  name: string
  balance: number
  tier: CosmicCreditTier
  topCategory: KarmaCategory
  trend: 'ascending' | 'descending' | 'plateau' | 'volatile'
}

const TIER_THRESHOLDS: Record<CosmicCreditTier, number> = {
  enlightened: 10000,
  transcendent: 5000,
  awakened: 2000,
  seeking: 500,
  wandering: 0,
  lost: -500,
  in_collections: -2000,
}

const CREDIT_SCORE_WEIGHTS = {
  balance: 0.3,
  consistency: 0.2,
  diversity: 0.15,
  streak: 0.15,
  recentActivity: 0.1,
  lifetimeRatio: 0.1,
}

const DAILY_DHARMA_TASKS: Omit<DharmaTask, 'id' | 'completedToday' | 'totalCompletions'>[] = [
  { title: 'Morning Gratitude Journal', description: 'Write 3 things you are grateful for', category: 'gratitude', karmaReward: 15, difficulty: 'beginner', timeEstimate: '5 min', prerequisites: [], isDaily: true },
  { title: 'Random Act of Kindness', description: 'Do something nice for a stranger', category: 'compassion', karmaReward: 30, difficulty: 'intermediate', timeEstimate: '15 min', prerequisites: [], isDaily: true },
  { title: 'Mindful Breathing Session', description: '10 minutes of focused breathing', category: 'mindfulness', karmaReward: 20, difficulty: 'beginner', timeEstimate: '10 min', prerequisites: [], isDaily: true },
  { title: 'Donate to Charity', description: 'Make a financial contribution to a cause', category: 'generosity', karmaReward: 50, difficulty: 'intermediate', timeEstimate: '5 min', prerequisites: [], isDaily: false },
  { title: 'Forgive Someone', description: 'Let go of a grudge, large or small', category: 'patience', karmaReward: 75, difficulty: 'advanced', timeEstimate: '30 min', prerequisites: ['Morning Gratitude Journal'], isDaily: false },
  { title: 'Tell an Uncomfortable Truth', description: 'Be honest when it would be easier to lie', category: 'honesty', karmaReward: 40, difficulty: 'advanced', timeEstimate: '10 min', prerequisites: [], isDaily: false },
  { title: 'Resist a Temptation', description: 'Choose the harder right over the easier wrong', category: 'discipline', karmaReward: 35, difficulty: 'intermediate', timeEstimate: '1 min', prerequisites: [], isDaily: true },
  { title: 'Teach Someone Something', description: 'Share knowledge without expectation', category: 'wisdom', karmaReward: 45, difficulty: 'intermediate', timeEstimate: '20 min', prerequisites: [], isDaily: false },
  { title: 'Face a Fear', description: 'Do something that scares you', category: 'courage', karmaReward: 60, difficulty: 'advanced', timeEstimate: '30 min', prerequisites: ['Mindful Breathing Session'], isDaily: false },
  { title: 'Help Without Being Asked', description: 'Anticipate someone\'s need and act on it', category: 'selflessness', karmaReward: 55, difficulty: 'enlightened', timeEstimate: '15 min', prerequisites: ['Random Act of Kindness'], isDaily: false },
]

export class KarmaEngine {
  private accounts: Map<string, KarmaAccount> = new Map()
  private cosmicEvents: CosmicEvent[] = []
  private leaderboard: KarmaLeaderboard = { entries: [], lastUpdated: '', currentSeason: '' }

  constructor() {
    this.initializeCosmicEvents()
  }

  createAccount(name: string): KarmaAccount {
    const id = `soul-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const categoryBreakdown = {} as KarmaAccount['categoryBreakdown']
    const categories: KarmaCategory[] = [
      'generosity', 'compassion', 'patience', 'honesty', 'discipline',
      'wisdom', 'courage', 'gratitude', 'selflessness', 'mindfulness',
    ]
    categories.forEach((cat) => {
      categoryBreakdown[cat] = { earned: 0, spent: 0, net: 0 }
    })

    const account: KarmaAccount = {
      id,
      name,
      currentBalance: 100, // Everyone starts with a grace period
      lifetimeEarned: 100,
      lifetimeSpent: 0,
      tier: 'seeking',
      creditScore: 500,
      categoryBreakdown,
      streaks: categories.map((cat) => ({
        category: cat,
        currentDays: 0,
        longestDays: 0,
        startDate: new Date().toISOString(),
        isActive: false,
      })),
      transactions: [{
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        description: 'Welcome to existence. Here\'s some starter karma.',
        category: 'gratitude',
        polarity: 'positive',
        amount: 100,
        multiplier: 1,
        effectiveAmount: 100,
        source: 'system',
        balanceAfter: 100,
        metadata: { type: 'welcome_bonus' },
      }],
      reincarnationCount: 0,
      currentLife: {
        id: `life-${Date.now()}`,
        lifeNumber: 1,
        startDate: new Date().toISOString(),
        endDate: null,
        startingBalance: 100,
        endingBalance: null,
        lessonLearned: '',
        dominantCategory: 'gratitude',
        achievements: ['Born'],
      },
      pastLives: [],
      dharmaAlignment: 50,
      cosmicDebt: 0,
      blessingMultiplier: 1.0,
      curseResistance: 0.1,
    }

    this.accounts.set(id, account)
    return account
  }

  earnKarma(accountId: string, params: {
    description: string
    category: KarmaCategory
    amount: number
    source?: KarmaTransaction['source']
  }): KarmaTransaction {
    const account = this.getAccountOrThrow(accountId)

    // Calculate multipliers
    const cosmicMultiplier = this.getCosmicMultiplier(params.category)
    const streakMultiplier = this.getStreakMultiplier(account, params.category)
    const blessingMultiplier = account.blessingMultiplier
    const totalMultiplier = cosmicMultiplier * streakMultiplier * blessingMultiplier
    const effectiveAmount = Math.round(params.amount * totalMultiplier)

    const transaction: KarmaTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      description: params.description,
      category: params.category,
      polarity: 'positive',
      amount: params.amount,
      multiplier: totalMultiplier,
      effectiveAmount,
      source: params.source ?? 'user_action',
      balanceAfter: account.currentBalance + effectiveAmount,
      metadata: { cosmicMultiplier, streakMultiplier, blessingMultiplier },
    }

    account.currentBalance += effectiveAmount
    account.lifetimeEarned += effectiveAmount
    account.categoryBreakdown[params.category].earned += effectiveAmount
    account.categoryBreakdown[params.category].net += effectiveAmount
    account.transactions.unshift(transaction)

    // Update streak
    this.updateStreak(account, params.category, true)

    // Update dharma alignment
    account.dharmaAlignment = this.calculateDharmaAlignment(account)

    // Check for tier changes
    this.updateTier(account)

    // Check for achievements
    this.checkAchievements(account, transaction)

    // Recalculate credit score
    account.creditScore = this.calculateCreditScore(account)

    return transaction
  }

  spendKarma(accountId: string, params: {
    description: string
    category: KarmaCategory
    amount: number
  }): KarmaTransaction {
    const account = this.getAccountOrThrow(accountId)

    if (account.currentBalance < params.amount) {
      throw new KarmaError('INSUFFICIENT_KARMA', `You need ${params.amount} karma but only have ${account.currentBalance}. Consider being nicer.`)
    }

    const transaction: KarmaTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      description: params.description,
      category: params.category,
      polarity: 'negative',
      amount: params.amount,
      multiplier: 1,
      effectiveAmount: -params.amount,
      source: 'user_action',
      balanceAfter: account.currentBalance - params.amount,
      metadata: {},
    }

    account.currentBalance -= params.amount
    account.lifetimeSpent += params.amount
    account.categoryBreakdown[params.category].spent += params.amount
    account.categoryBreakdown[params.category].net -= params.amount
    account.transactions.unshift(transaction)

    // Check if they've fallen into cosmic debt
    if (account.currentBalance < 0) {
      account.cosmicDebt = Math.abs(account.currentBalance)
    }

    this.updateTier(account)
    account.creditScore = this.calculateCreditScore(account)

    return transaction
  }

  reincarnate(accountId: string): KarmaAccount {
    const account = this.getAccountOrThrow(accountId)

    // Calculate carried-over karma (10% of positive balance, 50% of debt)
    const carryOver = account.currentBalance > 0
      ? Math.round(account.currentBalance * 0.1)
      : Math.round(account.currentBalance * 0.5)

    // Determine lesson learned
    const dominantCategory = this.getDominantCategory(account)
    const weakestCategory = this.getWeakestCategory(account)
    const lesson = `Excelled in ${dominantCategory}, needs work on ${weakestCategory}`

    // Archive current life
    account.currentLife.endDate = new Date().toISOString()
    account.currentLife.endingBalance = account.currentBalance
    account.currentLife.lessonLearned = lesson
    account.currentLife.dominantCategory = dominantCategory
    account.pastLives.push({ ...account.currentLife })

    // Reset for new life
    account.reincarnationCount += 1
    account.currentBalance = 100 + carryOver
    account.lifetimeEarned = 100 + carryOver
    account.lifetimeSpent = 0
    account.cosmicDebt = carryOver < 0 ? Math.abs(carryOver) : 0
    account.blessingMultiplier = 1.0 + (account.reincarnationCount * 0.05) // Wisdom compounds

    // Reset category breakdown
    const categories: KarmaCategory[] = Object.keys(account.categoryBreakdown) as KarmaCategory[]
    categories.forEach((cat) => {
      account.categoryBreakdown[cat] = { earned: 0, spent: 0, net: 0 }
    })

    // Reset streaks
    account.streaks.forEach((s) => {
      s.currentDays = 0
      s.isActive = false
      s.startDate = new Date().toISOString()
    })

    // New life record
    account.currentLife = {
      id: `life-${Date.now()}`,
      lifeNumber: account.reincarnationCount + 1,
      startDate: new Date().toISOString(),
      endDate: null,
      startingBalance: account.currentBalance,
      endingBalance: null,
      lessonLearned: '',
      dominantCategory: 'gratitude',
      achievements: [`Reincarnated (Life #${account.reincarnationCount + 1})`],
    }

    // Add welcome transaction
    account.transactions = [{
      id: `tx-${Date.now()}`,
      timestamp: new Date().toISOString(),
      description: `Reincarnated. Carried over ${carryOver} karma from previous life. Wisdom multiplier: ${account.blessingMultiplier.toFixed(2)}x`,
      category: 'wisdom',
      polarity: carryOver >= 0 ? 'positive' : 'negative',
      amount: Math.abs(carryOver) + 100,
      multiplier: 1,
      effectiveAmount: carryOver + 100,
      source: 'system',
      balanceAfter: account.currentBalance,
      metadata: { previousLife: account.pastLives.length, carryOver },
    }]

    this.updateTier(account)
    account.creditScore = this.calculateCreditScore(account)

    return account
  }

  getDailyDharmaTasks(accountId: string): DharmaTask[] {
    const account = this.getAccountOrThrow(accountId)

    return DAILY_DHARMA_TASKS.map((task, i) => ({
      ...task,
      id: `dharma-${i}`,
      completedToday: false,
      totalCompletions: 0,
    })).filter((task) => {
      // Filter by tier — higher tiers get harder tasks
      if (task.difficulty === 'enlightened' && !['enlightened', 'transcendent'].includes(account.tier)) return false
      if (task.difficulty === 'advanced' && account.tier === 'wandering') return false
      return true
    })
  }

  getCosmicForecast(accountId: string): {
    overallVibes: 'excellent' | 'good' | 'neutral' | 'challenging' | 'chaotic'
    activeEvents: CosmicEvent[]
    recommendations: string[]
    luckyCategories: KarmaCategory[]
    avoidCategories: KarmaCategory[]
  } {
    const account = this.getAccountOrThrow(accountId)
    const now = new Date().toISOString()
    const activeEvents = this.cosmicEvents.filter((e) => e.isActive && e.startDate <= now && e.endDate >= now)

    const totalMultiplier = activeEvents.reduce((sum, e) => sum + e.karmaMultiplier, 0) / Math.max(activeEvents.length, 1)

    let overallVibes: 'excellent' | 'good' | 'neutral' | 'challenging' | 'chaotic'
    if (totalMultiplier > 1.5) overallVibes = 'excellent'
    else if (totalMultiplier > 1.1) overallVibes = 'good'
    else if (totalMultiplier > 0.8) overallVibes = 'neutral'
    else if (totalMultiplier > 0.5) overallVibes = 'challenging'
    else overallVibes = 'chaotic'

    const weakest = this.getWeakestCategory(account)
    const strongest = this.getDominantCategory(account)

    const recommendations = [
      `Focus on ${weakest} — it's your weakest area this life.`,
      `Your ${strongest} game is strong. Keep it up.`,
      totalMultiplier > 1 ? 'Cosmic conditions are favorable — earn extra karma now!' : 'Mercury vibes are off. Proceed with caution.',
      account.cosmicDebt > 0 ? `You have ${account.cosmicDebt} karma in cosmic debt. Pay it down.` : 'No cosmic debt. You\'re in the clear.',
      account.streaks.some((s) => s.currentDays >= 7) ? 'You have an active streak! Don\'t break it.' : 'Start a new streak today for bonus multipliers.',
    ]

    const luckyCategories = activeEvents.flatMap((e) => e.affectedCategories.filter(() => e.karmaMultiplier > 1))
    const avoidCategories = activeEvents.flatMap((e) => e.affectedCategories.filter(() => e.karmaMultiplier < 1))

    return { overallVibes, activeEvents, recommendations, luckyCategories: [...new Set(luckyCategories)], avoidCategories: [...new Set(avoidCategories)] }
  }

  getAccountSummary(accountId: string): {
    balance: number
    tier: CosmicCreditTier
    creditScore: number
    dharmaAlignment: number
    topCategory: KarmaCategory
    weakestCategory: KarmaCategory
    activeStreaks: number
    longestStreak: number
    reincarnations: number
    lifetimeKarma: number
    cosmicDebt: number
    transactionsThisWeek: number
    karmaVelocity: number
  } {
    const account = this.getAccountOrThrow(accountId)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const weekTransactions = account.transactions.filter((t) => t.timestamp >= weekAgo)
    const velocity = weekTransactions.reduce((sum, t) => sum + t.effectiveAmount, 0)

    return {
      balance: account.currentBalance,
      tier: account.tier,
      creditScore: account.creditScore,
      dharmaAlignment: account.dharmaAlignment,
      topCategory: this.getDominantCategory(account),
      weakestCategory: this.getWeakestCategory(account),
      activeStreaks: account.streaks.filter((s) => s.isActive).length,
      longestStreak: Math.max(...account.streaks.map((s) => s.longestDays), 0),
      reincarnations: account.reincarnationCount,
      lifetimeKarma: account.lifetimeEarned,
      cosmicDebt: account.cosmicDebt,
      transactionsThisWeek: weekTransactions.length,
      karmaVelocity: velocity,
    }
  }

  generateLeaderboard(): KarmaLeaderboard {
    const entries: LeaderboardEntry[] = Array.from(this.accounts.values())
      .sort((a, b) => b.currentBalance - a.currentBalance)
      .map((account, i) => ({
        rank: i + 1,
        accountId: account.id,
        name: account.name,
        balance: account.currentBalance,
        tier: account.tier,
        topCategory: this.getDominantCategory(account),
        trend: this.calculateTrend(account),
      }))

    this.leaderboard = {
      entries,
      lastUpdated: new Date().toISOString(),
      currentSeason: this.getCurrentSeason(),
    }

    return this.leaderboard
  }

  // ---- Private helpers ----

  private getAccountOrThrow(id: string): KarmaAccount {
    const account = this.accounts.get(id)
    if (!account) throw new KarmaError('SOUL_NOT_FOUND', `Soul ${id} not found in the cosmic registry.`)
    return account
  }

  private getCosmicMultiplier(category: KarmaCategory): number {
    const now = new Date().toISOString()
    let multiplier = 1.0
    for (const event of this.cosmicEvents) {
      if (event.isActive && event.startDate <= now && event.endDate >= now) {
        if (event.affectedCategories.includes(category)) {
          multiplier *= event.karmaMultiplier
        }
      }
    }
    return Math.round(multiplier * 100) / 100
  }

  private getStreakMultiplier(account: KarmaAccount, category: KarmaCategory): number {
    const streak = account.streaks.find((s) => s.category === category)
    if (!streak || !streak.isActive) return 1.0
    if (streak.currentDays >= 30) return 2.0
    if (streak.currentDays >= 14) return 1.5
    if (streak.currentDays >= 7) return 1.25
    if (streak.currentDays >= 3) return 1.1
    return 1.0
  }

  private updateStreak(account: KarmaAccount, category: KarmaCategory, earned: boolean): void {
    const streak = account.streaks.find((s) => s.category === category)
    if (!streak) return
    if (earned) {
      if (!streak.isActive) {
        streak.isActive = true
        streak.currentDays = 1
        streak.startDate = new Date().toISOString()
      } else {
        streak.currentDays += 1
      }
      streak.longestDays = Math.max(streak.longestDays, streak.currentDays)
    } else {
      streak.isActive = false
      streak.currentDays = 0
    }
  }

  private updateTier(account: KarmaAccount): void {
    const tiers: CosmicCreditTier[] = ['enlightened', 'transcendent', 'awakened', 'seeking', 'wandering', 'lost', 'in_collections']
    for (const tier of tiers) {
      if (account.currentBalance >= TIER_THRESHOLDS[tier]) {
        account.tier = tier
        return
      }
    }
    account.tier = 'in_collections'
  }

  private calculateCreditScore(account: KarmaAccount): number {
    const w = CREDIT_SCORE_WEIGHTS
    const balanceScore = Math.min(100, Math.max(0, (account.currentBalance / 5000) * 100))
    const consistencyScore = Math.min(100, account.transactions.length * 2)
    const categories = Object.values(account.categoryBreakdown)
    const activeCategories = categories.filter((c) => c.net > 0).length
    const diversityScore = (activeCategories / categories.length) * 100
    const streakScore = Math.min(100, account.streaks.filter((s) => s.isActive).length * 20)
    const recentScore = Math.min(100, account.transactions.filter((t) => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      return t.timestamp >= weekAgo
    }).length * 10)
    const ratioScore = account.lifetimeEarned > 0 ? ((account.lifetimeEarned - account.lifetimeSpent) / account.lifetimeEarned) * 100 : 50

    const raw = balanceScore * w.balance + consistencyScore * w.consistency + diversityScore * w.diversity +
      streakScore * w.streak + recentScore * w.recentActivity + ratioScore * w.lifetimeRatio

    return Math.round(Math.min(850, Math.max(300, 300 + (raw / 100) * 550)))
  }

  private calculateDharmaAlignment(account: KarmaAccount): number {
    const categories = Object.values(account.categoryBreakdown)
    const total = categories.reduce((sum, c) => sum + c.net, 0)
    const avg = total / categories.length
    const variance = categories.reduce((sum, c) => sum + Math.pow(c.net - avg, 2), 0) / categories.length
    const stdDev = Math.sqrt(variance)
    const alignment = Math.max(0, Math.min(100, 100 - stdDev))
    return Math.round(alignment)
  }

  private getDominantCategory(account: KarmaAccount): KarmaCategory {
    return Object.entries(account.categoryBreakdown)
      .sort(([, a], [, b]) => b.net - a.net)[0][0] as KarmaCategory
  }

  private getWeakestCategory(account: KarmaAccount): KarmaCategory {
    return Object.entries(account.categoryBreakdown)
      .sort(([, a], [, b]) => a.net - b.net)[0][0] as KarmaCategory
  }

  private calculateTrend(account: KarmaAccount): LeaderboardEntry['trend'] {
    const recent = account.transactions.slice(0, 10)
    if (recent.length < 3) return 'plateau'
    const positive = recent.filter((t) => t.effectiveAmount > 0).length
    const negative = recent.filter((t) => t.effectiveAmount < 0).length
    if (positive > 7) return 'ascending'
    if (negative > 7) return 'descending'
    if (Math.abs(positive - negative) <= 2) return 'plateau'
    return 'volatile'
  }

  private getCurrentSeason(): string {
    const month = new Date().getMonth()
    if (month < 3) return 'Winter Solstice Season'
    if (month < 6) return 'Spring Equinox Season'
    if (month < 9) return 'Summer Solstice Season'
    return 'Autumn Equinox Season'
  }

  private checkAchievements(account: KarmaAccount, transaction: KarmaTransaction): void {
    const achievements = account.currentLife.achievements
    if (account.currentBalance >= 1000 && !achievements.includes('Karma Thousandaire')) {
      achievements.push('Karma Thousandaire')
    }
    if (account.currentBalance >= 5000 && !achievements.includes('Karma Mogul')) {
      achievements.push('Karma Mogul')
    }
    if (account.streaks.some((s) => s.currentDays >= 7) && !achievements.includes('Week Warrior')) {
      achievements.push('Week Warrior')
    }
    if (account.streaks.some((s) => s.currentDays >= 30) && !achievements.includes('Monk Mode')) {
      achievements.push('Monk Mode')
    }
    const activeCategories = Object.values(account.categoryBreakdown).filter((c) => c.net > 0).length
    if (activeCategories >= 10 && !achievements.includes('Renaissance Soul')) {
      achievements.push('Renaissance Soul')
    }
    if (transaction.multiplier >= 3 && !achievements.includes('Cosmic Surfer')) {
      achievements.push('Cosmic Surfer')
    }
  }

  private initializeCosmicEvents(): void {
    this.cosmicEvents = [
      { id: 'ce-1', name: 'Mercury Retrograde', type: 'retrograde', startDate: '2026-03-15', endDate: '2026-04-07', karmaMultiplier: 0.7, affectedCategories: ['honesty', 'patience', 'discipline'], description: 'Communications go haywire. Double-check everything.', isActive: true },
      { id: 'ce-2', name: 'Spring Equinox', type: 'equinox', startDate: '2026-03-20', endDate: '2026-03-21', karmaMultiplier: 2.0, affectedCategories: ['generosity', 'compassion', 'gratitude'], description: 'Balance returns. Karma flows freely.', isActive: true },
      { id: 'ce-3', name: 'Full Moon in Libra', type: 'full_moon', startDate: '2026-03-28', endDate: '2026-03-30', karmaMultiplier: 1.5, affectedCategories: ['wisdom', 'mindfulness', 'selflessness'], description: 'Illumination of truth. Inner wisdom amplified.', isActive: true },
      { id: 'ce-4', name: 'Jupiter-Neptune Alignment', type: 'alignment', startDate: '2026-04-01', endDate: '2026-04-15', karmaMultiplier: 1.8, affectedCategories: ['courage', 'wisdom', 'generosity'], description: 'Expansion meets dreams. Big karma energy.', isActive: false },
      { id: 'ce-5', name: 'Lyrid Meteor Shower', type: 'meteor_shower', startDate: '2026-04-16', endDate: '2026-04-25', karmaMultiplier: 1.3, affectedCategories: ['gratitude', 'mindfulness', 'compassion'], description: 'Wishes amplified. Make them count.', isActive: false },
    ]
  }
}

export class KarmaError extends Error {
  constructor(public code: string, message: string) {
    super(message)
    this.name = 'KarmaError'
  }
}
