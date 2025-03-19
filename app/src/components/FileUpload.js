import React, { useState } from 'react';
import axios from 'axios';
//import uploadToCloud from "./UploadCloud";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          setUploadStatus('File uploaded successfully!');
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
    //setIsLoading(true);
    setUploadStatus('⏳ Uploading documents to cloud...');

    try {
      const uploadResponse = await axios.post('http://localhost:5000/upload');
      console.log(uploadResponse);

      if (uploadResponse.status === 200) {
        setUploadStatus('✅ Documents uploaded to cloud and indexed successfully!');
      } else {
        setUploadStatus('❌ Failed to upload documents to cloud.');
      }
    } catch (error) {
      console.log(error);
      setUploadStatus(`❌ Error: ${error.message}`);
    } finally {
      //setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput">Upload a document:</label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      <button onClick={handleUploadToCloud}>Upload to cloud</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;