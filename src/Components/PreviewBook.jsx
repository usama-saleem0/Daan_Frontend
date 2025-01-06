import html2pdf from "html2pdf.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BookContext } from "../context/BookContext";
import { useSelector } from "react-redux";

const PreviewBook = () => {
  const pdfdata = useRef(null);
  const { setGeneratePdfhandler } = useContext(BookContext);
  const [coverimgurl, setCoverimgurl] = useState(null);

  const status = useSelector((state) => state.questionCounter.uploadStatus);

  useEffect(() => {
    const imageurl = localStorage.getItem("image");
    if (imageurl) {
      setCoverimgurl(imageurl);
    }
    const generatepdf = () => {
      const options = {
        margin: [12, 10, 12, 10],
        filename: "centered-book.pdf",
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(options).from(pdfdata.current).save();
    };

    setGeneratePdfhandler(generatepdf);
  }, [status]);

  return (
    <div className="rightbar-ar">
      <div className="preview-book-div-ar">
        <h6>Preview Book</h6>
        <div className="preview-book-detail-ar">
          <div className="book-detail-div-ar">
            {/* Content to be included in the PDF */}
            <div ref={pdfdata}>
              {coverimgurl && (
                <div
                  className="cover-img-div"
                  style={{
                    width: "100%",
                    height: "272mm", // Set container height for PDF
                    overflow: "hidden", // Prevents overflow
                  }}
                >
                  <img
                    src={coverimgurl}
                    style={{
                      width: "100%",
                      height: "272mm", // Ensures the image fills the wrapper's height
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </div>
              )}

              <h1 style={{ textAlign: "center", paddingBottom: "20px" }}>
                Life story of Piet
              </h1>
              <div className="book-content-ar">
                <p>
                  It is important to take care of the patient, to be followed by
                  the patient, but it will happen at such a time that there is a
                  lot of work and pain. For to come to the smallest detail, no
                  one should practice any kind of work unless he denives some
                  benefit from it. Do not be angry with the pain in the
                  reprimand in the pleasure he wants to be a hair from the pain
                  in the hope that there is no breeding. Unless they are blinded
                  by lust, they do not come forth, they are in fault who abandon
                  their duties and soften their hearts, that is, their labors
                </p>
                <p>
                  It is important to take care of the patient, to be followed by
                  the patient, but it will happen at such a time that there is a
                  lot of work and pain. For to come to the smallest detail, no
                  one should practice any kind of work unless he denives some
                  benefit from it. Do not be angry with the pain in the
                  reprimand in the pleasure he wants to be a hair from the pain
                  in the hope that there is no breeding. Unless they are blinded
                  by lust, they do not come forth, they are in fault who abandon
                  their duties and soften their hearts, that is, their labors
                </p>
              </div>
            </div>
            <button className="visual-btn-ar">VISUAL</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewBook;
