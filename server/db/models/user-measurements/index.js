const sequelize = require('../../conn');

const { Sequelize } = sequelize;


module.exports = sequelize.define('userMeasurement', {
  age: {
    type: Sequelize.DECIMAL
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  height: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  units: {
    type: Sequelize.ENUM,
    values: ['imperial', 'metric'],
    allowNull: false
  },
  weight: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  bodyfat: {
    type: Sequelize.DECIMAL,
    allowNull: true
  },
  lifestyle: {
    type: Sequelize.ENUM,
    values: ['Sedentary', 'Normal', 'Active'],
    allowNull: false
  },
  goal: {
    type: Sequelize.ENUM,
    values: ['Lose Fat', 'Gain Muscle', 'Maintain'],
  },
  date: {
    type: Sequelize.DATE,
  },
  bmrTraditional: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  bmrBodyFat: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  classMethods: {
    async findAllByUserId(user_id) {
      const measurements = await this.findAll({
        where: {
          user_id
        }
      });
      return measurements;
    }
  },
  hooks: {
    beforeCreate(data) {
      console.log(data);
      const { age, gender, height, weight, units } = data.get();
      data.bmrTraditional = bmr(parseFloat(age), gender.toLowerCase(), parseFloat(height), parseFloat(weight), units);
      return data;
    }
  }
});

function bmr(age, genderString, heightNumber, weightNumber, units) {
  console.log(age, genderString, heightNumber, weightNumber, units);
  const gender = genderString === 'male' ? 5 : -161;
  const height = units === 'imperial' ? (2.54 * heightNumber) / 100 : heightNumber / 100;
  const weight = units === 'imperial' ? weightNumber * 0.45359237 : weightNumber;
  return Math.round(((10 * weight) + (625 * height) + gender) - (5 * age));
}

// curl 'http://localhost:3000/api/user/signup' -H 'Origin: http://localhost:3000' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'Referer: http://localhost:3000/signup/user-info' -H 'Cookie: PHPSESSID=42f2bff47e7b0582fbb5c2ee050b7e80; _vwo_uuid_v2=7226FFF002FEF691883C39EA515EF1A4|adcac6f2fd0664b07a092bfe872f8836; driftt_aid=6e3c34e8-7b7f-4a47-9497-1d54a7920638; _ga=GA1.1.2021611035.1511589809; DFTT_END_USER_PREV_BOOTSTRAPPED=true; io=q8P5p_s6rnHLf_lUAAAM; uuid=e82b72ab-e55b-43df-bdda-f2037f2bcf04; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.hzfEQOcJdvat6x_di6IDwi_tykCfKIAeehBukstyS14' -H 'Connection: keep-alive' -H 'token: [object Object]' --data-binary '{"firstname":"Patrick","lastname":"Star","email":"patrick@star.fish","username":"dumbass","password":"patrick","confirmPassword":"patrick","gender":"male","birthdate":"1989-06-02","height":"73","hunit":"inch","weight":"187","wunit":"lbs","lifestyle":"Normal","goal":"Lose Fat"}' --compressed
