const CWD = process.env.PWD || process.env.INIT_CWD || process.cwd() || ''
const pkg = require(`${CWD}/package.json`)
module.exports = pkg;
