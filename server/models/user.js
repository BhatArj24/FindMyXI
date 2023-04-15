const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number},
    battingHand: { type: String},
    battingPos: { type: String},
    bowlingHand: { type: String},
    bowlingType: { type: String},
    CricClubsLink: { type: String},
    CricClubsId: { type: String},
    isPlayer: { type: Boolean},
    profilePic: { type: String},
    primaryTeam: { type: String},
    secondaryTeamSat: { type: String},
    secondaryTeamSun: { type: String},
    role: { type: String},
    phoneNumber: { type: String},
    teamName: { type: String},
    primaryTeamPickedSat : { type: Boolean},
    secondaryTeamPickedSat : { type: Boolean},
    primaryTeamPickedSun : { type: Boolean},
    secondaryTeamPickedSun : { type: Boolean},
    availableSat : { type: Boolean},
    availableSun : { type: Boolean},
    alerts : { type: Array},
    pickedPlayers : { type: Array},
    division : { type: String},
});

userSchema.methods.generateAuthToken = function () {
    // const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn: "7d"});
    const token = this._id;
    return token
};

const User = mongoose.model('user', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        name:Joi.string().required().label("Name"),
        email:Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = {User, validate};
