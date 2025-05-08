import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

const Bookcomponets = ({ Heading, tital, img, Qrheading, qrtitel, barimg, Handnote, inputCount = 7 }) => {
    return (
        <div className="Voorbeeldboek-main-box">
            <div className="Voorbeeldboek-box">
                <h2>{Heading}</h2>
                <p>{tital}</p>
            </div>

            <div className="Voorbeeldboek-box">
                <img src={img} alt="" />
            </div>

            <div className="Voorbeeldboek-box">
                <h2>{Qrheading}</h2>
                <p>{qrtitel}</p>
                <div className="Voorbeeldboek-barcode-img">
                <QRCodeCanvas value="https://reactjs.org/" size={150} />
                </div>
            </div>

            <div className="Voorbeeldboek-box">
                <h2>{Handnote}</h2>

                {/* Dynamically generating input fields */}
                <div className="Voorbeeldboek-input-group">
                    {[...Array(inputCount)].map((_, index) => (
                        <input key={index} type="text" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bookcomponets;
