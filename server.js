const express = require("express")
const path = require("path");
const fs = require("fs");

const app = express()

const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// API routes
app.get('/api/notes', (req, res) => {
  var dbData = fs.readFileSync(path.join(__dirname,'./db/db.json'));

  res.json(JSON.parse(dbData));
})

app.post('/api/notes', (req, res) => {
  var dbData = fs.readFileSync(path.join(__dirname,'./db/db.json'));

  var dbDataArray = JSON.parse(dbData);

  dbDataArray.push(req.body)

  fs.writeFileSync(path.join(__dirname,'./db/db.json'), JSON.stringify(dbDataArray))

  res.json(dbDataArray);
})



// HTML routes
app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname,'./public/notes.html'));
})
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
})


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});


