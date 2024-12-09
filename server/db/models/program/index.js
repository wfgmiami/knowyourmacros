const sequelize = require('../../conn');
const assert = require('assert');
const makeProgramObject = require('./classMethods/makeProgramObject');

const { Sequelize } = sequelize;

// curl 'http://localhost:3000/api/calculate/day?type=bored' -H 'If-None-Match: W/"3d84-nD0BPRQf8sbGLW8DrlvSDDZF2fA"' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36' -H 'Accept: application/json, text/plain, */*' -H 'Referer: http://localhost:3000/shopping-list' -H 'Cookie: token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.hzfEQOcJdvat6x_di6IDwi_tykCfKIAeehBukstyS14' -H 'Connection: keep-alive' -H 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.hzfEQOcJdvat6x_di6IDwi_tykCfKIAeehBukstyS14' --compressed

const Program = sequelize.define('program', {
  startWeight: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  endGoal: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  endWeight: {
    type: Sequelize.DECIMAL
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['In Progress', 'Compete'],
    allowNull: false,
    defaultValue: 'In Progress'
  },
  result: {
    type: Sequelize.ENUM,
    values: ['TBD', 'Success', 'Failure'],
    allowNull: false
  },

}, {
  classMethods: {
    makeProgramObject
  }
});

module.exports = Program;

