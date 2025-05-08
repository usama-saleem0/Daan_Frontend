import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link, useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import UserChat from "../UserChat";
import UserChatWithAi from "./UserChatWithAi";

const Chatwithai = () => {
  const location = useLocation();
  const chapterDetails = location.state;
 const userDetails=JSON.parse(localStorage.getItem("currentuser"))
  console.log("objectw", chapterDetails);
  return (
    <>
      <Header />
      <section className="dashboard-section-ar">
        <div className="container-ar">

          <div className="dashboard-inner-ar">
            {
              <UserChatWithAi
                chapterId={chapterDetails?.chatperId}
                questionText={chapterDetails?.questionText?.question}
                chapterData2={chapterDetails?.chapterData2}
              />
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Chatwithai;
