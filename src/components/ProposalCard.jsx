export default function ProposalCard({ title, description, points, accent, onDemo }) {
  return (
    <article className={`proposal-card ${accent}`}>
      <p className="eyebrow">Proposta comercial</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="proposal-list">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <button className="button-primary" onClick={onDemo}>
        Ver demonstração dessa opção
      </button>
    </article>
  );
}
