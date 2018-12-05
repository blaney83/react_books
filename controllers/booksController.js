let axios = require("axios")
const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Saved
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    if(req.params.search){

    db.Book
      .findById(req.params.search)
      .then(dbModel => {
        let body = {
          title: dbModel.title || "No Title Found",
          author: dbModel.author,
          description: dbModel.description,
          img: dbModel.img,
          etag: dbModel.etag,
          averageRating: dbModel.averageRating,
          infoLink: dbModel.infoLink
        }
        db.Saved
          .create(body)
          .then(savedModel => {
            console.log(savedModel)
            console.log("saved")
            res.send("saved")
          })
      })
      .catch(err => res.status(422).json(err));
    }else{
      db.Books
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }

  },
  create: function (req, res) {
    console.log("we got this far")
    let searchTerm = req.params.search.trim()
    if (searchTerm.includes(" ")) {
      searchTerm = searchTerm.replace(" ", "+")
    }
    dataHolder = []
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=AIzaSyBm67gwaaHPjy9Qdi2s4ge9ZT-6c02U2Sw")
      .then(function (resp) {
        console.log(resp.data.items.length)
        resp.data.items.forEach(obj => {
          if (obj.volumeInfo.imageLinks == undefined) {
            obj.volumeInfo.imageLinks = {
              smallThumbnail: "https://placehold.it/200x200"
            }
          }
          if (obj.volumeInfo.authors == undefined) {
            obj.volumeInfo.authors = "No authors listed"
          } else if (obj.volumeInfo.authors.length > 1) {
            obj.volumeInfo.authors = obj.volumeInfo.authors.join(", ")
          } else {
            obj.volumeInfo.authors = obj.volumeInfo.authors[0]
          }
          console.log(obj.etag)
          let body = {
            title: obj.volumeInfo.title || "no title",
            author: obj.volumeInfo.authors || "no author",
            description: obj.volumeInfo.description || "no description",
            img: obj.volumeInfo.imageLinks.smallThumbnail,
            etag: obj.etag || "no id",
            averageRating: obj.volumeInfo.averageRating || "no rating",
            infoLink: obj.volumeInfo.infoLink || "no link"
          }
          dataHolder.push(body)
        })
        db.Book.deleteMany({}).then(resp => {
          console.log(resp)
          // console.log(dataHolder)
          db.Book
            .create(dataHolder)
            .then(dbModel => {
              console.log(dbModel[0]._id)
              res.send(dbModel)
            }
            )
            .catch(err=>{
              console.log("Did not write")}
              )
        })
      }).catch(err => {
          console.log(err)
      })
  },
  update: function (req, res) {
    console.log("hitting")
    db.Book
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Saved
      .deleteMany({})
      .then(resp => res.send(resp))
      .catch(err => res.status(422).json(err));
  }
};
