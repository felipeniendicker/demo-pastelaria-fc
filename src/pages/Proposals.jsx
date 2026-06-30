import { useNavigate } from 'react-router-dom';
import ProposalCard from '../components/ProposalCard';

export default function Proposals() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Comparativo comercial</p>
        <h1>As 3 propostas que a Pastelaria FC pode contratar</h1>
        <p>
          Esta tela ajuda a conduzir a conversa comercial, mostrando uma evolução clara do básico
          ao sistema completo.
        </p>
      </header>

      <section className="proposal-grid">
        <ProposalCard
          title="Opção 1: Cardápio Online"
          description="Ideal para agilizar atendimento, receber pedidos por link e transformar o WhatsApp em um canal muito mais organizado."
          points={[
            'Link de cardápio para clientes',
            'Produtos com foto, descrição e preço',
            'Carrinho de pedidos simples',
            'Finalização pronta para WhatsApp'
          ]}
          accent="accent-green"
          onDemo={() => navigate('/cardapio')}
        />
        <ProposalCard
          title="Opção 2: Gestão e Estoque"
          description="Perfeita para organizar a operação interna, controlar custos, evitar falta de insumos e profissionalizar a rotina."
          points={[
            'Cadastro de produtos e insumos',
            'Controle de estoque e alertas',
            'Custos por item e visão de margem',
            'Relatórios de vendas e faturamento'
          ]}
          accent="accent-gold"
          onDemo={() => navigate('/estoque')}
        />
        <ProposalCard
          title="Opção 3: Sistema Integrado Completo"
          description="Une atendimento, operação e gestão financeira em um fluxo único, reduzindo retrabalho e dando visão completa do negócio."
          points={[
            'Cardápio integrado ao estoque',
            'Pedidos e baixa automática de insumos',
            'Financeiro e lucro estimado',
            'Dashboard completo para decisão'
          ]}
          accent="accent-dark"
          onDemo={() => navigate('/')}
        />
      </section>
    </div>
  );
}
