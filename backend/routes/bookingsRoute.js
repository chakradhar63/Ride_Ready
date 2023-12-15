const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf"
);

const logger = require("../logger/logging");

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    logger.info("Car Booking for the Ride");
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      logger.info("[Success] Booking Successful: Your reservation has been confirmed. Thank you for choosing our service!")
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    logger.error("Booking Failed: Unable to process your reservation. Please check your details and try again.")
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    logger.info("[Success] Get All Bookings Success: All car bookings have been successfully retrieved.");
    const bookings = await Booking.find().populate('car')
    res.send(bookings)

  } catch (error) {
    logger.error("[Failure] Get All Bookings Failed: Unable to retrieve car bookings. Please try again later.")
    return res.status(400).json(error);
  }
});

module.exports = router;
