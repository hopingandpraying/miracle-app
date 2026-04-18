import { useState, useEffect, useCallback } from 'react'

type Intention = {
  id: number
  text: string
  energy: number
  status: 'hoping' | 'praying' | 'manifesting' | 'manifested' | 'denied_by_universe'
  createdAt: Date
  manifestedAt: Date | null
}

const AFFIRMATIONS = [
  'The universe is compiling your request...',
  'Your intention has been added to the cosmic backlog.',
  'Mercury is not in retrograde. Deploying to production.',
  'Aligning chakras with CI/CD pipeline...',
  'Your vibe frequency has been optimized.',
  'The law of attraction is running in strict mode.',
  'Sending positive energy to all microservices...',
  'Your manifestation passed all unit tests.',
  'The universe has approved your pull request.',
  'Quantum entangling your hopes with reality...',
  'Running spiritual linter... no bad vibes detected.',
  'Your intention scored 98/100 on cosmic Lighthouse.',
]

const DENIAL_REASONS = [
  'The universe returned a 418: I\'m a teapot.',
  'Your karma cache has expired. Please retry.',
  'Mercury was in retrograde during the deploy.',
  'The cosmic load balancer redirected your request.',
  'Your intention conflicted with someone else\'s merge.',
  'The universe rate-limited your manifestations.',
]

function App() {
  const [intentions, setIntentions] = useState<Intention[]>([])
  const [input, setInput] = useState('')
  const [affirmation, setAffirmation] = useState('')
  const [cosmicEnergy, setCosmicEnergy] = useState(42)
  const [totalManifested, setTotalManifested] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCosmicEnergy((prev) => Math.min(100, prev + Math.random() * 3))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const addIntention = useCallback(() => {
    if (!input.trim()) return
    const intention: Intention = {
      id: Date.now(),
      text: input.trim(),
      energy: Math.round(30 + Math.random() * 70),
      status: 'hoping',
      createdAt: new Date(),
      manifestedAt: null,
    }
    setIntentions((prev) => [intention, ...prev])
    setInput('')
    setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)])
    setCosmicEnergy((prev) => Math.max(0, prev - 10))

    // Auto-progress through stages
    setTimeout(() => updateStatus(intention.id, 'praying'), 1500)
    setTimeout(() => updateStatus(intention.id, 'manifesting'), 3500)
    setTimeout(() => {
      const success = Math.random() > 0.25
      if (success) {
        updateStatus(intention.id, 'manifested')
        setTotalManifested((prev) => prev + 1)
        setCosmicEnergy((prev) => Math.min(100, prev + 20))
      } else {
        updateStatus(intention.id, 'denied_by_universe')
      }
    }, 6000)
  }, [input])

  const updateStatus = (id: number, status: Intention['status']) => {
    setIntentions((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status, manifestedAt: status === 'manifested' ? new Date() : i.manifestedAt } : i
      )
    )
  }

  const successRate = intentions.length > 0
    ? Math.round((intentions.filter((i) => i.status === 'manifested').length / intentions.filter((i) => !['hoping', 'praying', 'manifesting'].includes(i.status)).length) * 100) || 0
    : 0

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: 700, margin: '0 auto', padding: '2rem', background: '#0a0a1a', minHeight: '100vh', color: '#e2e8f0' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0, background: 'linear-gradient(135deg, #a78bfa, #ec4899, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Miracle App
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Manifestation-Driven Development</p>
      </header>

      {/* Cosmic Energy Meter */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#111827', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cosmic Energy Level</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: cosmicEnergy > 60 ? '#4ade80' : cosmicEnergy > 30 ? '#facc15' : '#f87171' }}>
            {Math.round(cosmicEnergy)}%
          </span>
        </div>
        <div style={{ height: 8, background: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            width: `${cosmicEnergy}%`, height: '100%', borderRadius: 4, transition: 'all 0.5s',
            background: cosmicEnergy > 60 ? 'linear-gradient(90deg, #4ade80, #22d3ee)' : cosmicEnergy > 30 ? 'linear-gradient(90deg, #facc15, #f59e0b)' : 'linear-gradient(90deg, #f87171, #ef4444)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#475569' }}>
          <span>Manifested: {totalManifested}</span>
          <span>Success Rate: {successRate}%</span>
          <span>Queue: {intentions.filter((i) => ['hoping', 'praying', 'manifesting'].includes(i.status)).length}</span>
        </div>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addIntention()}
          placeholder="State your intention to the universe..."
          style={{
            flex: 1, padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #334155',
            background: '#1e293b', color: '#e2e8f0', fontSize: '0.95rem', outline: 'none',
          }}
        />
        <button
          onClick={addIntention}
          style={{
            padding: '0.75rem 1.5rem', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#fff',
            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          }}
        >
          Manifest
        </button>
      </div>

      {/* Affirmation */}
      {affirmation && (
        <div style={{
          padding: '0.75rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.85rem', color: '#a78bfa', fontStyle: 'italic',
        }}>
          {affirmation}
        </div>
      )}

      {/* Intentions List */}
      {intentions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#128302;</p>
          <p>No intentions yet. The universe is waiting.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {intentions.map((intention) => (
            <IntentionCard key={intention.id} intention={intention} />
          ))}
        </div>
      )}
    </div>
  )
}

function IntentionCard({ intention }: { intention: Intention }) {
  const statusConfig: Record<Intention['status'], { label: string; color: string; bg: string; icon: string }> = {
    hoping: { label: 'Hoping', color: '#94a3b8', bg: '#1e293b', icon: '&#128591;' },
    praying: { label: 'Praying', color: '#a78bfa', bg: 'rgba(124,58,237,0.1)', icon: '&#128588;' },
    manifesting: { label: 'Manifesting', color: '#facc15', bg: 'rgba(250,204,21,0.1)', icon: '&#10024;' },
    manifested: { label: 'Manifested!', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', icon: '&#127881;' },
    denied_by_universe: { label: 'Denied by Universe', color: '#f87171', bg: 'rgba(248,113,113,0.1)', icon: '&#128148;' },
  }

  const config = statusConfig[intention.status]
  const isActive = ['hoping', 'praying', 'manifesting'].includes(intention.status)

  return (
    <div style={{
      padding: '1rem', background: '#111827', borderRadius: '10px', border: '1px solid #1e293b',
      opacity: intention.status === 'denied_by_universe' ? 0.6 : 1, transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.95rem' }}>{intention.text}</span>
        <span style={{
          padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
          background: config.bg, color: config.color,
          animation: isActive ? 'pulse 1.5s ease infinite' : 'none',
        }}>
          <span dangerouslySetInnerHTML={{ __html: config.icon }} /> {config.label}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.75rem', color: '#475569' }}>
        <span>Energy: {intention.energy}%</span>
        <span>{intention.createdAt.toLocaleTimeString()}</span>
        {intention.status === 'denied_by_universe' && (
          <span style={{ color: '#f87171', fontStyle: 'italic' }}>
            {DENIAL_REASONS[Math.floor(Math.random() * DENIAL_REASONS.length)]}
          </span>
        )}
      </div>
    </div>
  )
}

const DENIAL_REASONS = [
  'The universe returned 418: I\'m a teapot.',
  'Karma cache expired.',
  'Mercury was in retrograde.',
  'Cosmic load balancer said no.',
]

export default App
