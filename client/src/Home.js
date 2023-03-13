import React from 'react';
import logo from './Images/FindMyXILogo.png';
import NavBar from './Components/NavBar';
import Alert from './Components/Alert';

const Home = () => {
    return (
        <section>
            <NavBar/>
            <Alert type={"teamRequest"} teamRequest={"Arjun"} />
            <div>
                <img src={logo} style={{height:"10%",width:"50%",margin:"auto", display:"block", marginTop:"5%"}}></img>
            </div>

        </section>
    )
};


export default Home;