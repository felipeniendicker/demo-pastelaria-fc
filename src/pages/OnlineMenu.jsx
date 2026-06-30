import { ShoppingCart } from 'lucide-react';
import CartDrawer from '../components/CartDrawer';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency } from '../utils/formatters';

const categories = ['Pasteis', 'Lanches', 'Bebidas', 'Combos'];

export default function OnlineMenu({
  products,
  cart,
  addToCart,
  incrementCart,
  decrementCart,
  removeFromCart,
  orderForm,
  setOrderForm,
  submitOrder
}) {
  return (
    <div className="page">
      <header className="page-header split">
        <div>
          <p className="eyebrow">Experiência do cliente final</p>
          <h1>Cardápio online com cara de sistema real</h1>
          <p>
            A demonstração simula a jornada completa do cliente: escolha dos itens, carrinho e
            mensagem pronta para o WhatsApp.
          </p>
        </div>
        <StatusBadge tone="success">
          <ShoppingCart size={12} /> {cart.reduce((sum, item) => sum + item.quantity, 0)} itens no pedido
        </StatusBadge>
      </header>

      <div className="menu-layout">
        <div className="menu-content">
          {categories.map((category) => (
            <section key={category} className="menu-section">
              <div className="panel__header">
                <div>
                  <h2>{category}</h2>
                  <p>Seleção fictícia com dados prontos para apresentação.</p>
                </div>
              </div>
              <div className="product-grid">
                {products
                  .filter((product) => product.active && product.category === category)
                  .map((product) => (
                    <article className="menu-card" key={product.id}>
                      <img src={product.image} alt={product.name} />
                      <div className="menu-card__body">
                        <div className="menu-card__head">
                          <h3>{product.name}</h3>
                          <strong>{formatCurrency(product.price)}</strong>
                        </div>
                        <p>{product.description}</p>
                        <button className="button-primary" onClick={() => addToCart(product)}>
                          Adicionar ao pedido
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <CartDrawer
          cart={cart}
          onIncrement={incrementCart}
          onDecrement={decrementCart}
          onRemove={removeFromCart}
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          onSubmit={submitOrder}
        />
      </div>
    </div>
  );
}
