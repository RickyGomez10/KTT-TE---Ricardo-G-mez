const repository = require('./repository')

const topAmerica = 20;
const topEurope = 20;
const africaLanguageFilter = "ara";

async function GetCountriesByRegion(region){
    try{
        var countries = await repository.GetCountriesByRegion(region);
        return FilterCountriesFactory(region, countries);
    }catch(e){
        console.log('Error retrieving countries by region information: ', e.message);
        return "";
    }
    
}

async function GetCountry(countryName){
    try{
        var country = await repository.GetCountry(countryName);
        return country;
    }catch(e){
        console.log('Error retrieving country information: ', e.message);
        return "";
    }
}

async function GetRegionLanguages(regionName){
    try{
        var languages = await repository.GetLanguagesByRegion(regionName);
        return languages.sort((a, b) => sortLanguagesDescending(a, b));
    }catch(e){
        console.log('Error retrieving country information: ', e.message);
        return "";
    }
}


function FilterCountriesFactory(region, countries) {
    regionLowerCase = region.toLowerCase();
    var filteredCountries;
    switch (regionLowerCase) {
      case "america":
        sortedCountries = countries.sort((a, b) => sortCountriesByAreaDescending(a, b));
        filteredCountries = sortedCountries.slice(0, topAmerica);
        break;
      case "europe":
        sortedCountries = countries.sort((a, b) =>
        sortCountriesByPopulationDescending(a, b)
        );
        filteredCountries = sortedCountries.slice(0, topEurope);
        break;
      case "africa":
        filteredCountries = countries.filter(
          (country) => country.ExtraInformation.languages[africaLanguageFilter]
        );
        break;
      default:
        filteredCountries = countries;
        break;
    }
    return filteredCountries;
  }
  
  function sortCountriesByAreaDescending(a, b) {
    if (a.Geography.area < b.Geography.area) return 1;
    if (a.Geography.area > b.Geography.area) return -1;
    return 0;
  }
  
  function sortLanguagesDescending(a,b) {
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    return 0;
  }
  
  function sortCountriesByPopulationDescending(a, b) {
    if (a.ExtraInformation.population < b.ExtraInformation.population) return 1;
    if (a.ExtraInformation.population > b.ExtraInformation.population) return -1;
    return 0;
  }
  

  module.exports = {
    GetCountriesByRegion:GetCountriesByRegion,
    GetCountry:GetCountry,
    GetRegionLanguages:GetRegionLanguages,
  }