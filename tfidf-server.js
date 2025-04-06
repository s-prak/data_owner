const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const TfIdf = require("tf-idf-search");
const axios= require('axios');
const { encrypt } = require("./encrypt"); 

const app = express();
const port = 5000;

// ✅ Allow requests from frontend (localhost:3001)
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

const tf_idf = new TfIdf();
const docsDirectory = "/Users/sprak/Documents/sem8/ps2/final/docs";

// API Endpoint to Get TF-IDF Data
app.get("/tfidf", (req, res) => {
  res.json(tf_idf);
});

// API Endpoint to Add a Document
app.post("/add-document", (req, res) => {
  const { document, docID } = req.body;

  if (!document || !docID) {
    return res.status(400).json({ error: "Both 'document' and 'docID' are required" });
  }

  tf_idf.addDocumentFromString(document);

  console.log("Document added successfully");

  res.json({ message: "Document added successfully", docID, document });
});

// API Endpoint to Upload and Process Documents from Directory
app.post("/upload", async (req, res) => {  // <-- Make this async
  try {
    const files = fs.readdirSync(docsDirectory);
    
    files.forEach((file) => {
      const filePath = path.join(docsDirectory, file);
      tf_idf.addDocumentFromPath(filePath);
      //console.log(`Added document: ${filePath}`);
    });

    console.log(JSON.stringify(tf_idf));
    
    // ✅ Now `await` works because this function is async
    const postIndexResponse = await axios.post(
      "http://65.0.131.153:8080/inverted-index/post-index",
      { index: encrypt(JSON.stringify(tf_idf)) }
    );


    res.json({ message: "Documents uploaded successfully", files });
  } catch (err) {
    console.error("Error in upload:", err);
    res.status(500).json({ error: "Failed to process documents", details: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
