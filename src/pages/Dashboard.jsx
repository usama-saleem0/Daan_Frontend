import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Chat1 from "../components/Chat1";
import Chapters from "../Chapters";

const Dashboard = () => {
  const [first, setfirst] = useState("");

  const Data= Chapters

console.log(Data,"CHAp")
  return (
    <section className="dashboard-section-ar">
      <div className="dashboard-inner-ar">
        <Sidebar Questions={Data}/>
        <Chat1  Data={Data?.Chapter1}/>
      </div>
    </section>
  );
};

export default Dashboard;
