import React, { useState } from "react";

import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const SendBookToPrint = () => {
  const [groupedData, setgroupedData] = useState(() => {
    const stored = localStorage.getItem("groupedData");
    return stored ? JSON.parse(stored) : null;
  });
  console.log('groupedDataOn_SendBookToPrint',groupedData);
  const [selectedImages, setselectedImages] = useState(localStorage.getItem("image"));
  console.log('selectedImages', selectedImages)
  const handleSendToPrint = async () => {
    try {
      // Generate the PDF blob
      const blob = await pdf(<MyDocument groupedData={groupedData} />).toBlob();

      // Upload the PDF to Cloudinary
      // const formDataCloudinary = new FormData();
      // formDataCloudinary.append('file', blob);
      // formDataCloudinary.append('upload_preset', 'n1qpwtzo'); 
      // const cloudinaryResponse = await axios.post(
      //   'https://api.cloudinary.com/v1_1/ddaif35tp/upload', 
      //   formDataCloudinary
      // );
      // const pdfFileUrl = cloudinaryResponse.data.secure_url; 


    const pdfFileUrl = 'https://res.cloudinary.com/ddaif35tp/image/upload/v1744122784/xqz32fueac2pd18ovwbb.pdf';

      // Send the PDF URL and cover image URL to the backend
      const res = await axios.post(`${baseUrl}/send-to-print`, {
        pdfFileUrl,
        coverImageUrl: selectedImages,
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

export default SendBookToPrint;
