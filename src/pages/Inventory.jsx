import { useState } from 'react';
import SectionCard from '../components/SectionCard';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency } from '../utils/formatters';

export default function Inventory({ supplies, adjustSupplyStock }) {
  const [amounts, setAmounts] = useState({});

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Gestão interna</p>
        <h1>Controle de insumos com alertas visuais</h1>
        <p>Entradas e baixas manuais ajudam a demonstrar organização operacional sem depender de backend.</p>
      </header>

      <SectionCard title="Estoque de insumos" subtitle="A proposta 2 ganha força quando o cliente vê custo e reposição no mesmo painel.">
        <div className="inventory-grid">
          {supplies.map((supply) => (
            <article className="inventory-card" key={supply.id}>
              <div className="entity-card__header">
                <strong>{supply.name}</strong>
                <StatusBadge tone={supply.quantity <= supply.minStock ? 'danger' : 'success'}>
                  {supply.quantity <= supply.minStock ? 'Estoque baixo' : 'Ok'}
                </StatusBadge>
              </div>
              <p>
                Atual: {supply.quantity} {supply.unit} | Mínimo: {supply.minStock} {supply.unit}
              </p>
              <small>Custo unitário: {formatCurrency(supply.unitCost)}</small>
              <div className="inline-actions">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Qtd."
                  value={amounts[supply.id] || ''}
                  onChange={(event) => setAmounts({ ...amounts, [supply.id]: event.target.value })}
                />
                <button
                  className="button-secondary"
                  onClick={() => adjustSupplyStock(supply.id, Number(amounts[supply.id] || 0))}
                >
                  Entrada
                </button>
                <button
                  className="button-ghost"
                  onClick={() => adjustSupplyStock(supply.id, -Number(amounts[supply.id] || 0))}
                >
                  Baixa
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
