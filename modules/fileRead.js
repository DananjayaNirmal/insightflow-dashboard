const COLUMN_MAP = {
  date: ["date", "transaction date", "sale date", "order date"],
  product: ["product", "item", "product name", "item name"],
  quantity: ["quantity", "qty", "qnty", "units sold"],
  price: ["price", "unit price", "amount", "rate"],
  cost: ["cost", "unit cost"],
};

function normalizeHeader(header) {
  return header
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "");
}

function detectColumn(header) {
  const normalized = normalizeHeader(header);

  for (const key in COLUMN_MAP) {
    if (COLUMN_MAP[key].includes(normalized)) {
      return key;
    }
  }

  return null;
}

export function readUploadedFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (raw.length < 2) {
        reject("File is empty or invalid");
        return;
      }

      const headers = raw[0];

      const mappedHeaders = {};
      headers.forEach((h, i) => {
        const detected = detectColumn(h);
        if (detected) mappedHeaders[detected] = i;
      });

      const required = ["date", "product", "quantity", "price", "cost"];
      for (const col of required) {
        if (!(col in mappedHeaders)) {
          reject(`Missing required column: ${col}`);
          return;
        }
      }

      const cleaned = raw.slice(1).map((row) => {
        return {
          date: new Date(row[mappedHeaders.date]),
          product: String(row[mappedHeaders.product]),
          quantity: Number(row[mappedHeaders.quantity]),
          price: Number(row[mappedHeaders.price]),
          cost: Number(row[mappedHeaders.cost]),
        };
      });

      resolve(cleaned);
    };

    reader.onerror = () => reject("Error reading file");
    reader.readAsArrayBuffer(file);
  });
}
