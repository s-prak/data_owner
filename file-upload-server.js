const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS
app.use(cors());

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = '/Users/sprak/Documents/sem8/ps2/final/docs';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Init upload
const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('File uploaded successfully');
});

// Get all documents endpoint
app.get('/documents', (req, res) => {
  const uploadPath = '/Users/sprak/Documents/sem8/ps2/final/docs';
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files');
    }
    const documents = files.map(file => {
      const filePath = path.join(uploadPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      return { fileName: file, content: content };
    });
    res.status(200).json(documents);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});