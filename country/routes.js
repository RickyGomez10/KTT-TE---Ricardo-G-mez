var express = require('express');
var router = express.Router();
var CountryRepository = require('./repository')

const americaContentTitle = 'Top 20 largest countries in America'
const europeContentTitle = 'Top 20 populated countries in Europe'
const africaContentTitle = 'Arabic speakers countries in Africa'
router.get('/america/top20', async function(req, res, next){
    response = await CountryRepository("America")
    res.render('topAmerica', {resultado: response, ttitle: americaContentTitle, america: 'active', europe: '', africa: ''})
})

router.get('/europe/top20', async function(req, res, next){
    response = await CountryRepository("Europe")
    res.render('topEurope', {resultado: response, ttitle: europeContentTitle, america: '', europe: 'active', africa: ''})
})

router.get('/africa/arabic', async function(req, res, next){
    response = await CountryRepository("Africa")
    res.render('arabicCountries', {resultado: response, ttitle: africaContentTitle, america: '', europe: '', africa: 'active'})
})

module.exports = router;