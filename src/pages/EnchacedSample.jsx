import React from "react";
import PreviewBook from "../Components/PreviewBook";
import { BookProvider } from "../context/BookContext";
import EnhanceBook from "./EnhanceBook";

const EnchacedSample = () => {

  return (
    <BookProvider>
      <section className="dashboard-section-ar">

        <div className="dashboard-inner-ar" style={{ display: "flex" }}>
          <EnhanceBook />
        </div>
      </section>
    </BookProvider>
  );
};

export default EnchacedSample;
