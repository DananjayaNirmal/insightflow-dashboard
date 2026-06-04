import { readUploadedFile } from "../modules/fileRead.js";
import { findInsights } from "../modules/analytics.js";
import {
  renderMonthlyRevenueChart,
  renderTopProductsChart,
} from "../modules/charts.js";

const analyzeData = document.getElementById("analyze-data");
const readFile = document.getElementById("fileInput");
const yearlyRevenue = document.getElementById("yearly-revenue");
const monthlyRevenue = document.getElementById("monthly-revenue");
const totalSalesCount = document.getElementById("sales-count");
const averageOrder = document.getElementById("average-order");
const profit = document.getElementById("profit");
const growth = document.getElementById("growth");
const moreInsights = document.getElementById("more-insights");

let selectedFile = null;

const getFileData = async () => {
  try {
    const data = await readUploadedFile(selectedFile);
    alert("File processed successfully!");
    return data;
  } catch (err) {
    alert(err);
  }
};

const getInsights = async () => {
  try {
    const data = await getFileData();
    const insights = await findInsights(data);

    localStorage.setItem("sales-insights", JSON.stringify(insights));

    console.log("insightes: ", insights);
  } catch (error) {
    console.error("Error:", error);
  }
};

readFile.addEventListener("change", (e) => {
  selectedFile = e.target.files[0] || null;
});

analyzeData.addEventListener("click", async () => {
  if (!selectedFile) {
    alert("Please choose a file first before starting analysis.");
    return;
  }
  await getInsights();
  displayInsights();
});

const displayMoreInsights = (moreInsightsArray) => {
  moreInsights.innerHTML = "";

  moreInsightsArray.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    moreInsights.appendChild(p);
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
      <td>${item.product}</td>
      <td>${item.revenue}</td>
    `;

    tableBody.appendChild(row);
  });
};

const displayInsights = () => {
  const allInsights = JSON.parse(localStorage.getItem("sales-insights"));

  yearlyRevenue.innerHTML = allInsights["revenue"];
  profit.innerHTML = allInsights["profit"];
  totalSalesCount.innerHTML = allInsights["salesCount"];
  growth.innerHTML = `${allInsights["growth"]} %`;
  averageOrder.innerHTML = Math.round(allInsights["AOV"]);

  renderMonthlyRevenueChart(allInsights.monthlyRevenue);
  renderTopProductsChart(allInsights.topProducts);
  displayMoreInsights(allInsights.moreInsights);
  displayTopProducts(allInsights.topProducts);
};

//line no 16
