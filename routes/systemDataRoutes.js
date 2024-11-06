
const { getData } = require('../utils/osUtils.js')
const express = require('express');
const { fstat } = require('node:fs');
const path = require('node:path');
const fs = require('fs') 

const router = express.Router();

router.get('/getData', async (req, res) => {
    try {
        let data = await getData()
        res.send(data)  
    } catch(e) {
        console.error('error fetching data: ', e)
    }
})

//reads log files
router.get('/log', (req, res) => {
    let filePath = path.join('/home/ubuntu/.pm2/logs/app-out.log')
    fs.readFile(filePath, 'utf-8', (err, data) =>{
        if(err) {
            console.error('Error reading log file:', err);
            return res.status(500).send('Error reading log file');    
        }

        res.setHeader('Content-Type', 'text/plain')
        res.send(data)
    })
})

//error log file
router.get('/errorLog', (req, res) => {
    let filePath = path.join('/home/ubuntu/.pm2/logs/app-error.log')
    fs.readFile(filePath, 'utf-8', (err, data) =>{
        if(err) {
            console.error('Error reading log file:', err);
            return res.status(500).send('Error reading log file');    
        }

        res.setHeader('Content-Type', 'text/plain')
        res.send(data)
    })
})


module.exports = router