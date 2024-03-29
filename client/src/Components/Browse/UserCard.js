import React from 'react';
import './Card.css';
// import profilePic from '../Images/VK.jpg';
import {Card, Image, Row, Col,Table} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import toast, { Toaster } from 'react-hot-toast';
import kohli from './VK.jpg';
import bat from './cricket-bat.png';
import ball from './cricket-ball.png';
import link from './link.png';
import {storage} from './firebase-config';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import emailjs from '@emailjs/browser';
import Tooltip from './Tooltip';

const UserCard = ({player}) => {
    const [manager,setManager] = useState(null);
    const [show, setShow] = useState(false);
    const [pickSat, setPickSat] = useState(false);
    const [pickSun, setPickSun] = useState(false);
    const [imageList,setImageList] = useState();
    const imageRef = ref(storage, `images/${player._id}-folder/`)
    useEffect(() => {
        listAll(imageRef).then((response)=>{
          response.items.forEach((item)=>{
            getDownloadURL(item).then((url)=>{
              setImageList(url);
            })
          })
        })
    },[])
    const pickPlayer = async (e) => {
      e.preventDefault();
      const now = new Date();
      const dayOfWeek = now.getDay();
      const hour = now.getHours();
      if(manager===null || manager===undefined){
        toast.error("You must be logged into a manager account to pick a player");
        return;
      }
      if(dayOfWeek>0 && (dayOfWeek<5 || (dayOfWeek===5 && hour<23))){
        if(pickSat){
          if(player.availableSat){
            if(!player.primaryTeamPickedSat && !player.secondaryTeamPickedSat){
                if(manager.alerts.find(alert => alert.day==="Saturday" && alert.id===player._id)){
                  toast.error("You have already sent a request to "+player.name+" for Saturday");
      
                } else{
                  manager.alerts.push({name:player.name,day:"Saturday",id:player._id,status:"Pending"});
                  player.alerts.push({name:manager.name,day:"Saturday",id:manager._id,teamName:manager.teamName,status:"Pending"});
                  toast.success("Sent Request to "+player.name+" for Saturday");
                  const emailContent = {
                    player_email: player.email,
                    team_name: manager.teamName,
                    to_name: player.name,

                  }
                  // if player email is gmail
                  if(player.email.includes("gmail")){
                  emailjs.send("service_r06z936","template_o90qlkc",emailContent,"jb0sHBpxEqFcrpWTc")
                  .then((result) => {
                      console.log(result.text);
                  })
                  .catch((error) => {
                      console.log(error.text);
                  }
                  );     
                } // if player email is outlook
                else if(player.email.includes("outlook")){
                  emailjs.send("service_vg25zsg","template_o90qlkc",emailContent,"jb0sHBpxEqFcrpWTc")
                  .then((result) => {
                      console.log(result.text);
                  })
                  .catch((error) => {
                      console.log(error.text);
                  }
                  );     
                }
              }
          }
          else{
            toast.error("Player is already picked for Saturday")

          }
        }
        else{
          toast.error("Player is not available for Saturday")
        }
      }
        if(pickSun){
          if(player.availableSun){
            if(!player.primaryTeamPickedSun && !player.secondaryTeamPickedSun){
              if(manager.alerts.find(alert => alert.day==="Sunday" && alert.id===player._id)){

                toast.error("You have already sent a request to "+player.name+" for Sunday");
    
              } else{
                manager.alerts.push({name:player.name,day:"Sunday",id:player._id,status:"Pending"});
                player.alerts.push({name:manager.name,day:"Sunday",id:manager._id,teamName:manager.teamName,status:"Pending"});
                toast.success("Sent Request to "+player.name+" for Sunday");
                const emailContent = {
                  player_email: player.email,
                  team_name: manager.teamName,
                  to_name: player.name,

                }
                if(player.email.includes("gmail")){
                  emailjs.send("service_r06z936","template_o90qlkc",emailContent,"jb0sHBpxEqFcrpWTc")
                  .then((result) => {
                      console.log(result.text);
                  })
                  .catch((error) => {
                      console.log(error.text);
                  }
                  );     
                } // if player email is outlook
                else if(player.email.includes("outlook")){
                  emailjs.send("service_vg25zsg","template_o90qlkc",emailContent,"jb0sHBpxEqFcrpWTc")
                  .then((result) => {
                      console.log(result.text);
                  })
                  .catch((error) => {
                      console.log(error.text);
                  }
                  );     
                }
            }
            } else{
              toast.error("Player is already picked for Sunday")

            }
          }
          else{
            toast.error("Player is not available for Sunday")
          }
        }
      saveChanges("player");
      saveChanges("manager");
      setShow(false);
      } else{
        toast.error("You can only request players Monday through Friday 11pm");
      }
    }
    
    useEffect(() => {
      const getManager = async () => {
        var managerId = sessionStorage.getItem("userId");
        if(managerId===null){
          return;
        }
        try{
          const url = "https://findmyxi.onrender.com/api/profile/"+managerId;
          const {data: res} = await axios.get(url);
          if(res.data.isPlayer===false){
          setManager(res.data);
          }

        }
        catch(err){
          console.log(err);
        }
      }
      getManager();
    }, []);
    
    const saveChanges = async (type) => {

      if(type==="manager"){

        try{
          const url = "https://findmyxi.onrender.com/api/setup";
          const { data: res } = await axios.post(url, manager);
          setShow(false);
        } catch(err){
          console.log(err);
        }
      }
      else{

        try{
          const url = "https://findmyxi.onrender.com/api/setup";
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
                    <Modal.Title>Request Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Pick for Saturday?</p>
                    { /*if set pick sat, make background green or make it white with text color green*/ }
                    <Button variant="success" style={{backgroundColor:(pickSat===true ? "green" : "white"),color:(pickSat===true ? "white" : "green")}} onClick={()=>setPickSat(true)}>Yes</Button>
                    <Button variant="danger" style={{backgroundColor:(pickSat===false ? "red" : "white"),color:(pickSat===false ? "white" : "red")}}onClick={()=>setPickSat(false)}>No</Button>
                    <p>Pick for Sunday?</p>
                    <Button variant="success" style={{backgroundColor:(pickSun===true ? "green" : "white"),color:(pickSun===true ? "white" : "green")}} onClick={()=>setPickSun(true)}>Yes</Button>
                    <Button variant="danger" style={{backgroundColor:(pickSun===false ? "red" : "white"),color:(pickSun===false ? "white" : "red")}} onClick={()=>setPickSun(false)}>No</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" style={{backgroundColor:"green",color:"white"}} onClick={pickPlayer}> Save Changes </Button>

                    <Button variant="danger" style={{backgroundColor:"red",color:"white"}} onClick={()=>setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
      </Modal>
      <div className="block rounded-lg p-4 w-80 mb-10 ml-9 bg-slate-100 mt-6 hover:bg-blue-50 lg:w-96">
    
          <div className='h-56 w-full rounded-md object-cover'>
            <Image
              alt="Profile Pic"
              src={imageList}
              style={{height:"100%",width:"100%",objectFit:"scale-down"}}
            />
          </div>
          

          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Role</dt>

                <dd className="text-sm text-gray-500">{player.role}: {player.battingPos}, {player.bowlingType}</dd>
              </div>

              <div>
                <dt className="sr-only">Name</dt>

                <dd className="font-medium">{player.name}, {player.age}</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-8 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <img src={bat} className='h-4 w-4'>
                    </img>
                
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Batting Hand</p>

                  <p className="font-medium">{player.battingHand}</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <img src={ball} className='h-4 w-4'>
                </img>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Bowling Hand</p>

                  <p className="font-medium">{player.bowlingHand}</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 hover:bg-blue-100 hover:cursor-pointer hover:rounded-md" onClick={()=>{window.open(player.CricClubsLink)}}>
                <img src={link} className='h-4 w-4'>
                </img>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">CricClubs Id</p>

                  <p className="font-medium">{player.CricClubsId}</p>
                </div>
              </div>
            </div>
            <div className='mt-6 items-center'>
                <table className='table-auto m-auto'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>Team</th>
                            {player.availableSat && <th className='px-4 py-2'>Saturday</th>}
                            {player.availableSun && <th className='px-4 py-2'>Sunday</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border px-1 py-1 text-xs lg:px-4 lg:py-2 lg:text-base'>{player.primaryTeam}</td>
                            {player.availableSat && <td className='border px-1 py-1 lg:px-4 lg:py-2' style={{backgroundColor: (player.primaryTeamPickedSat ? "green" : "white")}}></td>}
                            {player.availableSun && <td className='border px-1 py-1 lg:px-4 lg:py-2' style={{backgroundColor: (player.primaryTeamPickedSun ? "green" : "white")}}></td>}
                        </tr>
                        <tr className='bg-gray-100'>
                            <td className='border px-1 py-1 lg:px-4 lg:py-2'>Other</td>
                            {player.availableSat && <td className='border px-1 py-1 lg:px-4 lg:py-2' style={{backgroundColor: (player.secondaryTeamPickedSat ? "green" : "white")}}>
                              <p style={{marginLeft:"10%", color:"white"}}>{player.secondaryTeamPickedSat ? player.secondaryTeamSat : null}</p>
                            </td>}
                            {player.availableSun && <td className='border px-1 py-1 lg:px-4 lg:py-2' style={{backgroundColor: (player.secondaryTeamPickedSun ? "green" : "white")}}>
                              <p style={{marginLeft:"10%", color:"white"}}>{player.secondaryTeamPickedSun ? player.secondaryTeamSun : null}</p>

                            </td>}
                        </tr>

                    </tbody>
                </table>
                <Tooltip text="Availability Table Information">
                  <p>This table shows the availability of the player. If they are available Saturday, the Saturday column will appear. If they are available Sunday, the Sunday column will appear. If a cell is green, that means the player has been picked already.</p>  
                </Tooltip>        
            </div>
            <div className='mt-6 items-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-8 w-48 lg:mx-16' onClick={()=>setShow(true)}>
                    Pick Player
                </button>
            </div>
          </div>
        </div>
    </section>
    );
};



export default UserCard;