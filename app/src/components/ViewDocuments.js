import React, { useEffect, useState } from 'react';
import '../styles/ViewDocuments.css';

function ViewDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/documents')
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  return (
    <div className="view-documents">
      <h2>View Documents</h2>
      <p>Here you can view all uploaded documents.</p>
      <div className="documents-container">
        {documents.map((doc, index) => (
          <div key={index} className="document-card">
            <h3>{doc.fileName}</h3>
            <pre>{doc.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewDocuments;