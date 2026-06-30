export function getOrderCost(order, products) {
  return order.items.reduce((sum, item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return sum + (product?.cost || 0) * item.quantity;
  }, 0);
}

export function getDashboardMetrics(data) {
  const today = new Date();
  const isToday = (value) => {
    const date = new Date(value);
    return date.toDateString() === today.toDateString();
  };
  const isThisMonth = (value) => {
    const date = new Date(value);
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const ordersToday = data.orders.filter((order) => isToday(order.createdAt));
  const revenueToday = ordersToday.reduce((sum, order) => sum + order.total, 0);
  const costsToday = ordersToday.reduce((sum, order) => sum + getOrderCost(order, data.products), 0);
  const revenueMonth = data.orders
    .filter((order) => isThisMonth(order.createdAt))
    .reduce((sum, order) => sum + order.total, 0);

  const productMap = new Map();
  data.orders.forEach((order) => {
    order.items.forEach((item) => {
      const current = productMap.get(item.productId) || { name: item.name, quantity: 0 };
      current.quantity += item.quantity;
      productMap.set(item.productId, current);
    });
  });

  const topProducts = Array.from(productMap.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4);

  const lowStockProducts = data.products.filter((product) => product.stock <= product.minStock);
  const lowStockSupplies = data.supplies.filter((supply) => supply.quantity <= supply.minStock);
  const financeEntriesMonth = data.financeEntries.filter((entry) => isThisMonth(entry.date));
  const manualCosts = financeEntriesMonth
    .filter((entry) => entry.type === 'saida')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const manualIncome = financeEntriesMonth
    .filter((entry) => entry.type === 'entrada')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const totalOrders = data.orders.length;
  const totalRevenue = data.orders.reduce((sum, order) => sum + order.total, 0);

  return {
    salesToday: ordersToday.reduce(
      (sum, order) => sum + order.items.reduce((sub, item) => sub + item.quantity, 0),
      0
    ),
    revenueToday,
    ordersToday: ordersToday.length,
    topProducts,
    lowStockProducts,
    lowStockSupplies,
    estimatedProfitToday: revenueToday - costsToday,
    revenueMonth,
    ticketAverage: totalOrders ? totalRevenue / totalOrders : 0,
    totalOrders,
    estimatedCostsMonth: manualCosts,
    cashflowMonth: manualIncome - manualCosts
  };
}
