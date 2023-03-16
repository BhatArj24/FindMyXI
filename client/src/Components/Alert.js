import React from 'react';

const Alert = ({type,teamRequest}) => {
    return (
        <section>
            {type==="teamRequest" && 
                <div className="alert alert-primary" role="alert" style={{width:"25%",marginLeft:"70%"}}>
                    <div className="alert-heading">
                        <h3>Team Request</h3>
                    </div>
                    <span style={{fontWeight:"bold"}}>{teamRequest.name}</span> has requested you join <span style={{fontWeight:"bold"}}>The {teamRequest.teamName}</span> on <span style={{fontWeight:"bold"}}>{teamRequest.day}</span>!
                    <div className="alert-body" style={{width:"100",marginTop:"2%"}}>
                        <button className="btn btn-success" style={{marginRight:"5%"}}>Accept</button>
                        <button className="btn btn-danger">Decline</button>
                    </div>
                </div>
            }
        </section>

    );
};

export default Alert;