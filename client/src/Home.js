import React from 'react';
import logo from './Images/FindMyXILogo.png';
import NavBar from './Components/NavBar';

const Home = () => {
    const user = localStorage.getItem("token");
    return (
        <section>
            <NavBar/>
            <div>
                {user}
                <img src={logo} style={{height:"10%",width:"50%",margin:"auto", display:"block", marginTop:"5%"}}></img>
            </div>

        </section>
    )
};


export default Home;