import React, {useState,useEffect} from 'react';
import NavBar from '../NavBar';
import UserCard from './UserCard';
import './Card.css';
import {BsSearch} from 'react-icons/bs';
import axios from 'axios';

const Browse = () => {
    const [players,setPlayers] = useState();
    const [searchValue, setSearchValue] = useState("");

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
  ? players.map((player) => (
        player.role.toLowerCase().includes(searchValue.toLowerCase()) && <UserCard key={player._id} player={player} />
    ))
  : null;


    return (
        <section>
            <NavBar/>
            <div className="boxContainer">
                <table className="elementsContainer">
                    <tr>
                        <td>
                            <input type="text" placeholder="Search by role" className="search" value={searchValue} onChange={handleSearchChange} ></input>
                        </td>
                        <td>
                            <a href="a"><BsSearch className="material-icons"></BsSearch></a>
                        </td>
                    </tr>
                </table>
            </div>
            {renderUsers}
        </section>
    )
};


export default Browse;