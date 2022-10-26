const { application } = require('express')
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.port || 3000
const path = require('path');
const UAParser = require('ua-parser-js')
const fs = require('fs')
const { count } = require('console')

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
    var files = fs.readdir('./static' , (err , files) => {
        
            countoffiles = files.length;
            console.log(req.url)
            var requestedfile = req.url.split('/');
            var result = files.filter(filename => filename == requestedfile[1])
            console.log(result);
            fs.access('./static/' + result , fs.F_OK , (err) => {
                if (err) {
                     send404(); console.log(`Error file does not exist!`)
                }
                else {
                    files.forEach(file => {
                        if (file == result) {
                        res.sendFile(path.join(__dirname, './static', file))
                        //console.log(`Sending file ${file}`) //TODO fix when it sends double files 
                        }
                        i++;
                    })
                }

            
                /*if (fs.access('./static/' + result , fs.R_OK , (err) => {
                    if (err === null) { send404(); console.log(`Error file does not exist!`)}
                })) {
                    send404()
                }*/
                /*else {
                    console.log(`Checking for file...`)
                    files.forEach(file => {
                        if (file == result) {
                        res.sendFile(path.join(__dirname, './static', file))
                        //console.log(`Sending file ${file}`) //TODO fix when it sends double files 
                        }
                        i++;
                    })
                }*/
            
        }
        )
        /*if (i > countoffiles - 1) {
            if (!res.headersSent) { send404(); console.log(`HEADERS SENT TRUE`)}
            console.log(`TRUE`);
        }*/
    })
})

app.use(express.static('static'));



app.listen(port, () => {
    console.log(`Server started running on port ${port}`)
})
