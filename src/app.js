import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';

import forecast from './utils/forecast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT||3000;

const publicFolderPath = path.join(__dirname, 'public')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.use(express.static(publicFolderPath));



app.get('/', (req, res)=>{
    res.render('index', {
        title:'Main',
        // name: 'Maqsud'
    })
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        name:'Turaev Maqsud'
    })
});

app.get('/about', (req, res)=>{
    return res.render('about', {
        title:'About me',
        name:'Turaev Maqsud'
    })
});

app.get('/weather', (req, res)=>{
    const address = req.query.address;
    
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    forecast(address, (error, data)=>{
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: data,
            location:data.location
        })
    });
   
});

app.get('/products', (req, res)=>{
    const query = req.query;
    res.send({
        products:[],
        query
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Turaev Maqsud',
        error: 'Help Article Not Found'        
    })
});

app.get('*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Turaev Maqsud',
        error: 'Page Not Found'
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});