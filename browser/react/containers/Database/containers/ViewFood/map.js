/** Nutrition map */
export default [
  {
    macro: 'Total Fat',
    key: 'Fat',
    unit: 'g',
    dailyVal: 65,
    location: null,
    sub: [
      {
        macro: 'Saturated Fat',
        unit: 'g',
        key: 'FA_Sat',
        dailyVal: 20,
        location: 'abbrevMicro'
      },
      {
        macro: 'Unsaturated Fat',
        unit: 'g',
        key: 'FA_Mono',
        location: 'abbrevMicro'
      }
    ]
  },
  {
    name: 'Cholesterol',
    key: 'Cholesterl',
    dailyVal: 300,
    unit: 'mg',
    location: 'abbrevMicro'
  },
  {
    macro: 'Sodium',
    unit: 'mg',
    key: 'Sodium',
    dailyVal: 2400,
    location: 'abbrevMicro'
  },
  {
    macro: 'Carbohydrates',
    unit: 'g',
    key: 'Carbohydrates',
    dailyVal: 300,
    location: null,
    sub: [
      {
        macro: 'Dietary Fiber',
        unit: 'g',
        key: 'Fiber',
        dailyVal: 25,
        location: 'abbrevMicro'
      },
      {
        macro: 'Sugars',
        unit: 'g',
        key: 'Sugar',
        location: 'abbrevMicro'
      }
    ]
  },
  {
    macro: 'Protein',
    unit: 'g',
    key: 'Protein',
    location: null
  }
];
