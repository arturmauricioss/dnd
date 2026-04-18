export default function StatCard({
  label,
  value,
  breakdown = [],
  compact = false
}) {
  const filtered = breakdown
    .filter(b => b.value !== 0 && b.value != null)
    .map(b => `${b.label} ${b.value > 0 ? `+${b.value}` : b.value}`)
    .join(' · ')

  return (
    <div className={`combat-stat ${compact ? 'compact' : ''}`}>
      <div className="stat-label">{label}</div>

      <div className="stat-value">
        {value >= 0 ? `+${value}` : value}
      </div>

      {filtered && (
        <div className="stat-detail">
          {filtered}
        </div>
      )}
    </div>
  )
}