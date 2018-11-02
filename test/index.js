const cm = require('../index');
const {melt} = cm;

console.log(JSON.stringify(melt({
  menu: {
    side: [
      '&',
      '',
      '&-collapsed',
      {
        item: ['&'],
      },
    ],
  },
})));