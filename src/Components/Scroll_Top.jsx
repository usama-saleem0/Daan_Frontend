import React, { useState, useEffect, useRef } from "react";

const Scroll_Top = ({ topRef, footerRef, dynamicClass = "" }) => {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);
  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollTopBtn(!entry.isIntersecting); // Show button only when footer not visible
      },
      {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);
  console.log(dynamicClass,"<<<<<<dynamicClass>>>>>>");
  
  return (
    <>
      {showScrollTopBtn && (
        <div className={`${dynamicClass} back-to-top`}>
          <button onClick={handleScrollToTop}>
            <svg
              id="Layer_1"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <circle cx="12" cy="12" fill="#ece3d0" r="11" />
                <path
                  d="m12 18.8v-8l1.6 1.6 1.1-1.1-3.4-3.4-3.4 3.4 1.1 1.1 1.5-1.6v8z"
                  fill="#dbcfb9"
                />
                <path d="m5 5.5h12.5v1.5h-12.5z" fill="#dbcfb9" />
                <path d="m12 .3c-6.5 0-11.7 5.2-11.7 11.7s5.2 11.8 11.7 11.8 11.8-5.3 11.8-11.8-5.3-11.7-11.8-11.7zm0 22c-5.7 0-10.2-4.6-10.2-10.3s4.5-10.2 10.2-10.2 10.3 4.5 10.3 10.2-4.6 10.3-10.3 10.3z" />
                <path d="m8.6 12 1.1 1.1 1.6-1.6v8h1.5v-8l1.5 1.6 1.1-1.1-3.4-3.4z" />
                <path d="m5.8 6.1h12.5v1.5h-12.5z" />
              </g>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Scroll_Top;
