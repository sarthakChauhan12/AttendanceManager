const express = require('express');
const User = require('../db/Users');
const Jwt = require('jsonwebtoken');
const SendMail = require('../Controllers/SendMail');
const multer  = require('multer');

const jwtKey = 'attendance';

const router = express.Router();

//Start
const mongoose = require('mongoose');


// Set up multer middleware to handle file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as Buffers
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10 MB
});

// Route to handle file uploads
router.post('/upload', upload.single('selectedImage'), async (req, res) => {
  // Create a new Image instance and populate it with the uploaded file data
  const newImage = new Image({
    filename: req.file.originalname,
    data: req.file.buffer,
  });

  try {
    // Save the image data to the database
    await newImage.save();
    console.log('File uploaded successfully!');
    res.send('File uploaded successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file!');
  }
});

//End

// const upload = multer(
//   { storage: multer.diskStorage({
//     destination:function(req,file,cb){
//       cb(null,"uploads")
//     },
//     filename: function(req,file,cb){
//       cb(null,file.fieldname+Date.now()+".jpg");
//     }
//   }) }
//   ).single("img_upl");

// router.post('/upload', upload, (req, res) => {
//   console.log(req.file);
//   res.send('File uploaded successfully!');
// });


router.post('/mail', (req,res,next) => {
  SendMail(req.body.to, req.body.subject, req.body.text);
  res.send({message: 'Email sent'});
});

router.get('/', (req, res, next) => {
  //console.log('GET Request in Places');
  res.json({message: 'It works!'});
});

router.post('/signup', async (req, res, next) => {
    console.log(req.body);
    res.send(req.body);
    // let user = new User(req.body);
    // let result = await user.save();
    // result = result.toObject();
    // Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    //   if (err) {
    //     res.send({ result: "Try again after sometime!" });
    //   } else {
    //     res.send({ result, auth: token });
    //   }
    // });
});

router.post('/login', async (req, res, next) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Try again after sometime!" });
        } else {
          res.send({ user, auth: token });
        }
      });
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

router.get('/profile/:id',verifyToken, async(req,res,next) => {
    const result = await User.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No profile found" });
  }
})

router.get('/classlist/:classs',verifyToken,async(req,res,next) => {
  const result = await User.find({class:req.params.classs});
  if(result){
    res.send(result);
  } else {
    res.send({result: "No student in this class"});
  }
})

router.put('/list/:id',verifyToken, async(req,res) => {
  if(req.body.status==="absent"){
    const result1 = await User.updateMany({class:req.params.id,rollno: { $in: req.body.absentees }},{$push: { attendance: false}});
    const result2 = await User.updateMany({class:req.params.id,rollno: { $nin: req.body.absentees }},{$push: { attendance: true}});
  } else {
    const result1 = await User.updateMany({class:req.params.id,rollno: { $in: req.body.absentees }},{$push: { attendance: true}});
    const result2 = await User.updateMany({class:req.params.id,rollno: { $nin: req.body.absentees }},{$push: { attendance: false}});
  // res.send(result1);
  }
});

router.put("/updateprofile/:id", verifyToken,async(req,res)=>{
  const result = await User.updateOne({_id:req.params.id},{$set: req.body});
  res.send(result);
})

router.put("/updatePassword/:email", async(req,res)=>{
  const result = await User.updateOne({email:req.params.email},{password: "ImGenius"});
  res.send(result);
})

router.put("/delete/:classname", async(req,res)=> {
  const result = await User.updateMany({class:req.params.classname},{$pop: {attendance: -1}});
  res.send(result);
})

function verifyToken(req,res,next){
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      Jwt.verify(token, jwtKey, (error, valid) => {
        if (error) {
          res.status(401).send({ result: "Please provide valid token!" });
        } else {
          next();
        }
      });
    } else {
      res.status(403).send({ result: "Please add token with header!" });
    }
}
// 

module.exports = router;