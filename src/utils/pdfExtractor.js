import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

// Configure PDF.js worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Extract text from TXT, PDF or DOCX files
 * @param {File} file
 * @returns {Promise<string>}
 */
export const extractTextFromFile = async (file) => {
  if (!file) {
    throw new Error("No file selected.");
  }

  const extension = file.name.toLowerCase();

  // -----------------------------
  // TXT
  // -----------------------------
  if (
    file.type === "text/plain" ||
    extension.endsWith(".txt")
  ) {
    return await file.text();
  }

  // -----------------------------
  // PDF
  // -----------------------------
  if (
    file.type === "application/pdf" ||
    extension.endsWith(".pdf")
  ) {
    try {
      const arrayBuffer = await file.arrayBuffer();

      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
      });

      const pdf = await loadingTask.promise;

      let extractedText = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => {
            if ("str" in item) {
              return item.str;
            }
            return "";
          })
          .join(" ");

        extractedText += pageText + "\n";
      }

      extractedText = extractedText.trim();

      if (!extractedText.length) {
        throw new Error(
          "No readable text found. This PDF may be scanned or image-based."
        );
      }

      return extractedText;
    } catch (error) {
      console.error("PDF Extraction Error:", error);

      throw new Error(
        error.message ||
          "Unable to extract text from PDF."
      );
    }
  }

  // -----------------------------
  // DOCX
  // -----------------------------
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extension.endsWith(".docx")
  ) {
    try {
      const arrayBuffer = await file.arrayBuffer();

      const result = await mammoth.extractRawText({
        arrayBuffer,
      });

      const text = result.value.trim();

      if (!text.length) {
        throw new Error("DOCX contains no readable text.");
      }

      return text;
    } catch (error) {
      console.error("DOCX Extraction Error:", error);

      throw new Error(
        error.message ||
          "Unable to extract text from DOCX."
      );
    }
  }

  // -----------------------------
  // Unsupported
  // -----------------------------
  throw new Error(
    "Unsupported file type. Please upload PDF, DOCX or TXT."
  );
};