import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserChat from './UserChat';

const Simple_Story_Reader = ({ chapterId, questionId ,questionText, text }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/chat-module/${questionId}`, {
      state: { questionText: questionText, chapterId: chapterId }
    });
    
  };


  return (
    <section className="Simple_Story_Reader">
      <div className="Simple_Story-main">
      <h1>{questionText || "Every great story starts with a single page."}</h1>
        <h5>{text || "Scroll Down to view Your Stories along with it"}</h5>
        {chapterId &&
        <button onClick={handleEditClick} >Verhaal bewerken</button>
      }
      </div>
    </section>
  )
}

export default Simple_Story_Reader