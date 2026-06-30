import { formatCurrency } from '../utils/formatters';

export default function StatCard({ title, value, helper, icon: Icon, currency }) {
  return (
    <article className="stat-card">
      <div className="stat-card__icon">{Icon ? <Icon size={22} /> : null}</div>
      <div>
        <p className="eyebrow">{title}</p>
        <strong>{currency ? formatCurrency(value) : value}</strong>
        {helper ? <span>{helper}</span> : null}
      </div>
    </article>
  );
}
