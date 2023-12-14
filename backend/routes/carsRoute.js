const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const logger = require("../logger/logging");


router.get("/getallcars", async (req, res) => {
  try {
    logger.info("[Success] List Cars Success: All available cars for rent displayed on the page.");
    const cars = await Car.find();
    logger.info("[Success] There are " + cars.length.toString() + " cars available for booking.")
    if(cars.length == 0) logger.warn("[Warning] There are no cars available for booking.")
    res.send(cars);
  } catch (error) {
    logger.error("[Failure] Failed to List Cars: Unable to retrieve the list of available cars for rent.")
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    const newcar = new Car(req.body);
    console.log(newcar)
    await newcar.save();
    logger.info("[Success] Car Added Successfully: The new car '" + newcar.name + "' has been successfully added to the inventory. Id: " + newcar._id.toString())
    if(newcar.capacity > 15) logger.warn("[Warning] Check the information correctly once again.")
    if(newcar.fuelType != 'Diesel' || newcar.fuelType != 'Electric' || newcar.fuelType != 'Petrol') logger.warn("[Warning] Check the information correctly once again.")
    res.send("Car added successfully");
  } catch (error) {
    logger.error("[Failure] Car Addition Failed: Unable to add the new car. Please check the details and try again.")
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();
    logger.info("[Success] Car Details Updated Successfully: The information for the selected car '" + car.name + "' has been successfully updated. Id: " + car._id.toString())
    if(car.capacity > 15) logger.warn("[Warning] Check the information correctly once again.")
    if(car.fuelType != 'Diesel' || newcar.fuelType != 'Electric' || newcar.fuelType != 'Petrol') logger.warn("[Warning] Check the information correctly once again.")
    res.send("Car details updated successfully");
  } catch (error) {
    logger.error("[Failure] Car Details Update Failed: Unable to update the information for the selected car. Please verify the details and try again.")
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    const car = new Car(req.body);
    logger.info("[Success] Car Deleted Successfully: The selected car has been successfully removed from the inventory. Id: " + car._id.toString())
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    logger.error("[Failure] Car Deletion Failed: Unable to delete the selected car. Please check the details and try again.")
    return res.status(400).json(error);
  }
});

module.exports = router;
