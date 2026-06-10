# 📊 InsightFlow Dashboard
A dashboard for analyzing sales data, generating insights, visualizing charts, and exporting reports as PDF.

![status: mini version](https://img.shields.io/badge/status-mini--version-blue)

> **Note:** This is a **mini version** of a future full-scale Data Analytics Dashboard.

---

## 🚀 Features

- Upload CSV/XLS/XLSX sales files  
- Automatic data cleaning and insight generation  
- Interactive charts powered by Chart.js  
- Download insights and charts as a PDF report  
- Modern responsive UI with toast notifications


 ## ⚠️ Limitations

 >  This is a **mini version** of a future full analytics dashboard.
- Only basic insights are generated (no AI or advanced stats yet).
- Data is processed entirely on the client side.
- No database or user accounts.
- PDF export is simple and not fully customizable.


## 🛠️ Tech Stack

| Component      | Technology               |
| -------------- | ------------------------ |
| Frontend       | HTML5, CSS3, Bootstrap   |
| Logic          | JavaScript (ES6 Modules) |
| Charts         | Chart.js                 |
| PDF Generation | jsPDF                    |
| File Parsing   | XLSX.js, CSV Parser      |
| Storage        | LocalStorage             |

## 📂 Project Structure

InsightFlow-dashboard/
│
├── assets/
│   ├── images/
│   │   └── logo.png
│   └── js/
│       └── dashboard.js
│
├── modules/
│   ├── analytics.js
│   ├── charts.js
│   └── fileRead.js
│
├── .gitignore
├── dashboard.html
├── instructions.html
├── LICENSE
└── README.md

## 📥 How to Use

1. **Upload a sales file** (CSV, XLS, or XLSX) using the file picker.  
2. Click **Analyze Data** to process the file and generate insights.  
3. View the results, including summary metrics and interactive charts.  
4. Click **Download PDF** to export the insights and charts as a report.

## 🧠 Core Modules

### 📁 fileRead.js

Responsible for:

* Reading uploaded files
* Parsing CSV, XLS, and XLSX formats
* Converting data into clean JSON structures

### 📊 analytics.js

Responsible for:

* Revenue calculations
* Profit calculations
* Growth analysis
* AOV calculations
* Product performance analysis
* Insight generation

### 📈 charts.js

Responsible for:

* Rendering interactive charts
* Managing chart updates
* Exporting chart data for PDF generation

## ✨ Future Improvements

Planned enhancements include:

* AI-powered insights
* Additional chart types and visualizations
* Multi-file comparison dashboard
* User authentication and saved dashboards
* Cloud data storage integration

## 📸 Screenshots

<img width="1884" height="816" alt="image" src="https://github.com/user-attachments/assets/af6cc5e7-c2b5-4254-9d66-b5ec8c7789c4" />

<img width="4000" height="3072" alt="insightsflow" src="https://github.com/user-attachments/assets/ee994a60-024b-4d9f-8d81-d25e86393410" />

## 🤝 Contributing

Contributions are welcome!

Feel free to:

* Fork the project
* Create feature branches
* Submit pull requests
* Report issues and suggestions

## 📜 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this software.

