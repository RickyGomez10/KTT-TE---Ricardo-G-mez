let Country = class {
  constructor(
    officialName,
    Location,
    Coordinates,
    ExtraInformation,
    Geography,
    MetaData
  ) {
    this.officialName = officialName;
    this.Location = Location;
    this.Coordinate = Coordinates;
    this.ExtraInformation = ExtraInformation;
    this.Geography = Geography;
    this.MetaData = MetaData;
  }
};

let Location = class {
  constructor(region, subregion) {
    this.region = region;
    this.subregion = subregion;
  }
};

let Geography = class {
  constructor(area) {
    this.area = area;
  }
};

let MetaData = class{
  constructor(flag, googleMapUrl, languages, currencies){
    this.flag = flag;
    this.googleMapUrl = googleMapUrl;
    this.languages = languages;
    this.currencies = currencies;
  }
}

let ExtraInformation = class {
  constructor(population, cca3, capital, languages, borders) {
    this.population = population;
    this.cca3 = cca3;
    if (typeof population == "undefined") {
      capital = "";
    } else {
      this.capital = capital;
    }
    this.languages = languages;
    this.borders = borders;
  }
 
};

let Coordinates = class {
  constructor(latitude, longitude) {
    if (typeof longitude == "undefined" && typeof latitude == "undefined") {
      this.latitude = 0;
      this.longitude = 0;
    } else if (typeof latitude == "undefined") {
      this.latitude = 0;
      this.longitude = longitude;
    } else if (typeof longitude == "undefined") {
      this.latitude = latitude;
      this.longitude = 0;
    } else {
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }
};

module.exports = {
  Country: Country,
  Location: Location,
  Geography: Geography,
  ExtraInformation: ExtraInformation,
  Coordinates: Coordinates,
  MetaData: MetaData,
};
