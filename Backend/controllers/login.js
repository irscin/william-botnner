const loginRouter = require('express').Router()
const config=require('../utils/config')

loginRouter.post('/', async(req, res)=>{
    console.log(req.body);
    if(config.PIN===req.body.pin){
        res.status(200).json("OK")
    }else{
        res.status(401).json("Wrong PIN")
    }
})

loginRouter.get('/', (req, res)=>{
    res.status(200).json("Receiving GETs")
})

module.exports=loginRouter