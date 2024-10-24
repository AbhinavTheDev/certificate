import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CertificateForm from './components/Form';
import CertificateDisplay from './components/DisplayCertificate';

function App() {
  const [certificateData, setCertificateData] = useState(null);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<CertificateForm setCertificateData={setCertificateData} />} />
          <Route path="/certificate" element={<CertificateDisplay certificateData={certificateData} />} />
        </Routes>
      </Router>
  );
}

export default App;
