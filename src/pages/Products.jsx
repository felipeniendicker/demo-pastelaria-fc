import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import SectionCard from '../components/SectionCard';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency } from '../utils/formatters';

const emptyForm = {
  id: '',
  name: '',
  category: 'Pasteis',
  price: '',
  cost: '',
  stock: '',
  minStock: '',
  description: '',
  image: '',
  active: true
};

export default function Products({ products, saveProduct, deleteProduct }) {
  const [form, setForm] = useState(emptyForm);

  function handleSubmit(event) {
    event.preventDefault();
    saveProduct(form);
    setForm(emptyForm);
  }

  function startEdit(product) {
    setForm({
      ...product,
      price: String(product.price),
      cost: String(product.cost),
      stock: String(product.stock),
      minStock: String(product.minStock)
    });
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Cadastro comercial</p>
        <h1>Produtos com CRUD simples e visual profissional</h1>
        <p>Cadastre, edite e desative itens para simular uma gestão organizada do cardápio.</p>
      </header>

      <section className="grid-2 form-layout">
        <SectionCard
          title={form.id ? 'Editar produto' : 'Novo produto'}
          subtitle="Os dados ficam salvos no navegador para facilitar demonstrações repetidas."
          action={<Plus size={18} />}
        >
          <form className="form-grid" onSubmit={handleSubmit}>
            <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Pasteis</option>
              <option>Lanches</option>
              <option>Bebidas</option>
              <option>Combos</option>
            </select>
            <input placeholder="Preço de venda" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input placeholder="Custo estimado" type="number" step="0.01" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} required />
            <input placeholder="Estoque atual" type="number" step="1" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <input placeholder="Estoque mínimo" type="number" step="1" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} required />
            <input placeholder="URL da imagem" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <label className="switch-field">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Produto ativo
            </label>
            <textarea placeholder="Descrição" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="button-primary" type="submit">
              {form.id ? 'Salvar alterações' : 'Cadastrar produto'}
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Lista de produtos" subtitle="Estados visuais ajudam a conduzir a apresentação comercial.">
          <div className="stack-list">
            {products.map((product) => (
              <div className="entity-card" key={product.id}>
                <div>
                  <div className="entity-card__header">
                    <strong>{product.name}</strong>
                    <StatusBadge tone={product.active ? 'success' : 'danger'}>{product.active ? 'Ativo' : 'Inativo'}</StatusBadge>
                  </div>
                  <p>{product.category}</p>
                  <small>
                    Venda {formatCurrency(product.price)} | Custo {formatCurrency(product.cost)} | Estoque {product.stock}
                  </small>
                </div>
                <div className="entity-card__actions">
                  <button onClick={() => startEdit(product)}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => deleteProduct(product.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
