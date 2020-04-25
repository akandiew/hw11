// Required elements
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());


const server = http.createServer((reg, res) =>  {
    if (reg.url === '/') {
        res.write("hello");
        res.end();
    }

    if (reg.url === '/api/notes') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

// test notes
const notes = [
    { title: "errand", text: "food shopping"},
    { title: "call", text: "Liz"},
    { title: "project", text: "fix garage"},
]


// Create HTML & API Get requests 
app.get('/notes', function (reg, res) {
    res.send("./client/public/notes.html")
})

app.get('/*', function (reg, res) {
    res.send("./client/public/index.html")
})

app.get('/api/notes', (reg, res) => {
    res.send(db.json);
});

// Create API Post requests
app.post('/api/notes', (req, res) => {
    if (!reg.body.title || !reg.body.text) {
        res.status(400).send("Your note must have a title and text.")
    }
    
    const notes = {
        id: notes.lenght + 1,
        title: req.body.title,
        text: req.body.text
    };
    notes.push(notes);
    res.send(notes);
});


// Create API Delete requests
app.delete('/api/notes/:id', (req, res) => {
    const notes = notes.find(n => n.id === parseInt(req.params.id));
    if (!notes) return res.status(404).send("The note cannot be found.");
    
    const index = notes.indexOf(notes);
    notes.splice(index, 1);

    res.send(notes);
})




// using fs to route data to db.json
// let rawData = fs.readFileSync('db.json');
// let notes = JSON.parse(rawData);


// creat a dynamic PORT for listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} . . . `));



// hint from Sam
app.use(express.static(__dirname + '/public'));

