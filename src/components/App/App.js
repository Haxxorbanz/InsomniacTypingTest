import React from "react";
import { SAMPLE_PARAGRAPHS } from "../../data/sampleParagraphs";
import ChallengeSection from "../ChallengeSection/ChallengeSection";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";
import "./App.css";

const TotalTime = 60;

const DefaultState = {
  selectedParagraph: "",
  testInfo: [],
  timerStarted: false,
  timeRemaining: TotalTime,
  words: 0,
  characters: 0,
  wpm: 0,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DefaultState;

    this.inputRef = React.createRef();
    this.timer = null;
  }

  fetchNewParagraph = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length);
    const paragraph = SAMPLE_PARAGRAPHS[randomIndex];

    const testInfo = paragraph.split("").map((letter) => ({
      testLetter: letter,
      status: "notAttempted",
    }));

    this.setState({
      ...DefaultState,
      selectedParagraph: paragraph,
      testInfo,
    });
  };

  componentDidMount() {
    this.fetchNewParagraph();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      return;
    }

    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      this.startAgain();
    }

    if (!this.state.timerStarted && this.state.timeRemaining === 0) {
      if (e.key === "r" || e.key === "R" || e.key === "Enter") {
        e.preventDefault();
        this.startAgain();
      }
    }
  };

  startAgain = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.fetchNewParagraph();
    setTimeout(() => {
      if (this.inputRef.current) {
        this.inputRef.current.value = "";
        this.inputRef.current.focus();
      }
    }, 0);
  };

  startTimer = () => {
    this.setState({ timerStarted: true });
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeRemaining > 0) {
          const timeSpent = TotalTime - prevState.timeRemaining;
          const wpm =
            timeSpent > 0
              ? (prevState.words / timeSpent) * TotalTime
              : 0;
          return {
            timeRemaining: prevState.timeRemaining - 1,
            wpm: parseInt(wpm),
          };
        } else {
          clearInterval(this.timer);
          this.timer = null;
          return { timerStarted: false };
        }
      });
    }, 1000);
  };

  handleUserInput = (inputValue) => {
    if (/\n/.test(inputValue)) {
      const resetTestInfo = this.state.selectedParagraph.split("").map(
        (letter) => ({
          testLetter: letter,
          status: "notAttempted",
        })
      );

      this.setState({
        testInfo: resetTestInfo,
        words: 0,
        characters: 0,
      });
      return;
    }

    if (!this.state.timerStarted) this.startTimer();

    const characters = inputValue.length;
    const words = inputValue.trim().split(" ").filter(Boolean).length;

    const testInfo = [...this.state.testInfo];
    for (let i = 0; i < this.state.selectedParagraph.length; i++) {
      if (i < characters) {
        const expected = this.state.selectedParagraph[i];
        const actual = inputValue[i];

        if (actual !== expected) {
          testInfo[i].status = "incorrect";
        } else {
          testInfo[i].status = "correct";
        }
      } else {
        testInfo[i].status = "notAttempted";
      }
    }

    this.setState({ testInfo, words, characters });
  };

  // ✅ Scroll to Typing Test section
  scrollToTest = () => {
    const section = document.getElementById("typetest");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    return (
      <div className="app">
        <Navbar />
        
        {/* Pass scrollToTest as a prop to Main */}
        <Main scrollToTest={this.scrollToTest} />

        {/* Section with id so scroll works */}
        <section id="typetest">
          <ChallengeSection
            selectedParagraph={this.state.selectedParagraph}
            testInfo={this.state.testInfo}
            onInputChange={this.handleUserInput}
            words={this.state.words}
            characters={this.state.characters}
            wpm={this.state.wpm}
            timeRemaining={this.state.timeRemaining}
            timerStarted={this.state.timerStarted}
            startAgain={this.startAgain}
            inputRef={this.inputRef}
          />
        </section>

        <Footer />
      </div>
    );
  }
}

export default App;
