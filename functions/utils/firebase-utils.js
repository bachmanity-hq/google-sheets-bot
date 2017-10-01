const { composeP, curry } = require('ramda');
const { chainP } = require('./ramda-utils');
const database = require('../config').admin.database();

// returnData :: Snapshot -> Data
const returnData = snapshot => snapshot.val();

// getData :: Path -> Promise Snapshot
const getData = path => database.ref(path).once('value');

// get :: Path -> Data
const get = composeP(returnData, getData);

// getMultiple :: [Paths] -> Promise [Data]
const getMultiple = chainP(get);

// setData :: (Path, Data) -> Promise { Path, Snapshot }
const setData = (path, data) => database.ref(path).push(data)
	.then(snapshot => ({ path, snapshot }));

// add :: (Path, Data) -> { key: k, value: Data }
const add = composeP(returnData, setData);

// set :: Path -> Data -> { key: k, value: Data }
const set = curry((path, data) => add(path, data));

// setMultiple :: Path -> Data -> [{ key: k, value: Data }]
const setMultiple = curry((path, data) => chainP(set(path), data));

module.exports = { get, getMultiple, set, setMultiple };
