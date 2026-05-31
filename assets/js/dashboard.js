import { readUploadedFile } from "../modules/fileRead.js";

const getFileData = document.getElementById("analyze-data");
const readFile = document.getElementById("fileInput");

getFileData.addEventListener("click", () => {
  console.log("Start the function");
  readFile.addEventListener("change", async (e) => {
    const file = e.target.files[0];

    try {
      const data = await readUploadedFile(file);
      console.log("Extracted Data:", data);

      localStorage.setItem("uploaded_sales", JSON.stringify(data));

      alert("File processed successfully!");
    } catch (err) {
      alert(err);
      console.log("err");
    }
  });
});
