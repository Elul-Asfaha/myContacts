const mongoose = require("mongoose")
const contactSchema = mongoose.Schema({
    user_idd: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, 'please add the contact name']
    },
    email: {
        type: String,
        required: [true, 'please add the email address']
    },
    phoneNumber: {
        type: String,
        required: [true, 'please add the phone number']
    }

}, {
    timestamps: true
})
module.exports = mongoose.model("Contact", contactSchema)