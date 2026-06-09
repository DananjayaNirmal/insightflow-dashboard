const cleanData = (data) => {
  return data.map((row) => {
    const date = new Date(row.date);
    const iso = date.toISOString().split("T")[0];

    return {
      date: iso,
      salesMonth: iso.slice(0, 7),
      product: (row.product || "").trim().toLowerCase(),
      quantity: Number(String(row.quantity).replace(/[^\d.-]/g, "")) || 0,
      price: Number(String(row.price).replace(/[^\d.-]/g, "")) || 0,
    };
  });
};

const findRevenue = (cleanedData) => {
  return cleanedData.reduce((sum, row) => {
    return sum + row.quantity * row.price;
  }, 0);
};

const findMonthlyRevenue = (cleanedData) => {
  const monthly = {};

  cleanedData.forEach((row) => {
    const revenue = row.quantity * row.price;
    monthly[row.salesMonth] = (monthly[row.salesMonth] || 0) + revenue;
  });

  return monthly;
};

const findTopProducts = (cleanedData) => {
  const productMap = {};

  cleanedData.forEach((row) => {
    const revenue = row.quantity * row.price;
    productMap[row.product] = (productMap[row.product] || 0) + revenue;
  });

  return Object.entries(productMap)
    .map(([product, revenue]) => ({ product, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
};

const findTotalSalesCount = (cleanedData) => cleanedData.length;

const findTotalProfit = (cleanedData) => {
  return cleanedData.reduce((sum, row) => {
    return sum + row.quantity * row.price;
  }, 0);
};

const findGrowth = (cleanedData) => {
  const monthly = findMonthlyRevenue(cleanedData);
  const months = Object.keys(monthly).sort();

  if (months.length < 2) return 0;

  const last = monthly[months[months.length - 1]];
  const prev = monthly[months[months.length - 2]];

  return ((last - prev) / prev) * 100;
};

const findAOV = (cleanedData) => {
  if (!cleanedData.length) return 0;

  const totalRevenue = cleanedData.reduce((sum, row) => {
    return sum + row.quantity * row.price;
  }, 0);

  const totalOrders = cleanedData.length;

  return totalRevenue / totalOrders;
};

const generateMoreInsights = (insights) => {
  const manualInsights = [];

  if (insights.growth > 0) {
    manualInsights.push(
      `Sales increased by ${insights.growth.toFixed(1)}% compared to last month.`,
    );
  } else if (insights.growth < 0) {
    manualInsights.push(
      `Sales dropped by ${Math.abs(insights.growth).toFixed(1)}% compared to last month.`,
    );
  }

  manualInsights.push(`Total revenue is ${insights.revenue} $.`);

  const top = insights.topProducts[0];
  if (top) {
    manualInsights.push(
      `Top product is ${top.product} with ${top.revenue} $ revenue.`,
    );
  }

  manualInsights.push(`Total sales count: ${insights.salesCount}.`);

  return manualInsights;
};

export const findInsights = async (data) => {
  try {
    const cleanedData = await cleanData(data);

    const growth = findGrowth(cleanedData);
    const revenue = findRevenue(cleanedData);
    const topProducts = findTopProducts(cleanedData);
    const salesCount = findTotalSalesCount(cleanedData);
    const profit = findTotalProfit(cleanedData);
    const monthlyRevenue = findMonthlyRevenue(cleanedData);
    const AOV = findAOV(cleanedData);

    let insights = {
      growth,
      revenue,
      monthlyRevenue,
      topProducts,
      salesCount,
      profit,
      AOV,
    };
    const moreInsights = generateMoreInsights(insights);
    insights.moreInsights = moreInsights;

    return insights;
  } catch (error) {
    console.error("Error:", error);
  }
};
