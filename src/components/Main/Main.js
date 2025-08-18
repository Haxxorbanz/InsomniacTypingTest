import React from "react";
import "./Main.css";
import flash from "./../../assets/hero.png";
// import Typewriter from "typewriter-effect";
import { ReactTyped } from "react-typed";

const Main = () => {
    return (
        <div className="landing-container">
            <div data-aos="fade-right" className="landing-left">
                <h1 className="landing-header">Can you type...</h1>
                <div className="typewriter-container">
                <ReactTyped
                strings={["Hello", "Typing works!"]}
                typeSpeed={50}
                backSpeed={30}
                loop
                />
                </div>
            </div>
            
            <div className="landing-right">
                <img
                    data-aos="fade-left"
                    className="flash-image"
                    src={flash}
                    alt="hero"
                />
            </div>
        </div>
    );
};

export default Main;