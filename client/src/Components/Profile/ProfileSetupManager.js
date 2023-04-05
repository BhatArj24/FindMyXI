import React, { useState} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
import logo from '../../Images/Logo Icon.png';
import './ProfileSetup.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {storage} from '../../firebase-config';
import {ref, uploadBytes} from 'firebase/storage';


const ProfileSetupManager = () => {
    const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [data, setData] = useState({
    _id: localStorage.getItem("userId"),
    isPlayer: false,
    teamName: "",
    phoneNumber: 0,
    alerts: [],
    pickedPlayers: [],
    division: "",
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
  return (
    <section>
    <div style={{display:"flex"}}>
        <img src={logo} alt="a" style={{width:"100px",height:"80px",paddingTop:"10px",paddingLeft:"20px"}}></img>
        <h1 style={{paddingTop:"10px",paddingLeft:"20px", fontWeight:"bold"}} className='text-4xl'>Profile Setup</h1>
    </div>
    <div style={{marginLeft:"40%",marginTop:"1%"}}>
    
                <div>
            <FormGroup>
                <Label for="profilePicture" style={{fontWeight:"bold"}}>Profile Picture:</Label>
                <Input type="file" name="profilePicture" id="profilePicture" onChange={(event)=>{setImageUpload(event.target.files[0])}} style={{width:"30%"}} />
            </FormGroup>
            <FormGroup>
                <Label for="teamName" style={{fontWeight:"bold"}}>Team Name:</Label>
                <Input type="text" name="teamName" id="teamName" onChange={handleChange} style={{width:"30%"}}/>
            </FormGroup>
            <FormGroup>
                <Label for="phoneNumber" style={{fontWeight:"bold"}}>Phone Number:</Label>
                <Input type="text" name="phoneNumber" id="phoneNumber" onChange={handleChange} style={{width:"30%"}} />
            </FormGroup>
            <FormGroup>
              <Label for="division" style={{fontWeight:"bold"}}>Division:</Label>
              <Input type="select" name="division" id="division" onChange={handleChange} style={{width:"30%"}}>
                <option value=""></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </Input>
            </FormGroup>
                </div>
                <div style={{padding:"15px"}}>
                    <button id="saveBtn" className="btn btn-sm p-2 text-light btn-dark" style={{marginLeft:"8%"}} onClick={handleSubmit}>Save</button>
                </div>

                </div>
                </section>
);
}

export default ProfileSetupManager;
