import React from 'react';
import {Link} from 'react-router-dom';
import circleLogo from '../Images/CircleLogo.png'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    return(
        <header>
            <nav className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
                <Link to="/home" className="my-0 me-md-auto"><img src={circleLogo} alt="FindMyXI Logo"  style={{width:"50px"}} onClick={()=>navigate('/home')} /></Link>
                <nav className="my-2 my-md-0 me-md-3">
                    <Link className="mx-2 btn btn-sm p-2 text-light btn-dark" to="/home">Home</Link>                  
                    <Link className="mx-2 btn btn-sm p-2 text-light btn-dark" to="/browse">Browse</Link>
                    <div className="vr h-200 mx-2 text-white"></div>
                    {
                        sessionStorage.getItem("userId") ? <Link className="mx-2 btn btn-sm p-2 text-light btn-dark" to="/profile">My Profile</Link> : <Link className="mx-2 btn btn-sm p-2 text-light btn-dark" to="/login">Log In</Link>
                    }
                    
                    
                </nav>
            </nav>
      </header>
    );
};

export default NavBar;