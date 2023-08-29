const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username, email, password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            _id: user.id, email: user.email
        })
    }
    else {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({
        message: "Register the user"
    })
})
//@desc login a user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
    }
    res.json({ message: "login user" })
})
//@desc Register a user
//@route Post /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


module.exports = { registerUser, loginUser, currentUser }