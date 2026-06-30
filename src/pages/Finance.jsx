import { useState } from 'react';
import SectionCard from '../components/SectionCard';
import { formatCurrency, formatDate } from '../utils/formatters';

const initialForm = {
  type: 'entrada',
  description: '',
  amount: ''
};

export default function Finance({ metrics, financeEntries, addFinanceEntry }) {
  const [form, setForm] = useState(initialForm);

  function handleSubmit(event) {
    event.preventDefault();
    addFinanceEntry(form);
    setForm(initialForm);
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Saúde financeira</p>
        <h1>Resumo financeiro com entradas e saídas</h1>
        <p>Faturamento, ticket médio e movimentações ajudam a vender a proposta integrada.</p>
      </header>

      <section className="stats-grid">
        <div className="mini-card">
          <span>Faturamento do dia</span>
          <strong>{formatCurrency(metrics.revenueToday)}</strong>
        </div>
        <div className="mini-card">
          <span>Faturamento do mês</span>
          <strong>{formatCurrency(metrics.revenueMonth)}</strong>
        </div>
        <div className="mini-card">
          <span>Total de pedidos</span>
          <strong>{metrics.totalOrders}</strong>
        </div>
        <div className="mini-card">
          <span>Ticket médio</span>
          <strong>{formatCurrency(metrics.ticketAverage)}</strong>
        </div>
        <div className="mini-card">
          <span>Custos estimados</span>
          <strong>{formatCurrency(metrics.estimatedCostsMonth)}</strong>
        </div>
        <div className="mini-card">
          <span>Lucro estimado</span>
          <strong>{formatCurrency(metrics.cashflowMonth + metrics.revenueMonth)}</strong>
        </div>
      </section>

      <section className="grid-2">
        <SectionCard title="Nova movimentação" subtitle="Adicione entrada ou saída manual para reforçar flexibilidade.">
          <form className="form-grid" onSubmit={handleSubmit}>
            <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <input
              placeholder="Descrição"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              required
            />
            <input
              placeholder="Valor"
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
              required
            />
            <button className="button-primary" type="submit">
              Adicionar movimentação
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Movimentações fictícias" subtitle="Lista pronta para apresentação comercial.">
          <div className="stack-list">
            {financeEntries
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((entry) => (
                <div className="entity-card" key={entry.id}>
                  <div>
                    <strong>{entry.description}</strong>
                    <p>{formatDate(entry.date)}</p>
                  </div>
                  <strong className={entry.type === 'entrada' ? 'income' : 'expense'}>
                    {entry.type === 'entrada' ? '+' : '-'} {formatCurrency(entry.amount)}
                  </strong>
                </div>
              ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
