import SectionCard from '../components/SectionCard';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';

const statuses = ['Novo', 'Em preparo', 'Pronto', 'Entregue', 'Cancelado'];

export default function Orders({ orders, updateOrderStatus }) {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Operação de pedidos</p>
        <h1>Controle de atendimento e produção</h1>
        <p>Os status são persistidos no navegador para demonstrar acompanhamento do fluxo real.</p>
      </header>

      <SectionCard title="Pedidos recebidos" subtitle="Atualize o andamento e mostre como a equipe acompanha tudo em um painel único.">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Produtos</th>
                <th>Status</th>
                <th>Recebimento</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                    <p>{formatDate(order.createdAt)}</p>
                  </td>
                  <td>
                    <strong>{order.customerName}</strong>
                    <p>{order.phone}</p>
                  </td>
                  <td>
                    {order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}
                  </td>
                  <td>
                    <div className="status-cell">
                      <StatusBadge tone={order.status === 'Novo' ? 'warning' : order.status === 'Cancelado' ? 'danger' : 'success'}>
                        {order.status}
                      </StatusBadge>
                      <select value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>
                        {statuses.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>{order.type}</td>
                  <td>{formatCurrency(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
