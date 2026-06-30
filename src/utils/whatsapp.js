export function buildWhatsAppMessage(order) {
  const lines = [
    'Olá, Pastelaria FC. Quero finalizar este pedido:',
    '',
    ...order.items.map(
      (item) => `- ${item.quantity}x ${item.name} (${item.unitPrice.toFixed(2)})`
    ),
    '',
    `Cliente: ${order.customerName}`,
    `Telefone: ${order.phone}`,
    `Recebimento: ${order.type}`,
    order.address ? `Endereço: ${order.address}` : null,
    order.notes ? `Observações: ${order.notes}` : null,
    `Total estimado: R$ ${order.total.toFixed(2)}`
  ].filter(Boolean);

  return encodeURIComponent(lines.join('\n'));
}
