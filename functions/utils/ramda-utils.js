const R = require('ramda')
const promisify = require('es6-promisify')

const promisifyMethods = obj =>
	R.pipe(R.filter(R.is(Function)), R.map(promisify), R.mergeDeepRight(obj))(obj)

module.exports = { promisifyMethods };
