const express=require('express');
const app=express();
require("dotenv").config() 
const bodyParser=require('body-parser')
require('./models/config')
const Book=require('./models/books')
const PORT=5000;
app.use(express.json())
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (req,res)=>{
    const formData = await Book.find();
    res.render('index',{formData})
})
app.post('/add',(req,res)=>{
    const title=req.body.title ;
    const author=req.body.author ;
    const isbn=req.body.isbn ;
    
    const newData=new Book({
        title:title,
        author:author,
        isbn:isbn
    });
    newData.save();
    res.redirect('/');
})
app.post('/deletedata',async (req,res)=>{
    try {
        const isbn=req.body.isbn;
        await Book.deleteOne({ isbn: isbn})
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(PORT,()=>{
    console.log(`listening at PORT: ${PORT}`);
})
