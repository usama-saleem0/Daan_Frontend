import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NavigateQuestionNo,
  setChangeChapter,
  setGiveAnswer,
} from "../Redux/Features/QuestionsSlice";
import {
  addQuestionsToChapter,
  getUserChapter,
  getUserChapterbyid,
} from "../Redux/Features/UserSlice";
import { Button, Modal } from "react-bootstrap";
import book from "../assets/book.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import Header from "./Header";
// import Header from "./Header";

const Chaptersfuture = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [chaptersdata, setChaptersdata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("chaptersdata",chaptersdata);
  const chapters = [
    { num: "01", values: 1 },
    { num: "02", values: 2 },
    { num: "03", values: 3 },
    { num: "04", values: 4 },
    { num: "05", values: 5 },
    { num: "06", values: 6 },
    { num: "07", values: 7 },
    { num: "08", values: 8 },
    { num: "09", values: 9 },
    { num: "10", values: 10 },
  ];

  useEffect(() => {
    handleSubmit();
  }, []);

  const toggleExpand = (index) => {
    const isClosing = activeIndex === index;

    // if (isClosing) {
    //   toast.info("Dropdown closed");
    // } else {
    //   toast.success("Dropdown opened");
    // }
    setActiveIndex(isClosing ? null : index);

    // setTimeout(() => {
    // }, 1000); // 2-second delay
  };

  const setChapters = (chapters) => {
    console.log("chapters",chapters);
    dispatch(setChangeChapter(chapters));
    dispatch(setGiveAnswer(true));
    navigate("/chat");
  };

  const handleSubmitViewQuestionNo = (no, yes) => {
    console.log(no);

    dispatch(NavigateQuestionNo(no));

    setChapters(yes);
  };

  const handleSubmit = async (e) => {
    const user_id = localStorage.getItem("userId");
    // const result = await dispatch(getUserChapter(user_id));
    const result = await dispatch(getUserChapterbyid(user_id));


    setChaptersdata(result.payload.chapters?.staticquestions)
    console.log(result.payload.chapters?.staticquestions, "Uk");
  };

  const handleClose = () => setModalShow(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmitAddQuestion = async () => {
    const user_id = localStorage.getItem("userId");
    const selectedChapter = chaptersdata[activeIndex]?.chapter;

    // Validate if the chapter exists
    if (!selectedChapter) {
      toast.error(' Selecteer een hoofdstuk om vragen toe te voegen.');
      return;
    }

    try {
      await dispatch(
        addQuestionsToChapter({
          userId: user_id,
          chapter: selectedChapter,
          newQuestion,
        })
      );
      toast.success(" Vraag is succesvol toegevoegd");

      setQuestions([]);
      setNewQuestion("");
      setModalShow(false); // Close the modal

      await handleSubmit();
    } catch (error) {
      console.error('Fout bij het toevoegen van vragen:', error);
      toast.error('Het is niet gelukt om vragen toe te voegen');
    }
  };

  const [editedQuestion, setEditedQuestion] = useState("");
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  const handleEditQuestion = (questionIndex, chapterIndex) => {
    // console.log('hey');
    setCurrentChapter(chapterIndex);
    setCurrentIndex(questionIndex);
    setEditedQuestion(chaptersdata[activeIndex]?.questions[questionIndex]);
    setModalShowEdit(true);
    // setModalShow(true)
  };

  const handleCloseEdit = () => setModalShowEdit(false);

  const handleSaveChanges = async () => {
    console.log("Save changes", currentChapter);
    if (currentIndex !== null && currentChapter !== null) {
      // Create a deep copy of chaptersdata to avoid directly mutating state
      const updatedChapters = [...chaptersdata]; // Shallow copy of the chapters
      updatedChapters[currentChapter] = {
        ...updatedChapters[currentChapter], // Copy the specific chapter
        questions: [...updatedChapters[currentChapter].questions], // Copy the questions array
      };

      // Update the specific question in the copied data
      updatedChapters[currentChapter].questions[currentIndex] = editedQuestion;

      // Update the state
      setChaptersdata(updatedChapters);

      try {
        const response = await axios.put(`${baseUrl}/EditQuestions`, {
          chapter: updatedChapters[currentChapter].chapter,
          question: editedQuestion,
          index: currentIndex,
        });

        setTimeout(() => {
          toast.success("Succesvol bijgewerkt");

          handleCloseEdit(); // Close the modal

        }, 1000);
      } catch (error) {
        console.error("Fout bij updaten van vraag:", error);
      }
    } else {
      console.error("Huidige index of hoofdstuk ontbreekt.");
    }
  };



  const [activeComponent, setActiveComponent] = useState("questionOfWeek");
  

  const handleHeadingClick = (component) => {
    setActiveComponent(component);
  };

  return (
<>

<Header />
      <section className="futurebook-section-ar">
        <div className="container-ar">
          <div className="main-future-book-ar">
            {/* <div className="book-img-ar">
              <img src={book} alt="" />
            </div> */}
            <h3>Welkom bij je toekomstige boek
            </h3>
            <h4>Je hebt X verhalen geschreven van de 52.
            </h4>
            <div className="outlet-check-ar">
              <div className="checks-div-ar">
                <h5
                  onClick={() => navigate('/dashboard')}
                  style={{
                    // color: activeComponent === "questionOfWeek" ? "#000" : "",
                  }}
                >
      een voorproefje van mijn boek
                </h5>
                <h5
                  onClick={() => navigate('/chapter')}
                  style={{
                    color: "#000"
                }}
                >
               Hoofdstuk
                </h5>
             
                <h5
                  onClick={() => navigate('/allQuestions')}
                  style={{
                    // color: activeComponent === "allQuestions" ? "#000" : "",
                  }}
                >
             Alle vragen
                </h5>
                {/* <h5
                  onClick={() => navigate(`/chapterai/${userDetails?._id}`)}>
                  With Ai Questions
                </h5> */}
              </div>
              {(
                activeComponent === "allQuestions") && (
                <div className="add-chapter-btn">Voeg nog een vraag toe</div>
              )}
            </div>
            {/* {activeComponent === "questionOfWeek" && <Questionoftheweek />}
            {activeComponent === "chapter" && <Chaptersfuture />}
    
            {activeComponent === "allQuestions" && <AllQuestions />} */}
          </div>

          <div className="chapters-div-ar">
      <ToastContainer
        position="top-center"
        autoClose={1000}
      />

      <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg" show={modalShow} onHide={handleClose}  >
        <Modal.Header >
          <Modal.Title>
            Voeg nog een vraag toe</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: '85%' }}>
          <textarea className="w-100 p-3" name="Question" id="" style={{ height: '120px', fontSize: '18px', fontWeight: '400' }}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Voer een nieuwe vraag in"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>

            Dichtbij
          </Button>
          <Button variant="btn btn-outline-success" onClick={handleSubmitAddQuestion}>
            Wijzigingen opslaan

          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        show={modalShowEdit}
        onHide={handleCloseEdit}
      >
        <Modal.Header>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "85%" }}>
          <textarea
            className="w-100 p-3"
            name="Question"
            id=""
            style={{ height: "120px", fontSize: "18px", fontWeight: "400" }}
            placeholder="Edit a question"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="btn btn-outline-success" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" aria-labelledby="example-modal-sizes-title-lg" show={modalShowEdit} onHide={handleCloseEdit}  >
        <Modal.Header >
          <Modal.Title>Vraag bewerken
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: '85%' }}>
          <textarea className="w-100 p-3" name="Question" id="" style={{ height: '120px', fontSize: '18px', fontWeight: '400' }}
            placeholder="Edit a question"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}

          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Dichtbij

          </Button>
          <Button variant="btn btn-outline-success" onClick={handleSaveChanges}>
            Wijzigingen opslaan

          </Button>
        </Modal.Footer>
      </Modal>

      {chaptersdata?.map((chapter, index) => (
        <div
          key={index}
          className={`chapter-div-ar-more ${
            activeIndex === index ? "expanded" : ""
          }`}
        >
          <div className="chapter-div-ar">
            <h2>- {chapter?.chapter}</h2>

            <div className="main-box-list">
              <div className="chapter-btns-div-ar">
                <button onClick={() => setChapters(index + 1)}>Antwoord</button>
              </div>

              <button
                className="Answer-drop"
                onClick={() => toggleExpand(index)}
              >
                {activeIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    transform="rotate(180)"
                  >
                    <g clipPath="url(#clip0_97_404)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.7069 15.7073C12.5193 15.8948 12.265 16.0001 11.9999 16.0001C11.7347 16.0001 11.4804 15.8948 11.2929 15.7073L5.63585 10.0503C5.54034 9.9581 5.46416 9.84775 5.41175 9.72575C5.35934 9.60374 5.33176 9.47252 5.3306 9.33974C5.32945 9.20696 5.35475 9.07529 5.40503 8.95239C5.45531 8.82949 5.52957 8.71784 5.62346 8.62395C5.71735 8.53006 5.829 8.4558 5.9519 8.40552C6.0748 8.35524 6.20648 8.32994 6.33926 8.33109C6.47204 8.33225 6.60325 8.35983 6.72526 8.41224C6.84726 8.46465 6.95761 8.54083 7.04985 8.63634L11.9999 13.5863L16.9499 8.63634C17.1385 8.45418 17.3911 8.35339 17.6533 8.35567C17.9155 8.35795 18.1663 8.46312 18.3517 8.64852C18.5371 8.83393 18.6423 9.08474 18.6445 9.34694C18.6468 9.60914 18.546 9.86174 18.3639 10.0503L12.7069 15.7073Z"
                        fill="#808080"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_97_404">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_97_404)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.7069 15.7073C12.5193 15.8948 12.265 16.0001 11.9999 16.0001C11.7347 16.0001 11.4804 15.8948 11.2929 15.7073L5.63585 10.0503C5.54034 9.9581 5.46416 9.84775 5.41175 9.72575C5.35934 9.60374 5.33176 9.47252 5.3306 9.33974C5.32945 9.20696 5.35475 9.07529 5.40503 8.95239C5.45531 8.82949 5.52957 8.71784 5.62346 8.62395C5.71735 8.53006 5.829 8.4558 5.9519 8.40552C6.0748 8.35524 6.20648 8.32994 6.33926 8.33109C6.47204 8.33225 6.60325 8.35983 6.72526 8.41224C6.84726 8.46465 6.95761 8.54083 7.04985 8.63634L11.9999 13.5863L16.9499 8.63634C17.1385 8.45418 17.3911 8.35339 17.6533 8.35567C17.9155 8.35795 18.1663 8.46312 18.3517 8.64852C18.5371 8.83393 18.6423 9.08474 18.6445 9.34694C18.6468 9.60914 18.546 9.86174 18.3639 10.0503L12.7069 15.7073Z"
                        fill="#808080"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_97_404">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </button>
            </div>
          </div>


          {activeIndex === index && (
            <div className="chapter-content">
              {chapter?.questions?.map((question, questionIndex) => (
                <div key={questionIndex} className="question-item">
                  <div className="main-para-box">
                    <span>Question.{questionIndex + 1}</span>{" "}
                    <p> {question} </p>
                  </div>
                  <div className="para-btn-box">
                    <button onClick={() => handleSubmitViewQuestionNo(questionIndex, index + 1)}>Antwoord</button>
                    {/* <button onClick={() => handleEditQuestion(questionIndex, index)}>Ander</button> */}
                  </div>
                </div>
              ))}
            </div>
          )}

          
        </div>
      ))}
    </div>
        </div>
      </section>
 



  </>
  );
};

export default Chaptersfuture;
