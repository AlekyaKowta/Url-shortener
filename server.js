const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ShortUrl = require('./models/shortUrl') //ShortUrl is name of model and const now
app.use(express.urlencoded({extended:false}))
mongoose.connect('mongodb://localhost/UrlShrinker',{
    useNewUrlParser:true,useUnifiedTopology:true
})

app.set('view engine', 'ejs')

app.get('/', async (req,res)=>{
    const shortUrls = await ShortUrl.find()  //shortUrls just consists of the short urls in model and displays on the page
    res.render('index',{shortUrls:shortUrls})
})

app.post('/shortUrls', async(req,res)=>{  //same as form action
    await ShortUrl.create({full: req.body.fullUrl})  // ShortUrl (the one defined above)

    res.redirect('/')
})

app.get('/:shortUrl', async (req,res)=>{
  const shortUrl =  await ShortUrl.findOne({short:req.params.shortUrl}) // ShortUrl model shortUrl is the /xys

  if(shortUrl==null) return res.sendStatus(404)

  res.redirect(shortUrl.full)

})

app.listen(process.env.PORT || 3000)