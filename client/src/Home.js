import React from 'react';
import landingIllustration from './Images/LandingPageIllustration.png';
import NavBar from './Components/NavBar';
import './Home.css';
import { Link } from 'react-router-dom';
import kohli from './Images/VK.jpg';
import bat from './Images/cricket-bat.png';
import ball from './Images/cricket-ball.png';
import link from './Images/link.png';

const Home = () => {
    
    return (
      <section className="white-bg">
        <NavBar />

        <div
          className="white-bg"
          style={{ width: "100%", height: "1000px", marginTop: "0%" }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="basis-1/2">
              <h3 className="font-sans font-bold text-4xl mx-5 mt-8 lg:mx-40 lg:mt-20">
                FindMyXI
              </h3>
              <p className="font-sans font-normal text-xl mx-5 mt-3 w-80 lg:mx-40">
                <span className="font-bold">FindMyXI</span> is a platform that
                helps you find the{" "}
                <span className="underline decoration-blue-500 font-bold text-blue-500">
                  best
                </span>{" "}
                playing eleven for your{" "}
                <span className="underline decoration-black font-bold">
                  team
                </span>
                . Begin by either{" "}
                <Link to="/register" className="text-blue-400">
                  creating an account
                </Link>{" "}
                or searching the{" "}
                <Link to="/browse" className="text-blue-400">
                  browse
                </Link>{" "}
                page.
              </p>
            </div>
            <div className="basis-1/2">
              <img
                alt="landing illustration"
                src={landingIllustration}
                className="w-80 h-66 mt-10 ml-16 lg:w-9/12"
              ></img>
            </div>
          </div>
        </div>
      </section>
    );
};


export default Home;