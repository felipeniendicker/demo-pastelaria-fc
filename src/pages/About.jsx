export default function About() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Apresentação comercial</p>
        <h1>Sobre esta demonstração</h1>
        <p>
          Esta demonstração foi criada para mostrar como a lanchonete pode organizar pedidos,
          estoque, vendas e financeiro em um único sistema simples, moderno e personalizado.
        </p>
      </header>

      <section className="about-grid">
        <article className="about-card">
          <h2>O que pode evoluir na versão final</h2>
          <p>A versão final pode ser adaptada totalmente à rotina da empresa, com fluxos específicos do atendimento e da cozinha.</p>
        </article>
        <article className="about-card">
          <h2>Onde pode funcionar</h2>
          <p>O sistema pode rodar no computador, celular ou tablet, facilitando balcão, produção e gestão.</p>
        </article>
        <article className="about-card">
          <h2>Hospedagem e acesso</h2>
          <p>Pode ser hospedado online para funcionar por link, com cardápio público e painel administrativo privado.</p>
        </article>
        <article className="about-card">
          <h2>Recursos futuros</h2>
          <p>Pode incluir login de funcionário e administrador, integração com WhatsApp e pagamento online.</p>
        </article>
      </section>
    </div>
  );
}
