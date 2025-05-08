import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useState } from "react";
import "../MyBook.css";
import { baseUrl } from "../baseUrl";
import { useSelector } from "react-redux";


const sidecover = localStorage.getItem("sideCoverImage");

const PageCover = React.forwardRef(({ children, imge }, ref) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div className="cover-content" 
       
        // style={{
        //   borderLeft: "30px solid transparent",
        //   "--sideCoverImage": `url(${sidecover})`,
        // }}
      >
        <img src={imge} alt="Cover" className="cover-image" />
      </div>
    </div>
  );
});

const Page = React.forwardRef(({ children, pageIndex }, ref) => {
  return (
    <div className="page" ref={ref}>
      {children}
      <div className="page-number">{pageIndex}</div>
    </div>
  );
});

function MyBook({ imge }) {
  const enhanceBook = useSelector((state) => state.questionCounter.enhanceBook);
  const [bookData, setBookData] = useState([]);
  const [indexing, setBookIndex] = useState([]);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));

  async function postData() {
    try {
      const response = await fetch(`${baseUrl}/get-stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userDetails?._id,
        }),
      });
      const data = await response.json();
      console.log("API Response:", data);
      setBookData(data?.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function postDataEnhance() {
      try {
        const response = await fetch(`${baseUrl}/get-stories-enchaced`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userDetails?._id,
          }),
        });
        const data = await response.json();
        setBookData(data); // Assuming the API response has a `chapters` key
      } catch (error) {
        console.error("Error:", error);
      }
    }
    console.log({ bookData });  


  async function getIndexing() {
    try {
      const response = await fetch(`${baseUrl}/indexing`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("API Response Index:", data);
      setBookIndex(data?.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    console.log('enhanceBook yes or no::', enhanceBook);
    // if (enhanceBook === 'yes') {
    //   // postDataEnhance();
    //   postData();
    // } else {
    //   // postDataEnhance();
    //   // postData();
    // }
   postData()
    getIndexing();

  }, [enhanceBook]);

  useEffect(() => {
    if (bookData.length > 0) {
      console.log("Flipbook data loaded:", bookData);
    }
  }, [bookData]);

  // Function to split text into pages
  function splitTextByWords(text, maxWordsPerPage) {
    const words = text.split(" ");
    const pages = [];
    for (let i = 0; i < words.length; i += maxWordsPerPage) {
      pages.push(words.slice(i, i + maxWordsPerPage).join(" "));
    }
    return pages;
  }

  // Group stories by chapter
  const groupedStories = {};
  if (bookData && bookData.length > 0) {
    bookData.forEach((story) => {
      const chapterId = story.chapterId._id;
      if (!groupedStories[chapterId]) {
        groupedStories[chapterId] = {
          chapterInfo: story.chapterId,
          stories: [],
        };
      }
      groupedStories[chapterId].stories.push(story);
    });
  }

  let pageCounter = 1; // Page index counter

  return (
    <div className={`book-container ${isBookOpen ? "open" : "closed"}`}> 
      {bookData ? (
        bookData.length > 0 && (
          <HTMLFlipBook
            width={495}
            height={642}
            minWidth={615}
            maxWidth={700}
            minHeight={740}
            mobileScrollSupport={true}
            maxHeight={1350}
            showCover={true}
            flippingTime={1000}
            maxShadowOpacity={0.5}
            onFlip={(e) => {
              setIsBookOpen(e.data > 0);
            }}
            className="album-web"
          >
            {/* Front Cover */}
            <PageCover imge={imge}>My Life Story</PageCover>

            {/* Start Pages */}
            {[1].map((_, index) => (
              <Page key={index} pageIndex={pageCounter++}>
                <div className="blank-page"></div>
              </Page>
            ))}

            {/* Index Page */}
            <Page key="start-index" pageIndex={pageCounter++}>
              <div className="index-page">
                <h1 className="index-title">Table of Contents</h1>
                <div className="index-content">
                  {indexing?.map((chapter, index) => (
                    <div
                      key={`chapter-index-${index}`}
                      className="chapter-entry"
                    >
                      <span className="chapter-title-index">
                        {chapter?.chapterTitle}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="decorative-line"></div>
              </div>
            </Page>
            <Page key={"blank-last"} pageIndex={pageCounter++}>
              <div className="blank-page"></div>
            </Page>

            {/* Welcome Page */}
            <Page key="start-image-text" pageIndex={pageCounter++}>
              <img
                src="https://images.unsplash.com/photo-1496672254107-b07a26403885?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2xkJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Welcome Image"
                style={{
                  height: "65%",
                  width: "100%",
                  margin: "20px auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              <div style={{ width: "100%" }}>
                <p>
                  A storyteller at heart,{" "}
                  <span
                    style={{ color: "#F39C11", textTransform: "capitalize" }}
                  >
                    {userDetails?.firstname + userDetails?.lastname}
                  </span>{" "}
                  weaves personal insight with imaginative flair to illuminate
                  the human experience. Each page reflects a passion for words
                  and a commitment to inspiring readers on their own journey of
                  discovery.
                </p>
              </div>
            </Page>

            <Page key="start-blank-2" pageIndex={pageCounter++}>
              <div className="blank-page"></div>
            </Page>

            {/* Book Content - Grouped by Chapter */}
            {Object.values(groupedStories).map((chapterGroup, chapterIndex) => [
              // Chapter title page with image - Only once per chapter
              <Page
                key={`chapter-title-${chapterIndex}`}
                pageIndex={pageCounter++}
                className="chapter-title"
              >
                <h1
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {chapterGroup.chapterInfo.chapterTitle}
                </h1>
                <img
                  src={
                    chapterGroup.chapterInfo.chapterImage
                      ? chapterGroup.chapterInfo.chapterImage
                      : `https://images.unsplash.com/photo-1739874244845-64aeccd01432?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D`
                  }
                  alt={chapterGroup.chapterInfo.chapterTitle}
                  style={{
                    width: "100%",
                    height: "90%",
                    margin: "20px auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Page>,

              // Render all questions and messages for this chapter
              ...chapterGroup.stories.flatMap((story, storyIndex) => {
                return story.messages.flatMap((message, messageIndex) => {
                  const pagesText = splitTextByWords(message?.message, 200); // Split text into pages
                  const hasImages = message.images.length > 0; // Check if the message has images

                  return [
                    // Text pages
                    ...pagesText.map((pageContent, pageIndex) => (
                      <Page
                        key={`message-${chapterIndex}-${storyIndex}-${messageIndex}-${pageIndex}`}
                        pageIndex={pageCounter++}
                        className="content-page"
                      >
                        {pageIndex === 0 && (
                          <h3>{story?.questionId?.question}</h3>
                        )}
                        <div className="message-content">
                          {pageContent.split("\n").map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </Page>
                    )),
                    // Image page (only if images are available and only once per message)
                    hasImages && (
                      <Page
                        key={`image-${chapterIndex}-${storyIndex}-${messageIndex}`}
                        pageIndex={pageCounter++}
                        className="image-page"
                      >
                        <img
                          src={message.images[0]} // Use the first image
                          alt="Message Image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Page>
                    ),
                  ].filter(Boolean); // Remove falsy values (e.g., `false` from `hasImages` check)
                });
              }),
            ])}

            {/* Blank Page */}
            <Page key="blank-end" pageIndex={pageCounter++}>
              <div className="blank-page"></div>
            </Page>
            <Page key="blank-final">
              <div className="blank-page"></div>
            </Page>

            {/* Back Cover */}
            <PageCover imge={imge}>The End</PageCover>
          </HTMLFlipBook>
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default MyBook;
