const express =require("express")
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const nodemon=require("nodemon")
const path =require("path")
const hbs=require("hbs")
const multer=require("multer")
const LogInCollection = require("./mongodb")
const templatePath=path.join(__dirname,'../templates')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, '/SEPDS-odoo/my-uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })

const app=express()
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({ extended: false }))

const PORT = 3000;


app.get('/', (req, res) => {
    res.render('signup')
})

app.post("/signup",async (req,res) => {
    const data={
        name : req.body.name,
        password : req.body.password
    }
    
    await LogInCollection.insertMany([data])
    res.render("signup")
})

app.post("/admin",upload.single('name'),async (req,res) => {
    const data={
        papername : req.body.papername,
        assignname : req.body.assignname,
        date: req.body.date,
        time: req.body.time
    }
    
    await Collection.insertMany([data])
    res.render("/")
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password && req.body.box==="Administrator") {
            res.render("dashboard")
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})

app.listen(PORT, () => {
    console.log('port connected');
})