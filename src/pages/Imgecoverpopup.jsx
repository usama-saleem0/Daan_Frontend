import React, { useEffect, useState } from "react";
import book from "../assets/book.png";
import { useDispatch } from "react-redux";
import { changeStatus } from "../Redux/Features/QuestionsSlice";
import { toast, ToastContainer } from "react-toastify";

const Imgecoverpopup = ({ onValue }) => {
  const [imagePreview, setImagePreview] = useState(localStorage.getItem("image"));
  const [coverimage, setCoverimgurl] = useState(null);
  const [title, settitle] = useState('');
  const [author, setauthor] = useState('');


  const dispatch = useDispatch();


  useEffect(() => {
    const imageurl = localStorage.getItem("image");
    if (imageurl) {
      // setImagePreview(imageurl);
    }
  });

  const handleImageChange = (e) => {

    console.log("Image changed")
    const file = e.target.files[0];
    if (file) {

      setCoverimgurl(e)
      setImagePreview(URL.createObjectURL(file));

      getImageFileObject(file)
    }
  };



  async function getImageFileObject(imageFile) {

    console.log('getImageFileObject', coverimage)
    const file = imageFile;

    // if (file instanceof Blob || file instanceof File) {

    const uploadPreset = "tixx1a8u"


    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);


      const response = await fetch(`https://api.cloudinary.com/v1_1/degjqq6vo/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload successful:', data.url);

      // setprompt(data.url)


      setImagePreview(data.url)

      dispatch(changeStatus());
      localStorage.setItem("image", data.url);

    } catch (error) {
      console.error('Upload failed:', error);
    }
    // } else {
    //   console.error("Invalid image file object");
    // }

    console.log({ imagePreview });
  }

  const save = (e) => {


    const data = {
      title: title,
      author: author,
      cover_image: imagePreview
    }

    onValue(data)

    // localStorage.setItem("datas", data);

    toast.success('Cover Selected')

  }

  return (
    <>

      {/* <ToastContainer /> */}
      <section className="AddNew-Family-popup">
        <div className="AddNew-Family-popup-main">
          <h2>Pas uw afbeelding en tekst aan</h2>
          <p>Personaliseer je omslag met je eigen tekst & afbeelding</p>

          <div className="AddNew-Family-popup-form">
            <div className="AddNew-Family-popup-group">
              <label htmlFor="title">Titel</label>
              <input type="text" placeholder="" name="title" value={title} onChange={(e) => settitle(e.target.value)} />
            </div>

            <div className="AddNew-Family-popup-group">
              <label htmlFor="author">Auteur</label>
              <input type="text" placeholder="" name="title" value={author} onChange={(e) => setauthor(e.target.value)} />
            </div>

            <div className="AddNew-Family-popup-group ">
              <label htmlFor="image">
                Afbeelding</label>
              <div className="one-box-Image-box">
                <div className="drop-select-box">
                  <input
                    type="file"
                    id="image"

                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <svg id="Layer_1" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m252.039 173.791a41.794 41.794 0 1 1 41.804-41.791 41.84 41.84 0 0 1 -41.8 41.794zm52.327-41.791a52.327 52.327 0 1 0 -52.327 52.327 52.385 52.385 0 0 0 52.327-52.327zm77.32 246.963a5.264 5.264 0 1 0 7.444 7.444l26.792-26.785v75.348a5.269 5.269 0 0 0 10.538 0v-75.35l26.787 26.78a5.269 5.269 0 1 0 7.459-7.444l-35.786-35.782a5.271 5.271 0 0 0 -7.459 0l-35.775 35.786zm-122.5-135.152 127.525-91.936a5.286 5.286 0 0 1 6.811.556l54.049 54.043v-123.558a52.657 52.657 0 0 0 -52.6-52.6h-342.371a52.656 52.656 0 0 0 -52.6 52.6v172.012l121.559-102.8a5.279 5.279 0 0 1 6.428-.3l131.2 91.977zm61.414 134.906a101.3 101.3 0 0 1 79.18-86.81 102.1 102.1 0 0 1 43.933.281l3.859.875v-71.688l-58.329-58.34-120.924 87.17 37.965 26.613a5.264 5.264 0 0 1 -3.022 9.579 5.223 5.223 0 0 1 -3.022-.953l-174.983-122.657-125.257 105.931v117.988a52.664 52.664 0 0 0 52.6 52.609h279.4l-2.185-4.533a100.691 100.691 0 0 1 -9.212-56.065zm44.6-59.251a91 91 0 1 1 -34.131 60.527 90.147 90.147 0 0 1 34.131-60.527z" fill-rule="evenodd" /></svg>
                </div>

                {imagePreview && (
                  <div className="image-preview">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: "150px", marginTop: "10px" }}
                    />
                  </div>
                )}
              </div>


            </div>

            <div className="more-change-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="17"
                viewBox="0 0 14 17"
                fill="none"
              >
                <path
                  d="M12.3628 4.6362C12.1579 4.6362 11.9613 4.71761 11.8164 4.86252C11.6715 5.00742 11.5901 5.20396 11.5901 5.40889V14.056C11.5679 14.4468 11.3923 14.8129 11.1014 15.0747C10.8105 15.3365 10.4279 15.4728 10.037 15.4538H3.87094C3.48003 15.4728 3.09747 15.3365 2.80657 15.0747C2.51567 14.8129 2.34 14.4468 2.31784 14.056V5.40889C2.31784 5.20396 2.23643 5.00742 2.09152 4.86252C1.94661 4.71761 1.75008 4.6362 1.54515 4.6362C1.34022 4.6362 1.14368 4.71761 0.998776 4.86252C0.853869 5.00742 0.772461 5.20396 0.772461 5.40889V14.056C0.794517 14.8567 1.13298 15.616 1.71373 16.1677C2.29448 16.7193 3.07018 17.0183 3.87094 16.9992H10.037C10.8377 17.0183 11.6134 16.7193 12.1942 16.1677C12.7749 15.616 13.1134 14.8567 13.1355 14.056V5.40889C13.1355 5.20396 13.0541 5.00742 12.9092 4.86252C12.7642 4.71761 12.5677 4.6362 12.3628 4.6362Z"
                  fill="black"
                />
                <path
                  d="M13.1357 2.31806H10.0449V0.772688C10.0449 0.567758 9.96354 0.371222 9.81863 0.226315C9.67372 0.0814079 9.47719 0 9.27226 0H4.63613C4.4312 0 4.23466 0.0814079 4.08976 0.226315C3.94485 0.371222 3.86344 0.567758 3.86344 0.772688V2.31806H0.772688C0.567758 2.31806 0.371222 2.39947 0.226315 2.54438C0.0814079 2.68929 0 2.88582 0 3.09075C0 3.29568 0.0814079 3.49222 0.226315 3.63713C0.371222 3.78203 0.567758 3.86344 0.772688 3.86344H13.1357C13.3406 3.86344 13.5372 3.78203 13.6821 3.63713C13.827 3.49222 13.9084 3.29568 13.9084 3.09075C13.9084 2.88582 13.827 2.68929 13.6821 2.54438C13.5372 2.39947 13.3406 2.31806 13.1357 2.31806ZM5.40882 2.31806V1.54538H8.49957V2.31806H5.40882Z"
                  fill="black"
                />
              </svg>
              <p>Verander de foto</p>
            </div>

            <div className="My-profile-form-btn-box">
              <button onClick={save}>Redden</button>
              <button className="Change">Annuleren</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Imgecoverpopup;
