import React, {useState,useEffect} from 'react';
import NavBar from '../NavBar';
import UserCard from './UserCard';
import './Card.css';
import {BsSearch} from 'react-icons/bs';
import axios from 'axios';
import './Browse.css';

const Browse = () => {
    const [players,setPlayers] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [filterType, setFilterType] = useState("role");
    
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const getPlayers = async () => {
        const url = "http://localhost:8080/api/players";
        try{
            const res = await axios.get(url);
            setPlayers(res.data.data);
            
        } catch(error){
          console.log(error);
        }
      };
    
    useEffect(()=>{
        fetchPlayers();
    },[]);
    const fetchPlayers = async () => {
        await getPlayers();
    };

    const renderUsers = players
  ? players
      .filter((player) =>
        filterType === "name"
          ? player.name.toLowerCase().includes(searchValue.toLowerCase())
          : filterType === "role"
          ? player.role.toLowerCase().includes(searchValue.toLowerCase())
          : player.primaryTeam.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((player) => <UserCard key={player._id} player={player} />)
  : null;
    return (
        <section>
            <NavBar/>
            <div className="boxContainer">
                <table className="elementsContainer">
                    <tr>
                        <td>
                            <input type="text" placeholder="Fliter by..." className="search" value={searchValue} onChange={handleSearchChange} ></input>
                        </td>

                        <td>
                            <select className="filter" value={filterType} onChange={(e) => {
                                setFilterType(e.target.value);
                                }}>
                                <option className="option" value="role">Role</option>
                                <option className="option" value="name">Name</option>
                                <option className="option" value="primaryTeam">Primary Team</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            {/* <div className='flex flex-row w-full'> */}
                {renderUsers}    
            {/* </div> */}
        </section>
    )
};


export default Browse;