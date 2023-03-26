const router = require('express').Router();
const {User} = require('../models/user');

router.post("/",async (req,res) => {
    try{
        console.log(req.body);
        const user = await User.findById({_id:req.body._id});
        if(user){
            user.age = req.body.age;
            user.role = req.body.role;
            user.battingHand = req.body.battingHand;
            user.battingPos = req.body.battingPos;
            user.bowlingHand = req.body.bowlingHand;
            user.bowlingType = req.body.bowlingType;
            user.profilePic = req.body.profilePic;
            user.CricClubsId = req.body.CricClubsId;
            user.CricClubsLink = req.body.CricClubsLink;
            user.isPlayer = req.body.isPlayer;
            user.primaryTeam = req.body.primaryTeam;
            user.secondaryTeamSat = req.body.secondaryTeamSat;
            user.secondaryTeamSun = req.body.secondaryTeamSun;
            user.phoneNumber = req.body.phoneNumber;
            user.teamName = req.body.teamName;
            user.primaryTeamPickedSat = req.body.primaryTeamPickedSat;
            user.secondaryTeamPickedSat = req.body.secondaryTeamPickedSat;
            user.primaryTeamPickedSun = req.body.primaryTeamPickedSun;
            user.secondaryTeamPickedSun = req.body.secondaryTeamPickedSun;
            user.availableSat = req.body.availableSat;
            user.availableSun = req.body.availableSun;
            user.pickedPlayers = req.body.pickedPlayers;
            user.alerts = req.body.alerts;
            user.division = req.body.division;
            await user.save();
            const token = user.generateAuthToken();
            res.status(201).send({message:"User updated successfully",data:token});
        } 

    } catch (err) {
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports = router;