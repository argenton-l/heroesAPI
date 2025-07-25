// Creates a service for managing heroes
class HeroService {
  constructor({ heroRepository }) {
    this.heroRepository = heroRepository;
  }

  // Retrieves all heroes
  async find(itemId) {
    return this.heroRepository.find(itemId);
  }

  // Creates a new hero
  async create(data) {
    return this.heroRepository.create(data);
  }
}

module.exports = HeroService;
