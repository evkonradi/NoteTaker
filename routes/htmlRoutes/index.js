const path = require('path');
const router = require('express').Router();

router.get('/notes', (req, res)=>{
    console.log("route /notes");
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

router.get('/', (req, res)=>{
    console.log("route /");
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//router.get('*', (req, res)=>{
    //console.log("route *");
    //res.sendFile(path.join(__dirname, '../../public/index.html'));
//});

module.exports = router;