import React from "react";
import { useRoutes } from "react-router-dom";

import PDFGenerator from "../Components/Createpdf";
import FontCustomizer from "../Components/EditablePage";
import Dashboard from "../pages/Dashboard";
import Chat1 from "../components/Chat1";
import SampleBook from "../pages/SampleBook";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/samplebook",
      element: <SampleBook />,
    },

    {
      path: "/chat",
      element: <Chat1 />,
    },
    {
      path: "/pdf",
      element: <PDFGenerator />,
    },
    {
      path: "/font",
      element: <FontCustomizer />,
    },
  ]);
};

export default Routes;
