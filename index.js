const _ = require('lodash');

/**
 *
 * @param {Object} skull
 * @description return a compiled Object whose key-value consist of ancestor keys
 * @example
 * in:
 * {hello:{
 *  world: ['&'],
 *  test: ['&', {
 *    child: ['&']
 *  }, 'test1', '&-test2']
 * }}
 * return:
 * {
 *  hello: {
 *   world: 'hello-world test1 hello-world-test2',
 *   test:{
 *    '&': 'hello-test ',
 *    'child': 'hello-test-child',
 *   }
 *  }
 * }
 */

const compileSpecialChar = ( prefix, str) => {
  return str.replace(/&/g, prefix );
}

const getCompiledWithChild = (pre, next, child) => {
  if(_.isString(child)){
    return Object.assign({},pre, {
      [`_${next}`]: child,
    })
  }
  return Object.assign({}, pre, {
    [next]: child,
  });
}

const getDashString = strArr => {
  return strArr.filter(str=> !!str).join('-');
}



const melt = skull => {
  const noop = (init, parentKey) => {
    if (!_.isObject(init)) {
      throw new Error('Accept data should be type of Object.');
    }

    return Object.keys(init).reduce((pre, key) => {
      const subItem = init[key];
      if (_.isObject(subItem) && !subItem.length) {
        const child = noop(subItem, getDashString([parentKey, key]));

        return getCompiledWithChild(pre, key, child);
      } else if (_.isArray(subItem)) {
        
        return subItem.reduce((preSub, nextChild) => {
          if (_.isString(nextChild) && nextChild) {
            // get current classnames 
            const _key = `_${key}`;
            const classnames = `${preSub[_key] || ''} ${compileSpecialChar(
              getDashString([parentKey, key]),
              nextChild,
            )}`;

            return getCompiledWithChild(preSub, key, classnames);
         
          } else if (_.isObject(nextChild)) {
            // depth into child            
            const child = noop(nextChild, getDashString([parentKey, key]));
            return getCompiledWithChild(preSub, key, child);
          }
          return preSub;
        }, pre);
      }else if(_.isBoolean(subItem) && subItem){
        return getCompiledWithChild(pre, key, getDashString([parentKey, key]));
      }
      return pre;
    }, {});
  };
  return noop(skull, '');
};

module.exports = {
  melt,
}