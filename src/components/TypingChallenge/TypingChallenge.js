import React from "react";
import "./TypingChallenge.css";
import TestLetter from "../TestLetter/TestLetter";

const TypingChallenge = ({
  testInfo,
  onInputChange,
  timeRemaining,
  timerStarted,
  inputRef,   // 👈 receive inputRef as a prop
}) => {
  return (
    <div className="typing-challenge">
      <div className="timer-container">
        <p className="timer">
          00:{timeRemaining >= 10 ? timeRemaining : `0${timeRemaining}`}
        </p>
        <p className="timer-info">
          {!timerStarted && "START TYPING!"}
        </p>
      </div>

      <div className="textarea-container">
        <div className="textarea-left">
          <div className="textarea test-paragraph">
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
            ref={inputRef}   // 👈 attach ref here
            onChange={(e) => onInputChange(e.target.value)}
            className="textarea"
            placeholder="Start typing here"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default TypingChallenge;
