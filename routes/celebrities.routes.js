const router = require("express").Router();


const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res) =>{
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {

    const {name, occupation, catchPhrase} = req.body;

    const newCelebrity = new Celebrity ({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    });
    newCelebrity
        .save()
        .then (celeb => 
            res.redirect('/celebrities')
        )
        .catch(err => {
            res.render('celebrities/new-celebrity', 
            { error: "please, try again to insert a new celebrity" });
        });
});

router.get('/celebrities', (req,res) => {

    Celebrity.find()
        .then((celebrities)=>{
            res.render('./celebrities/celebrities', {celebrities});
        })
        .catch(() => console.log("error fetching celebrities"))
});


module.exports = router;