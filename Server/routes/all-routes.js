const express = require('express');
const User = require('../db/Users');
const Jwt = require('jsonwebtoken');
const jwtKey = 'attendance';

const router = express.Router();

router.get('/', (req, res, next) => {
  //console.log('GET Request in Places');
  res.json({message: 'It works!'});
});

router.post('/signup', async (req, res, next) => {
    // //console.log(req.body);
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "Try again after sometime!" });
      } else {
        res.send({ result, auth: token });
      }
    });
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
    // if (req.body.email && req.body.password) {
    //     let user = await User.findOne(req.body).select("-password");
    //     if (user) {
    //         res.send(user);
    //     }
    // }
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
  console.log(req.params.id);
  const result = await User.updateOne({_id:req.params.id},{$set: req.body,});
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