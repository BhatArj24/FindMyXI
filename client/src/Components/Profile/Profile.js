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

  const getProfile = async () => {
    const userId = localStorage.getItem("userId");
    const url = `http://localhost:8080/api/profile/${userId}`;
    try {
      const { data: res } = await axios.get(url);
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (user === null) {
      navigate("/login");
    } else {
      getProfile();
      setImageList(pic);
      // setDisplayAlerts(true);
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  const saveChanges = async () => {
    try {
      const url = "http://localhost:8080/api/setup";
      const { data: res } = await axios.post(url, profile);
      setAvailabilityShow(false);
      alert("Changes Saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <NavBar />
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
                  >
                    Accept
                  </button>
                  <button className="btn btn-danger">Decline</button>
                </div>
              </div>
            );
          }
        })
      ) : (
        <h1>no alerts</h1>
      )}

      <Modal show={availabilityShow} onHide={() => setAvailabilityShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you available on {saturdayStr}?</p>
          <Button
            variant="success"
            onClick={() => setProfile({ ...profile, availableSat: true })}
          >
            Yes
          </Button>
          <Button
            variant="danger"
            onClick={() => setProfile({ ...profile, availableSat: false })}
          >
            No
          </Button>
          <p>Are you available on {sundayStr}?</p>
          <Button
            variant="success"
            onClick={() => setProfile({ ...profile, availableSun: true })}
          >
            Yes
          </Button>
          <Button
            variant="danger"
            onClick={() => setProfile({ ...profile, availableSun: false })}
          >
            No
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveChanges}>
            {" "}
            Save Changes{" "}
          </Button>

          <Button variant="danger" onClick={() => setAvailabilityShow(false)}>
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
                <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
                  {profile.name}'s Profile
                </h1>
              </Col>
            </Row>
            {profile.isPlayer === true ? (
              <h3 style={{ marginTop: "1%" }}>Player Details: </h3>
            ) : (
              <h3 style={{ marginTop: "1%" }}>Manager Details: </h3>
            )}
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
              <Col>Secondary Team: {profile.secondaryTeam}</Col>
            </Row>
            <h3 style={{ marginTop: "1%" }}>Statistics: </h3>
            <Row>
              <Col>Matches Played: {profile.matches}</Col>
              <Col>Runs: {profile.runs}</Col>
              <Col>Wickets: {profile.wickets}</Col>
            </Row>
            <h3 style={{ marginTop: "1%" }}>Contact Details: </h3>
            <Row>
              <Col>Phone Number: {profile.phoneNumber}</Col>
              <Col>Email: {profile.email}</Col>
            </Row>
            <h3 style={{ marginTop: "1%" }}>Availability: </h3>
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
              style={{ marginTop: "2%" }}
            >
              Set Availability
            </Button>

            <Button
              variant="danger"
              onClick={logOut}
              block
              style={{ marginTop: "2%" }}
            >
              Log out
            </Button>
            {/* <Button
              variant="success"
              onClick={() => setDisplayAlerts(true)}
              block
              style={{ marginTop: "2%" }}
            >
              Load Requests
            </Button> */}
          </Container>
        </div>
      ) : (
        <h1>Cannot Load Profile</h1>
      )}
    </section>
  );
};
export default Profile;
