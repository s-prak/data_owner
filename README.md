# Data Owner Component - Secure Multi-Keyword Ranked Search System

## Project Overview

This component implements the data owner's side of a secure multi-keyword ranked search system over encrypted cloud data. As the data owner, this system enables you to securely store and manage your documents in the cloud while maintaining complete control over your data's privacy and security. The system handles document encryption, indexing, and secure transmission to the cloud server, ensuring that your sensitive information remains protected even when stored in a third-party cloud environment.

## System Architecture

The data owner component consists of three main parts:

1. **File Upload Server** - Handles document encryption and secure upload to the cloud
2. **TF-IDF Server** - Creates searchable indices for encrypted documents
3. **React Frontend** - Provides an intuitive interface for document management

## Components

### 1. File Upload Server (`file-upload-server.js`)

- **Port**: 5001
- **Functionality**:
  - Handles file uploads from the frontend
  - Encrypts documents using AES encryption
  - Stores documents locally
  - Sends encrypted documents to the cloud server
- **API Endpoints**:
  - `POST /upload` - Upload and encrypt a single file
  - `GET /documents` - Retrieve all uploaded documents

### 2. TF-IDF Server (`tfidf-server.js`)

- **Port**: 5000
- **Functionality**:
  - Creates TF-IDF (Term Frequency-Inverse Document Frequency) models
  - Processes documents for search indexing
  - Sends encrypted indices to the cloud server
- **API Endpoints**:
  - `GET /tfidf` - Get current TF-IDF data
  - `POST /add-document` - Add a new document to the index
  - `POST /upload` - Process and upload all documents

### 3. Encryption Module (`encrypt.js`)

- Uses AES encryption with CBC mode
- Implements secure key management
- Provides encryption functions for both documents and indices

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Starting the Servers

1. Start the TF-IDF Server:

```bash
node tfidf-server.js
```

2. Start the File Upload Server:

```bash
node file-upload-server.js
```

3. Start the React Frontend:

```bash
cd app
npm start
```

## Security Features

- AES-256 encryption for all documents
- Secure key management
- Encrypted search indices
- Secure document transmission
- Privacy-preserving search capabilities

## API Documentation

### File Upload Server

- **Upload Document**

  - Endpoint: `POST http://localhost:5001/upload`
  - Body: Form data with file
  - Response: Success message or error

- **Get Documents**
  - Endpoint: `GET http://localhost:5001/documents`
  - Response: List of all documents

### TF-IDF Server

- **Get TF-IDF Data**

  - Endpoint: `GET http://localhost:5000/tfidf`
  - Response: Current TF-IDF model

- **Add Document**

  - Endpoint: `POST http://localhost:5000/add-document`
  - Body: `{ document: string, docID: string }`
  - Response: Success message

- **Upload Documents**
  - Endpoint: `POST http://localhost:5000/upload`
  - Response: Success message with processed files

## Security Considerations

- All documents are encrypted before being sent to the cloud
- Search indices are encrypted to prevent information leakage
- Secure key management practices are implemented
- Regular security audits are recommended

## Future Enhancements

- Support for more encryption algorithms
- Enhanced search capabilities
- Improved user interface
- Additional security features
- Support for larger document sets
