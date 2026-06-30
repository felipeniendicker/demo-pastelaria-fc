import { AlertTriangle, BadgeDollarSign, PackageOpen, ShoppingBag, TrendingUp, Utensils } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency } from '../utils/formatters';

export default function Dashboard({ metrics, orders, products, supplies }) {
  const bars = metrics.topProducts.length
    ? metrics.topProducts
    : [{ name: 'Sem vendas ainda', quantity: 1 }];
  const maxBar = Math.max(...bars.map((item) => item.quantity));

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Visão geral do negócio</p>
          <h1>Operação em tempo real da Pastelaria FC</h1>
          <p>
            Uma leitura rápida de vendas, pedidos, estoque e lucro estimado para mostrar valor logo
            na primeira tela da apresentação.
          </p>
        </div>
        <div className="hero__highlight">
          <span>Modo demonstração</span>
          <strong>3 propostas em um só sistema</strong>
        </div>
      </header>

      <section className="stats-grid">
        <StatCard title="Vendas do dia" value={metrics.salesToday} helper="Itens vendidos hoje" icon={Utensils} />
        <StatCard title="Faturamento do dia" value={metrics.revenueToday} currency helper="Pedidos confirmados hoje" icon={BadgeDollarSign} />
        <StatCard title="Pedidos recebidos" value={metrics.ordersToday} helper="Entre WhatsApp e balcão" icon={ShoppingBag} />
        <StatCard title="Lucro estimado" value={metrics.estimatedProfitToday} currency helper="Receita menos custo dos itens" icon={TrendingUp} />
      </section>

      <section className="grid-2">
        <SectionCard title="Produtos mais vendidos" subtitle="Destaques que ajudam a decidir promoção e reposição.">
          <div className="chart-list">
            {bars.map((item) => (
              <div className="chart-row" key={item.name}>
                <span>{item.name}</span>
                <div className="chart-row__bar">
                  <div style={{ width: `${(item.quantity / maxBar) * 100}%` }} />
                </div>
                <strong>{item.quantity}</strong>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Atenções de estoque" subtitle="Itens com alerta visual para evitar ruptura.">
          <div className="attention-list">
            {products.filter((product) => product.stock <= product.minStock).map((product) => (
              <div className="attention-item" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>Produto em nível crítico para venda.</p>
                </div>
                <StatusBadge tone="warning">{product.stock} restantes</StatusBadge>
              </div>
            ))}
            {supplies.filter((supply) => supply.quantity <= supply.minStock).map((supply) => (
              <div className="attention-item" key={supply.id}>
                <div>
                  <strong>{supply.name}</strong>
                  <p>Insumo abaixo do mínimo operacional.</p>
                </div>
                <StatusBadge tone="danger">
                  <AlertTriangle size={12} /> {supply.quantity} {supply.unit}
                </StatusBadge>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid-2">
        <SectionCard title="Fila de pedidos" subtitle="Leitura rápida do andamento da cozinha e entregas.">
          <div className="stack-list">
            {orders.slice(0, 4).map((order) => (
              <div className="order-row" key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <p>{order.customerName}</p>
                </div>
                <div>
                  <StatusBadge tone={order.status === 'Novo' ? 'warning' : 'success'}>{order.status}</StatusBadge>
                </div>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Resumo gerencial" subtitle="Visão comercial para reforçar o potencial da proposta.">
          <div className="summary-card">
            <div>
              <span>Faturamento do mês</span>
              <strong>{formatCurrency(metrics.revenueMonth)}</strong>
            </div>
            <div>
              <span>Ticket médio</span>
              <strong>{formatCurrency(metrics.ticketAverage)}</strong>
            </div>
            <div>
              <span>Pedidos totais</span>
              <strong>{metrics.totalOrders}</strong>
            </div>
            <div>
              <span>Saídas estimadas</span>
              <strong>{formatCurrency(metrics.estimatedCostsMonth)}</strong>
            </div>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
