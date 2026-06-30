import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function CartDrawer({
  cart,
  onIncrement,
  onDecrement,
  onRemove,
  orderForm,
  setOrderForm,
  onSubmit
}) {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <aside className="cart-drawer">
      <div className="panel__header">
        <div>
          <h2>Carrinho</h2>
          <p>Simule um pedido real e finalize pelo WhatsApp.</p>
        </div>
      </div>
      <div className="cart-items">
        {cart.length ? (
          cart.map((item) => (
            <div className="cart-item" key={item.productId}>
              <div>
                <strong>{item.name}</strong>
                <span>{formatCurrency(item.price)}</span>
              </div>
              <div className="cart-item__actions">
                <button onClick={() => onDecrement(item.productId)}>
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrement(item.productId)}>
                  <Plus size={14} />
                </button>
                <button onClick={() => onRemove(item.productId)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <strong>Nenhum item ainda</strong>
            <p>Adicione produtos para mostrar como o pedido é simples para o cliente.</p>
          </div>
        )}
      </div>
      <form className="order-form" onSubmit={onSubmit}>
        <input
          placeholder="Nome do cliente"
          value={orderForm.customerName}
          onChange={(event) => setOrderForm({ ...orderForm, customerName: event.target.value })}
          required
        />
        <input
          placeholder="Telefone"
          value={orderForm.phone}
          onChange={(event) => setOrderForm({ ...orderForm, phone: event.target.value })}
          required
        />
        <select
          value={orderForm.type}
          onChange={(event) => setOrderForm({ ...orderForm, type: event.target.value })}
        >
          <option>Retirada</option>
          <option>Entrega</option>
        </select>
        {orderForm.type === 'Entrega' ? (
          <input
            placeholder="Endereço"
            value={orderForm.address}
            onChange={(event) => setOrderForm({ ...orderForm, address: event.target.value })}
            required
          />
        ) : null}
        <textarea
          placeholder="Observações"
          value={orderForm.notes}
          onChange={(event) => setOrderForm({ ...orderForm, notes: event.target.value })}
          rows={3}
        />
        <div className="cart-total">
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <button className="button-primary" type="submit" disabled={!cart.length}>
          Finalizar pelo WhatsApp
        </button>
      </form>
    </aside>
  );
}
