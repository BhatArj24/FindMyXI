import React from 'react';
import { Link} from 'react-router-dom';
import logo from '../../Images/Logo Icon.png';


const ProfileSetupChoose = () => {
    return(
        <section>
            <div style={{display:"flex"}}>
                <img src={logo} alt="a" style={{width:"100px",height:"80px",paddingTop:"10px",paddingLeft:"20px"}}></img>
                <h1 style={{paddingTop:"10px",paddingLeft:"20px", fontWeight:"bold"}} className='text-4xl'>Choose Profile Type</h1>
            </div>
            <div style={{width:"100%",height:"100%",marginTop:"5%"}}>
                <div style={{padding:"15px",width:"100%",display:"grid"}}>
                    <Link to={'/profile-setup-player'}  className="btn btn-lg text-light btn-dark" style={{width:"70%",margin:"auto"}}>Player Profile</Link>
                    <Link to={"/profile-setup-manager"} className="btn btn-lg text-light btn-dark" style={{width:"70%",margin:"auto",marginTop:"5%"}} >Team Manager Profile</Link>
                </div>
            </div>
        </section>
    );

};


export default ProfileSetupChoose;