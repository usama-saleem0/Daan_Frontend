import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";
import Chat1 from "../Components/Chat1";
import Chapters from "../Chapters";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [first, setfirst] = useState("");

  const Data = Chapters;

  const ChapterNumber = useSelector(
    (state) => state.questionCounter.changeChapter
  );

  const chapterKey = `Chapter${ChapterNumber}`;

  console.log(Data, "CHAp");
  return (
    <>
      <Header />
      <section className="dashboard-section-ar">
        <div className="container-ar">
          {" "}
          
        
          <div className="dashboard-inner-ar">
            <Chat1 Data={Data?.[chapterKey]} />


          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
