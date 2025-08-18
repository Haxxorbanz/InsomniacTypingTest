import React from "react";
import ChallengeDetailsCard from "../ChallengeCard/ChallengeCard";
import TypingChallenge from "../TypingChallenge/TypingChallenge";
import "./TypingContainer.css";

const TypingChallengeContainer = ({
  selectedParagraph,
  testInfo,
  onInputChange,
  words,
  characters,
  wpm,
  timeRemaining,
  timerStarted,
  inputRef, // 👈 accept inputRef
}) => {
  return (
    <div className="typing-container">
      <div className="details-container">
        {/* Words Typed */}
        <ChallengeDetailsCard cardName="Words" cardValue={words} />

        {/* Characters Typed */}
        <ChallengeDetailsCard cardName="Characters" cardValue={characters} />

        {/* WPM */}
        <ChallengeDetailsCard cardName="WPM" cardValue={wpm} />
      </div>

      <div className="typewriter-container">
        <TypingChallenge
          inputRef={inputRef} // 👈 pass it as a prop
          testInfo={testInfo}
          selectedParagraph={selectedParagraph}
          onInputChange={onInputChange}
          timeRemaining={timeRemaining}
          timerStarted={timerStarted}
        />
      </div>
    </div>
  );
};

export default TypingChallengeContainer;
