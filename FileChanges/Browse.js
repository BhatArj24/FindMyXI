import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import UserCard from "./UserCard";
import "./Card.css";
import searchIcon from './search.png'
import axios from "axios";
import "./Browse.css";
import "./Loader.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Browse = () => {
  const [players, setPlayers] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("role");
  const [isLoading, setIsLoading] = useState(true);
  const [availableSaturday, setAvailableSaturday] = useState(false);
  const [availableSunday, setAvailableSunday] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const getPlayers = async () => {
    setSkip(players?.length);
    const url = `http://localhost:8080/api/players?skip=${skip}&filterType=${filterType}&searchValue=${searchValue}&availableSaturday=${availableSaturday}&availableSunday=${availableSunday}`;
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      if (res.data.data.length < 8) {
        setPlayers([...players, ...res.data.data]);
        setIsEnd(true);
        return;
      }
      if (players) {
        setPlayers([...players, ...res.data.data]);
      } else {
        setPlayers(res.data.data);
      }
  
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getPlayersOnSearch = async () => {
    const url = `http://localhost:8080/api/players?skip=${skip}&filterType=${filterType}&searchValue=${searchValue}&availableSaturday=${availableSaturday}&availableSunday=${availableSunday}`;
    setIsLoading(true);
    setPlayers(null);
    try {
      const res = await axios.get(url);
      if (res.data.data.length < 8) {
        setPlayers([...res.data.data]);
        setIsEnd(true);
        return;
      }
      setPlayers([...res.data.data]);


      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchPlayers();
  }, [skip]);

  const fetchPlayers = async () => {
    await getPlayers();
  };

  const renderUsers = (
    players &&
    players
      .map((player) => <UserCard key={player._id} player={player} />)
  );

  return (
    <section>
      <NavBar />
      <div className="flex flex-col lg:flex-row">
        <div className="boxContainer">
          <div className="grid grid-cols-4 gap-4 elementsContainer">
            <div>
              <select
                className="filter font-bold text-lg"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                }}
              >
                <option className="option" value="role">
                  Role
                </option>
                <option className="option" value="name">
                  Name
                </option>
                <option className="option" value="primaryTeam">
                  Primary Team
                </option>
              </select>
            </div>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Search"
                className="search"
                value={searchValue}
                onChange={handleSearchChange}
              ></input>
            </div>
            <div className="col-span-1">
              <div className="w-4/5 h-full float-right">
              <button className="bg-slate-200 w-full h-full" onClick={getPlayersOnSearch}>
                <img src={searchIcon} style={{width:"20px"}} className="m-auto"></img>
              </button>
              </div>
              
            </div>
          </div>
        </div>
        <div className="bg-blue-700 text-white rounded-md p-3 mt-2 mx-3 lg:mr-8">
          <div>
            <input
              type="checkbox"
              checked={availableSaturday}
              onChange={(e) => setAvailableSaturday(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="availableSaturday">Available Saturday</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={availableSunday}
              onChange={(e) => setAvailableSunday(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="availableSunday">Available Sunday</label>
          </div>
        </div>
      </div>
      <InfiniteScroll
        className="flex-wrap flex flex-col w-full mt-2 lg:flex-row"
        dataLength={players ? players.length : 0}
        next={fetchPlayers}
        hasMore={!isEnd}
        loader={<div className="spinner"></div>}
      >
        {renderUsers}
      </InfiniteScroll>
    </section>
  );
};

export default Browse;
