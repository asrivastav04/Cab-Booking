const express = require('express')

const driverRouter = express.Router

const THRESHOLD_DISTANCE = 10

//has to be fetched from db
const Driverslocation = {
  "1": {
    x: 1,
    y:1
  },
  "2": {
    x: 2,
    y:2
  }
}

let curr_id = 0;

//endpoint to get nearestDriver's detail
driverRouter.get('/nearestDriver/:id', (req,res) => {
  //get ridersLocation from external GPS API
  const ridersLocation = {
    x: 0,
    y:0
  }
  let nearestDriverDistance = THRESHOLD_DISTANCE;
  let nearestDriverId
  //Todo: driversId will be in range of location which will be fetched from db
  for(let driversId =1; driversId<=2; i++){
    
    const apiUrl = "localhost/driver/location/driversId"
    //todo: call above apiUrl to get all the driver's location 
    distance = sqrt(pow((ridersLocation.x - Driverslocation[driversId].x),2) + pow((ridersLocation.y - Driverslocation[driversId].y),2))
    const isDriverAvailabe = true; //todo get it from db
    if(distance < nearestDriverDistance && isDriverAvailabe){
      nearestDriverDistance = distance
      nearestDriverId = driversId
    }
  }
  try{
    if(nearestDriverDistance < THRESHOLD_DISTANCE){
      res.status(200).json(Driverslocation[driversId])
    }else{
      res.status(404).json({message: "No nearest driver found"})
    }
  }catch(error){
    res.status(500).json({message: error.message})
  }

})

//endpoint to get driver's location for a particular driver's id
driverRouter.get('/location/:id', getAllDriversLocation, (req,res) => {
  try{
    if(res){
      res.status(200).json(res);
    }else{
      res.status(404).json({message: "No driver with given ID found"});
    }
  }catch(error){
    res.status(500).json({message: error.message});
  }
})

//endpoint to register the new driver
driverRouter.post('/register', (req,res) => {
  const newDriver = {
    "name": req.body.name,
    "phoneNo": req.body.phoneNumber,
    "id": curr_id
  }
  curr_id++;
  //todo save newDriver to db

  try{
    res.status(201).json({message: "Driver was successfully registered"})
  }catch(error){
    res.status(400).json({message: "Bad request, provide valid entry"})
  }
})

//endpoint to update driver's availability in case the driver with particular id has been booked now
driverRouter.patch('/updateAvailability/id', (req,res) => {
  
  const driversAvailability = true; //get drivers availability from db for above id
  const changedAvailability = !driversAvailability
  //save the changedAvailability to db
  try{
    res.status(201).json({"driversAvailability": changedAvailability})
  }catch(error){
    res.status(500).json({message: error.message})
  }


})

//middleware to return driver's location
function getDriversLocation(req,res,next){

  res.json(Driverslocation[req.params.id])
  next()

}

module.exports = driverRouter