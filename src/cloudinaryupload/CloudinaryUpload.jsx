export const CloudinaryUpload = async (image) => {
  const uploadPreset = "twjpxlos";

  if (!image) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dcd0ad1pk/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("Upload successful TS:", data.url);
    return data.url;
    // Handle success: data contains information about the uploaded file
  } catch (error) {
    console.error("Error uploading file:", error);
    // Handle error
  }
};
