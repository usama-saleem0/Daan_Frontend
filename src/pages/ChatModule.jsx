import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link, useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../baseUrl";
import UserChat from "../Components/UserChat";

const ChatModule = () => {
  const location = useLocation();
  const { chapterId, questionText, activeIndex } = location.state || {};

  return (
    <>
      <Header />
      <section className="dashboard-section-ar">
        <div className="container-ar">

          <div className="dashboard-inner-ar">
            {
              <UserChat
                chapterId={chapterId}
                questionText={questionText}
                activeIndex={activeIndex}
              />
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatModule;
