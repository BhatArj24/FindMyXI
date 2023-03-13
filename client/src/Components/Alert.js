import React from 'react';

const Alert = ({type,teamRequest}) => {
    return (
        <section>
            {type==="teamRequest" && 
                <div className="alert alert-primary" role="alert">
                    <div className="alert-heading">
                        <h3>Team Request</h3>
                    </div>
                    {teamRequest.name} has requested you join The {teamRequest.teamName} on {teamRequest.day}!
                    <div className="alert-body">
                        <button className="btn btn-success">Accept</button>
                        <button className="btn btn-danger">Decline</button>
                    </div>
                </div>
            }
        </section>

    );
};

export default Alert;