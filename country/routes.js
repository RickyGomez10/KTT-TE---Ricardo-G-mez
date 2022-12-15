var express = require('express');
var router = express.Router();
var CountryRepository = require('./repository')

const americaContentTitle = 'Top 20 largest countries in America'
const europeContentTitle = 'Top 20 populated countries in Europe'
const africaContentTitle = 'Arabic speakers countries in Africa'
router.get('/america/top20', async function(req, res, next){
    response = await CountryRepository.GetCountriesByRegion("America");
    res.render('topAmerica', {resultado: response, ttitle: americaContentTitle, america: 'active', europe: '', africa: ''});
})

router.get('/europe/top20', async function(req, res, next){
    response = await CountryRepository.GetCountriesByRegion("Europe");
    res.render('topEurope', {resultado: response, ttitle: europeContentTitle, america: '', europe: 'active', africa: ''});
})

router.get('/africa/arabic', async function(req, res, next){
    response = await CountryRepository.GetCountriesByRegion("Africa");
    res.render('arabicCountries', {resultado: response, ttitle: africaContentTitle, america: '', europe: '', africa: 'active'});
})

router.get('/country/:countryName', async function(req, res, next){
    country = await CountryRepository.GetCountry(req.params.countryName);
    res.render('countryDetail', {resultado: country, america: '', europe: '', africa: ''})
})

module.exports = router;