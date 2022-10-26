const { application } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.port || 3000
const path = require('path');
const UAParser = require('ua-parser-js')
const fs = require('fs')
const { count } = require('console')
const { send } = require('process')

app.get('/', (req , res) => {
    res.sendFile(path.join(__dirname, './static', 'index.html'))
})
app.get('/status', (req , res) => {
    res.sendFile()
})

app.use((req , res , next) => {
    const send404 = () => {
        var parser = new UAParser()
        var ua = req.headers['user-agent']
        var browsername = parser.setUA(ua).getBrowser().name;
        switch (browsername) {
            case 'Firefox':
                res.sendFile(path.join(__dirname, './static', 'notfound.html'))
            break
            case 'Chrome':
                res.sendFile(path.join(__dirname, './static', 'notfound.html'))
            break
            case 'Canary':
                res.sendFile(path.join(__dirname, './static', 'notfound.html'))
            break
            case 'Safari':
                res.sendFile(path.join(__dirname, './static', 'notfound.html'))
            break
            case 'Opera':
                res.sendFile(path.join(__dirname, './static', 'notfound.html'))
            break
            default:
                res.sendFile(path.join(__dirname, './static', 'notfound.html'))
            break
        }
    }
    var i = 0;
    var countoffiles = 0;
    //Check if the client is a user using a browser or not 
            console.log(req.url)
            var requestedfile = req.url.split('/');
            var result = requestedfile[1]
            console.log(result);
            var file = fs.existsSync('./static/' + result);
            if (!file) {
                console.log(`404`)
                send404()
            }
            else {
                res.sendFile(__dirname + '/static/' + result)
            }
        
    })


app.use(express.static('static'));



app.listen(port, () => {
    console.log(`Server started running on port ${port}`)
})
