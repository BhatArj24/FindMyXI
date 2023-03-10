const router = require('express').Router();
const {User} = require('../models/user');

router.get("/:userId",async (req,res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById({_id:userId});
        if(user){
            res.status(200).send({data:user});
        } 
    } catch (err) {
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
});

module.exports = router;