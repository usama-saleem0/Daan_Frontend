import { useState, useEffect } from "react";

const useFormPersistence = (key) => {
  const [formData, setFormData] = useState(() => {
    // Retrieve saved data from localStorage, or initialize with an empty object
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : {};
  });

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(formData));
  }, [key, formData]);

  // Function to update formData
  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return { formData, updateFormData };
};

export default useFormPersistence;
