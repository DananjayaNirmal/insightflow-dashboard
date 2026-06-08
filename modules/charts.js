export let revenueChartInstance = null;
export let topProductsChartInstance = null;

export const renderMonthlyRevenueChart = (monthlyRevenue) => {
  revenueChartInstance = new Chart(document.getElementById("revenueChart"), {
    type: "line",
    data: {
      labels: Object.keys(monthlyRevenue),
      datasets: [
        {
          label: "Monthly Revenue",
          data: Object.values(monthlyRevenue),
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    },
  });
};

export const renderTopProductsChart = (topProducts) => {
  topProductsChartInstance = new Chart(
    document.getElementById("topProductsChart"),
    {
      type: "bar",
      data: {
        labels: topProducts.map((p) => p.product),
        datasets: [
          {
            label: "Revenue by Product",
            data: topProducts.map((p) => p.revenue),
            backgroundColor: ["#2196F3", "#FF9800", "#9C27B0", "#4CAF50"],
          },
        ],
      },
    },
  );
};
