const express = require('express')

const riderRouter = express.Router

let curr_id =  0;

//endpoint to register a new rider
riderRouter.post('/register', (req,res) => {
  const newRider = {
    "name": req.body.name,
    "phoneNo": req.body.phoneNumber,
    "id": curr_id
  }
  curr_id++;
  //todo save newDriver to db
  try{
    res.status(201).send({message: "Rider was successfully registered"})
  }catch(error){
    res.status(400).json({message: "Bad request, provide valid entry"})
  }
})

//endpoint to get the location of the rider with particular id
riderRouter.get('/location/:id', (req, res) => {
  //should be fetched from external GPS API
  const riderLocation = {
    x: 0,
    y: 0
  }
  try{
    if(res){
      res.status(200).json(riderLocation)
    }else{
      res.status(404).json({message: "No rider with given ID found"});
    }
  }catch(error){
    res.status(500).json({message: error.message});
  }
})

//endpoint to get cabDetails for particular rider's id
riderRouter.get('/cabDetails/id', (req,res)=>{
  const apiUrl = `localhost/driver/nearestDriver/${req.param.id}`
  //Todo: get nearestDriverLocation by hitting above api

  const nearestDriverLocation = {
    x: 1,
    y: 1
  }

  //Todo: get cab details for above driver from db based on nearesDriverLocation
  const cabDetails = {
    vehicleNo: "XV453",
    driverName: "abc",
    driverPhoneNo: "9801234569",
    driverCurrentLocation: nearestDriverLocation
  }

  try{
    if(res){
      res.status(200).json(cabDetails)
    }else{
      res.status(404).json({message: "No cabs associated with given driver's id"});
    }
  }catch(error){
    res.status(500).json({message: error.message});
  }

})







