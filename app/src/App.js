import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Document Upload</h1>
      </header>
      <main>
        <FileUpload />
      </main>
    </div>
  );
}

export default App;