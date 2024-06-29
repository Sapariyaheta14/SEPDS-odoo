const express =require("express")
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const nodemon=require("nodemon")
const path =require("path")
const hbs=require("hbs")
const LogInCollection = require("./mongodb")
const templatePath=path.join(__dirname,'../templates')

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

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
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