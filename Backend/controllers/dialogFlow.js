const dialogFlowRouter=require('express').Router()
const axios = require('axios')
const news = require('../models/news')
const config=require('../utils/config')
const News = require('../models/news')

dialogFlowRouter.post('/', async(req, res)=>{
    var toSend = ''
    if(req.body.queryResult.action!==undefined && req.body.queryResult.action==='input.welcome'){
        hello()
    }else if(req.body.queryResult.parameters.theme==='Esportes'){
        sendNews(await News.find({'theme':'Esportes'}))
    }else if(req.body.queryResult.parameters.theme==='Política'){
        sendNews(await News.find({'theme':'Política'}))
    }else if(req.body.queryResult.parameters.theme==='Entretenimento'){
        sendNews(await News.find({'theme':'Entretenimento'}))
    }else if(req.body.queryResult.parameters.theme==='Famosos'){
        sendNews(await News.find({'theme':'Famosos'}))
    }
    //console.log(req.body);
})

const sendTextMessage = async (message, id) => {
    const toSend = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": id
        },
        "message": {
            "text": message
        }
    }
    sendJSON(toSend)
}

const sendJSON = async (JSON)=>{
    await axios.post(config.FACEBOOK_KEY, JSON)
}

const hello = async ()=>{
    toSend = {
        "recipient":{
          "id":"3619073084850692"
        },
        "messaging_type": "RESPONSE",
        "message":{
          "text": "Oi, eu sou o William Botnner (ou Casper, se você não tiver senso de humor) e trago notícias.",
          "quick_replies":[
            {
              "content_type":"text",
              "title":"Esportes",
              "payload":"Esportes"
            },{
              "content_type":"text",
              "title":"Política",
              "payload":"Política"
            },{
                "content_type":"text",
                "title":"Entretenimento",
                "payload":"Entretenimento"
            },{
                "content_type":"text",
                "title":"Famosos",
                "payload":"Famosos"
              }
          ]
        }
      }
      sendJSON(toSend)
}

const sendNews = async(newsToReturn)=>{
    if(newsToReturn.length!==0){
        //sendTextMessage('Temos notícias', 3619073084850692)
        newsToReturn=newsToReturn.slice(0,9)

        var JSONToSend={
            "recipient":{
              "id":"3619073084850692"
            },
            "message":{
              "attachment":{
                "type":"template",
                "payload":{
                  "template_type":"generic",
                  "elements":[
                  ]
                }
              }
            }
        }

        
        for(var i=0; i<newsToReturn.length; i++){
            var toPushToJSON={
                "title":"",
                "image_url":"",
                "subtitle":"",
                "default_action": {
                  "type": "web_url",
                  "url": "https://petersfancybrownhats.com/view?item=103",
                  "messenger_extensions": false,
                  "webview_height_ratio": "tall"
                },
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"",
                    "title":"Leia a notícia"
                  }             
                ]      
              }
            toPushToJSON.title=newsToReturn[i].title
            toPushToJSON.subtitle=newsToReturn[i].description
            toPushToJSON.image_url=newsToReturn[i].img_url
            toPushToJSON.buttons[0].url=newsToReturn[i].link
            JSONToSend.message.attachment.payload.elements.push(toPushToJSON)
        }
        sendJSON(JSONToSend)
    }else{
        sendTextMessage('Desculpe, não tenho notícias', 3619073084850692)
        setTimeout(()=>{
            hello()
        }, 1000)
        
    }
}

module.exports=dialogFlowRouter