const allInsights = JSON.parse(localStorage.getItem("sales-insights"));

const months = Object.keys(allInsights.monthlyRevenue);
const revenueValues = Object.values(allInsights.monthlyRevenue);

const productNames = allInsights.topProducts.map((p) => p.product);
const productRevenue = allInsights.topProducts.map((p) => p.revenue);
export const renderMonthlyRevenueChart = (monthlyRevenue) => {
  new Chart(document.getElementById("revenueChart"), {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Monthly Revenue",
          data: revenueValues,
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
  new Chart(document.getElementById("topProductsChart"), {
    type: "bar",
    data: {
      labels: productNames,
      datasets: [
        {
          label: "Revenue by Product",
          data: productRevenue,
          backgroundColor: ["#2196F3", "#FF9800", "#9C27B0", "#4CAF50"],
        },
      ],
    },
  });
};
