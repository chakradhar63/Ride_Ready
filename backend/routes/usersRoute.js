const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const logger = require("../logger/logging");


router.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username, password })
        if (user) {
            logger.info("[Success] Login Success: User '" + username + "' has successfully logged in.");
            res.send(user)
        }
        else {
            logger.error("[Failure] Login Failure: Incorrect username or password.");
            return res.status(400).json(error);
        }
    } catch (error) {
        logger.error("[Failure] Login Failure. Please try again later.");
        return res.status(400).json(error);
    }
});

router.post("/register", async (req, res) => {
    try {
        const newuser = new User(req.body)
        await newuser.save()
        logger.info("[Success] Registration Success: User '" + newuser.username + "' has been successfully registered. Id: " + newuser._id.toString());
        res.send('User registered successfully')
    } catch (error) {
        logger.error("[Failure] Registration Failure: An unexpected error occurred during registration. Please try again later.");
        return res.status(400).json(error);
    }
});

module.exports = router

