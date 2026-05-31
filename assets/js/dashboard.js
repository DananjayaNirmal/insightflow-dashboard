import { readUploadedFile } from "../modules/fileRead.js";

const getFileData = document.getElementById("analyze-data");
const readFile = document.getElementById("fileInput");
let selectedFile = null;

readFile.addEventListener("change", (e) => {
  selectedFile = e.target.files[0] || null;
});

getFileData.addEventListener("click", async () => {
  if (!selectedFile) {
    alert("Please choose a file first before starting analysis.");
    return;
  }

  try {
    const data = await readUploadedFile(selectedFile);
    console.log("Extracted Data:", data);

    localStorage.setItem("uploaded_sales", JSON.stringify(data));

    alert("File processed successfully!");
  } catch (err) {
    alert(err);
  }
});
