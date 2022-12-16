const axios = require("axios");
const Classes = require("./country");

const mapProvider = "googleMaps";
const regionBaseUrl = "https://restcountries.com/v3/region/";
const countryBaseUrl = "https://restcountries.com/v3/name/";

async function GetCountriesByRegion(region) {
  const countries = [];
  try {
    const res = await axios.get(
      regionBaseUrl + region
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

    return countries;
  } catch (e) {
    console.log("Error while retrieving region information:" + e.message);
    return "";
  }
}

async function GetCountry(countryName) {
  let countryResponse;
  try {
    const res = await axios.get(
      countryBaseUrl + countryName
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

async function GetLanguagesByRegion(regionName) {
  try {
    const res = await axios.get(regionBaseUrl+regionName);
    const json = await res.data;
    var languages = [];
    for (const country in json) {
      for (const language in json[country].languages) {
      
        var hasLanguage = languages.some((countryLanguageAdded) => {
          return countryLanguageAdded.name == language;
        });

        if (!hasLanguage) {
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

   return languages;
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


module.exports = {
  GetCountriesByRegion: GetCountriesByRegion,
  GetCountry: GetCountry,
  GetLanguagesByRegion: GetLanguagesByRegion,
};
