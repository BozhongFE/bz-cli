const chalk = require('chalk')
const _ = require('lodash')
const error = chalk.bold.red;

const check = (obj, key, rawKey) => {
  if (!obj[key]) {
    const err = `package.json.${rawKey} is not found`
    console.error(error(err))
    throw obj[key];
  }
}

module.exports = {
  isExists(obj, key) {
    if (_.hasIn(obj, key)) return true
    console.error(error(`package.json.${key} is not found`))
    return false
  },
  isArray(obj, key) {
    if (_.isArray(_.get(obj, key))) return true
    console.error(error(`package.json.${key} must be array`))
    return false
  }
}