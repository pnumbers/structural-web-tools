const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs')


const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/beam-design', (req, res)=>{
    res.render('beam.ejs')
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})