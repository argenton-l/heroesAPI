const HeroRepository = require("../repositories/heroRepository");
const HeroService = require("../services/heroService");

// This method concatenates the path to the database file
// It uses the 'path' module to ensure the correct file path is used across different operating systems
const { join } = require("path");
const filename = join(__dirname, "../database", "data.json");

// This factory generates an instance of HeroService with a HeroRepository
// It abstracts the creation logic, allowing for easier testing and modification
const generateInstance = () => {
  const heroRepository = new HeroRepository({ file: filename });
  const heroService = new HeroService({ heroRepository });

  return heroService;
};

module.exports = { generateInstance };
