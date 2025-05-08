import React, { useEffect, useRef, useState } from "react";
import voice from "../assets/voice.png";
import attach from "../assets/attachfile.png";

import Chapters from "../Chapters";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSend } from "react-icons/bi";

import {
  decrement,
  decrementChapter,
  increment,
  incrementChapter,
  incrementQuestionLimit,
  NavigateQuestionNo,
  resetIncrement,
  resetIncrementNextBtn,
  resetQuestionLimit,
  togglemenu,
} from "../Redux/Features/QuestionsSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { baseUrl, socketurl } from "../baseUrl";
import { UserChapterQuestionChat } from "../Redux/Features/UserSlice";
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import axios from "axios";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

import { Container, Modal } from "react-bootstrap";





const VideoQr = ({ Data }) => {

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(togglemenu());
  };

  const [yes, setyes] = useState(false);

  const socketRef = useRef(null);
  const [user_id, setuserId] = useState("ts111");

  const [Messages, setMessages] = useState([]);
  const [prompt, setprompt] = useState("");
  const [url, setUrl] = useState("https://www.youtube.com/");
  const [videoget, setvideoget] = useState(false);
  const [modalShow, setModalShow] = useState(false);




  const QuestionLimitNumber = useSelector(
    (state) => state.questionCounter.questionLimit
  );

  const QuestionNumber = useSelector((state) => state.questionCounter.value);

  const ChapterNumber = useSelector(
    (state) => state.questionCounter.changeChapter
  );
  const [questionChapterId, setquestionChapterId] = useState(
    `C${ChapterNumber}Q${QuestionNumber}`
  );

  useEffect(() => {
    socketRef.current = io(socketurl);

    socketRef.current.on("get_previous_messages", (previous_messages) => {
      // setMessages((prevmessages)=>[...prevmessages,incomingmessage])

      // console.log("previousmessages",previous_messages)

      setMessages(previous_messages);
      // console.log(previous_messages,Messages)
    });

    socketRef.current.on("chat_message", (incomingmessage) => {
      setMessages((previous_messages) => [
        ...previous_messages,
        incomingmessage,
      ]);
    });

    socketRef.current.on("save_question_answer", (incomingmessage) => {
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
      setMessages(incomingmessage);
      console.log(incomingmessage, "REEPONSE SAVE NORMAL QUESTION", Messages);
    });

    socketRef.current.on("save_gpt_answer", (incomingmessage) => {
      setMessages(incomingmessage);
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
      console.log(incomingmessage, "REEPONSE SAVE GPT", Messages);
    });


    socketRef.current.on("save_gpt_answerimg", (incomingmessage) => {
      setMessages(incomingmessage);
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
      console.log(incomingmessage, "REEPONSE SAVE GPT", Messages);
    });

    // socketRef.current.on('save_question_answer',(incomingmessage)=>{

    //    setyes(!yes)

    // })

    // socketRef.current.on('save_gpt_answer',(incomingmessage)=>{

    //   setyes(!yes)

    // })

    return () => {
      socketRef.current.off("chat_message");
      socketRef.current?.off("previous_messages");
      socketRef.current?.off("save_gpt_answer");
      socketRef.current?.off("save_gpt_answerimg");

      socketRef.current?.off("save_question_answer");
      socketRef?.current.disconnect();
    };
  }, []);





  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    // setuserId('674780aab89e88c59257488d');
    if (user_id && questionChapterId) {
      console.log(questionChapterId, user_id, "TS111");
      socketRef.current.emit("get_previous_messages", {
        user_id,
        questionChapterId,
      });

      
    }
  }, [user_id, questionChapterId]);



  const submitHandleIncrement = () => {
    setyes(!yes);

    dispatch(increment());

    setquestionChapterId(`C${ChapterNumber}Q${QuestionNumber + 1}`);

    if (QuestionNumber == 9) {
      dispatch(incrementChapter());
      dispatch(resetIncrementNextBtn());
    }
  };

  const submitHandleDecrement = () => {
    setyes(!yes);
    dispatch(decrement());

    setquestionChapterId(`C${ChapterNumber}Q${QuestionNumber - 1}`);
    console.log(QuestionNumber, "QNO");
    if (QuestionNumber == 0) {
      console.log("Here");
      dispatch(decrementChapter());
      // dispatch(resetIncrement())
    }
  };

  const handleSubmitViewQuestionNo = (no) => {
    console.log(no);

    dispatch(NavigateQuestionNo(no));
  };

  const sendMessage = () => {
    console.log(prompt, "PROMPT");
    const Message = {
      user_id,
      gpt_id,
      message: prompt,
    };

    // if(prompt.length>0)
    // {
    socketRef.current.emit("chat_message", Message);
    setprompt("");

    // }
    // else{
    //     alert('Please Enter Input')
    // }
  };



  async function getImageFileObject(imageFile) {
    const file = imageFile.file;

    if (file instanceof Blob || file instanceof File) {

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


        handleSendMessageImg(data.url)

      } catch (error) {
        console.error('Upload failed:', error);
      }
    } else {
      console.error("Invalid image file object");
    }

    console.log({ imageFile });
  }



  const handleSendMessage = () => {
    console.log(
      Data.Questions[QuestionNumber],
      "SEND MESSAGE CONSOLE",
      prompt,
      ChapterNumber
    );

    const Message = {
      userId: "ts111",
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: prompt,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: prompt,
      LimitNo: QuestionLimitNumber,
    };

    socketRef.current.emit("save_question_answer", Message);
    setprompt("");
    dispatch(incrementQuestionLimit());

    if (QuestionLimitNumber > 4) {
      dispatch(resetQuestionLimit());
    }
  };



  const handleSendMessageImg = (url) => {
    console.log(
      Data.Questions[QuestionNumber],
      "SEND MESSAGE CONSOLESSS",
      url,
      ChapterNumber
    );

    const userId = localStorage.getItem("userId");

    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: url,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: url,
      LimitNo: QuestionLimitNumber,
    };


    console.log('message: ' , Message)

    socketRef.current.emit("save_gpt_answerimg", Message);
    setprompt("");
    setModalShow(false)
   
  };

  const handleSendGptMessage = () => {
    console.log(
      Data.Questions[QuestionNumber],
      "SEND MESSAGE CONSOLE",
      prompt,
      ChapterNumber
    );
    const userId = localStorage.getItem("userId");

    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: prompt,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: prompt,
      LimitNo: QuestionLimitNumber,
    };

    if (socketRef.current) {
      socketRef.current.emit("save_gpt_answer", Message);
      setprompt("");
      dispatch(incrementQuestionLimit());

      if (QuestionLimitNumber > 4) {
        dispatch(resetQuestionLimit());
      }
    }
  };




  async function handleFileChange(e) {

    console.log('File changed')
    const file = e.target.files[0];

    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert("File size exceeds 100MB limit.");
        return;
      }
      const uploadPreset = "tixx1a8u";
      const formData = new FormData();
      formData.append('pdf', file);


      try {
        const response = await axios.post(`${baseUrl}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // console.log(response.data)
      


        
        const urlshow = `${baseUrl}/storage/${response.data.data}`

        console.log(urlshow)
        setUrl(urlshow)

        setvideoget(true)
        setModalShow(true)
        
        // setUploadStatus(`Upload successful: ${response.data.url}`);
      } catch (error) {
        // setUploadStatus('Upload failed');
      }


    }
  }

  const qrRef = useRef(null);
    const uploadPreset = "tixx1a8u"; // Your Cloudinary upload preset

    // const url = "https://example.com"; 




    const saveQRCode = async () => {

      const container = qrRef.current;
      if (container) {
        try {
  
       
          // Capture the content of the container as a canvas
          const canvas = await html2canvas(container, {
            backgroundColor: null, // Ensure the background is captured properly
            useCORS: true, // Ensure cross-origin images are captured
            scale: 2 // Increase scale for higher quality
          });
  
  
          // Convert canvas to data URL in JPEG format
          const dataUrl = canvas.toDataURL('image/jpeg');
  
          // Create a temporary link element
          const link = document.createElement('a');
          link.href = dataUrl;

          // link.download = 'qrcode-container.jpg';
  
          // Append link to the body, click it, and remove it
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
  
  
  
          const uploadPreset = "tixx1a8u"
  
  
          const formData = new FormData();
          formData.append('file', dataUrl);
          formData.append('upload_preset', uploadPreset);
  
          try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/degjqq6vo/upload`, {
              method: 'POST',
              body: formData,
            });
            const data = await response.json();
            console.log('Upload successful TS:', data.url);
            handleSendMessageImg(data.url)
           
  
            // Handle success: data contains information about the uploaded file
          } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error
          }
  
  
  
        } catch (error) {
          console.error('Error capturing the div:', error);
        }
      } else {
        console.error('QR code container not found.');
      }
  
  
  
    };




  const getQRCodeBlob = () => {
    return new Promise((resolve, reject) => {
        try {
            const canvas = qrRef.current.querySelector('canvas');

            console.log('canvas' , canvas);
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Failed to convert canvas to blob."));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const uploadQRCodeToCloudinary = async () => {
    try {
        const blob = await getQRCodeBlob();
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/degjqq6vo/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('QR Code uploaded successfully:', data.url);

        // Handle further actions, e.g., save URL or display a success message
    } catch (error) {
        console.error('Failed to upload QR Code:', error);
    }
};


  return (
    <div  className="more-no-with" >
     


<Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          
Voeg QRcode toe aan Story
          </Modal.Title>
          </Modal.Header>

          <Container>

          {
        videoget &&
     

        <div>
     
     
        <div ref={qrRef} style={{width:'200px' , height:'200px' , margin:'auto'}}>
  
        <QRCode value={url} size={200} level="L" />
        </div>

        <div>
          <span>
          controleer je qr voordat je deze aan je verhaal toevoegt
          </span>
        </div>
  
        <button className="chat-blow-btn-ar" style={{position:'relative'}} onClick={saveQRCode}>Send
  
        </button>
              </div>

      }




          </Container>



          </Modal>

    
        
          <button className="chat-blow-btn-ar" style={{position:'relative'}}>Video uploaden

          <input
                                          type="file"
                                          accept="video/*"
                                          onChange={(e) => handleFileChange(e)}
                                          style={{ marginTop: '10px', opacity: '0', position: 'absolute', width: '100%', bottom: '5px', left: '0%' }}
                                        />


          </button>


         
       
        
    </div>
  );
};

export default VideoQr;
