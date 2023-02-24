const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors())
mongoose.connect('mongodb://0.0.0.0:27017/notebook', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('Connected to MongoDB')
    }
})

const schema = {
    name: String,
    email: String,
    password: String,
    notebook: String
}
const monmodel= mongoose.model('NEWCOL', schema)

app.post('/register', (req, res) => {
    const { name, email, password, notebook } = req.body
    console.log(name, email, password, notebook)
    if (name && email && password) {
        const newuser = new monmodel({ name, email, password, notebook })
        newuser.save()
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please provide credentials')
})

app.post("/login", (req, res) => {
    const { email } = req.body
    console.log(email)
    monmodel.find({ email }, (err, data) => {
        // console.log(data[0].password)
        if (err) {
            console.log(err)
        }
        else {
            if(data[0].password==req.body.password)
                res.status(200).json({ success: true, data: data })
            else
                res.status(401).send('Incorrect username or password')
        }
    })
})





app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})