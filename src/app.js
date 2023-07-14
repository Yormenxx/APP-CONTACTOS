const express = require("express")
const logger = require("morgan")
const path = require("path")
const app = express()


//SETTINGS
app.set("port",3000)
app.set("views",path.join(__dirname,"views") )
app.set("view engine","ejs")


//MIDDLEWARES
app.use(logger("dev"))
app.use(express.urlencoded({extended:false}))

//ROUTES


app.use(require("./routes/indexRoutes"))

//STATIC FILES


app.use(express.static(path.join(__dirname,"public")))





//ERROR

app.use((req,res,next)=>{
    res.status(404).send("Resource not found - Error 404")
})


module.exports= app