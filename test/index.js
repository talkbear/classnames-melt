const cm = require('../index');
const {melt} = cm;

console.log(JSON.stringify(melt({
  user: {
    center: [
      '&',
      {
        name: ['user-&'],
        icon: ['&'],
      },
    ],
  },
})));