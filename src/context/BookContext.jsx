import React, { createContext, useState } from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [generatepdf, setGeneratepdf] = useState(null);

  const setGeneratePdfhandler = (handler) => {
    setGeneratepdf(() => handler);
  };
  return (
    <BookContext.Provider value={{ generatepdf, setGeneratePdfhandler }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
