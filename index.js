const express = require('express');
const Joi = require('joi');
const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());


const genres = [
    {
        id: 1,
        name: 'genre1',
    },
    {
        id: 2,
        name: 'genre2',
    },
    {
        id: 3,
        name: 'genre3',
    },
    {
        id: 4,
        name: 'genre4',
    }
];

app.get('/', (req, res) => {
    res.send('This is our home page');
});

app.get('/api/genres', (req, res) => {

    const listOfGenres = [];

    genres.forEach( genre =>  listOfGenres.push(genre) );

    if(listOfGenres.length === 0) return res.send('Their are no items in this category.');

    res.send(listOfGenres);

});

app.get('/api/genres/:id', (req, res) => {

    const id = req.params.id;
    const genre = genres.find( genre => genre.id === parseInt(id));
    if(!genre) return res.status(404).send('Your search parameter is invalid');
    
    res.send(genre);
    
});

app.post('/api/genres', (req, res) => {

    const { error } =  validateGenre(req.body);
    if(error ) return res.status(400).send(error.details[0].message);

    const {name} = req.body;
    const newGenre = {
        id: genres.length + 1,
        name: name
    };

    const genre = genres.find( genre => genre.name === newGenre.name);
    if(genre) return res.status(400).send('This genre already exists.');

    genres.push(newGenre);
    res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {

    const genre = genres.find( genre => genre.id === parseInt(req.params.id) );
    if(!genre) return res.status(404).send('The data you request does not exist');

    const { error } = validateGenre(req.body);
    if(error ) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});


app.delete('/api/genres/:id', (req, res) => {

    const genre = genres.find( genre => genre.id === parseInt(req.params.id) );
    if(!genre) return res.status(404).send('The data you request does not exist');

    const index = genres.indexOf(genre);
    
    const deletedGenre = genres.splice(index, 1);
    res.send(deletedGenre);
    
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(20).required()
    };

    return Joi.validate(course, schema);
}


app.listen(port, () => console.log(`Listening on port ${port}...`)
);