import React from "react";
import PreviewBook from "../Components/PreviewBook";
import { BookProvider } from "../context/BookContext";

const SampleBook = () => {

  return (
    <BookProvider>
      <section className="dashboard-section-ar">

        <div className="dashboard-inner-ar" style={{ display: "flex" }}>
          <PreviewBook />
        </div>
      </section>
    </BookProvider>
  );
};

export default SampleBook;
