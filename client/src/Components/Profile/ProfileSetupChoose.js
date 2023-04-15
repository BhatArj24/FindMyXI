import React from 'react';
import { Link} from 'react-router-dom';
import logo from '../../Images/Logo Icon.png';
import team from './group.png';
import player from './user.png';

const ProfileSetupChoose = () => {
    return(
        <section>
            <div style={{display:"flex"}}>
                <img src={logo} alt="a" style={{width:"100px",height:"80px",paddingTop:"10px",paddingLeft:"20px"}}></img>
                <h1 style={{paddingTop:"10px",paddingLeft:"20px", fontWeight:"bold"}} className='text-4xl'>Choose Profile Type</h1>
            </div>
            <div style={{width:"100%",height:"100%",marginTop:"5%"}}>
                <div style={{padding:"15px",width:"100%"}} className='flex flex-col lg:flex-row'>
                    <Link to={'/profile-setup-player'}  className="btn btn-lg text-light btn-light bg-slate-200 w-56 m-auto mt-4 lg:w-1/3">
                        <img src={player} className='mx-auto w-80'></img>
                        <h1 className='text-black font-bold mb-3' style={{fontSize:"36px"}}>I am a Player</h1>
                    </Link>
                    <Link to={"/profile-setup-manager"} className="btn btn-lg text-light btn-light bg-slate-200 w-56 m-auto mt-4 lg:w-1/3">
                        <img src={team} className='mx-auto w-80'></img>
                        <h1 className='text-black font-bold mb-3' style={{fontSize:"36px"}}>I am a Team Captain</h1>
                    </Link>
                </div>
            </div>
        </section>
    );

};


export default ProfileSetupChoose;