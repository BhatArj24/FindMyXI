const router = require('express').Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/",async (req,res) => {
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send({message:error.details[0].message});
        const temp = await User.findOne({email:req.body.email});
        if(temp) return res.status(409).send({message:"User with given email already exists"});
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        const user = await new User({...req.body,password:hashPassword}).save();
        const token = user.generateAuthToken();
        res.status(201).send({message:"User created successfully",data: token})
    } catch (err) {
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports = router;