import React, { useEffect, useState} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
import logo from '../../Images/Logo Icon.png';
import './ProfileSetup.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {storage} from '../../firebase-config';
import {ref, uploadBytes} from 'firebase/storage';
import toast, {Toaster} from 'react-hot-toast';

const ProfileSetupPlayer = () => {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [teams, setTeams] = useState([]);
  const [data, setData] = useState({
    _id: sessionStorage.getItem("userId"),
		age: 0,
    role: "",
    battingHand: "",
    battingPos: "",
    bowlingHand: "",
    bowlingType: "",
    CricClubsLink: "",
    CricClubsId: "",
    isPlayer: true,
    primaryTeam: "None",
    secondaryTeamSat: "",
    secondaryTeamSun: "",
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
    const imageRef = ref(storage,`images/${id}-folder/${id}`);
    uploadBytes(imageRef,imageUpload).then(() =>{
      alert("Image Uploaded");
    }).catch((error) => {
      console.log(error);
    })
  } 
  const getProfile = async () => {
    const userId = sessionStorage.getItem("userId");
    const url = `https://findmyxi.onrender.com/api/profile/${userId}`;
    try {
      const { data: res } = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
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
  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
     // check if any fields are empty
      if(data.age === 0 || data.role === "" || data.battingHand === "" || data.battingPos === "" || data.bowlingHand === "" || data.bowlingType === "" || data.primaryTeam === "" || data.phoneNumber === 0){
        toast.error("Please fill in all fields");
        
      } else {
        const url = "https://findmyxi.onrender.com/api/setup";
			const { data: res } = await axios.post(url, data);
      uploadImage(data._id);
			navigate("/browse");
      }
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
    if(sessionStorage.getItem("curr")==="edit"){
      getProfile();
    }
  }, []);

  return (
    <section>
      <Toaster/>
      <div role="alert" className="rounded-xl border border-gray-100 p-4 shadow-xl m-auto w-2/3 mb-2 lg:w-1/3">
  <div className="flex items-start gap-4">
    <span className="text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>

    <div className="flex-1">
      <strong className="block font-medium text-gray-900">Registration</strong>

      <p className="mt-1 text-sm text-gray-700">
        You <span style={{fontWeight:"bold"}}>must</span> complete this form in order to be fully registered.
      </p>
    </div>
  </div>
</div>
    <div style={{display:"flex"}}>
        <img src={logo} style={{width:"100px",height:"80px",paddingTop:"10px",paddingLeft:"20px"}} alt="a"></img>
        <h1 style={{paddingTop:"10px",paddingLeft:"20px", fontWeight:"bold"}} className='text-4xl'>Profile Setup</h1>
    </div>
    <div style={{marginLeft:"40%",marginTop:"1%"}}>
          <div>
            <FormGroup>
              <Label for="profilePic" style={{fontWeight:"bold"}}>Profile Picture:</Label>
              <Input type="file" name="profilePic" id="profilePic" onChange={(event)=>{setImageUpload(event.target.files[0])}} className='w-40 lg:w-1/3'/>
            </FormGroup>
            <FormGroup>
              <Label for="age" style={{fontWeight:"bold"}}>Age <span style={{color:"red"}}>*</span>:</Label>
              <Input type="number" name="age" id="age" onChange={handleChange} style={{width:"30%"}} value={data.age !== 0 ? data.age : null}  />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber" style={{fontWeight:"bold"}}>Phone Number <span style={{color:"red"}}>*</span>:</Label>
              <Input type="text" name="phoneNumber" id="phoneNumber" onChange={handleChange} className='w-40 lg:w-1/3' value={data.phoneNumber !== 0 ? data.phoneNumber : null}/>
            </FormGroup>
            <FormGroup>
              <Label for="role" style={{fontWeight:"bold"}}>Role <span style={{color:"red"}}>*</span>:</Label>
              <Input type="select" name="role" id="role" onChange={handleChange} className='w-40 lg:w-1/3' value={data.role !== "" ? data.role : ""}>
                <option value=""></option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="Batting All-Rounder">Batting All-Rounder</option>
                <option value="Bowling All-Rounder">Bowling All-Rounder</option>
                <option value="Wicket Keeper Batsman">Wicket Keeper Batsman</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="battingHand" style={{fontWeight:"bold"}}>Batting Hand <span style={{color:"red"}}>*</span>:</Label>
              <Input type="select" name="battingHand" id="battingHand" onChange={handleChange} className='w-24 lg:w-1/3' value={data.battingHand !== "" ? data.battingHand : ""}>
                <option value=""></option>
                <option value="Right">Right</option>
                <option value="Left">Left</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="battingPos" style={{fontWeight:"bold"}}>Batting Position <span style={{color:"red"}}>*</span>:</Label>
              <Input type="select" name="battingPos" id="battingPos" onChange={handleChange} className='w-40 lg:w-1/3' value={data.battingPos !== "" ? data.battingPos : ""}>
                <option value=""></option>
                <option value="Top Order">Top Order</option>
                <option value="Middle Order">Middle Order</option>
                <option value="Lower Order">Lower Order</option>
            </Input>
            </FormGroup>
            <FormGroup>
                <Label for="bowlingHand" style={{fontWeight:"bold"}}>Bowling Hand <span style={{color:"red"}}>*</span>:</Label>
                <Input type="select" name="bowlingHand" id="bowlingHand" onChange={handleChange} className='w-24 lg:w-1/3' value={data.bowlingHand !== "" ? data.bowlingHand : ""}>
                    <option value=""></option>
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="bowlingType" style={{fontWeight:"bold"}}>Bowling Type <span style={{color:"red"}}>*</span>:</Label>
                <Input type="select" name="bowlingType" id="bowlingType" onChange={handleChange} className='w-40 lg:w-1/3' value={data.bowlingType !== "" ? data.bowlingType : ""}>
                    <option value=""></option>
                    <option value="Pace">Pace</option>
                    <option value="Off-Spin">Off-spin</option>
                    <option value="Leg-Spin">Leg-spin</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="primaryTeam" style={{fontWeight:"bold"}}>Primary Team <span style={{color:"red"}}>*</span>:</Label>
                <Input type="select" name="primaryTeam" id="primaryTeam" onChange={handleChange} className='w-40 lg:w-1/3' value={data.primaryTeam !== "None" ? data.primaryTeam : "None"}>
                    <option value="None">None</option>
                    {teams.map(team=>(
                        team.map(t=>(
                          <option value={t.teamName}>{t.teamName}</option>
                        )
                        )
                    ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="CricClubsLink" style={{fontWeight:"bold"}}>Link to CricClubs Profile:</Label>
                <Input type="text" name="CricClubsLink" id="matches" onChange={handleChange} className='w-40 lg:w-1/3' value={data.CricClubsLink !== "" ? data.CricClubsLink : ""}/>
            </FormGroup>
            <FormGroup>
                <Label for="CricClubsId" style={{fontWeight:"bold"}}>CricClubs Id:</Label>
                <Input type="text" name="CricClubsId" id="runs" onChange={handleChange} className='w-40 lg:w-1/3' value={data.CricClubsId !== "" ? data.CricClubsId : ""}/>
            </FormGroup>

                </div>
                
                <div style={{padding:"15px"}}>
                <button className="bg-primary font-bold text-white rounded-3xl h-12 w-24" onClick={handleSubmit}>Save</button>
                </div>
                </div>
                </section>
);
}

export default ProfileSetupPlayer;
