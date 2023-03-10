import React from 'react';
import './Card.css';
// import profilePic from '../Images/VK.jpg';
import {Card, Image, Row, Col,Table} from 'react-bootstrap';

const UserCard = ({player}) => {
    const pickPlayer = (e) => {
        e.preventDefault();
        var managerId = localStorage.getItem("userId");
        if(managerId===null){
            alert("Please login to pick a player");
            return;
        }
        console.log("player picked");
    }

    return (
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
          {player.availableSat && <td style={{backgroundColor: (player.primaryTeamPickedSat ? "green" : "red")}}></td>}
          {player.availableSun && <td style={{backgroundColor: (player.primaryTeamPickedSun ? "green" : "red")}}></td>}
        </tr>
        <tr>
          <td>Other</td>
          {player.availableSat && <td style={{backgroundColor: (player.secondaryTeamPickedSat ? "green" : "red")}}></td>}
          {player.availableSun && <td style={{backgroundColor: (player.secondaryTeamPickedSun ? "green" : "red")}}></td>}
        </tr>
      </tbody>
    </Table>
  </Col>
</Row>

      </Card.Body>

      <Card.Footer>
        <button className="btn btn-primary" onClick={pickPlayer} style={{marginLeft:"43%",backgroundColor:"#355cdc"}}>
          Pick Player
        </button>
      </Card.Footer>

    </Card>
    );
};



export default UserCard;