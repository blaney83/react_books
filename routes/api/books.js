const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/:search")
  .get(booksController.findById)
  .post(booksController.create)
  .put(booksController.update)
  .delete(booksController.remove);


router
  .route("/saved/:id")
  .get(booksController.findAll)
//   .put(booksController.update)

module.exports = router;
