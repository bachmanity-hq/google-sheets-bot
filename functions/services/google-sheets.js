const GoogleSpreadsheet = require('google-spreadsheet')
const functions = require('firebase-functions')
const R = require('ramda')
const verify = require('../utils/validate')
const parsers = require('../utils/parsers')
const promisifyMethods = require('../utils/ramda-utils').promisifyMethods

// grabWorksheetObj :: { [ SpreadsheetWorksheet ] } -> SpreadsheetWorksheet
const grabWorksheetObj = R.pipe(
	R.prop('worksheets'),
	R.find(R.propEq('title', 'deals'))
)

// parseDeals :: [ SpreadsheetRow (i.e., Deal) ] -> [ Deal ]
const parseDeals = (deals) => deals ?
	Promise.resolve(deals) : Promise.reject('No deals available');

const validateDeals = (deals) => deals ?
	Promise.resolve(deals) : Promise.reject('No deals available');

const saveDeals = (admin) => (deals) => {

}

const deleteDealsFromSheet = (deals) => deals ?
	Promise.resolve(deals) : Promise.reject('No deals available');

const checkDeals = admin => (req, res) => {
		const {
			sheet_key,
			service_account,
			worksheet_name
		} = functions.config().google.sheets.coup

		const spreadsheet = promisifyMethods(new GoogleSpreadsheet(sheet_key))

		return spreadsheet
			.useServiceAccountAuth(service_account)
			.then(() => spreadsheet.getInfo())
			.then(grabWorksheetObj)
			.then(promisifyMethods)
			.then((worksheet) => worksheet.getRows())
      .then(parseDeals)
      .then(validateDeals)
      .then(saveDeals(admin))
      .then(deleteDealsFromSheet)
      .catch(console.log)
}

module.exports = { checkDeals }

/*
const addExpenses = (worksheet, expenses) => {
	const headerRow = R.pipe(R.head, R.keys, R.sortBy(R.toLower))(expenses)

	return worksheet
		.resize({ colCount: headerRow.length, rowCount: expenses.length + 1 })
		.then(() => worksheet.setHeaderRow(headerRow))
		.then(() =>
			worksheet.getCells({ 'return-empty': true }).then(cells => {
				expenses.forEach((expense, i) => {
					return cells.filter(cell => cell.row === i + 2).forEach((cell, j) => {
						cell.value = R.propOr('', headerRow[j], expense)
					})
				})

				return worksheet.bulkUpdateCells(cells)
			})
		)
}
*/
