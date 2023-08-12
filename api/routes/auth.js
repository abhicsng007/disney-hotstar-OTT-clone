const express = require('express');
const bcrypt  = require('bcrypt');
const User = require('../models/User');
const {spawn} = require('child_process');

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

// router.post('/search',(req,res) => {
//     const movieTitle = req.body.movieTitle;
//     const pythonProcess = spawn('python',['../api/mlmodel/moviemodel.py',movieTitle]);
    
//     let outputData = '';
//     let errorData = '';

//     pythonProcess.stdout.on('data',(data)=>{
//         outputData += data.toString();
//         console.log('Python Process Output:', outputData);
//     });
//     pythonProcess.stderr.on('data',(data)=>{
//         errorData += data.toString();
//         console.log('Python Process Error Output:', errorData);
//     });
    
  
  
//     pythonProcess.on('close',(code) =>{
//         if(code===0) {
//             try {
//                 const recommendations = JSON.parse(outputData);
//                 res.json({recommendations});
//             } catch(error) {
//                 res.status(500).json({ error: 'error parsing recommendations'});
//             }
//         }
//         else {
//             console.log('Python Process Exit Code:', code);
//             res.status(500).json({ error: 'error running python script'});

//         }
//     });

// });

module.exports = router;