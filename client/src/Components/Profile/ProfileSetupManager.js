import React, { useState} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
import logo from '../../Images/Logo Icon.png';
import './ProfileSetup.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {storage} from '../../firebase-config';
import {ref, uploadBytes} from 'firebase/storage';
import toast, {Toaster} from 'react-hot-toast';


const ProfileSetupManager = () => {
    const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [data, setData] = useState({
    _id: sessionStorage.getItem("userId"),
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
    const imageRef = ref(storage,`images/${id}-folder/${id}`);
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
      if(data.teamName==="" || data.phoneNumber===0 || data.division===""){
        toast.error("Please fill all the fields");
        
      }else{
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
  return (
    <section>
        <Toaster/>
        <div role="alert" class="rounded-xl border border-gray-100 p-4 shadow-xl m-auto w-2/3 mb-2 lg:w-1/3">
  <div class="flex items-start gap-4">
    <span class="text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>

    <div class="flex-1">
      <strong class="block font-medium text-gray-900">Registration</strong>

      <p class="mt-1 text-sm text-gray-700">
        You <span style={{fontWeight:"bold"}}>must</span> complete this form in order to be fully registered.
      </p>
    </div>
  </div>
</div>
    <div style={{display:"flex"}}>
        <img src={logo} alt="a" style={{width:"100px",height:"80px",paddingTop:"10px",paddingLeft:"20px"}}></img>
        <h1 style={{paddingTop:"10px",paddingLeft:"20px", fontWeight:"bold"}} className='text-4xl'>Profile Setup</h1>
    </div>
    <div style={{marginLeft:"40%",marginTop:"1%"}}>
    
                <div>
            <FormGroup>
                <Label for="profilePicture" style={{fontWeight:"bold"}}>Profile Picture:</Label>
                <Input type="file" name="profilePicture" id="profilePicture" onChange={(event)=>{setImageUpload(event.target.files[0])}} className='w-40 lg:w-1/3' />
            </FormGroup>
            <FormGroup>
                <Label for="teamName" style={{fontWeight:"bold"}}>Team Name <span style={{color:"red"}}>*</span>:</Label>
                <Input type="text" name="teamName" id="teamName" onChange={handleChange} className='w-40 lg:w-1/3'/>
            </FormGroup>
            <FormGroup>
                <Label for="phoneNumber" style={{fontWeight:"bold"}}>Phone Number <span style={{color:"red"}}>*</span>:</Label>
                <Input type="text" name="phoneNumber" id="phoneNumber" onChange={handleChange} className='w-40 lg:w-1/3' />
            </FormGroup>
            <FormGroup>
              <Label for="division" style={{fontWeight:"bold"}}>Division <span style={{color:"red"}}>*</span>:</Label>
              <Input type="select" name="division" id="division" onChange={handleChange} className='w-20 lg:w-1/3'>
                <option value=""></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </Input>
            </FormGroup>
                </div>
                <div style={{padding:"15px",width:"100%"}}>
                    {/* <button id="saveBtn" className="btn btn-sm p-2 text-light btn-dark" style={{marginLeft:"8%"}} onClick={handleSubmit}>Save</button> */}
                    <button className="bg-primary font-bold text-white rounded-3xl h-12 w-24" onClick={handleSubmit}>Save</button>
                </div>

                </div>
                </section>
);
}

export default ProfileSetupManager;
