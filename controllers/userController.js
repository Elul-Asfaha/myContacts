const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
//@desc Register a user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvaliable = await User.findOne({ email })
    if (userAvaliable) {
        res.status(400)
        throw new Error("User already registered")
    }
    res.json({
        message: "Register the user"
    })
})
//@desc Register a user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({
        message: "Login the user"
    })
})
//@desc Register a user
//@route Post /api/users/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
    res.json({
        message: "Current user information"
    })
})


module.exports = { registerUser, loginUser, currentUser }