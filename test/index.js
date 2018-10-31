const cm = require('../index');
const {melt} = cm;

console.log(JSON.stringify(melt({
  layout: {
    header: ['&'],
    content: ['&', 'new-container'],
  },
})));