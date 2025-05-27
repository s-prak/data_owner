const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const TfIdf = require("tf-idf-search");
const axios = require("axios");
const { encrypt } = require("./encrypt");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const tf_idf = new TfIdf();
const docsDirectory = "/Users/sprak/Documents/sem8/ps2/final/docs";

// Keep track of uploaded files to prevent reprocessing
const uploadedFilesSet = new Set();

app.get("/tfidf", (req, res) => {
  res.json(tf_idf);
});

app.post("/add-document", (req, res) => {
  const { document, docID } = req.body;

  if (!document || !docID) {
    return res.status(400).json({ error: "Both 'document' and 'docID' are required" });
  }

  if (uploadedFilesSet.has(docID)) {
    return res.status(200).json({ message: "Document already added", docID });
  }

  tf_idf.addDocumentFromString(document);
  uploadedFilesSet.add(docID);
  console.log("Document added successfully");

  res.json({ message: "Document added successfully", docID, document });
});

app.post("/upload", async (req, res) => {
  try {
    const files = fs.readdirSync(docsDirectory);
    const newFiles = [];

    for (const file of files) {
      if (uploadedFilesSet.has(file)) {
        console.log(`Skipping already uploaded file: ${file}`);
        continue;
      }

      const filePath = path.join(docsDirectory, file);
      tf_idf.addDocumentFromPath(filePath);
      uploadedFilesSet.add(file);
      newFiles.push(file);
    }

    if (newFiles.length === 0) {
      return res.json({ message: "No new documents to upload", files: [] });
    }

    console.log("Updated TF-IDF:", JSON.stringify(tf_idf));

    const postIndexResponse = await axios.post(
      "http://13.203.157.202:8080/inverted-index/post-index",
      { index: encrypt(JSON.stringify(tf_idf)) }
    );

    res.json({ message: "Documents uploaded successfully", files: newFiles });
  } catch (err) {
    console.error("Error in upload:", err);
    res.status(500).json({ error: "Failed to process documents", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
