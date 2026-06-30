import { useState } from 'react';
import SectionCard from '../components/SectionCard';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency } from '../utils/formatters';

export default function Pricing({ products }) {
  const [selectedId, setSelectedId] = useState(products[0]?.id || '');
  const [fees, setFees] = useState(18);

  const selectedProduct = products.find((product) => product.id === selectedId) || products[0];

  if (!selectedProduct) {
    return null;
  }

  const feeAmount = selectedProduct.price * (fees / 100);
  const grossProfit = selectedProduct.price - selectedProduct.cost - feeAmount;
  const margin = selectedProduct.price ? (grossProfit / selectedProduct.price) * 100 : 0;
  const suggestedPrice = (selectedProduct.cost * 2.4) / (1 - fees / 100);

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Decisão de preço</p>
        <h1>Custos e precificação em linguagem simples</h1>
        <p>Aqui a conversa sai do “achismo” e mostra margem, lucro bruto e sugestão de preço ideal.</p>
      </header>

      <section className="grid-2">
        <SectionCard title="Simulador de margem" subtitle="Escolha um produto e ajuste taxas/despesas estimadas.">
          <div className="form-grid">
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
              {products.map((product) => (
                <option value={product.id} key={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={fees}
              onChange={(event) => setFees(Number(event.target.value))}
              placeholder="Taxas (%)"
            />
          </div>
        </SectionCard>

        <SectionCard title="Leitura visual" subtitle="Indicadores rápidos para reforçar clareza comercial.">
          <div className="summary-card">
            <div>
              <span>Preço de venda</span>
              <strong>{formatCurrency(selectedProduct.price)}</strong>
            </div>
            <div>
              <span>Custo estimado</span>
              <strong>{formatCurrency(selectedProduct.cost)}</strong>
            </div>
            <div>
              <span>Taxas/despesas</span>
              <strong>{formatCurrency(feeAmount)}</strong>
            </div>
            <div>
              <span>Lucro bruto</span>
              <strong>{formatCurrency(grossProfit)}</strong>
            </div>
          </div>
          <div className="insight-strip">
            <StatusBadge tone={margin >= 30 ? 'success' : margin >= 15 ? 'warning' : 'danger'}>
              Margem: {margin.toFixed(1)}%
            </StatusBadge>
            <StatusBadge tone="neutral">Preço sugerido: {formatCurrency(suggestedPrice)}</StatusBadge>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
