const COLUMN_MAP = {
  date: ["date", "transaction date", "sale date", "order date"],
  product: ["product", "item", "product name", "item name"],
  quantity: ["quantity", "qty", "qnty", "units sold"],
  price: ["price", "unit price", "amount", "rate"],
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

  return null; // unknown column
}

export function readUploadedFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Use first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (raw.length < 2) {
        reject("File is empty or invalid");
        return;
      }

      // Extract headers
      const headers = raw[0];

      // Map headers to internal keys
      const mappedHeaders = {};
      headers.forEach((h, i) => {
        const detected = detectColumn(h);
        if (detected) mappedHeaders[detected] = i;
      });

      // Validate required columns
      const required = ["date", "product", "quantity", "price"];
      for (const col of required) {
        if (!(col in mappedHeaders)) {
          reject(`Missing required column: ${col}`);
          return;
        }
      }

      /*console.log("RAW HEADERS:", headers);
      console.log("NORMALIZED:", headers.map(normalizeHeader));
      console.log("MAPPED:", mappedHeaders);*/

      // Build cleaned dataset
      const cleaned = raw.slice(1).map((row) => {
        return {
          date: new Date(row[mappedHeaders.date]),
          product: String(row[mappedHeaders.product]),
          quantity: Number(row[mappedHeaders.quantity]),
          price: Number(row[mappedHeaders.price]),
        };
      });

      resolve(cleaned);
    };

    reader.onerror = () => reject("Error reading file");
    reader.readAsArrayBuffer(file);
  });
}
