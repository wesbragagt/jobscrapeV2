const axios = require('axios')
const cheerio = require('cheerio')
const querystring=require('querystring')
const { findAllLinks, findAllText, mergeOn, makeIdsForDataSet, scrape } = require('./lib/scrape')


module.exports.getjobs = async function (req, res) {
  const queries = querystring.stringify(req.query)
  const $ = await scrape(
    `https://www.indeed.com/jobs?${queries}`
  )
  const jobTitles = findAllText('job', 'h2.title')($)
  const company = findAllText('company', 'span.company')($)
  const salary = findAllText('salary', 'span.salary')($)
  const description = findAllText('description', 'div.summary')($)
  const date = findAllText('date', 'span.date')($)
  const links = findAllLinks('link', 'a.jobtitle.turnstileLink')(
    $,
    'https://indeed.com'
  )
  const mergedJobDetails = mergeOn('id')(jobTitles, company, salary, links, description, date)
  const response = makeIdsForDataSet(mergedJobDetails)
  res.send({ response, queryParams: req.query })
}
