import React from 'react';
import landingIllustration from './Images/LandingPageIllustration.png';
import NavBar from './Components/NavBar';
import './Home.css';
import { Link } from 'react-router-dom';
import logo from './Images/FindMyXILogo.png';
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
                Arjun
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
        <footer aria-label="Site Footer" class="bg-gray-300">
  <div
    class="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24"
  >
    <div class="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
      <a
        class="inline-block rounded-full bg-blue-600 p-2 text-white shadow transition hover:bg-blue-500 sm:p-3 lg:p-4"
        href="/"
      >
        <span class="sr-only">Back to top</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>

    <div class="lg:flex lg:items-end lg:justify-between">
      <div>
        <div class="flex justify-center text-blue-600 lg:justify-start">
          <img src={logo} className='h-14'></img>
        </div>

        <p
          class="mx-auto mt-6 max-w-md text-left leading-relaxed text-gray-500 lg:text-left"
        >
          FindMyXI is a platform that helps you find the best playing eleven for your team.
        </p>
      </div>

      <nav aria-label="Footer Nav" class="mt-12 lg:mt-0">
        <ul
          class="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12"
        >
          <li>
            <div class="text-gray-700 transition text-lg" href="/">
              Contacts:
            </div>
          </li>

          <li>
            <a class="text-gray-700 transition " href="/">
              Findmyxi@gmail.com
            </a>
          </li>

          <li>
            <a class="text-gray-700 transition " href="/">
              +1 425-837-2943
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <p class="mt-12 text-center text-sm text-gray-500 lg:text-right">
      Copyright &copy; 2023. All rights reserved.
    </p>
  </div>
</footer>

      </section>
    );
};


export default Home;