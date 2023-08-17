const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const errorhandler = require("./middleware/errorHandler")
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use(errorhandler)
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})