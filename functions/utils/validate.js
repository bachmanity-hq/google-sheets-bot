import {
  all, // _.every || _.all
  always, // _.constant
  compose,
  contains, // _.contains || _.includes
  curry,
  filter,
  head, // _.first || _.head
  indexOf,
  isEmpty,
  length,
  partial,
  map,
  not,
  path, // _.path || _.get
  prop, // _.property || _.get
  flip,
  uncurryN
} from 'ramda'

import spected, { validate } from 'spected'

const verify = validate(() => true, head)

// Predicates

const businessIndustry = ['restaurants', 'retail']
const brands = ['MB', 'PD']
const flavors = ['CH', 'PB']
const sizes = [1, 2, 3]
const treatTypes = ['DS']

const notEmpty = compose(not, isEmpty)
const minLength = a => b => length(b) > a
const hasValidIndustry = x => {
  return contains(x, brands)
}

const hasCapitalLetter = a => /[A-Z]/.test(a)
const isGreaterThan = curry((len, a) => (a > len))
const isLengthGreaterThan = len => compose(isGreaterThan(len), prop('length'))
const isEqual = compareKey => (a, all) => a === all[compareKey]

// Messages

const notEmptyMsg = field => `${field} should not be empty.`
const minimumMsg = (field, len) => `Minimum ${field} length of ${len} is required.`
const capitalLetterMsg = field => `${field} should contain at least one uppercase letter.`
const capitalLetterMsgWithValue = (field) => (value) => `${field} should contain at least one uppercase letter. ${value} is missing an uppercase letter.`
const equalMsg = (field1, field2) => `${field2} should be equal with ${field1}`

// Rules

const dealsSpec = {
  businessname: [[notEmpty, notEmptyMsg('businessname')],[hasCapitalLetter, capitalLetterMsg('businessname')]],
  businessindustry: [[notEmpty, notEmptyMsg('businessindustry')], [hasValidIndustry, 'Use defined industries']],
  expirationdate: [[isValidDateFormat, ''], [isAfterTodaysDate, '']]
}

const successFnOne = (x) => {
  return true
}
const failFnOne = (x) => {
  return x[0]
}

module.exports = verify(dealsSpec)
