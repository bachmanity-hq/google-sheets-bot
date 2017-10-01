const functions = require('firebase-functions')
const admin = require('./config.js').admin;
const { checkDeals } = require('./services/google-sheets')

exports.deals = functions.https.onRequest(checkDeals(admin))
