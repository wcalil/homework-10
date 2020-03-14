const express = require('express');
const app = express()
const fs = require('fs');
const path = require('path')
var db = [];

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get('/notes', (req, res) => {
  return res.sendFile(path.resolve((__dirname + '/public/notes.html')
  ))
})

app.get('/api/notes', function (req, res) {
  res.sendFile(__dirname + '/db/db.json')
})

app.post('/api/notes', function (req, res) {

  var noteObject = req.body;
  db.push(noteObject)

  fs.writeFile(__dirname + '/db/db.json', JSON.stringify(db), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
    
  })

  res.json(noteObject)
  console.log(db)

})


app.delete('/api/notes/:id', function (req, res) {
  const deleteNotes = req.params.id;
  console.log(deleteNotes)
  // const found = db.find(element => deleteNotes)
  // console.log(found)
  // deleteNotesObject = JSON.parse(deleteNotes)
  // const result = db.find( ({ title }) => title === deleteNotesObject.title );
  // console.log(result)

//   for (i = 0; i < db.length ; i++){
// if(db.title[i] === ) {}

//   }


})


app.get('*', function (req, res) {
  res.sendFile(__dirname + '/../public/assets/index.html')
})




app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
