// import React from 'react';
// import { jsPDF } from 'jspdf';

// const PDFGenerator = () => {
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Add text to the PDF
//     doc.text("Hello, this is your PDF!", 10, 10);

//     // You can add more content, images, tables, etc.
//     doc.text("This is a sample PDF generated using jsPDF in React.", 10, 20);

//     // Save the PDF file
//     doc.save('generated-file.pdf');
//   };

//   return (
//     <div>
//       <h1>Generate PDF Example</h1>
//       <button onClick={generatePDF}>Generate PDF</button>
//     </div>
//   );
// };

// export default PDFGenerator;
// import React from 'react';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

// const PDFGenerator = () => {
//   const generatePDF = async () => {
//     const input = document.getElementById('pdf-content');

//     // Use html2canvas to render the HTML content to a canvas
//     const canvas = await html2canvas(input, {
//       scale: 2, // Increase scale for better quality
//     });

//     const imgData = canvas.toDataURL('image/png'); // Convert canvas to image
//     const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size: 210mm x 297mm

//     const pdfWidth = pdf.internal.pageSize.getWidth(); // Width of PDF page
//     const pdfHeight = pdf.internal.pageSize.getHeight(); // Height of PDF page

//     const canvasWidth = canvas.width;
//     const canvasHeight = canvas.height;

//     // Scale the content to fit within the PDF dimensions
//     const scale = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);

//     // Calculate the centered position
//     const xOffset = (pdfWidth - canvasWidth * scale) / 2;
//     const yOffset = (pdfHeight - canvasHeight * scale) / 2;

//     // Add the image to the PDF
//     pdf.addImage(
//       imgData,
//       'PNG',
//       xOffset, // X position
//       yOffset, // Y position
//       canvasWidth * scale, // Width scaled to fit
//       canvasHeight * scale // Height scaled to fit
//     );

//     // Save the PDF
//     pdf.save('centered-html.pdf');
//   };

//   return (
//     <div>
//       <h1>Generate Centered PDF</h1>
//       <div
//         id="pdf-content"
//         style={{
//           padding: '20px',
//           backgroundColor: '#f0f0f0',
//           textAlign: 'center',
//           width: '400px', // Set a fixed width for the content
//           margin: 'auto', // Center the content on the page
//         }}
//       >
//         <h2>This content will be centered in the PDF</h2>
//         <p>
//           You can add any HTML content here, including images, tables, or
//           formatted text.
//         </p>
//       </div>
//       <button onClick={generatePDF}>Generate PDF</button>
//     </div>
//   );
// };

// export default PDFGenerator;

// import React from 'react';
// import { jsPDF } from 'jspdf';

// const PDFGenerator = () => {
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Set Font Size and Style
//     doc.setFontSize(16); // Font size
//     doc.setFont('helvetica', 'bold'); // Font family and style

//     // Add Text with Color
//     doc.setTextColor(0, 0, 255); // Blue text
//     doc.text('Welcome to Your PDF!', 10, 20); // (text, x, y)

//     // Add Line Breaks (Spacing)
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0); // Black text
//     doc.text('This is an example of a customized PDF.', 10, 30);
//     doc.text('You can modify font size, color, and add spaces.', 10, 40);

//     // Add Extra Space
//     doc.text(' ', 10, 50); // Empty line for space
//     doc.text('Here is some additional text with more spacing.', 10, 60);

//     // Save the PDF
//     doc.save('customized-pdf.pdf');
//   };

//   return (
//     <div>
//       <h1>Generate PDF with Custom Font Styling</h1>
//       <button onClick={generatePDF}>Generate PDF</button>
//     </div>
//   );
// };

// export default PDFGenerator;

import React from "react";
import { jsPDF } from "jspdf";

const PDFWithImage = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Cloudinary Image URL
    const imageUrl =
      "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1727882187/qpnebxehxnpmfuvn1cy4.png";

    try {
      // Fetch the image and convert it to a base64 string
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onload = function () {
        const base64Image = reader.result.split(",")[1]; // Extract base64 part

        // Add Image to PDF
        doc.addImage(base64Image, "JPEG", 10, 20, 100, 100); // (image, format, x, y, width, height)

        // Add Text Content
        doc.setFontSize(14);
        doc.text("Here is a Cloudinary image included in the PDF!", 10, 90);

        // Save the PDF
        doc.save("pdf-with-image.pdf");
      };

      reader.readAsDataURL(blob); // Read the blob as DataURL
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  };

  return (
    <div>
      <h1>
      Genereer PDF met afbeelding en tekst</h1>
      <button onClick={generatePDF}>
      PDF genereren</button>
    </div>
  );
};

export default PDFWithImage;
