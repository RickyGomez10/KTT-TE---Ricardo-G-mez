const axios = require("axios");
const Classes = require("./country");

async function GetCountriesByRegion(region) {
  const countries = [];

  try {
    const res = await axios.get(
      "https://restcountries.com/v3/region/" + region
    );
    const json = await res.data;
    for (const country in json) {
      let latitude = setCoordinate(json[country].latlng[0]);
      let longitude = setCoordinate(json[country].latlng[1]);
      let capital = setCapital(json[country].capital);
      let borders = setBorders(json[country].borders);
      Coordinates = new Classes.Coordinates(latitude, longitude);

      Geography = new Classes.Geography(json[country].area);

      ExtraInformation = new Classes.ExtraInformation(
        json[country].population,
        json[country].cca3,
        capital,
        json[country].languages,
        borders
      );

      Locatio = new Classes.Location(
        json[country].region,
        json[country].subregion
      );

      Country = new Classes.Country(
        json[country].name.official,
        Locatio,
        Coordinates,
        ExtraInformation,
        Geography
      );
      countries.push(Country);
    }

    return FilterCountriesFactory(region, countries);
  } catch (e) {
    console.log("Error while retrieving region information:" + e.message);
    return "";
  }
}

async function GetCountry(countryName) {
  const mapProvider = "googleMaps";
  let countryResponse;
  try {
    const res = await axios.get(
      "https://restcountries.com/v3/name/" + countryName
    );
    const json = await res.data;
    for (const country in json) {
      let latitude =
        Math.trunc(setCoordinate(json[country].latlng[0]) * 100) / 100;
      let longitude =
        Math.trunc(setCoordinate(json[country].latlng[1]) * 100) / 100;
      let capital = setCapital(json[country].capital);
      let borders = setBorders(json[country].borders);
      Coordinates = new Classes.Coordinates(latitude, longitude);

      Geography = new Classes.Geography(json[country].area);

      ExtraInformation = new Classes.ExtraInformation(
        json[country].population,
        json[country].cca3,
        capital,
        json[country].languages,
        borders
      );

      Locatio = new Classes.Location(
        json[country].region,
        json[country].subregion
      );

      MetaData = new Classes.MetaData(
        json[country].flags[0],
        json[country].maps[mapProvider],
        json[country].languages,
        json[country].currencies
      );

      Country = new Classes.Country(
        json[country].name.official,
        Locatio,
        Coordinates,
        ExtraInformation,
        Geography,
        MetaData
      );

      countryResponse = Country;
    }

    return countryResponse;
  } catch (e) {
    console.log(
      "Error: Error while retrieving country information: " + e.message
    );
    return "";
  }
}

async function GetLanguagesAfrica() {
  try {
    const res = await axios.get("https://restcountries.com/v3/region/africa");
    const json = await res.data;
    var languages = [];
    for (const country in json) {
      console.log("------------pais------------", country);
      for (const language in json[country].languages) {
        console.log("------------lenguas------------", language);
        var hasLanguage = languages.some((countryLanguageAdded) => {
          return countryLanguageAdded.name == language;
        });

        if (!hasLanguage) {
          console.log("No tiene el idioma:", language);
          languages.push({ name: language, count: 1 });
        } else {
          for (let index = 0; index < languages.length; index++) {
            if (languages[index].name == language) {
              languages[index].count += 1;
            }
          }
        }
      }
    }
    sortedLanguages = languages.sort((a, b) => sortSpokenLanguagesAfrica(a, b));
    console.log(sortedLanguages);
    return sortedLanguages;
  } catch (e) {
    console.log(
      "Error: Error while retrieving country information: " + e.message
    );
    return "";
  }
}

function setCoordinate(coordinateToCheck) {
  let coordinate;
  if (typeof coordinateToCheck == "undefined") {
    coordinate = 0;
  } else {
    coordinate = coordinateToCheck;
  }
  return coordinate;
}

function setCapital(capitalToCheck) {
  let capital;
  if (typeof capitalToCheck == "undefined") {
    capital = "";
  } else {
    capital = capitalToCheck[0];
  }
  return capital;
}

function setBorders(borders) {
  separatedByCommasBorders = "";
  for (const border in borders) {
    if (0 != border) {
      separatedByCommasBorders += ", " + borders[border];
    } else {
      separatedByCommasBorders += borders[border];
    }
  }
  return separatedByCommasBorders;
}

function FilterCountriesFactory(region, countries) {
  regionLowerCase = region.toLowerCase();
  var filteredCountries;
  const topAmerica = 20; // deben estar en configuracion en caso de que cambie la regla de top20 a top10 por ejemplo
  const topEurope = 20;
  const africaLanguageFilter = "ara";
  switch (regionLowerCase) {
    case "america":
      sortedCountries = countries.sort((a, b) => sortCountriesByArea(a, b));
      filteredCountries = sortedCountries.slice(0, topAmerica);
      break;
    case "europe":
      sortedCountries = countries.sort((a, b) =>
        sortCountriesByPopulation(a, b)
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

function sortCountriesByArea(a, b) {
  if (a.Geography.area < b.Geography.area) return 1;
  if (a.Geography.area > b.Geography.area) return -1;
  return 0;
}

function sortSpokenLanguagesAfrica(a,b) {
  if (a.count < b.count) return 1;
  if (a.count > b.count) return -1;
  return 0;
}

function sortCountriesByPopulation(a, b) {
  if (a.ExtraInformation.population < b.ExtraInformation.population) return 1;
  if (a.ExtraInformation.population > b.ExtraInformation.population) return -1;
  return 0;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
  GetCountriesByRegion: GetCountriesByRegion,
  GetCountry: GetCountry,
  GetLanguagesAfrica: GetLanguagesAfrica,
};
