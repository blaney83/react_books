import axios from "axios";

export default {
    // Gets all books
    createBooks: function (bookSearch) {
        console.log(bookSearch)
        return axios.post("/api/books/" + bookSearch);
    },
    // Gets the book with the given id
    getBook: function (id) {
        return axios.get("/api/books/" + id);
    },

    getSaved: function (id) {
        return axios.get("/api/books/saved/" + id);
    },
    // Deletes the book with the given id
    deleteSaved: function (arr) {
        return axios.delete("/api/books/" + arr);
    },
    // Saves a book to the database
    allBook: function () {
        return axios.put("/api/books/");
    }
};
