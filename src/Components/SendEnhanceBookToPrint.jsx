import React, { useState } from "react";

import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import MyDocumentEnhace from "./MyDocumentEnhace";

const SendEnhanceBookToPrint = () => {
   const [bookData, setbookData] = useState(() => {
      const stored = localStorage.getItem("bookData");
      return stored ? JSON.parse(stored) : null;
    });
    console.log('bookDataOn_SendBookToPrint',bookData);
    
   const [chapterTitles, setchapterTitles] = useState(() => {
      const stored = localStorage.getItem("chapterTitles");
      return stored ? JSON.parse(stored) : null;
    });
    console.log('chapterTitlesOn_SendBookToPrint',chapterTitles);
    
  const [selectedImages, setselectedImages] = useState(localStorage.getItem("image"));

  const handleSendToPrint = async () => {
    try {
      // Generate the PDF blob
    //   const blob = await pdf(<MyDocumentEnhace bookData={bookData} chapterTitles={chapterTitles} />).toBlob();

    //   // Upload the PDF to Cloudinary
    //   const formDataCloudinary = new FormData();
    //   formDataCloudinary.append('file', blob);
    //   formDataCloudinary.append('upload_preset', 'n1qpwtzo'); 
    //   const cloudinaryResponse = await axios.post(
    //     'https://api.cloudinary.com/v1_1/ddaif35tp/upload', 
    //     formDataCloudinary
    //   );
    //   const pdfFileUrl = cloudinaryResponse.data.secure_url; 


    const pdfFileUrl = 'https://res.cloudinary.com/ddaif35tp/image/upload/v1744122784/xqz32fueac2pd18ovwbb.pdf';

      // Send the PDF URL and cover image URL to the backend
      const res = await axios.post(`${baseUrl}/send-to-print`, {
        pdfFileUrl,
        coverImage: selectedImages,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleSendToPrint}>Send Book to Print</button>
    </div>
  );
};

export default SendEnhanceBookToPrint;
