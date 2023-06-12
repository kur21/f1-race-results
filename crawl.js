// const rp = require("request-promise");
// const cheerio = require("cheerio");
// const fs = require("fs");
import rp from 'request-promise'
import cheerio from 'cheerio'
import fs from 'fs'

var $
async function fetchWebFormulaByYear(year = 2023) {
  try {
    $ = await rp({
      uri: `https://www.formula1.com/en/results.html/${year}/races.html`,
      transform: function (body) {
        return cheerio.load(body);
      },
    });
  } catch (error) {
    return error;
  }
}

async function crawler() {
  console.log('----CRAWLING----');
  let result = {}

  // get list years
  let arrayYears = []
  await fetchWebFormulaByYear()
  const years = $('.resultsarchive-filter-wrap:first-child ul.resultsarchive-filter a.resultsarchive-filter-item-link span')
  for (let i = 0; i < years.length; i++) {
    let item = $(years[i])
    arrayYears.push(item.text().trim())
  }
  result.years = arrayYears

  // get data race result by year
  let data = []
  for (let i = 0; i < arrayYears.length; i++) {
    const year = arrayYears[i]
    await fetchWebFormulaByYear(year)

    const table_items = $('table.resultsarchive-table').find('tbody').find('tr')
    for (let i = 0; i < table_items.length; i++) {
      let item = $(table_items[i])
      const grand_prix = item.find('td > a').text().trim() || ''
      const date = item.find('td:nth-child(3)').text().trim() || ''
      const winner = item.find('td:nth-child(4) .hide-for-tablet').text().trim() + " " + item.find('td:nth-child(4) .hide-for-mobile').text().trim()
      const car = item.find('td:nth-child(5)').text().trim() || ''
      const laps = +item.find('td:nth-child(6)').text().trim() || 0
      const time = item.find('td:nth-child(7)').text().trim() || ''
      data.push({grand_prix, date, winner, car, laps, time})
    }
  }
  result.race_results = data
   
  // Lưu dữ liệu về máy
  fs.writeFileSync('data.json', JSON.stringify(result))
  console.log('----COMPLETED----');
}
crawler()
