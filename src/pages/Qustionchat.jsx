import React, { useState } from "react";


const Qustionchat = () => {

  return (
    <>
      <section className="Qustionchat-sec">
        <div className="container-ar">
          <div className="main-Qustionchat">
            <div className="Qustionchat-heading">
              <h2>De Wereld Buiten de Klas</h2>
            </div>

            <div className="Qustionchat-main-chat-box">
              <div className="Qustionchat-input">
                <textarea name="" id="" placeholder="Write your story here...">

                </textarea>
                <div className="Qustionchat-edit-text-box">
                  <button className="Edit-text">Edit text</button>
                  <button className="chat-icon"></button>
                  <button className="chat-icon"></button>
                </div>


                <div className="Qustionchat-btn-box">
                  <button>Add Image</button>
                  <button>Add text</button>
                  <button>Add text by voice</button>
                  <button>Spell Checker</button>
                </div>

              </div>  
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Qustionchat;
