var express = require('express');
var router = express.Router();
var CountryService = require('./service');

const americaContentTitle = 'Top 20 largest countries in America'
const europeContentTitle = 'Top 20 populated countries in Europe'
const africaContentTitle = 'Arabic speakers countries in Africa'
const dashboardContentTitle = 'Dashboard'
const detailedViewTitle = 'Country detailed view'
const dashBoardAmericaTop = 5;
const dashBoardEuropeTop = 5;
const dashBoardAfricaLanguagesTop = 5;

router.get('/america/top20', async function(req, res, next){
    response = await CountryService.GetCountriesByRegion("America");
    res.render('topAmerica', {resultado: response, title: americaContentTitle,ttitle: americaContentTitle, america: 'active', europe: '', africa: '', dashboard: ''});
})

router.get('/europe/top20', async function(req, res, next){
    response = await CountryService.GetCountriesByRegion("Europe");
    res.render('topEurope', {resultado: response, title: europeContentTitle, ttitle: europeContentTitle, america: '', europe: 'active', africa: '', dashboard: ''});
})

router.get('/africa/arabic', async function(req, res, next){
    response = await CountryService.GetCountriesByRegion("Africa");
    res.render('arabicCountries', {resultado: response, title: africaContentTitle,ttitle: africaContentTitle, america: '', europe: '', africa: 'active', dashboard: ''});
})

router.get('/country/:countryName', async function(req, res, next){
    country = await CountryService.GetCountry(req.params.countryName);
    res.render('countryDetail', {resultado: country, title: detailedViewTitle, america: '', europe: '', africa: '', dashboard: ''})
})
router.get('/dashboard', async function(req, res, next){
    americaCountries = await CountryService.GetCountriesByRegion("America");
    europeCountries = await CountryService.GetCountriesByRegion("Europe");
    africaCountries = await CountryService.GetCountriesByRegion("Africa");
    africaLanguages = await CountryService.GetRegionLanguages("Africa");

    res.render('dashboard', {title:dashboardContentTitle, americaCountries: americaCountries.slice(0, dashBoardAmericaTop),europeCountries: europeCountries.slice(0, dashBoardEuropeTop),africaCountries: africaCountries,africaLanguages:africaLanguages.slice(0,dashBoardAfricaLanguagesTop), america: '', europe: '', africa: '', dashboard: 'active'});
})

module.exports = router;