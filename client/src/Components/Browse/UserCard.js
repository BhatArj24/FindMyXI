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
    const pickPlayer = (e) => {
      e.preventDefault();
      const now = new Date();
      const dayOfWeek = now.getDay();
      const hour = now.getHours();
      if(manager===null || manager===undefined){
        toast.error("You must be logged into a manager account to pick a player");
        return;
      }
      if(dayOfWeek>2 && (dayOfWeek<4 || (dayOfWeek===4 && hour<17))){
        if(pickSat){
          if(player.availableSat){
            if(!player.primaryTeamPickedSat && !player.secondaryTeamPickedSat){
                if(manager.alerts.find(alert => alert.day==="Saturday" && alert.id===player._id)){
                  toast.error("You have already sent a request to "+player.name+" for Saturday");
      
                } else{
                  manager.alerts.push({name:player.name,day:"Saturday",id:player._id,status:"Pending"});
                  player.alerts.push({name:manager.name,day:"Saturday",id:manager._id,teamName:manager.teamName,status:"Pending"});
                  toast.success("Sent Request to "+player.name+" for Saturday");
                  // pickSat = false;
                  // send email here
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
                // pickSat = false;
                // send email here
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
        toast.error("You can only request players before 5pm on Thursday");
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
          <Image
            alt="Profile Pic"
            src={imageList}
            className="h-56 w-full rounded-md object-cover"
          />

          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Role</dt>

                <dd className="text-sm text-gray-500">{player.role}: {player.battingPos}, {player.bowlingType}</dd>
              </div>

              <div>
                <dt className="sr-only">Name</dt>

                <dd className="font-medium">{player.name}</dd>
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
                            <td className='border px-4 py-2'>{player.primaryTeam}</td>
                            {player.availableSat && <td className='border px-4 py-2' style={{backgroundColor: (player.primaryTeamPickedSat ? "green" : "white")}}></td>}
                            {player.availableSun && <td className='border px-4 py-2' style={{backgroundColor: (player.primaryTeamPickedSun ? "green" : "white")}}></td>}
                        </tr>
                        <tr className='bg-gray-100'>
                            <td className='border px-4 py-2'>Other</td>
                            {player.availableSat && <td className='border px-4 py-2' style={{backgroundColor: (player.secondaryTeamPickedSat ? "green" : "white")}}></td>}
                            {player.availableSun && <td className='border px-4 py-2' style={{backgroundColor: (player.secondaryTeamPickedSun ? "green" : "white")}}></td>}
                        </tr>

                    </tbody>
                </table>
                            
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