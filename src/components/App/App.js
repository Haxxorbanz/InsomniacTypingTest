import React from "react";
import { SAMPLE_PARAGRAPHS } from "../../data/sampleParagraphs";
import ChallengeSection from "../ChallengeSection/ChallengeSection";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";
import "./App.css";

const TotalTime = 60;
const DefaultState = {
    selectedParagraph: "Hello World!",
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

        this.inputRef = React.createRef(); // textarea ref
        this.timer = null; // store interval
    }

    fetchNewParagraphFallback = () => {
        const data =
            SAMPLE_PARAGRAPHS[
                Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
            ];

        const selectedParagraphArray = data.split("");
        const testInfo = selectedParagraphArray.map((selectedLetter) => {
            return { testLetter: selectedLetter, status: "notAttempted" };
        });

        this.setState({
            ...DefaultState,
            selectedParagraph: data,
            testInfo,
        });
    };

    componentDidMount() {
        this.fetchNewParagraphFallback();

        // ✅ global shortcuts
        window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer);
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        // Ctrl + Enter → reset anytime
        if (e.ctrlKey && e.key === "Enter") {
            e.preventDefault();
            this.startAgain();
        }

        // After time is up → allow R or Enter
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

        this.fetchNewParagraphFallback();

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
        if (!this.state.timerStarted) this.startTimer();

        const characters = inputValue.length;
        const words = inputValue.trim().split(" ").filter(Boolean).length;
        const index = characters - 1;

        if (index < 0) {
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted",
                    },
                    ...this.state.testInfo.slice(1),
                ],
                characters,
                words,
            });
            return;
        }

        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words });
            return;
        }

        const testInfo = [...this.state.testInfo];
        if (!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = "notAttempted";

        const isCorrect = inputValue[index] === testInfo[index].testLetter;
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        this.setState({ testInfo, words, characters });
    };

    render() {
        return (
            <div className="app">
                <Navbar />
                <Main />
                <ChallengeSection
                    selectedParagraph={this.state.selectedParagraph}
                    testInfo={this.state.testInfo}
                    onInputChange={this.handleUserInput}
                    words={this.state.words}
                    characters={this.state.characters}
                    wpm={this.state.wpm}
                    timeRemaining={this.state.timeRemaining}
                    timerStarted={this.state.timerStarted}
                    startAgain={this.startAgain} // button reset
                    inputRef={this.inputRef}     // typing box ref
                />
                <Footer />
            </div>
        );
    }
}

export default App;
