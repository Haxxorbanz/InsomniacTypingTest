import React from "react";
import "./Main.css";
import flash from "./../../assets/hero.png";
import clickMe from "./../../assets/click-me.png"; // ✅ Import the image
import { ReactTyped } from "react-typed";

const Main = ({ scrollToTest }) => {
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
                {/* ✅ Wrapper makes hover/zoom clean */}
                <div 
                    className="flash-wrapper" 
                    data-aos="fade-left" 
                    onClick={scrollToTest}
                >
                    <img
                        className="flash-image"
                        src={flash}
                        alt="hero"
                    />

                    {/* ✅ Click Me Overlay */}
                    <img 
                        className="click-me-overlay" 
                        src={clickMe} 
                        alt="Click Me" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;
