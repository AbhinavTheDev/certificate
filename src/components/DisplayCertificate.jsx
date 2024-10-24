import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function CertificateDisplay({ certificateData }) {
  const navigate = useNavigate();
  const certificateRef = useRef();

  useEffect(() => {
    // Check if form data exists
    if (!certificateData) {
      // If data is missing, redirect to the form page
      alert('No certificate data found. Please fill the form again.');
      navigate('/');
    }
  }, [navigate]);

  const handleDownloadPDF = () => {
    const targetWidth = 625;  // Target width of image in px
    const targetHeight = 443; // Target height of image in px
    
    // Use landscape orientation dimensions (A4 size in landscape)
    const pdfWidth = 297;  // A4 width in landscape (mm)
    const pdfHeight = 210; // A4 height in landscape (mm)
  
    // Calculate aspect ratio of the image
    const aspectRatio = targetWidth / targetHeight;
  
    // Convert pixel size to PDF units (1px = 0.264583 mm)
    const imageWidthInMm = targetWidth * 0.264583; 
    const imageHeightInMm = (targetHeight * 0.264583) + 90;
  
    // Max dimensions for the PDF page
    const maxPdfWidth = pdfWidth;  // Full width of the page
    const maxPdfHeight = pdfHeight;  // Full height of the page
  
    // Scale to fit the entire page, keeping aspect ratio
    let finalWidth = imageWidthInMm;
    let finalHeight = imageHeightInMm;
  
    if (finalWidth > maxPdfWidth) {
      finalWidth = maxPdfWidth;
      finalHeight = maxPdfWidth / aspectRatio;
    }
  
    if (finalHeight > maxPdfHeight) {
      finalHeight = maxPdfHeight;
      finalWidth = maxPdfHeight * aspectRatio;
    }
  
    // Ensure the image covers as much of the page as possible
    finalWidth = pdfWidth;
    finalHeight = pdfHeight;
  
    html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');  // Landscape orientation
  
      // Center the image on the PDF page
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
  
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      pdf.save('certificate.pdf');
    });
  };
  
  

  if (!certificateData) return null;
  
  const handleEditData = () => {
    navigate('/');
  };

  return (
    <Container >
    <Container style={{ marginTop: '20px', width: '100%' , display: 'flex', justifyContent: 'center', }}>
      <Card ref={certificateRef} style={{ position: 'relative', textAlign: 'center', width: '58%', padding: 0, }}>
        {/* Certificate Background Image */}
        <img
          src="/Tublian.png"
          alt="Certificate Template"
          style={{ width: '625px', height: '443px' }}
        />
        {/* Certificate Data Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {/* Adjust the 'top' and 'left' values to position the text correctly on the certificate */}
          <Typography
            variant="h5"
            style={{
              position: 'absolute',
              top: '190px',  // Adjust these values to align with your template
              left: '50%', // Adjust these values to align with your template
              transform: 'translateX(-50%)', // Center horizontally
              fontWeight: 'bold',
            }}
          >
            {certificateData.name}
          </Typography>
          <Typography
            variant="body1"
            style={{
              position: 'absolute',
              top: '225px',
              left: '50px',
              right: '60px',
              // width: '50%',
              fontSize: '14px',
              fontWeight: '300',
              width: 'auto', // Adjust width according to left and right padding
              textAlign: 'left',
              fontFamily: 'arial'
            }}
          >
            {certificateData.description}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              position: 'absolute',
              top: '380px',
              left: '516px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {certificateData.certificateID}
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              position: 'absolute',
              top: '395px',
              left: '516px',
              fontWeight: 'bold',
              fontSize: '12px',
            }}
          >
            {certificateData.date}
          </Typography>
        </div>
      </Card>
      </Container>
      {/* Download PDF Button */}
      <Container style={{ marginTop: '20px', width: '100%' , display: 'flex', justifyContent: 'center', }}>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px',marginBottom: '20px' }}
        onClick={handleDownloadPDF}
      >
        Download PDF
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleEditData}
        style={{ marginTop: '20px',marginBottom: '20px',marginLeft: '20px' }}
      >
        Edit
      </Button>
      </Container>
    </Container>
  );
}

export default CertificateDisplay;
