import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FileUpload.css';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          setUploadStatus('File uploaded successfully!');
          setUploadedDocuments([...uploadedDocuments, selectedFile.name]);
        } else {
          setUploadStatus(`Failed to upload file: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus(`Error uploading file: ${error.message}`);
      }
    } else {
      setUploadStatus('Please select a file first.');
    }
  };

  const handleUploadToCloud = async () => {
    setUploadStatus('⏳ Uploading documents to cloud...');
    try {
      const uploadResponse = await axios.post('http://localhost:5000/upload');
      console.log(uploadResponse);
      if (uploadResponse.status === 200) {
        setUploadStatus('✅ Documents uploaded to cloud and indexed successfully!');
        setUploadedDocuments([]);
      } else {
        setUploadStatus('❌ Failed to upload documents to cloud.');
      }
    } catch (error) {
      console.log(error);
      setUploadStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="file-upload-container">
      <div className="upload-section">
        <h2 className="upload-title">Upload Document</h2>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-input-container">
            <label htmlFor="fileInput" className="file-input-label">Choose Document:</label>
            <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} />
          </div>
          <button type="submit" className="upload-button">Upload</button>
        </form>
        <button onClick={handleUploadToCloud} className="cloud-upload-button">Upload to cloud</button>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
      <div className="uploaded-documents">
        {uploadedDocuments.map((doc, index) => (
          <div key={index} className="document-card">
            <h3>{doc}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;