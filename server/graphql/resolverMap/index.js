const Chance = require('chance');
const chance = new Chance();

module.exports = {
  rpg: ({dice}) => chance.rpg(dice, {sum: true}),
};
