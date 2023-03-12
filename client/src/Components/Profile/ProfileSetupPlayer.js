import React, { useEffect, useState} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
import logo from '../../Images/Logo Icon.png';
import './ProfileSetup.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {storage} from '../../firebase-config';
import {ref, uploadBytes} from 'firebase/storage';

const ProfileSetupPlayer = () => {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [teams, setTeams] = useState([]);
  const [data, setData] = useState({
    _id: localStorage.getItem("userId"),
		age: 0,
    role: "",
    battingHand: "",
    battingPos: "",
    bowlingHand: "",
    bowlingType: "",
    CricClubsLink: "",
    CricClubsId: "",
    isPlayer: true,
    primaryTeam: "",
    secondaryTeam: "",
    phoneNumber: 0,
    primaryTeamPickedSat: false,
    secondaryTeamPickedSat: false,
    primaryTeamPickedSun: false,
    secondaryTeamPickedSun: false,
    availableSat: false,
    availableSun: false,
    alerts: [],
	});
  const uploadImage = (id)=>{
    console.log(id);
    if(imageUpload==null) return;
    const imageRef = ref(storage,`images/${id}`);
    uploadBytes(imageRef,imageUpload).then(() =>{
      alert("Image Uploaded");
    }).catch((error) => {
      console.log(error);
    })
  } 
  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
  const getTeams = async () => {
    const url = "http://localhost:8080/api/teams";
    try{
      console.log("trying");
      const res = await axios.get(url);
      setTeams(Object.values(res.data));
    } catch(error){
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
      console.log("trying")
			const url = "http://localhost:8080/api/setup";
			const { data: res } = await axios.post(url, data);
      uploadImage(data._id);
			navigate("/browse");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
        console.log(error.response.data.message);
				// setError(error.response.data.message);
			}
		}
	};
  useEffect(() => {
    getTeams();
  }, []);

  return (
    <section>
    <div style={{display:"flex"}}>
        <img src={logo} style={{width:"100px",height:"80px",paddingTop:"10px",paddingLeft:"20px"}} alt="a"></img>
        <h1 style={{paddingTop:"10px",paddingLeft:"20px", fontWeight:"bold"}}>Profile Setup</h1>
    </div>
    <div style={{marginLeft:"40%",marginTop:"1%"}}>
          <div>
            <FormGroup>
              <Label for="profilePic" style={{fontWeight:"bold"}}>Profile Picture:</Label>
              <Input type="file" name="profilePic" id="profilePic" onChange={(event)=>{setImageUpload(event.target.files[0])}} style={{width:"30%"}}/>
            </FormGroup>
            <FormGroup>
              <Label for="age" style={{fontWeight:"bold"}}>Age:</Label>
              <Input type="number" name="age" id="age" onChange={handleChange} style={{width:"30%"}} />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber" style={{fontWeight:"bold"}}>Phone Number:</Label>
              <Input type="text" name="phoneNumber" id="phoneNumber" onChange={handleChange} style={{width:"30%"}}/>
            </FormGroup>
            <FormGroup>
              <Label for="role" style={{fontWeight:"bold"}}>Role:</Label>
              <Input type="select" name="role" id="role" onChange={handleChange} style={{width:"30%"}}>
                <option value=""></option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="Batting All-Rounder">Batting All-Rounder</option>
                <option value="Bowling All-Rounder">Bowling All-Rounder</option>
                <option value="Wicket Keeper Batsman">Wicket Keeper Batsman</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="battingHand" style={{fontWeight:"bold"}}>Batting Hand:</Label>
              <Input type="select" name="battingHand" id="battingHand" onChange={handleChange} style={{width:"30%"}}>
                <option value=""></option>
                <option value="Right">Right</option>
                <option value="Left">Left</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="battingPos" style={{fontWeight:"bold"}}>Batting Position:</Label>
              <Input type="select" name="battingPos" id="battingPos" onChange={handleChange} style={{width:"30%"}}>
                <option value=""></option>
                <option value="Top Order">Top Order</option>
                <option value="Middle Order">Middle Order</option>
                <option value="Lower Order">Lower Order</option>
            </Input>
            </FormGroup>
            <FormGroup>
                <Label for="bowlingHand" style={{fontWeight:"bold"}}>Bowling Hand:</Label>
                <Input type="select" name="bowlingHand" id="bowlingHand" onChange={handleChange} style={{width:"30%"}}>
                    <option value=""></option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="bowlingType" style={{fontWeight:"bold"}}>Bowling Type:</Label>
                <Input type="select" name="bowlingType" id="bowlingType" onChange={handleChange} style={{width:"30%"}}>
                    <option value=""></option>
                    <option value="Pace">Pace</option>
                    <option value="Off-Spin">Off-spin</option>
                    <option value="Leg-Spin">Leg-spin</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="primaryTeam" style={{fontWeight:"bold"}}>Primary Team:</Label>
                <Input type="select" name="primaryTeam" id="primaryTeam" onChange={handleChange} style={{width:"30%"}}>
                    <option value="None">None</option>
                    {teams.map(team=>(
                        team.map(t=>(
                          <option value={t.teamName}>{t.teamName}</option>
                        )
                        )
                    ))}
                </Input>
            </FormGroup>
            {/* <FormGroup>
                <Label for="secondaryTeam" style={{fontWeight:"bold"}}>Secondary Team:</Label>
                <Input type="select" name="secondaryTeam" id="secondaryTeam" onChange={handleChange} style={{width:"30%"}}>
                    <option value="None">None</option>
                    {teams.map(team=>(
                        team.map(t=>(
                          <option value={t.teamName}>{t.teamName}</option>
                        )
                        )
                    ))}
                </Input>
            </FormGroup> */}
            <FormGroup>
                <Label for="CricClubsLink" style={{fontWeight:"bold"}}>CricClubs Link:</Label>
                <Input type="text" name="CricClubsLink" id="matches" onChange={handleChange} style={{width:"30%"}}/>
            </FormGroup>
            <FormGroup>
                <Label for="CricClubsId" style={{fontWeight:"bold"}}>CricClubs Id:</Label>
                <Input type="text" name="CricClubsId" id="runs" onChange={handleChange} style={{width:"30%"}}/>
            </FormGroup>

                </div>
                
                <div style={{padding:"15px"}}>
                    <button id="saveBtn" className="btn btn-sm p-2 text-light btn-dark" style={{marginLeft:"8%"}} onClick={handleSubmit}>Save</button>
                </div>
                </div>
                </section>
);
}

export default ProfileSetupPlayer;
