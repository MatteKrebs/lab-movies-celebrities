const router = require("express").Router();

const celebrities = require('./celebrities.routes')
router.use("/celebrities", celebrities)

const movies = require('./movies.routes')
router.use("/movies", movies)

router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/new-celebrity.hbs", (req, res, next) => {
//   res.render("new-celebrity");
// });



module.exports = router
