const express = require('express')
const app = express()
const port = 8080
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
let names = ['Joao', 'Victor', 'Maria', 'Julia', 'Pedro', 'Ana', 'Paulo', 'Carla', 'Marcos', 'Juliana']
let currentName = 0;

function insertNewName(connection) {
    connection.query(`INSERT INTO people(name) values('${names[currentName]}')`)
    currentName++;
    if (currentName >= names.length) {
        currentName = 0;
    }
}

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    insertNewName(connection);
    body = '<h1>Full Cycle</h1> <h2>Names:</h2> <ul>'

    connection.query('SELECT * FROM people', function (error, results, fields) {
        for(let i = 0; i < results.length; i++) {
            body += `<li>${results[i].name}</li>`
        }
        body += '</ul>'
        connection.end()
        res.send(body)  
    });
})

app.listen(port, ()=> {
    console.log('Running on port ' + port)
})