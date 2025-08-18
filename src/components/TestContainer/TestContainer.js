import React from "react";
import TryAgain from "../TryAgain/TryAgain";
import TypingContainer from "../TypingContainer/TypingContainer";
import "./TestContainer.css";

const TestContainer = ({
  selectedParagraph,
  testInfo,
  onInputChange,
  words,
  characters,
  wpm,
  timeRemaining,
  timerStarted,
  startAgain,
  inputRef, // 👈 accept inputRef
}) => {
  return (
    <div className="test-container">
      {/* Show typing area until timer ends, then show Try Again */}
      {timeRemaining > 0 ? (
        <div data-aos="fade-up" className="typing-challenge-cont">
          <TypingContainer
            selectedParagraph={selectedParagraph}
            testInfo={testInfo}
            onInputChange={onInputChange}
            words={words}
            characters={characters}
            wpm={wpm}
            timeRemaining={timeRemaining}
            timerStarted={timerStarted}
            inputRef={inputRef} // 👈 pass it down
          />
        </div>
      ) : (
        <div className="try-again-cont">
          <TryAgain
            words={words}
            characters={characters}
            wpm={wpm}
            startAgain={startAgain}
          />
        </div>
      )}
    </div>
  );
};

export default TestContainer;
