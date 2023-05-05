import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import "./ProfilePage.css";
import pic from "./VK.jpg";
import { Image } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase-config";
import emailjs from "@emailjs/browser"
import {Input} from 'reactstrap';

const getNextSaturdayAndSunday = () => {
  const today = new Date();
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7));
  const nextSunday = new Date(nextSaturday);
  nextSunday.setDate(nextSaturday.getDate() + 1);
  return { nextSaturday, nextSunday };
};
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [imageList, setImageList] = useState();
  const [availabilityShow, setAvailabilityShow] = useState(false);
  const { nextSaturday, nextSunday } = getNextSaturdayAndSunday();
  const saturdayStr = nextSaturday.toLocaleDateString();
  const sundayStr = nextSunday.toLocaleDateString();
  const [manager, setManager] = useState(null);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [passStatus, setPassStatus] = useState(null);
  const [changeTeamShow, setChangeTeamShow] = useState(false);
  const [teams, setTeams] = useState([]);
  const getProfile = async () => {
    const userId = sessionStorage.getItem("userId");
    const url = `https://findmyxi.onrender.com/api/profile/${userId}`;
    try {
      const { data: res } = await axios.get(url);
      setProfile(res.data);
      if(profile.isPlayer === null){
        toast.error("You have not set up your profile yet. Please click the button below to set up your profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTeams = async () => {
    const url = "https://findmyxi.onrender.com/api/teams";
    try{
      const res = await axios.get(url);
      setTeams(Object.values(res.data));
    } catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    if (profile !== null) {
      const imageRef = ref(storage, `images/${profile._id}-folder/`)
      listAll(imageRef).then((response)=>{
        response.items.forEach((item)=>{
          getDownloadURL(item).then((url)=>{
            setImageList(url);
          })
        })
      })
    }
  }, [profile]);
  useEffect(() => {
    
    const user = sessionStorage.getItem("userId");
    if (user === null) {
      navigate("/login");
    } else {
      getProfile();
      getTeams();
      // setDisplayAlerts(true);
    }
  }, []);

  useEffect(() => {
    if (manager !== null) {
      manager.alerts.forEach((managerAlert) => {
        if (managerAlert.id === profile._id && managerAlert.day === currentAlert.day ) {
          managerAlert.status = passStatus;
          setManager({ ...manager, alerts: manager.alerts });
          if(passStatus === "Accepted"){
            manager.pickedPlayers.push({id: profile._id, name: profile.name, role: profile.role, age: profile.age, phoneNumber:profile.phoneNumber,email:profile.email});
          } 
          saveChangesManager(currentAlert.id);
          const emailContent = {
            player_name: profile.name,
            manager_name: manager.name,
            manager_email: manager.email,
    
          }
          // if player email is gmail
          if(manager.email.includes("gmail")){
          emailjs.send("service_r06z936","template_uj9zjas",emailContent,"jb0sHBpxEqFcrpWTc")
          .then((result) => {
              console.log(result.text);
          })
          .catch((error) => {
              console.log(error.text);
          }
          );     
        } // if player email is outlook
        else if(manager.email.includes("outlook")){
          emailjs.send("service_vg25zsg","template_uj9zjas",emailContent,"jb0sHBpxEqFcrpWTc")
          .then((result) => {
              console.log(result.text);
          })
          .catch((error) => {
              console.log(error.text);
          }
          );     
        }
          setManager(null);
        }
      });
    }
  }, [manager]);
  const logOut = () => {
    sessionStorage.removeItem("userId");
    navigate("/login");
  };
  const saveChanges = async (type) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    if(type==="availability"){
      if(dayOfWeek > 0 && (dayOfWeek < 7)) {
        try {
          const url = "https://findmyxi.onrender.com/api/setup";
          const { data: res } = await axios.post(url, profile);
          setAvailabilityShow(false);
          toast.success("Changes Saved");
          return;
        } catch (err) {
          console.log(err);
        }
      } else{
        toast.error("You can only change availability between Monday and Saturday");
        return;
      }
    }
    try {
      const url = "https://findmyxi.onrender.com/api/setup";
      const { data: res } = await axios.post(url, profile);
      setAvailabilityShow(false);
      toast.success("Changes Saved");
    } catch (err) {
      console.log(err);
    }
  };
  const saveChangesPlayer = async () => {
    try {
      const url = "https://findmyxi.onrender.com/api/setup";
      const { data: res } = await axios.post(url, profile);
    } catch (err) {
      console.log(err);
    }
  };
  const getManager = async (id) => {
    const url = `https://findmyxi.onrender.com/api/profile/${id}`;
    try {
      const { data: res } = await axios.get(url);
      setManager(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const saveChangesManager = async (id) => {
    
    try {
      const url = "https://findmyxi.onrender.com/api/setup";
      const { data: res } = await axios.post(url, manager);

    } catch (err) {
      console.log(err);
    }
  };
  const acceptTeamRequest = async (alert) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    var r = window.confirm("Are you sure you want to accept this request?");
    if(dayOfWeek < 6 || (dayOfWeek === 6 && hour < 23)){
    if(r){
      alert.status = "Accepted";
      if(alert.day === "Saturday"){
        if(!profile.primaryTeamPickedSat && !profile.secondaryTeamPickedSat){
        if(alert.teamName === profile.primaryTeam){
          profile.primaryTeamPickedSat = true;
        }else{
          profile.secondaryTeamPickedSat = true;
          profile.secondaryTeamSat = alert.teamName;
        }
      }
      else{
        toast.error("You have already picked a team for Saturday");
        return;
      }
      }else{
        if(!profile.primaryTeamPickedSun && !profile.secondaryTeamPickedSun){
        if(alert.teamName === profile.primaryTeam){
          profile.primaryTeamPickedSun = true;
        }else{
          profile.secondaryTeamPickedSun = true;
          profile.secondaryTeamSun = alert.teamName;
        }
      }
      else{
        toast.error("You have already picked a team for Sunday");
        return;
      }
    }
      setPassStatus("Accepted");
      setCurrentAlert(alert);
      setProfile({ ...profile, alerts: profile.alerts });
      saveChangesPlayer();
      getManager(alert.id);
      
    }
  }else{
    toast.error("You can only accept requests before 11 pm on Saturday");
    return;
  }
  };
  const declineTeamRequest = async (alert) => {
    var r = window.confirm("Are you sure you want to decline this request?");
    if(r){
      alert.status = "Declined";
      setPassStatus("Declined");
      setCurrentAlert(alert);
      setProfile({ ...profile, alerts: profile.alerts });
      saveChangesPlayer();
      getManager(alert.id);
    }
  };
  const handleChange = ({ currentTarget: input }) => {
		setProfile({ ...profile, [input.name]: input.value });
	};
  return (
    <section>
      <NavBar />
      <Toaster />
      {profile !== null && profile.isPlayer  ? (
        profile.alerts.map((alert) => {
          if (alert.status === "Pending") {
            return (
              <div
                className="alert alert-primary"
                role="alert"
                style={{ width: "25%", marginLeft: "70%" }}
              >
                
                <div className="alert-heading">
                  <h3>Team Request</h3>
                </div>
                <span style={{ fontWeight: "bold" }}>{alert.name}</span> has
                requested you join{" "}
                <span style={{ fontWeight: "bold" }}>The {alert.teamName}</span>{" "}
                on <span style={{ fontWeight: "bold" }}>{alert.day}</span>!
                <div
                  className="alert-body"
                  style={{ width: "100", marginTop: "2%" }}
                >
                  <button
                    className="btn btn-success"
                    style={{ marginRight: "5%" }}
                    onClick={() => {
                      acceptTeamRequest(alert);
                    }}
                  >
                    Accept
                  </button>
                  <button 
                  className="btn btn-danger" 
                  onClick={() => {
                    declineTeamRequest(alert);
                  }}
                  >Decline</button>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div></div>
      )}

      <Modal show={availabilityShow} onHide={() => {
        window.location.reload();
        
        setAvailabilityShow(false)
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Set Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you available on {saturdayStr}?</p>
          <Button
            variant="success"
            onClick={() => setProfile({ ...profile, availableSat: true })}
            style={{backgroundColor:"green",color:"white"}}
          >
            Yes
          </Button>
          <Button
            variant="danger"
            onClick={() => setProfile({ ...profile, availableSat: false })}
            style={{backgroundColor:"red",color:"white"}}
          >
            No
          </Button>
          <p>Are you available on {sundayStr}?</p>
          <Button
            variant="success"
            onClick={() => setProfile({ ...profile, availableSun: true })}
            style={{backgroundColor:"green",color:"white"}}
          >
            Yes
          </Button>
          <Button
            variant="danger"
            onClick={() => setProfile({ ...profile, availableSun: false })}
            style={{backgroundColor:"red",color:"white"}}
          >
            No
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=>saveChanges("availability")} style={{backgroundColor:"green",color:"white"}}>
            {" "}
            Save Changes{" "}
          </Button>

          <Button variant="danger" onClick={() => {
            setAvailabilityShow(false)
        window.location.reload();
            
            }} style={{backgroundColor:"red",color:"white"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal show={changeTeamShow} onHide={() => {
          window.location.reload();
          setChangeTeamShow(false)
          
          }}>
        <Modal.Header closeButton>
          <Modal.Title>Change Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Input type="select" name="primaryTeam" id="primaryTeam" onChange={handleChange} style={{width:"30%"}}>
                    <option value=""></option>
                    <option value="None">None</option>
                    {teams.map(team=>(
                        team.map(t=>(
                          <option value={t.teamName}>{t.teamName}</option>
                        )
                        )
                    ))}
                </Input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={()=>{
            saveChangesPlayer()
            setChangeTeamShow(false)
            toast.success("Team Changed")
          }} style={{backgroundColor:"green",color:"white"}}>
            {" "}
            Save Changes{" "}
          </Button>
          <Button variant="danger" onClick={() => {
            setChangeTeamShow(false)
        window.location.reload();
            
            }} style={{backgroundColor:"red",color:"white"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {profile ? (
        <div style={{ width: "100%", height: "100%" }}>
          <Image
            className="rounded"
            alt="pfp"
            style={{
              width: "20%",
              marginLeft: "40%",
              height: "20%",
              marginBottom: "1%",
            }}
            src={imageList}
          ></Image>
          {/* <img className="rounded-circle" alt="pfp" style={{width:"5%",marginLeft:"45%"}} src={imageList}></img> */}
          <Container>
            <Row>
              <Col>
                <h1 style={{ fontWeight: "bold", textAlign: "center" }} className="text-4xl">
                  {profile.name}'s Profile
                </h1>
              </Col>
            </Row>
            {profile.isPlayer === true ? (
              <div>
              <h3 style={{ marginTop: "1%" }} className="text-3xl">Player Details: </h3>
              <Row>
              <Col>Role: {profile.role}</Col>
              <Col>Age: {profile.age}</Col>
            </Row>
            <Row>
              <Col>Batting Hand: {profile.battingHand}</Col>
              <Col>Batting Position: {profile.battingPos}</Col>
            </Row>
            <Row>
              <Col>Bowling Hand: {profile.bowlingHand}</Col>
              <Col>Bowling Type: {profile.bowlingType}</Col>
            </Row>
            <Row>
              <Col>Primary Team: {profile.primaryTeam}</Col>
            </Row>
              </div>
            ) : (
              <div>
                <h3 style={{ marginTop: "1%" }} className="text-3xl">Manager Details: </h3>
                <Row>
              <Col>Captain Name: {profile.name}</Col>
              <Col>Division: {profile.division}</Col>
              <Col>Team Name: {profile.teamName}</Col>
            </Row>
              </div>

            )}
            
            <h3 style={{ marginTop: "1%" }} className="text-3xl">Contact Details: </h3>
            <Row>
              <Col>Phone Number: {profile.phoneNumber}</Col>
              <Col>Email: {profile.email}</Col>
            </Row>
            
            {profile.isPlayer === true ? (
              <div>
                <h3 style={{ marginTop: "1%" }} className="text-3xl">Availability: </h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Saturday - {saturdayStr}</th>
                  <th>Sunday - {sundayStr}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Availability</td>
                  {profile.availableSat ? (
                    <td style={{ backgroundColor: "green" }}></td>
                  ) : (
                    <td style={{ backgroundColor: "red" }}></td>
                  )}
                  {profile.availableSun ? (
                    <td style={{ backgroundColor: "green" }}></td>
                  ) : (
                    <td style={{ backgroundColor: "red" }}></td>
                  )}
                </tr>
              </tbody>
            </Table>
            <Button
              variant="primary"
              onClick={() => setAvailabilityShow(true)}
              block
              style={{ marginTop: "2%",backgroundColor:"blue" }}
            >
              Set Availability
            </Button>
            </div>
            ) : (
              <div>
                {/* Display Status of alerts */}
                <h3 style={{ marginTop: "1%" }} className="text-3xl">Alert Status: </h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Day</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.alerts.map((alert) => {
                        return (
                          <tr>
                            <td>{alert.name}</td>
                            <td>{alert.day}</td>
                            {/* If status is Accepted, then make background color green */}
                            {alert.status === "Accepted" ? (
                              <td style={{ backgroundColor: "green", color:"white" }}>
                                {alert.status}
                              </td>
                            ) : (
                              null
                            )}
                            {alert.status === "Declined" ? (
                              <td style={{ backgroundColor: "red", color:"white" }}>
                                {alert.status}
                              </td>
                            ) : (
                              null
                            )}
                            {alert.status === "Pending" ? (
                              <td style={{ backgroundColor: "yellow", color:"black" }}>
                                {alert.status}
                              </td>
                            ) : (
                              null
                            )}
                          </tr>
                        );
                    })}
                  </tbody>
                </Table>
            
              </div>
            )}
            {/* If isPlayer is false, show all pickedPlayers */}
            {profile.isPlayer === false ? (
              <div>
                <h3 style={{ marginTop: "1%" }} className="text-3xl">Picked Players: </h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Age</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.pickedPlayers.map((player) => {
                      return (
                        <tr>
                          <td>{player.name}</td>
                          <td>{player.role}</td>
                          <td>{player.age}</td>
                          <td>{player.phoneNumber}</td>
                          <td>{player.email}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div>
                <h3 style={{ marginTop: "1%" }} className="text-3xl">My Teams: </h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Team Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Saturday</td>
                      <td>
                      {profile.primaryTeamPickedSat ? (
                        <td>{profile.primaryTeam}</td>
                      ) : (
                        <td>{profile.secondaryTeamSat}</td>
                      )}
                      </td>
                    </tr>
                    <tr>
                      <td>Sunday</td>
                      <td>
                      {profile.primaryTeamPickedSun ? (
                        <td>{profile.primaryTeam}</td>
                      ) : (
                        <td>{profile.secondaryTeamSun}</td>
                      )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="primary" onClick={() => setChangeTeamShow(true)} block style={{ marginTop: "2%",backgroundColor:"blue" }}>
                  Change Team
                </Button>
              </div>
            )}
            <Button
              variant="success"
              onClick={()=>{
                sessionStorage.setItem("curr","edit");
                navigate('/profile-setup-choose')
              }
              }
              block
              style={{ marginRight: "2%",backgroundColor:"green", marginTop:"2%" }}
            >
              Edit Profile / Complete Setup
            </Button>
            <Button
              variant="danger"
              onClick={logOut}
              block
              style={{ backgroundColor:"red", marginTop:"2%" }}
            >
              Log out
            </Button>
          </Container>
        </div>
      ) : (
        <div>
        <h1>Cannot Load Profile, please reload or return to login</h1>
        <Button
              variant="danger"
              onClick={()=>{
                sessionStorage.removeItem("userId");
                navigate("/login");
              }}
              block
              style={{ marginTop: "2%",backgroundColor:"red" }}
            >
              Return to Login
            </Button>
            </div>
      )}
    </section>
  );
};
export default Profile;
