const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', (req, res) =>{
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', {celebrities});
        })
        .catch((error) => {
            console.log(error);
            res.redirect('/');
        });
});

//important for project
router.post('/movies/create', (req, res) =>{

    const {title, genre, plot, cast} = req.body;

    const newMovie = new Movie({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    });

    newMovie
        .save()
        .then(
            res.redirect('/movies')
        )
        .catch(err => {
            res.render('movies/new-movie', { error: "please, try again to insert a new movie" });
        });
});


router.get('/movies', (req,res) => {

    Movie.find()
        .then((movies)=>{
            res.render('./movies/movies', {movies});
        })
        .catch(() => console.log("error fetching movies"))
});



router.get('/movies/:id', (req,res) => {

    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast')
        .then((movie)=>{
            res.render('./movies/movie-details', {movie});
            console.log(movie.cast)
        })
        .catch((error) => {
        console.log("error fetching movies", error);
        res.render('error');
        });
})


router.post('/movies/:id/delete', (req,res) => {

    const movieId = req.params.id;

    Movie.findByIdAndRemove(movieId)
        .then (res.redirect('/movies'))
        .catch((error) => {
        console.log("error deleting movie", error);
        res.render('error');
        });
})


router.get('/movies/:id/edit', (req,res) => {

    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('cast')
        .then ((movie)=> {
            Celebrity.find()
                .then((celebrities) => {
                    res.render('./movies/edit-movie', {movie, celebrities});
                })
                .catch((error) => {
                    console.log("error rendering movie", error);
                    res.render('error');
                });
        })
        .catch ((error) => {
            console.log("error fetching movie", error);
            res.render('error');
        });
});


router.post('/movies/:id', (req,res) => {

    const movieId = req.params.id;
    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast})
        .then (()=> 
            res.redirect(`/movies/${movieId}`))
        .catch((error) => {
        console.log("error editing movie", error);
        res.render('error');
        });
});


module.exports = router;