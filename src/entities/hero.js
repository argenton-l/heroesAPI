//creates the entity Hero and define its properties and methods
//this is a simple class to represent a hero in the system

class Hero {
  constructor({ id, name, age, power }) {
    this.id = Math.floor(Math.random() * 100) + Date.now();
    this.name = name;
    this.age = age;
    this.power = power;
  }

  //validates the properties of the hero
  //returns an object with valid and error properties
  isValid() {
    const properties = Object.getOwnPropertyNames(this);
    const amountInvalid = properties
      .map((property) => (!!this[property] ? null : `${property} is missing`))
      .filter((item) => !!item);

    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid,
    };
  }
}

module.exports = Hero;
