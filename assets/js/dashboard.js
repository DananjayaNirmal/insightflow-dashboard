import { readUploadedFile } from "../../modules/fileRead.js";
import { findInsights } from "../../modules/analytics.js";
import {
  renderMonthlyRevenueChart,
  renderTopProductsChart,
} from "../../modules/charts.js";

import {
  revenueChartInstance,
  topProductsChartInstance,
} from "../../modules/charts.js";

const analyzeData = document.getElementById("analyze-data");

const readFile = document.getElementById("fileInput");
const yearlyRevenue = document.getElementById("yearly-revenue");
const monthlyRevenue = document.getElementById("monthly-revenue");
const totalSalesCount = document.getElementById("sales-count");
const averageOrder = document.getElementById("average-order");
const profit = document.getElementById("profit");
const growth = document.getElementById("growth");
const moreInsights = document.getElementById("more-insights");

const downloadPdfBtn = document.getElementById("download-pdf");

let selectedFile = null;

const getFileData = async () => {
  try {
    const data = await readUploadedFile(selectedFile);
    showToast("File processed successfully!");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getInsights = async () => {
  try {
    const data = await getFileData();
    const insights = await findInsights(data);

    localStorage.setItem("sales-insights", JSON.stringify(insights));

    //console.log("insightes: ", insights);
  } catch (error) {
    console.error("Error:", error);
  }
};

const displayMoreInsights = (moreInsightsArray) => {
  moreInsights.innerHTML = "";

  moreInsightsArray.forEach((text) => {
    const span = document.createElement("span");
    span.textContent = text;

    span.classList.add(
      "bg-success",
      "text-light",
      "py-1",
      "px-2",
      "rounded",
      "border",
      "me-2",
    );

    moreInsights.appendChild(span);
  });
};

const displayTopProducts = (topProducts) => {
  const tableBody = document
    .getElementById("top-products")
    .querySelector("tbody");

  tableBody.innerHTML = "";
  topProducts.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="text-secondary">${item.product}</td>
      <td>${item.revenue}</td>
    `;

    tableBody.appendChild(row);
  });
};

const displayInsights = () => {
  const allInsights = JSON.parse(localStorage.getItem("sales-insights"));

  yearlyRevenue.innerHTML = `${allInsights["revenue"]} $`;
  profit.innerHTML = `${allInsights["profit"]} $`;
  totalSalesCount.innerHTML = `${allInsights["salesCount"]}`;
  growth.innerHTML = `${allInsights["growth"]} %`;
  averageOrder.innerHTML = `${Math.round(allInsights["AOV"])} $`;

  renderMonthlyRevenueChart(allInsights.monthlyRevenue);
  renderTopProductsChart(allInsights.topProducts);
  displayMoreInsights(allInsights.moreInsights);
  displayTopProducts(allInsights.topProducts);
};

readFile.addEventListener("change", (e) => {
  selectedFile = e.target.files[0] || null;
});

analyzeData.addEventListener("click", async () => {
  if (!selectedFile) {
    showToast("Please choose a file first before starting analysis.");

    return;
  }

  await getInsights();
  displayInsights();
});

downloadPdfBtn.addEventListener("click", () => {
  const insights = JSON.parse(localStorage.getItem("sales-insights"));

  if (!insights) {
    showToast("No insights found. Analyze a file first.");

    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("InsightFlow Report", 10, 15);

  doc.setFontSize(12);
  doc.text(`Revenue: ${insights.revenue} $`, 10, 30);
  doc.text(`Profit: ${insights.profit} $`, 10, 40);
  doc.text(`Sales Count: ${insights.salesCount}`, 10, 50);
  doc.text(`Growth: ${insights.growth} %`, 10, 60);
  doc.text(`Average Order Value: ${Math.round(insights.AOV)} $`, 10, 70);

  if (revenueChartInstance) {
    const img1 = revenueChartInstance.toBase64Image();
    doc.addImage(img1, "PNG", 10, 90, 180, 80);
  }

  doc.addPage();

  if (topProductsChartInstance) {
    const img2 = topProductsChartInstance.toBase64Image();
    doc.addImage(img2, "PNG", 10, 20, 180, 80);
  }

  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`insights-${timestamp}.pdf`);
});

function showToast(message) {
  const toastBody = document.getElementById("toast-body");
  toastBody.textContent = message;

  const toastEl = document.getElementById("app-toast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
