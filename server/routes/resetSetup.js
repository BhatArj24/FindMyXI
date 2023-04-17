const router = require('express').Router();
const {User} = require('../models/user');

router.post("/",async (req,res) => {
    try{
        const user = await User.findById({_id:req.body._id});
        if(user){
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt);
            user.password = hashPassword;
            
            await user.save();
            const token = user.generateAuthToken();
            res.status(201).send({message:"User updated successfully",data:token});
        } 

    } catch (err) {
        res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports = router;