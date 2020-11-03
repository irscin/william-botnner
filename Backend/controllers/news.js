const newsRouter = require('express').Router()
const News = require('../models/news')

newsRouter.post('/', async(req, res)=>{
    let alreadyRegistered = false
    const newsAlreadyRegisted = await News.find({})
    newsAlreadyRegisted.forEach(e => {
        if(e.title==req.body.title){
            alreadyRegistered=true
        }
    });
    if(alreadyRegistered){
        return res.status(400).json('Notícia já registrada')
    }else{
        const news = new News({
            title: req.body.title,
            description: req.body.description,
            theme: req.body.theme,
            link: req.body.link,
            img_url: req.body.img_url
        })
    
        const savednews = await news.save()
    
        res.json(savednews)
    }
})

newsRouter.get('/', async  (req, res)=>{
    await News.find({}).then(news=>res.status(200).json(news))
})

newsRouter.put('/:id', async (req, res)=>{
    await News.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(result=>res.status(200).json(result))
})

newsRouter.delete('/:id', async (req, res)=>{
    const result = await News.deleteOne({_id: req.params.id})
    console.log('DELETE');
    console.log(result);
    if(result){
        res.status(204).json('DELETED')
    }else{
        res.status(400).end()
    }
})

module.exports=newsRouter