import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import OnlineMenu from './pages/OnlineMenu';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Pricing from './pages/Pricing';
import Finance from './pages/Finance';
import About from './pages/About';
import { initializeData, saveData } from './utils/storage';
import { buildWhatsAppMessage } from './utils/whatsapp';
import { getDashboardMetrics } from './utils/analytics';

const initialOrderForm = {
  customerName: '',
  phone: '',
  type: 'Retirada',
  address: '',
  notes: ''
};

export default function App() {
  const [data, setData] = useState(() => initializeData());
  const [cart, setCart] = useState([]);
  const [orderForm, setOrderForm] = useState(initialOrderForm);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    saveData(data);
  }, [data]);

  const metrics = useMemo(() => getDashboardMetrics(data), [data]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...current,
        { productId: product.id, name: product.name, price: product.price, quantity: 1 }
      ];
    });
  }

  function incrementCart(productId) {
    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrementCart(productId) {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }

  function applyRecipeConsumption(items) {
    setData((current) => {
      const nextSupplies = current.supplies.map((supply) => ({ ...supply }));
      const nextProducts = current.products.map((product) => ({ ...product }));

      items.forEach((item) => {
        const product = nextProducts.find((candidate) => candidate.id === item.productId);
        if (!product) {
          return;
        }

        product.stock = Math.max(0, product.stock - item.quantity);
        product.recipe?.forEach((recipeItem) => {
          const supply = nextSupplies.find((candidate) => candidate.id === recipeItem.supplyId);
          if (supply) {
            supply.quantity = Math.max(0, supply.quantity - recipeItem.quantity * item.quantity);
          }
        });
      });

      return {
        ...current,
        products: nextProducts,
        supplies: nextSupplies
      };
    });
  }

  function submitOrder(event) {
    event.preventDefault();
    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const order = {
      id: `ped-${Date.now()}`,
      customerName: orderForm.customerName,
      phone: orderForm.phone,
      type: orderForm.type,
      address: orderForm.type === 'Entrega' ? orderForm.address : '',
      notes: orderForm.notes,
      status: 'Novo',
      createdAt: new Date().toISOString(),
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price
      })),
      total
    };

    setData((current) => ({
      ...current,
      orders: [order, ...current.orders],
      financeEntries: [
        {
          id: `fin-${Date.now()}`,
          type: 'entrada',
          description: `Pedido ${order.id} - ${order.customerName}`,
          amount: order.total,
          date: order.createdAt
        },
        ...current.financeEntries
      ]
    }));

    applyRecipeConsumption(order.items);
    const message = buildWhatsAppMessage(order);
    window.open(`https://wa.me/${data.customerInfo.whatsapp}?text=${message}`, '_blank');
    setCart([]);
    setOrderForm(initialOrderForm);
    navigate('/pedidos');
  }

  function updateOrderStatus(orderId, status) {
    setData((current) => ({
      ...current,
      orders: current.orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    }));
  }

  function saveProduct(product) {
    const nextProduct = {
      ...product,
      id: product.id || `prod-${Date.now()}`,
      price: Number(product.price),
      cost: Number(product.cost),
      stock: Number(product.stock),
      minStock: Number(product.minStock),
      image:
        product.image ||
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
      recipe: product.recipe || []
    };

    setData((current) => {
      const exists = current.products.some((item) => item.id === nextProduct.id);
      return {
        ...current,
        products: exists
          ? current.products.map((item) => (item.id === nextProduct.id ? nextProduct : item))
          : [nextProduct, ...current.products]
      };
    });
  }

  function deleteProduct(productId) {
    setData((current) => ({
      ...current,
      products: current.products.filter((product) => product.id !== productId)
    }));
  }

  function adjustSupplyStock(supplyId, amount) {
    if (!amount) {
      return;
    }

    setData((current) => ({
      ...current,
      supplies: current.supplies.map((supply) =>
        supply.id === supplyId
          ? { ...supply, quantity: Math.max(0, Number((supply.quantity + amount).toFixed(2))) }
          : supply
      )
    }));
  }

  function addFinanceEntry(entry) {
    setData((current) => ({
      ...current,
      financeEntries: [
        {
          id: `fin-${Date.now()}`,
          type: entry.type,
          description: entry.description,
          amount: Number(entry.amount),
          date: new Date().toISOString()
        },
        ...current.financeEntries
      ]
    }));
  }

  return (
    <Layout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              metrics={metrics}
              orders={data.orders}
              products={data.products}
              supplies={data.supplies}
            />
          }
        />
        <Route path="/propostas" element={<Proposals />} />
        <Route
          path="/cardapio"
          element={
            <OnlineMenu
              products={data.products}
              cart={cart}
              addToCart={addToCart}
              incrementCart={incrementCart}
              decrementCart={decrementCart}
              removeFromCart={removeFromCart}
              orderForm={orderForm}
              setOrderForm={setOrderForm}
              submitOrder={submitOrder}
            />
          }
        />
        <Route
          path="/pedidos"
          element={<Orders orders={data.orders} updateOrderStatus={updateOrderStatus} />}
        />
        <Route
          path="/produtos"
          element={
            <Products
              products={data.products}
              saveProduct={saveProduct}
              deleteProduct={deleteProduct}
            />
          }
        />
        <Route
          path="/estoque"
          element={<Inventory supplies={data.supplies} adjustSupplyStock={adjustSupplyStock} />}
        />
        <Route path="/custos" element={<Pricing products={data.products} />} />
        <Route
          path="/financeiro"
          element={
            <Finance
              metrics={metrics}
              financeEntries={data.financeEntries}
              addFinanceEntry={addFinanceEntry}
            />
          }
        />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Layout>
  );
}
