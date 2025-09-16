import React, { useEffect, useRef } from "react";
import "./TypingChallenge.css";
import TestLetter from "../TestLetter/TestLetter";

// 🔹 normalization helper
const normalizeText = (text) => {
  return text
    .replace(/’/g, "'") // curly apostrophe → straight
    .replace(/‘/g, "'")
    .replace(/“|”/g, '"')
    .replace(/–/g, "-")
    .replace(/—/g, "-");
};

const TypingChallenge = ({
  testInfo,
  onInputChange,
  timeRemaining,
  timerStarted,
  inputRef,
}) => {
  const paragraphRef = useRef(null);

  // 🔹 wrapper for input handler (normalize before passing)
  const handleChange = (value) => {
    const normalizedValue = normalizeText(value);
    onInputChange(normalizedValue);
  };

  // 🔹 Auto scroll: follow active letter
  useEffect(() => {
    const activeEl = document.querySelector(".current-letter");
    if (activeEl && paragraphRef.current) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (paragraphRef.current) {
      // reset to top at the beginning
      paragraphRef.current.scrollTop = 0;
    }
  }, [testInfo]);

  return (
    <div className="typing-challenge">
      <div className="timer-container">
        <p className="timer">
          00:{timeRemaining >= 10 ? timeRemaining : `0${timeRemaining}`}
        </p>
        <p className="timer-info">{!timerStarted && "START TYPING!"}</p>
      </div>

      <div className="textarea-container">
        <div className="textarea-left">
          <div ref={paragraphRef} className="test-paragraph">
            {testInfo.map((individualLetterInfo, index) => (
              <TestLetter
                key={index}
                individualLetterInfo={individualLetterInfo}
              />
            ))}
          </div>
        </div>

        <div className="textarea-right">
          <textarea
            ref={inputRef}
            onChange={(e) => handleChange(e.target.value)} // ✅ normalized input
            className="textarea"
            placeholder="Start typing here"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default TypingChallenge;
