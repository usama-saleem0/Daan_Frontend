import React from "react";
import SampleSidebar from "../components/SampleSidebar";
import PreviewBook from "../components/PreviewBook";
import { BookProvider } from "../context/BookContext";

const SampleBook = () => {
  return (
    <BookProvider>
      <section className="dashboard-section-ar">
        <div className="dashboard-inner-ar">
          <SampleSidebar />
          <PreviewBook />
        </div>
      </section>
    </BookProvider>
  );
};

export default SampleBook;
