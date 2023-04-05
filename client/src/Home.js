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
        <div className="block rounded-lg p-4 w-3/12 mb-10 ml-9 bg-slate-100">
          <img
            alt="Home"
            src={kohli}
            className="h-56 w-full rounded-md object-cover"
          />

          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Role</dt>

                <dd className="text-sm text-gray-500">Batsman</dd>
              </div>

              <div>
                <dt className="sr-only">Name</dt>

                <dd className="font-medium">Virat Kohli</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-8 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <img src={bat} className='h-4 w-4'>
                    </img>
                
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Batting Hand</p>

                  <p className="font-medium">Right</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <img src={ball} className='h-4 w-4'>
                </img>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Bowling Hand</p>

                  <p className="font-medium">Right</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <img src={link} className='h-4 w-4'>
                </img>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">CricClubs Id</p>

                  <p className="font-medium">3de3rfe3</p>
                </div>
              </div>
            </div>
            <div className='mt-6 items-center'>
                <table className='table-auto m-auto'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>Team</th>
                            <th className='px-4 py-2'>Saturday</th>
                            <th className='px-4 py-2'>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border px-4 py-2'>Team 1</td>
                            <td className='border px-4 py-2'>Yes</td>
                            <td className='border px-4 py-2'>No</td>
                        </tr>
                        <tr className='bg-gray-100'>
                            <td className='border px-4 py-2'>Other</td>
                            <td className='border px-4 py-2'>No</td>
                            <td className='border px-4 py-2'>Yes</td>
                        </tr>

                    </tbody>
                </table>
                            
            </div>
          </div>
        </div>
      </section>
    );
};


export default Home;