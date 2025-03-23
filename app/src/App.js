import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import ViewDocuments from './components/ViewDocuments';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Document Management</h1>
          <nav>
            <ul>
              <li><Link to="/">Upload Document</Link></li>
              <li><Link to="/view-documents">View Documents</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<FileUpload />} />
            <Route path="/view-documents" element={<ViewDocuments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;