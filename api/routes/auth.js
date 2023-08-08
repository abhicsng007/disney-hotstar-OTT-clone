const express = require('express');
const bcrypt  = require('bcrypt');
const User = require('../models/User');

const router = express.Router();


router.post('/register',async (req,res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(409).json({message:'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User registered succesfully'});
    }
    catch(error){
        res.status(500).json({message: 'error registering user'});
        return res.status(404).json({message:'User already exists'});
    }

});

router.post('/login',async (req,res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({email});
        console.log(user);

        if(!user) {
            return res.status(404).json({message:'User not found'});
        }

        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(401).json({message:'Invalid Credentials'});
        }

        res.status(201).json({message: 'User logged in succesfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'error logging'});
    }

});

module.exports = router;