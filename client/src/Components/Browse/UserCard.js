import React from 'react';
import './Card.css';
// import profilePic from '../Images/VK.jpg';
import {Card, Image, Row, Col,Table} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import toast, { Toaster } from 'react-hot-toast';


const UserCard = ({player}) => {
    const [manager,setManager] = useState();
    const [show, setShow] = useState(false);
    const [pickSat, setPickSat] = useState(false);
    const [pickSun, setPickSun] = useState(false);

    const pickPlayer = (e) => {
      e.preventDefault();
      if(manager===null || manager===undefined){
        toast.error("You must be logged into a manager account to pick a player");
        return;
      }
      console.log(manager);
        if(pickSat){
          if(!player.primaryTeamPickedSat && !player.secondaryTeamPickedSat){
              if(manager.alerts.find(alert => alert.day==="Saturday" && alert.id===player._id)){
                console.log(alert)
                toast.error("You have already sent a request to "+player.name+" for Saturday");
    
              } else{
                manager.alerts.push({name:player.name,day:"Saturday",id:player._id,status:"Pending"});
                player.alerts.push({name:manager.name,day:"Saturday",id:manager._id,teamName:manager.teamName,status:"Pending"});
                toast.success("Sent Request to "+player.name+" for Saturday");
                // pickSat = false;
                // send email here
            }
        }
      }
      else{
        toast.error("Player is already picked for Saturday")
      }
      
        if(pickSun){
          if(!player.primaryTeamPickedSun && !player.secondaryTeamPickedSun){
            if(manager.alerts.find(alert => alert.day==="Sunday" && alert.id===player._id)){
              console.log(alert)
              toast.error("You have already sent a request to "+player.name+" for Sunday");
  
            } else{
              manager.alerts.push({name:player.name,day:"Sunday",id:player._id,status:"Pending"});
              player.alerts.push({name:manager.name,day:"Sunday",id:manager._id,teamName:manager.teamName,status:"Pending"});
              toast.success("Sent Request to "+player.name+" for Sunday");
              // pickSat = false;
              // send email here
          }
      }
        }
        else{
          toast.error("Player is already picked for Sunday")
        }
      saveChanges("player");
      saveChanges("manager");
      setShow(false);
    }
    
    useEffect(() => {
      const getManager = async () => {
        var managerId = localStorage.getItem("userId");
        if(managerId===null){
          return;
        }
        try{
          const url = "http://localhost:8080/api/profile/"+managerId;
          const {data: res} = await axios.get(url);
          setManager(res.data);
          console.log(manager);
        }
        catch(err){
          console.log(err);
        }
      }
      getManager();
    }, []);
    
    const saveChanges = async (type) => {
      console.log("trying to save");
      if(type==="manager"){
        console.log("trying to save manager");
        try{
          const url = "http://localhost:8080/api/setup";
          const { data: res } = await axios.post(url, manager);
          setShow(false);
        } catch(err){
          console.log(err);
        }
      }
      else{
        console.log("trying to save player");
        try{
          const url = "http://localhost:8080/api/setup";
          const { data: res } = await axios.post(url, player);
          setShow(false);
        } catch(err){
          console.log(err);
        }
      }
    }



    return (
      <section>
        <Toaster />
      <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Pick for Saturday?</p>
                    <Button variant="success" onClick={()=>setPickSat(true)}>Yes</Button>
                    <Button variant="danger" onClick={()=>setPickSat(false)}>No</Button>
                    <p>Pick for Sunday?</p>
                    <Button variant="success" onClick={()=>setPickSun(true)}>Yes</Button>
                    <Button variant="danger" onClick={()=>setPickSun(false)}>No</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={pickPlayer}> Save Changes </Button>

                    <Button variant="danger" onClick={()=>setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
          
    <Card style={{width:"50%",margin:"auto",marginTop:"3%"}}>
      <Card.Body>
        <Row>
          <Col xs={4}>
            <div className="image-container">
            <Image /*src={imageList}*/ className="image-circle" />
            </div>
          </Col>
          <Col xs={8}>
            <Card.Title style={{fontSize:"35px"}}>{player.name}</Card.Title>
            <Card.Subtitle>Age: {player.age}</Card.Subtitle>
            <Card.Text style={{marginTop:"7px"}}>Role: {player.role}</Card.Text>
            <Card.Text>Batting Hand: {player.battingHand}</Card.Text>
            <Card.Text>Batting Position: {player.battingPos}</Card.Text>
            <Card.Text>Bowling Hand: {player.bowlingHand}</Card.Text>
            <Card.Text>Bowling Type: {player.bowlingType}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card.Header className="card-header">Statistics</Card.Header>
          </Col>
        </Row>
        <Row style={{width:"100%",marginLeft:"10%"}}>
          <Col xs={4}>
            <Card.Text style={{padding:"3px",marginTop:"7px",marginBottom:"7px"}}><div className="stats">CricClubs Link: </div>{player.CricClubsLink}</Card.Text>
          </Col>
          <Col xs={4}>
            <Card.Text style={{padding:"3px",marginTop:"7px",marginBottom:"7px"}}><div className="stats">CricClubs Id: </div>{player.CricClubsId}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card.Header className="card-header">Contact Information</Card.Header>
          </Col>
        </Row>
        <Row style={{width:"100%",marginLeft:"5%"}}>
          <Col xs={6}>
            <Card.Text style={{padding:"3px",marginTop:"7px",marginBottom:"7px",marginLeft:"75px"}}><div className='stats'>Email: </div>{player.email}</Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text style={{padding:"3px",marginTop:"7px",marginBottom:"0px",marginLeft:"75px"}}><div className='stats'>Phone Number: </div>{player.phoneNumber}</Card.Text>
          </Col>
        </Row>
        <Row>
  <Col xs={12}>
    <Card.Header className="card-header">Availability</Card.Header>
  </Col>
</Row>
<Row>
  <Col xs={12}>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          {player.availableSat && <th>Saturday</th>}
          {player.availableSun && <th>Sunday</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{player.primaryTeam}</td>
          {player.availableSat && <td style={{backgroundColor: (player.primaryTeamPickedSat ? "green" : "white")}}></td>}
          {player.availableSun && <td style={{backgroundColor: (player.primaryTeamPickedSun ? "green" : "white")}}></td>}
        </tr>
        <tr>
          <td>Other</td>
          {player.availableSat && <td style={{backgroundColor: (player.secondaryTeamPickedSat ? "green" : "white")}}></td>}
          {player.availableSun && <td style={{backgroundColor: (player.secondaryTeamPickedSun ? "green" : "white")}}></td>}
        </tr>
      </tbody>
    </Table>
  </Col>
</Row>

      </Card.Body>

      <Card.Footer>
        <button className="btn btn-primary" onClick={()=>setShow(true)} style={{marginLeft:"43%",backgroundColor:"#355cdc"}}>
          Pick Player
        </button>
      </Card.Footer>

    </Card>
    </section>
    );
};



export default UserCard;