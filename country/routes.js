var express = require('express');
var router = express.Router();
var CountryRepository = require('./repository')

router.get('/america', async function(req, res, next){
    response = await CountryRepository("America")
    res.render('topAmerica', {resultado: response})
})

router.get('/europe', async function(req, res, next){
    response = await CountryRepository("Europe")
    res.render('topEurope', {resultado: response})
})

router.get('/africa', async function(req, res, next){
    response = await CountryRepository("Africa")
    res.render('arabicCountries', {resultado: response})
})

module.exports = router;