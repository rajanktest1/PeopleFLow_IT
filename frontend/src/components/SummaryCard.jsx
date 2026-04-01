export default function SummaryCard({ icon, label, value, color }) {
  return (
    <div className="summary-card" style={{ borderTopColor: color }}>
      <div className="summary-card-icon" style={{ color }}>{icon}</div>
      <div className="summary-card-content">
        <p className="summary-card-value">{value}</p>
        <p className="summary-card-label">{label}</p>
      </div>
    </div>
  );
}
